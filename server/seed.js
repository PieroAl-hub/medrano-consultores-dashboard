require('dotenv').config()
const connectDB = require('./config/db')
const Software = require('./models/Software')

const sampleSoftware = [
  { name: 'CRM System', version: '2.1.0', status: 'online', cpu: 45, memory: 60, users: 25 },
  { name: 'ERP Module', version: '1.5.2', status: 'online', cpu: 30, memory: 45, users: 15 },
  { name: 'Analytics Engine', version: '3.0.1', status: 'warning', cpu: 85, memory: 70, users: 8 },
  { name: 'API Gateway', version: '2.2.0', status: 'online', cpu: 25, memory: 30, users: 120 },
  { name: 'Auth Service', version: '1.0.5', status: 'offline', cpu: 0, memory: 0, users: 0 }
]

const seedDB = async () => {
  try {
    await connectDB()
    await Software.deleteMany({})
    await Software.insertMany(sampleSoftware)
    console.log('Database seeded successfully')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDB()
