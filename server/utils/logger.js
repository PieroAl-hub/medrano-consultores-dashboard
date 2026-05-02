// Sistema de Logging - Medrano Consultores Dashboard
// Archivo: server/utils/logger.js

class Logger {
  constructor() {
    this.logLevel = process.env.LOG_LEVEL || 'info'
    this.colors = {
      reset: '\x1b[0m',
      bright: '\x1b[1m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m'
    }
    this.broadcastCallback = null
  }

  // Método para establecer callback de broadcast WebSocket
  setBroadcastCallback(callback) {
    this.broadcastCallback = callback
  }

  // Enviar log por WebSocket
  broadcastLog(level, message) {
    if (this.broadcastCallback) {
      this.broadcastCallback({
        type: 'log',
        payload: {
          timestamp: new Date().toISOString(),
          level,
          message
        }
      })
    }
  }

  // Obtener timestamp formateado
  getTimestamp() {
    return new Date().toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  // Formatear mensaje con color y timestamp
  formatMessage(level, message, color = this.colors.reset) {
    const timestamp = this.getTimestamp()
    const prefix = `${this.colors.cyan}[${timestamp}]${this.colors.reset} ${color}[${level.toUpperCase()}]${this.colors.reset}`
    return `${prefix} ${message}`
  }

  // Log de información
  info(message) {
    console.log(this.formatMessage('info', message, this.colors.green))
    this.broadcastLog('info', message)
  }

  // Log de éxito
  success(message) {
    console.log(this.formatMessage('success', message, this.colors.green))
    this.broadcastLog('success', message)
  }

  // Log de advertencia
  warn(message) {
    console.warn(this.formatMessage('warn', message, this.colors.yellow))
    this.broadcastLog('warn', message)
  }

  // Log de error
  error(message) {
    console.error(this.formatMessage('error', message, this.colors.red))
    this.broadcastLog('error', message)
  }

  // Log de depuración
  debug(message) {
    if (this.logLevel === 'debug') {
      console.log(this.formatMessage('debug', message, this.colors.magenta))
      this.broadcastLog('debug', message)
    }
  }

  // Log de conexión
  connection(message) {
    console.log(this.formatMessage('connection', message, this.colors.blue))
    this.broadcastLog('connection', message)
  }

  // Log de API
  api(message) {
    console.log(this.formatMessage('api', message, this.colors.cyan))
    this.broadcastLog('api', message)
  }

  // Log de WebSocket
  websocket(message) {
    console.log(this.formatMessage('websocket', message, this.colors.magenta))
    this.broadcastLog('websocket', message)
  }

  // Log de seguridad
  security(message) {
    console.warn(this.formatMessage('security', message, this.colors.red))
    this.broadcastLog('security', message)
  }

  // Log de base de datos
  database(message) {
    console.log(this.formatMessage('database', message, this.colors.blue))
    this.broadcastLog('database', message)
  }

  // Separador visual
  separator(title = '') {
    const line = '='.repeat(60)
    if (title) {
      console.log(`${this.colors.cyan}${line}${this.colors.reset}`)
      console.log(`${this.colors.bright}${this.colors.cyan}  ${title}${this.colors.reset}`)
      console.log(`${this.colors.cyan}${line}${this.colors.reset}`)
    } else {
      console.log(this.colors.cyan + line + this.colors.reset)
    }
  }
}

// Exportar instancia única del logger
export const logger = new Logger()
export default logger
