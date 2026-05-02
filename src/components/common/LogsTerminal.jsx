import React, { useState, useEffect, useRef } from 'react'

const LogsTerminal = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [autoScroll, setAutoScroll] = useState(true)
  const [filter, setFilter] = useState('all')
  const logsEndRef = useRef(null)

  // Colores para tipos de logs
  const logColors = {
    info: 'text-green-400',
    success: 'text-green-500',
    warn: 'text-yellow-400',
    error: 'text-red-400',
    debug: 'text-purple-400',
    connection: 'text-blue-400',
    api: 'text-cyan-400',
    websocket: 'text-purple-500',
    security: 'text-red-500',
    database: 'text-blue-500'
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
    if (!isOpen) return

    const connectToLogs = async () => {
      try {
        const ws = new WebSocket('ws://localhost:5000')
        
        ws.onopen = () => {
          setIsConnected(true)
          // Suscribirse a canal de logs
          ws.send(JSON.stringify({
            type: 'subscribe',
            channel: 'logs'
          }))
          
          // Agregar algunos logs de ejemplo para probar
          setLogs([
            {
              timestamp: new Date().toISOString(),
              level: 'info',
              message: 'Terminal de logs conectada'
            },
            {
              timestamp: new Date().toISOString(),
              level: 'success',
              message: 'Esperando logs del servidor...'
            }
          ])
        }

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            
            // Procesar diferentes tipos de mensajes
            if (data.type === 'log') {
              setLogs(prev => [...prev.slice(-99), data.payload])
            } else if (data.type === 'metrics' || data.type === 'software-update') {
              // Convertir otros mensajes a logs
              setLogs(prev => [...prev.slice(-99), {
                timestamp: new Date().toISOString(),
                level: 'websocket',
                message: `Recibido: ${data.type}`
              }])
            }
            
            if (autoScroll) {
              scrollToBottom()
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

    const cleanup = connectToLogs()
    return cleanup
  }, [isOpen, autoScroll])

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const clearLogs = () => {
    setLogs([])
  }

  const filteredLogs = logs.filter(log => 
    filter === 'all' || log.level === filter
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Terminal de Logs */}
      <div className="relative right-0 top-0 h-full w-96 bg-black shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`} />
            <span className="text-white text-sm font-medium">
              {isConnected ? 'Conectado' : 'Desconectado'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-800 text-white text-xs px-2 py-1 rounded border border-gray-600 focus:outline-none"
            >
              <option value="all">Todos</option>
              <option value="info">Info</option>
              <option value="error">Error</option>
              <option value="api">API</option>
              <option value="websocket">WS</option>
            </select>
            
            <button
              onClick={clearLogs}
              className="text-gray-400 hover:text-white text-xs"
            >
              Limpiar
            </button>
            
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Contenido de Logs */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto p-3 font-mono text-xs">
            {filteredLogs.length === 0 ? (
              <div className="text-gray-500 text-center py-8">
                {isConnected ? 'Esperando logs...' : 'Conectando...'}
              </div>
            ) : (
              filteredLogs.map((log, index) => (
                <div key={index} className="mb-1 leading-tight">
                  <span className="text-gray-500">
                    [{new Date(log.timestamp).toLocaleTimeString()}]
                  </span>
                  <span className={`ml-2 font-bold ${logColors[log.level] || 'text-gray-400'}`}>
                    [{log.level.toUpperCase()}]
                  </span>
                  <span className="ml-1">{logEmojis[log.level] || '📝'}</span>
                  <span className="ml-1 text-gray-300">{log.message}</span>
                </div>
              ))
            )}
            <div ref={logsEndRef} />
          </div>
        </div>

        {/* Footer */}
        <div className="px-3 py-2 bg-gray-900 border-t border-gray-700">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{filteredLogs.length} logs</span>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={autoScroll}
                onChange={(e) => setAutoScroll(e.target.checked)}
                className="rounded"
              />
              Auto-scroll
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogsTerminal
