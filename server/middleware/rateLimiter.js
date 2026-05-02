// Middleware de Rate Limiting - Protección contra DDoS
import rateLimit from 'express-rate-limit'

// Rate limiting general para todo el servidor
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 peticiones por IP
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
})

// Rate limiting específico para endpoints de API
export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 30, // límite de 30 peticiones por IP a la API
  message: {
    error: 'Too many API requests from this IP, please try again later.'
  }
})

// Rate limiting estricto para endpoints críticos
export const strictLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutos
  max: 10, // límite de 10 peticiones por IP
  message: {
    error: 'Rate limit exceeded for critical endpoint, please try again later.'
  }
})
