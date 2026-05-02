// Serverless handler principal para Vercel
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from '../server/config/db.js'
import Software from '../server/models/Software.js'
import Metric from '../server/models/Metric.js'

dotenv.config()

// Conectar a DB (cacheado en serverless)
let isConnected = false
const connectToDatabase = async () => {
  if (isConnected) return
  await connectDB()
  isConnected = true
}

const app = express()

app.use(cors())
app.use(express.json({ limit: '10mb' }))

// Health check
app.get('/api', (req, res) => {
  res.json({ message: 'API funcionando', timestamp: new Date().toISOString() })
})

// GET /api/software - Lista de software
app.get('/api/software', async (req, res) => {
  try {
    await connectToDatabase()
    const limit = Math.min(parseInt(req.query.limit) || 50, 100)
    const page = parseInt(req.query.page) || 1
    
    const software = await Software.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ lastUpdate: -1 })
    
    const total = await Software.countDocuments()
    
    res.json({
      data: software,
      pagination: { page, limit, total }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/software/:id - Software específico
app.get('/api/software/:id', async (req, res) => {
  try {
    await connectToDatabase()
    const software = await Software.findById(req.params.id)
    if (!software) return res.status(404).json({ error: 'Not found' })
    res.json(software)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/software/:id/metrics - Métricas de software
app.get('/api/software/:id/metrics', async (req, res) => {
  try {
    await connectToDatabase()
    const software = await Software.findById(req.params.id)
    if (!software) return res.status(404).json({ error: 'Not found' })
    
    res.json({
      cpu: software.cpu,
      memory: software.memory,
      users: software.users,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST /api/software/:id/restart - Reiniciar software
app.post('/api/software/:id/restart', async (req, res) => {
  try {
    await connectToDatabase()
    const software = await Software.findById(req.params.id)
    if (!software) return res.status(404).json({ error: 'Not found' })

    // Simular reinicio
    await Software.findByIdAndUpdate(req.params.id, {
      status: 'restarting',
      lastRestart: new Date()
    })

    res.json({ message: 'Restart initiated', status: 'restarting' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/metrics - Métricas del sistema
app.get('/api/metrics', async (req, res) => {
  try {
    await connectToDatabase()
    const latest = await Metric.findOne().sort({ timestamp: -1 })
    if (!latest) return res.json({ message: 'No metrics available' })
    res.json(latest)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/metrics/history - Historial de métricas (para polling)
app.get('/api/metrics/history', async (req, res) => {
  try {
    await connectToDatabase()
    const limit = Math.min(parseInt(req.query.limit) || 20, 50)
    
    const metrics = await Metric.find()
      .sort({ timestamp: -1 })
      .limit(limit)
    
    res.json({
      data: metrics.reverse(),
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// GET /api/logs - Logs del sistema
app.get('/api/logs', async (req, res) => {
  res.json([
    { timestamp: new Date().toISOString(), level: 'info', message: 'Sistema activo (Vercel Serverless)' },
    { timestamp: new Date().toISOString(), level: 'success', message: 'API funcionando correctamente' }
  ])
})

// Exportar handler para Vercel
export default app
