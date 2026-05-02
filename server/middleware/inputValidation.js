// Middleware de Validación de Entrada - Protección contra inyección de datos

// Validación de ObjectID de MongoDB
export const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id)
}

// Validación y sanitización de parámetros de consulta
export const validateQueryParams = (query, defaults = {}) => {
  const { limit = defaults.limit || 50, page = defaults.page || 1 } = query
  
  return {
    limit: Math.min(Math.max(parseInt(limit) || 1, 1), 100), // Entre 1 y 100
    page: Math.max(parseInt(page) || 1, 1) // Mínimo 1
  }
}

// Validación de cuerpo de petición
export const validateRequestBody = (body, requiredFields = []) => {
  const errors = []
  
  if (!body || typeof body !== 'object') {
    errors.push('Invalid request body format')
    return { isValid: false, errors }
  }
  
  for (const field of requiredFields) {
    if (!(field in body)) {
      errors.push(`Missing required field: ${field}`)
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Sanitización de strings para prevenir XSS
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return str
  
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
}

// Middleware de validación para endpoints específicos
export const createValidationMiddleware = (schema) => {
  return (req, res, next) => {
    const { isValid, errors } = validateRequestBody(req.body, schema.required || [])
    
    if (!isValid) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors
      })
    }
    
    next()
  }
}

// Middleware de validación para parámetros de ruta
export const validatePathParams = (paramName, validator) => {
  return (req, res, next) => {
    const value = req.params[paramName]
    
    if (!validator(value)) {
      return res.status(400).json({
        error: `Invalid ${paramName} format`
      })
    }
    
    next()
  }
}
