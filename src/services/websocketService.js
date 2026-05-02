// Servicio WebSocket Cliente - Conexión en tiempo real con el servidor
// Maneja la comunicación WebSocket entre frontend y backend

class WebSocketService {
  constructor() {
    this.ws = null // Instancia WebSocket
    this.listeners = new Map() // Mapa de event listeners
    this.reconnectAttempts = 0 // Contador de intentos de reconexión
    this.maxReconnectAttempts = 5 // Máximo de intentos permitidos
    this.reconnectInterval = 5000 // Intervalo entre reconexiones (ms)
    this.isConnecting = false // Estado de conexión actual
  }

  // Método de conexión - Establece conexión WebSocket con el servidor
  connect(url = import.meta.env.VITE_WS_URL) {
    // Evitar múltiples conexiones simultáneas
    if (this.isConnecting || (this.ws && this.ws.readyState === WebSocket.OPEN)) {
      return Promise.resolve()
    }

    this.isConnecting = true

    return new Promise((resolve, reject) => {
      try {
        // Crear nueva conexión WebSocket
        this.ws = new WebSocket(url)

        // Evento: Conexión exitosa
        this.ws.onopen = () => {
          console.log('WebSocket connected')
          this.isConnecting = false
          this.reconnectAttempts = 0
          this.emit('connected')
          resolve()
        }

        // Evento: Mensaje recibido
        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            this.emit('message', data)
            
            // Emitir evento específico según el tipo de mensaje
            if (data.type) {
              this.emit(data.type, data.payload)
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error)
          }
        }

        // Evento: Conexión cerrada
        this.ws.onclose = (event) => {
          console.log('WebSocket disconnected:', event.code, event.reason)
          this.isConnecting = false
          this.emit('disconnected')
          
          // Intentar reconexión si no fue una desconexión limpia
          if (!event.wasClean && this.reconnectAttempts < this.maxReconnectAttempts) {
            this.scheduleReconnect()
          }
        }

        // Evento: Error de conexión
        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error)
          this.isConnecting = false
          this.emit('error', error)
          reject(error)
        }
      } catch (error) {
        this.isConnecting = false
        reject(error)
      }
    })
  }

  // Métodos de control de conexión
  
  // Desconectar manualmente del servidor
  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.reconnectAttempts = this.maxReconnectAttempts
  }

  // Enviar mensaje al servidor
  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    } else {
      console.warn('WebSocket not connected, message not sent:', data)
    }
  }

  // Sistema de eventos
  
  // Suscribirse a un evento específico
  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event).add(callback)
  }

  // Desuscribirse de un evento
  unsubscribe(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback)
    }
  }

  // Emitir evento a todos los listeners
  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(data)
        } catch (error) {
          console.error(`Error in WebSocket event handler for ${event}:`, error)
        }
      })
    }
  }

  // Sistema de reconexión automática
  
  // Programar intento de reconexión
  scheduleReconnect() {
    this.reconnectAttempts++
    console.log(`Scheduling reconnect attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}`)
    
    setTimeout(() => {
      if (this.reconnectAttempts <= this.maxReconnectAttempts) {
        this.connect().catch(error => {
          console.error('Reconnect failed:', error)
        })
      }
    }, this.reconnectInterval * this.reconnectAttempts)
  }

  // Métodos de suscripción especializados
  
  // Suscribirse a métricas del sistema
  subscribeToMetrics(callback) {
    this.subscribe('metrics', callback)
    
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.send({ type: 'subscribe', channel: 'metrics' })
    }
  }

  // Suscribirse a actualizaciones de software
  subscribeToSoftwareUpdates(callback) {
    this.subscribe('software-update', callback)
    
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.send({ type: 'subscribe', channel: 'software-updates' })
    }
  }

  // Suscribirse a alertas
  subscribeToAlerts(callback) {
    this.subscribe('alert', callback)
    
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.send({ type: 'subscribe', channel: 'alerts' })
    }
  }

  // Desuscribirse de métricas
  unsubscribeFromMetrics(callback) {
    this.unsubscribe('metrics', callback)
    
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.send({ type: 'unsubscribe', channel: 'metrics' })
    }
  }

  // Métodos de utilidad
  
  // Verificar si está conectado
  isConnected() {
    return this.ws && this.ws.readyState === WebSocket.OPEN
  }

  // Obtener estado actual de la conexión
  getConnectionState() {
    if (!this.ws) return 'disconnected'
    
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING:
        return 'connecting'
      case WebSocket.OPEN:
        return 'connected'
      case WebSocket.CLOSING:
        return 'closing'
      case WebSocket.CLOSED:
        return 'disconnected'
      default:
        return 'unknown'
    }
  }
}

// Instancia global del servicio - Exportar una instancia única para usar en toda la aplicación
export const websocketService = new WebSocketService()
export default websocketService
