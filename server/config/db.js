// Configuración de base de datos - MongoDB Atlas
// Conexión con MongoDB usando Mongoose

import mongoose from 'mongoose'

// Función para conectar a la base de datos
const connectDB = async () => {
  try {
    // Determinar URI de conexión
    const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/medrano-dashboard'
    const isAtlas = dbURI.includes('mongodb+srv')
    
    console.log(`🔌 Conectando a MongoDB (${isAtlas ? 'Atlas' : 'Local'})...`)
    
    // Conectar usando URI del entorno o localhost como fallback
    const conn = await mongoose.connect(dbURI)
    
    console.log(`✅ MongoDB Conectado exitosamente`)
    console.log(`📍 Host: ${conn.connection.host}`)
    console.log(`🗄️  Base de datos: ${conn.connection.name}`)
    console.log(`🌐 Puerto: ${conn.connection.port}`)
    
    // Mostrar información adicional si es Atlas
    if (isAtlas) {
      console.log(`☁️  Conectado a MongoDB Atlas`)
    }
    
  } catch (error) {
    console.error(`❌ Error de conexión a MongoDB: ${error.message}`)
    console.error(`🔧 Verifica que MongoDB esté corriendo o la URI de conexión sea correcta`)
    process.exit(1) // Terminar aplicación si no hay conexión
  }
}

export default connectDB
