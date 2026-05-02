// Hook de Datos en Tiempo Real - Conexión React con WebSocket o Polling
// Detecta automáticamente si está en Vercel (usa polling) o local (usa WebSocket)

import { useState, useEffect, useCallback } from 'react'
import { websocketService } from '../services/websocketService'
import { pollingService } from '../services/pollingService'

// Detectar si estamos en Vercel
const isVercel = () => {
  return window.location.hostname.includes('vercel.app') || 
         import.meta.env.VITE_USE_POLLING === 'true'
}

export const useRealTimeData = () => {
  // Estados del hook
  const [latestData, setLatestData] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState(null)
  const [usePolling] = useState(() => isVercel())

  // Handlers de eventos
  const handleMetricsUpdate = useCallback((data) => {
    setLatestData(prevData => ({
      ...prevData,
      ...data,
      timestamp: new Date().toISOString()
    }))
  }, [])

  const handleConnectionChange = useCallback((connected) => {
    setIsConnected(connected)
    if (!connected) {
      setError('Conexion perdida')
    } else {
      setError(null)
    }
  }, [])

  // Efecto de conexion
  useEffect(() => {
    const service = usePolling ? pollingService : websocketService

    const connectService = async () => {
      try {
        await service.connect()
        
        service.subscribeToMetrics(handleMetricsUpdate)
        service.subscribe('connected', () => handleConnectionChange(true))
        service.subscribe('disconnected', () => handleConnectionChange(false))
        service.subscribe('error', (err) => setError(err.message || 'Error de conexion'))
      } catch (err) {
        console.error('Failed to connect:', err)
        setError('Error al conectar con el servidor')
      }
    }

    connectService()

    return () => {
      service.unsubscribeFromMetrics(handleMetricsUpdate)
      service.unsubscribe('connected', () => handleConnectionChange(true))
      service.unsubscribe('disconnected', () => handleConnectionChange(false))
      service.unsubscribe('error', (err) => setError(err.message))
      service.disconnect()
    }
  }, [handleMetricsUpdate, handleConnectionChange, usePolling])

  return {
    latestData,
    isConnected,
    error
  }
}

export default useRealTimeData
