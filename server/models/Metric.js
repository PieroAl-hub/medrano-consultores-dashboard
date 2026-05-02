// Modelo de Métricas - Datos del sistema en tiempo real
// Define la estructura para métricas de rendimiento

import mongoose from 'mongoose'

// Esquema de métricas
const metricSchema = new mongoose.Schema({
  cpu: {
    type: Number,
    default: 0, // Uso de CPU en porcentaje (0-100)
    min: 0,
    max: 100
  },
  memory: {
    type: Number,
    default: 0, // Uso de memoria en porcentaje (0-100)
    min: 0,
    max: 100
  },
  disk: {
    type: Number,
    default: 0, // Uso de disco en porcentaje (0-100)
    min: 0,
    max: 100
  },
  network: {
    type: Number,
    default: 0, // Uso de red en porcentaje (0-100)
    min: 0,
    max: 100
  },
  activeUsers: {
    type: Number,
    default: 0, // Número de usuarios activos en el sistema
    min: 0
  },
  responseTime: {
    type: Number,
    default: 0, // Tiempo de respuesta promedio en milisegundos
    min: 0
  },
  errorRate: {
    type: Number,
    default: 0, // Tasa de error en porcentaje (0-100)
    min: 0,
    max: 100
  },
  throughput: {
    type: Number,
    default: 0, // Rendimiento: peticiones por segundo
    min: 0
  },
  timestamp: {
    type: Date,
    default: Date.now // Marca de tiempo de la medición
  }
}, { 
  timestamps: true // Agrega createdAt y updatedAt automáticamente
})

// Crear y exportar el modelo
export default mongoose.model('Metric', metricSchema)
