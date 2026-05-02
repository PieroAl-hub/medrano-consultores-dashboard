// Hook de Datos en Tiempo Real - Conexión React con WebSocket
// Hook personalizado para gestionar datos en tiempo real en componentes React

import { useState, useEffect, useCallback } from 'react'
import { websocketService } from '../services/websocketService'

export const useRealTimeData = () => {
  // Estados del hook
  const [latestData, setLatestData] = useState(null) // Últimos datos recibidos
  const [isConnected, setIsConnected] = useState(false) // Estado de conexión
  const [error, setError] = useState(null) // Errores de conexión

  // Handlers de eventos
  
  // Manejar actualizaciones de métricas
  const handleMetricsUpdate = useCallback((data) => {
    setLatestData(prevData => ({
      ...prevData,
      ...data,
      timestamp: new Date().toISOString() // Agregar timestamp local
    }))
  }, [])

  // Manejar cambios de estado de conexión
  const handleConnectionChange = useCallback((connected) => {
    setIsConnected(connected)
    if (!connected) {
      setError('Conexión perdida')
    } else {
      setError(null)
    }
  }, [])

  // Efecto de conexión automática - Se ejecuta al montar el componente
  useEffect(() => {
    const connectWebSocket = async () => {
      try {
        // 1. Conectar al servidor WebSocket
        await websocketService.connect()
        
        // 2. Suscribirse a eventos específicos
        websocketService.subscribeToMetrics(handleMetricsUpdate)
        websocketService.subscribe('connected', () => handleConnectionChange(true))
        websocketService.subscribe('disconnected', () => handleConnectionChange(false))
        websocketService.subscribe('error', (error) => setError(error.message))
      } catch (error) {
        console.error('Failed to connect WebSocket:', error)
        setError('Error al conectar con el servidor')
      }
    }

    // Iniciar conexión
    connectWebSocket()

    // Limpieza al desmontar componente - Se ejecuta al desmontar el componente para limpiar suscripciones
    return () => {
      websocketService.unsubscribeFromMetrics(handleMetricsUpdate)
      websocketService.unsubscribe('connected', () => handleConnectionChange(true))
      websocketService.unsubscribe('disconnected', () => handleConnectionChange(false))
      websocketService.unsubscribe('error', (error) => setError(error.message))
    }
  }, [handleMetricsUpdate, handleConnectionChange])

  // Retorno del hook - Proporciona acceso a los datos y estado de conexión a los componentes
  return {
    latestData, // Últimos datos recibidos del servidor
    isConnected, // Estado actual de la conexión
    error // Mensajes de error si los hay
  }
}

// Exportación por defecto - Permite importar el hook con nombre diferente si se desea
export default useRealTimeData
