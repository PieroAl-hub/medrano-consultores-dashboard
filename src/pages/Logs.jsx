import React, { useState, useEffect, useRef } from 'react'
import { Card } from '../components/ui/card'

const LogsPage = () => {
  const [logs, setLogs] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [autoScroll, setAutoScroll] = useState(true)
  const [filter, setFilter] = useState('all')
  const logsEndRef = useRef(null)

  // Colores para tipos de logs
  const logColors = {
    info: 'text-green-600',
    success: 'text-green-700',
    warn: 'text-yellow-600',
    error: 'text-red-600',
    debug: 'text-purple-600',
    connection: 'text-blue-600',
    api: 'text-cyan-600',
    websocket: 'text-purple-700',
    security: 'text-red-700',
    database: 'text-blue-700'
  }

  // Emoji para tipos de logs
  const logEmojis = {
    info: 'ℹ️',
    success: '✅',
    warn: '⚠️',
    error: '❌',
    debug: '🔍',
    connection: '🔌',
    api: '📡',
    websocket: '🔌',
    security: '🛡️',
    database: '🗄️'
  }

  // Conectar al servidor de logs
  useEffect(() => {
    const connectToLogs = async () => {
      try {
        // Conectar WebSocket para logs en tiempo real
        const ws = new WebSocket('ws://localhost:5000')
        
        ws.onopen = () => {
          setIsConnected(true)
          // Suscribirse a canal de logs
          ws.send(JSON.stringify({
            type: 'subscribe',
            channel: 'logs'
          }))
        }

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            if (data.type === 'log') {
              setLogs(prev => [...prev.slice(-199), data.payload]) // Mantener últimos 200 logs
              if (autoScroll) {
                scrollToBottom()
              }
            }
          } catch (error) {
            console.error('Error parsing log message:', error)
          }
        }

        ws.onclose = () => {
          setIsConnected(false)
        }

        ws.onerror = (error) => {
          console.error('WebSocket error:', error)
          setIsConnected(false)
        }

        return () => {
          ws.close()
        }
      } catch (error) {
        console.error('Error connecting to logs:', error)
        setIsConnected(false)
      }
    }

    connectToLogs()
  }, [autoScroll])

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const clearLogs = () => {
    setLogs([])
  }

  const filteredLogs = logs.filter(log => 
    filter === 'all' || log.level === filter
  )

  const exportLogs = () => {
    const logText = logs.map(log => 
      `[${log.timestamp}] [${log.level.toUpperCase()}] ${log.message}`
    ).join('\n')
    
    const blob = new Blob([logText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `medrano-logs-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Logs del Sistema</h1>
          <p className="text-gray-600">Monitoreo en tiempo real del servidor y aplicaciones</p>
        </div>

        {/* Controles */}
        <div className="mb-4 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {isConnected ? '🟢 Conectado' : '🔴 Desconectado'}
            </span>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos los logs</option>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warn">Warning</option>
            <option value="error">Error</option>
            <option value="api">API</option>
            <option value="websocket">WebSocket</option>
            <option value="database">Database</option>
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700">Auto-scroll</span>
          </label>

          <button
            onClick={clearLogs}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Limpiar
          </button>

          <button
            onClick={exportLogs}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Exportar
          </button>
        </div>

        {/* Contador de logs */}
        <div className="mb-4 text-sm text-gray-600">
          Mostrando {filteredLogs.length} de {logs.length} logs
        </div>

        {/* Panel de logs */}
        <Card className="bg-black text-green-400 font-mono text-sm p-4 h-96 overflow-y-auto">
          {filteredLogs.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              {isConnected ? 'Esperando logs...' : 'Conectando al servidor...'}
            </div>
          ) : (
            filteredLogs.map((log, index) => (
              <div key={index} className="mb-1 leading-relaxed">
                <span className="text-gray-400">[{log.timestamp}]</span>
                <span className={`ml-2 font-bold ${logColors[log.level] || 'text-gray-400'}`}>
                  [{log.level.toUpperCase()}]
                </span>
                <span className="ml-2">{logEmojis[log.level] || '📝'}</span>
                <span className="ml-2">{log.message}</span>
              </div>
            ))
          )}
          <div ref={logsEndRef} />
        </Card>

        {/* Instrucciones */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">📋 Información de Logs</h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• Los logs se actualizan en tiempo real desde el servidor</p>
            <p>• Puedes filtrar por tipo de log para encontrar información específica</p>
            <p>• Los logs más recientes aparecen al final</p>
            <p>• Usa "Exportar" para descargar todos los logs en un archivo .txt</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogsPage
