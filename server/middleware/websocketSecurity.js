// Middleware de Seguridad para WebSocket - Protección contra ataques

// Configuración de límites de conexión
export const wsConfig = {
  MAX_CONNECTIONS_PER_IP: 5,
  validChannels: ['metrics', 'software-updates', 'alerts', 'logs'],
  MAX_MESSAGE_SIZE: 1024 * 10, // 10KB máximo por mensaje
}

// Map para rastrear conexiones por IP
export const ipConnections = new Map()

// Validación de entrada para mensajes WebSocket
export const validateWebSocketMessage = (data) => {
  if (!data || typeof data !== 'object') return false
  if (data.type && typeof data.type !== 'string') return false
  if (data.channel && typeof data.channel !== 'string') return false
  if (JSON.stringify(data).length > wsConfig.MAX_MESSAGE_SIZE) return false
  return true
}

// Obtener IP del cliente WebSocket 
export const getClientIP = (request) => {
  return request.socket.remoteAddress || 
         request.headers['x-forwarded-for']?.split(',')[0] || 
         'unknown'
}

// Verificar si una IP puede conectar
export const canConnect = (clientIP) => {
  const currentConnections = ipConnections.get(clientIP) || 0
  return currentConnections < wsConfig.MAX_CONNECTIONS_PER_IP
}

// Incrementar contador de conexiones por IP
export const incrementConnection = (clientIP) => {
  const currentConnections = ipConnections.get(clientIP) || 0
  ipConnections.set(clientIP, currentConnections + 1)
}

// Decrementar contador de conexiones por IP
export const decrementConnection = (clientIP) => {
  const currentConnections = ipConnections.get(clientIP) || 0
  if (currentConnections > 0) {
    ipConnections.set(clientIP, currentConnections - 1)
  }
}

// Validar canal de suscripción
export const isValidChannel = (channel) => {
  return wsConfig.validChannels.includes(channel)
}
