// Servicio de Polling HTTP - Reemplazo de WebSocket para Vercel
// Obtiene datos en tiempo real usando HTTP polling en lugar de WebSocket

class PollingService {
  constructor() {
    this.subscribers = {
      metrics: [],
      software: [],
      connected: [],
      disconnected: [],
      error: []
    }
    this.intervalId = null
    this.isPolling = false
    this.apiUrl = import.meta.env.VITE_API_URL || ''
  }

  // Obtener URL base de la API
  getBaseUrl() {
    return this.apiUrl || ''
  }

  // Iniciar polling
  startPolling(interval = 2000) {
    if (this.isPolling) return
    
    this.isPolling = true
    this.notify('connected', true)
    
    this.intervalId = setInterval(() => this.fetchData(), interval)
    
    // Fetch inicial
    this.fetchData()
  }

  // Detener polling
  stopPolling() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
    this.isPolling = false
    this.notify('disconnected', true)
  }

  // Obtener datos de la API
  async fetchData() {
    try {
      // Obtener métricas
      const metricsRes = await fetch(`${this.getBaseUrl()}/api/metrics`)
      if (metricsRes.ok) {
        const metrics = await metricsRes.json()
        this.notify('metrics', { type: 'metrics', payload: metrics })
      }

      // Obtener software
      const softwareRes = await fetch(`${this.getBaseUrl()}/api/software`)
      if (softwareRes.ok) {
        const software = await softwareRes.json()
        this.notify('software-update', { type: 'software-update', payload: software.data || [] })
      }
    } catch (error) {
      this.notify('error', { message: error.message })
    }
  }

  // Suscribirse a eventos
  subscribe(event, callback) {
    if (this.subscribers[event]) {
      this.subscribers[event].push(callback)
    }
  }

  // Desuscribirse
  unsubscribe(event, callback) {
    if (this.subscribers[event]) {
      this.subscribers[event] = this.subscribers[event].filter(cb => cb !== callback)
    }
  }

  // Suscribirse a métricas (API compatible con WebSocket)
  subscribeToMetrics(callback) {
    this.subscribe('metrics', callback)
  }

  unsubscribeFromMetrics(callback) {
    this.unsubscribe('metrics', callback)
  }

  // Notificar a suscriptores
  notify(event, data) {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach(callback => {
        try {
          callback(data)
        } catch (error) {
          console.error('Error en callback de polling:', error)
        }
      })
    }
  }

  // Simular conexión (API compatible)
  async connect() {
    this.startPolling(2000)
    return Promise.resolve()
  }

  disconnect() {
    this.stopPolling()
  }
}

// Exportar singleton
export const pollingService = new PollingService()
export default pollingService
