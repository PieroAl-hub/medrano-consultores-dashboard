// Middleware de Seguridad - Exportación centralizada
// Archivo: server/middleware/index.js

// Rate Limiting
export { 
  generalLimiter, 
  apiLimiter, 
  strictLimiter 
} from './rateLimiter.js'

// Seguridad WebSocket
export { 
  wsConfig, 
  ipConnections, 
  validateWebSocketMessage, 
  getClientIP, 
  canConnect, 
  incrementConnection, 
  decrementConnection, 
  isValidChannel 
} from './websocketSecurity.js'

// Validación de Entrada
export { 
  isValidObjectId, 
  validateQueryParams, 
  validateRequestBody, 
  sanitizeString, 
  createValidationMiddleware, 
  validatePathParams 
} from './inputValidation.js'
