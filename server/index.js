// Servidor principal - Medrano Consultores Dashboard


import express from 'express'
import cors from 'cors'
import { WebSocketServer } from 'ws'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// Importar middlewares de seguridad desde índice centralizado
import {
  generalLimiter,
  apiLimiter,
  strictLimiter,
  wsConfig,
  ipConnections,
  validateWebSocketMessage,
  getClientIP,
  canConnect,
  incrementConnection,
  decrementConnection,
  isValidChannel,
  isValidObjectId,
  validateQueryParams,
  validatePathParams
} from './middleware/index.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import connectDB from './config/db.js'
import Software from './models/Software.js'
import Metric from './models/Metric.js'
import { logger } from './utils/logger.js'

// Iniciar sistema de logging
logger.separator('MEDRANO CONSULTORES DASHBOARD - INICIANDO SISTEMA')
logger.info('Iniciando servidor principal...')

// Conectar a base de datos
logger.database('Conectando a base de datos...')
connectDB()

// Configurar servidor
logger.info('Configurando servidor Express...')
const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({ server })

const PORT = process.env.PORT || 5000
logger.info(`Puerto configurado: ${PORT}`)

// Middleware de seguridad - Aplicar middlewares importados
logger.security('Configurando middleware de seguridad...')
app.use(cors())
logger.success('✓ CORS habilitado')

app.use(generalLimiter) // Rate limiting general
logger.success('✓ Rate limiting general activado (100 peticiones/15min)')

app.use(express.json({ limit: '10mb' })) // Limitar tamaño de payload
logger.success('✓ Parser JSON configurado (límite: 10MB)')

app.use(express.static(path.join(__dirname, '../dist')))
logger.success('✓ Archivos estáticos configurados')

// Aplicar rate limiting específico para endpoints de API
app.use('/api/', apiLimiter)
logger.success('✓ Rate limiting API activado (30 peticiones/1min)')

// Clientes WebSocket conectados
let clients = new Set()

// Configurar servidor WebSocket
logger.websocket('Configurando servidor WebSocket...')
logger.websocket(`Límite de conexiones por IP: ${wsConfig.MAX_CONNECTIONS_PER_IP}`)

// Manejar conexiones WebSocket con protección importada
wss.on('connection', (ws, request) => {
  const clientIP = getClientIP(request)
  
  // Verificar si puede conectar usando middleware importado
  if (!canConnect(clientIP)) {
    logger.security(`❌ Conexión rechazada: Demasiadas conexiones desde IP ${clientIP}`)
    ws.close(1008, 'Too many connections from your IP')
    return
  }
  
  // Incrementar contador usando middleware importado
  incrementConnection(clientIP)
  
  logger.connection(`✅ Nuevo cliente WebSocket conectado desde IP: ${clientIP}`)
  logger.websocket(`Clientes conectados: ${clients.size + 1}`)
  clients.add(ws)

  // Manejar mensajes recibidos del cliente
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message)
      
      // Validar mensaje antes de procesar
      if (!validateWebSocketMessage(data)) {
        logger.warn(`❌ Mensaje inválido recibido desde IP ${clientIP}:`, data)
        ws.send(JSON.stringify({
          type: 'error',
          message: 'Invalid message format'
        }))
        return
      }
      
      logger.websocket(`📨 Mensaje recibido desde IP ${clientIP}: ${data.type}`)

      // Suscribir cliente a canales específicos
      if (data.type === 'subscribe') {
        // Validar canal usando middleware importado
        if (!isValidChannel(data.channel)) {
          logger.warn(`❌ Canal inválido solicitado: ${data.channel}`)
          ws.send(JSON.stringify({
            type: 'error',
            message: 'Invalid channel'
          }))
          return
        }
        
        logger.success(`✅ Cliente suscrito al canal: ${data.channel}`)
        ws.send(JSON.stringify({
          type: 'subscribed',
          channel: data.channel,
          timestamp: new Date().toISOString()
        }))
      }
    } catch (error) {
      logger.error(`❌ Error parseando mensaje desde IP ${clientIP}: ${error.message}`)
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Invalid JSON format'
      }))
    }
  })

  // Manejar desconexión de cliente
  ws.on('close', () => {
    logger.connection(`🔌 Cliente WebSocket desconectado - IP: ${clientIP}`)
    clients.delete(ws)  // Remover cliente de la lista
    
    // Decrementar contador usando middleware importado
    decrementConnection(clientIP)
    logger.websocket(`Clientes conectados: ${clients.size}`)
  })

  // Manejar errores de WebSocket
  ws.on('error', (error) => {
    logger.error(`❌ Error WebSocket - IP: ${clientIP}: ${error.message}`)
    clients.delete(ws)
    
    // Limpiar contador usando middleware importado
    decrementConnection(clientIP)
    logger.websocket(`Clientes conectados: ${clients.size}`)
  })
})

// Enviar mensaje a todos los clientes conectados
const broadcast = (data) => {
  // Función para enviar mensajes a todos los clientes conectados
  const message = JSON.stringify(data)
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message)
    }
  })
}

// Configurar logger para que envíe logs por WebSocket
logger.setBroadcastCallback(broadcast)

// Enviar logs de prueba cada 10 segundos para verificar conexión
setInterval(() => {
  logger.info(`🔄 Test log - Servidor activo - Clientes: ${clients.size}`)
  logger.websocket(`📊 WebSocket connections: ${clients.size}`)
}, 10000)

// Simular datos en tiempo real cada 2 segundos
const startDataSimulation = () => {
  logger.info('🔄 Iniciando ciclo de simulación de datos (intervalo: 2 segundos)')
  
  setInterval(async () => {
    try {
      // Crear métricas del sistema
      const metrics = new Metric({
        cpu: Math.random() * 100,
        memory: Math.random() * 100,
        disk: Math.random() * 100,
        network: Math.random() * 100,
        activeUsers: Math.floor(Math.random() * 1000),
        responseTime: Math.random() * 5000,
        errorRate: Math.random() * 10,
        throughput: Math.random() * 1000,
        timestamp: new Date()
      })
      await metrics.save()
      logger.debug(`💾 Nuevas métricas guardadas: CPU=${metrics.cpu.toFixed(1)}%, RAM=${metrics.memory.toFixed(1)}%`)

      // Enviar métricas a todos los clientes
      broadcast({
        type: 'metrics',
        payload: metrics
      })
      logger.websocket(`📊 Métricas broadcasteadas a ${clients.size} clientes`)

      // Actualizar datos de software existente
      const softwareList = await Software.find()
      for (const software of softwareList) {
        await Software.findByIdAndUpdate(software._id, {
          cpu: Math.random() * 100,
          memory: Math.random() * 100,
          users: Math.floor(Math.random() * 100),
          lastUpdate: new Date(),
          status: Math.random() > 0.9
            ? ['online', 'warning', 'offline'][Math.floor(Math.random() * 3)]
            : software.status
        })
      }
      logger.debug(`🔄 ${softwareList.length} aplicaciones actualizadas`)

      // Enviar actualización de software a todos los clientes
      const updatedSoftware = await Software.find()
      broadcast({
        type: 'software-update',
        payload: updatedSoftware
      })
      logger.websocket(`📦 Actualización de software broadcasteada`)
      
    } catch (error) {
      logger.error(`❌ Error en simulación de datos: ${error.message}`)
    }
  }, 2000) // Ejecutar cada 2 segundos
}

// API REST Endpoints con validación importada
logger.api('Configurando endpoints de API REST...')

// Middleware de logging para peticiones API
app.use('/api/', (req, res, next) => {
  logger.api(`📡 ${req.method} ${req.originalUrl} - IP: ${req.ip}`)
  next()
})

// Endpoint para obtener logs recientes
app.get('/api/logs', async (req, res) => {
  try {
    const { limit = 100 } = req.query
    const parsedLimit = Math.min(parseInt(limit) || 100, 500)
    
    // En este caso, devolvemos logs simulados ya que no estamos guardando logs en BD
    const mockLogs = [
      {
        timestamp: new Date().toISOString(),
        level: 'info',
        message: 'Sistema de logs activado'
      },
      {
        timestamp: new Date().toISOString(),
        level: 'success',
        message: 'Servidor funcionando correctamente'
      }
    ]
    
    res.json(mockLogs)
  } catch (error) {
    logger.error(`❌ Error obteniendo logs: ${error.message}`)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Obtener todos los software
app.get('/api/software', async (req, res) => {
  try {
    logger.api(`📋 Solicitando lista de software - Parámetros: ${JSON.stringify(req.query)}`)
    
    // Validar parámetros usando middleware importado
    const { limit, page } = validateQueryParams(req.query, { limit: 50, page: 1 })
    
    // Obtener software con paginación
    const software = await Software.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ lastUpdate: -1 })
    
    logger.api(`✅ Software listado: ${software.length} registros (página ${page})`)
    
    res.json({
      data: software,
      pagination: {
        page,
        limit,
        total: await Software.countDocuments()
      }
    })
  } catch (error) {
    logger.error(`❌ Error obteniendo software: ${error.message}`)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Obtener software específico
app.get('/api/software/:id', async (req, res) => {
  try {
    // Validar ObjectID
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid software ID format' })
    }
    
    const software = await Software.findById(req.params.id)
    if (!software) {
      return res.status(404).json({ error: 'Software not found' })
    }
    res.json(software)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Obtener métricas de software específico
app.get('/api/software/:id/metrics', async (req, res) => {
  try {
    // Validar ObjectID
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid software ID format' })
    }
    
    const software = await Software.findById(req.params.id)
    if (!software) {
      return res.status(404).json({ error: 'Software not found' })
    }
    
    res.json({
      cpu: software.cpu,
      memory: software.memory,
      users: software.users,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Reiniciar software (simulación)
app.post('/api/software/:id/restart', async (req, res) => {
  try {
    // Validar ObjectID
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid software ID format' })
    }
    
    const software = await Software.findById(req.params.id)
    if (!software) {
      return res.status(404).json({ error: 'Software not found' })
    }

    // Simular proceso de reinicio (5 segundos)
    setTimeout(async () => {
      await Software.findByIdAndUpdate(req.params.id, {
        status: 'online',
        lastRestart: new Date(),
        cpu: Math.random() * 50,
        memory: Math.random() * 50
      })
    }, 5000)

    res.json({ message: 'Restart initiated', status: 'restarting' })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Obtener últimas métricas del sistema
app.get('/api/metrics', async (req, res) => {
  try {
    // Validar parámetros de consulta
    const { limit = 10 } = req.query
    const parsedLimit = Math.min(parseInt(limit) || 10, 50) // Máximo 50 resultados
    
    const latest = await Metric.findOne().sort({ timestamp: -1 })
    if (!latest) {
      return res.json({ message: 'No metrics available' })
    }
    
    res.json(latest)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Servir aplicación React para cualquier ruta que no sea API
app.get('*', (req, res) => {
  // Servir aplicación React
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

// Iniciar servidor
server.listen(PORT, () => {
  logger.separator('SERVIDOR INICIADO EXITOSAMENTE')
  logger.success(`🚀 Servidor HTTP corriendo en: http://localhost:${PORT}`)
  logger.success(`🔌 Servidor WebSocket corriendo en: ws://localhost:${PORT}`)
  logger.info(`🌐 Dashboard disponible en: http://localhost:${PORT}`)
  
  // Iniciar simulación de datos
  logger.info('Iniciando simulación de datos en tiempo real...')
  startDataSimulation()
  logger.success('✅ Simulación de datos activada (actualización cada 2 segundos)')
  
  logger.separator('SISTEMA LISTO PARA USAR')
  logger.info('📊 Para probar la API: curl http://localhost:5000/api/software')
  logger.info('🖥️  Para ver el dashboard: abre http://localhost:3002 en tu navegador')
  logger.separator()
  
  // Enviar logs de inicio a clientes WebSocket conectados
  setTimeout(() => {
    logger.info('📢 Logs del servidor disponibles en terminal lateral')
    logger.websocket('🔌 Terminal de lista para recibir logs en tiempo real')
  }, 1000)
})

// Exportar para testing o uso en otros módulos
export { app, server, wss }
