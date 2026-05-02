// Modelo de Software - Aplicaciones monitoreadas
// Define la estructura de datos para cada aplicación

import mongoose from 'mongoose'

// Esquema de software
const softwareSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // Nombre del software (obligatorio)
  },
  version: String, // Versión del software (opcional)
  status: {
    type: String,
    enum: ['online', 'offline', 'warning'], // Estados posibles
    default: 'online' // Estado por defecto
  },
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
  users: {
    type: Number,
    default: 0, // Número de usuarios activos
    min: 0
  },
  lastUpdate: {
    type: Date,
    default: Date.now // Última actualización de datos
  },
  lastRestart: Date // Fecha del último reinicio (opcional)
}, { 
  timestamps: true // Agrega createdAt y updatedAt automáticamente
})

// Crear y exportar el modelo
export default mongoose.model('Software', softwareSchema)
