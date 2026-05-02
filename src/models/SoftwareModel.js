export class SoftwareModel {
  constructor(data = {}) {
    this.id = data.id || null
    this.name = data.name || ''
    this.version = data.version || ''
    this.status = data.status || 'offline'
    this.lastUpdate = data.lastUpdate || new Date().toISOString()
    this.cpu = data.cpu || 0
    this.memory = data.memory || 0
    this.users = data.users || 0
    this.description = data.description || ''
    this.category = data.category || 'general'
    this.installDate = data.installDate || null
    this.lastRestart = data.lastRestart || null
    this.uptime = data.uptime || 0
    this.errorCount = data.errorCount || 0
    this.warningCount = data.warningCount || 0
    this.config = data.config || {}
    this.dependencies = data.dependencies || []
    this.endpoints = data.endpoints || []
    this.logs = data.logs || []
  }

  validate() {
    const errors = []
    
    if (!this.name || this.name.trim().length === 0) {
      errors.push('El nombre del software es requerido')
    }
    
    if (!this.version || this.version.trim().length === 0) {
      errors.push('La versión del software es requerida')
    }
    
    if (!['online', 'offline', 'warning', 'maintenance'].includes(this.status)) {
      errors.push('El estado del software no es válido')
    }
    
    if (this.cpu < 0 || this.cpu > 100) {
      errors.push('El uso de CPU debe estar entre 0 y 100')
    }
    
    if (this.memory < 0 || this.memory > 100) {
      errors.push('El uso de memoria debe estar entre 0 y 100')
    }
    
    if (this.users < 0) {
      errors.push('El número de usuarios no puede ser negativo')
    }
    
    return errors
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      version: this.version,
      status: this.status,
      lastUpdate: this.lastUpdate,
      cpu: this.cpu,
      memory: this.memory,
      users: this.users,
      description: this.description,
      category: this.category,
      installDate: this.installDate,
      lastRestart: this.lastRestart,
      uptime: this.uptime,
      errorCount: this.errorCount,
      warningCount: this.warningCount,
      config: this.config,
      dependencies: this.dependencies,
      endpoints: this.endpoints,
      logs: this.logs
    }
  }

  static fromJSON(json) {
    return new SoftwareModel(json)
  }

  updateMetrics(metrics) {
    this.cpu = metrics.cpu !== undefined ? metrics.cpu : this.cpu
    this.memory = metrics.memory !== undefined ? metrics.memory : this.memory
    this.users = metrics.users !== undefined ? metrics.users : this.users
    this.status = metrics.status !== undefined ? metrics.status : this.status
    this.lastUpdate = new Date().toISOString()
    
    if (metrics.errorCount !== undefined) {
      this.errorCount = metrics.errorCount
    }
    
    if (metrics.warningCount !== undefined) {
      this.warningCount = metrics.warningCount
    }
  }

  getStatusInfo() {
    const statusMap = {
      online: { label: 'En línea', color: 'green', icon: 'check-circle' },
      offline: { label: 'Fuera de línea', color: 'red', icon: 'x-circle' },
      warning: { label: 'Advertencia', color: 'yellow', icon: 'alert-triangle' },
      maintenance: { label: 'Mantenimiento', color: 'gray', icon: 'settings' }
    }
    
    return statusMap[this.status] || statusMap.offline
  }

  isHealthy() {
    return this.status === 'online' && 
           this.cpu < 80 && 
           this.memory < 80 && 
           this.errorCount === 0
  }

  getHealthScore() {
    let score = 100
    
    if (this.status !== 'online') score -= 30
    if (this.cpu > 80) score -= 25
    if (this.memory > 80) score -= 25
    if (this.errorCount > 0) score -= 20
    if (this.warningCount > 5) score -= 10
    
    return Math.max(0, score)
  }
}

export default SoftwareModel
