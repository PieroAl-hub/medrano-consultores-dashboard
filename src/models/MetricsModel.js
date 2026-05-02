export class MetricsModel {
  constructor(data = {}) {
    this.timestamp = data.timestamp || new Date().toISOString()
    this.cpu = data.cpu || 0
    this.memory = data.memory || 0
    this.disk = data.disk || 0
    this.network = data.network || 0
    this.activeUsers = data.activeUsers || 0
    this.responseTime = data.responseTime || 0
    this.errorRate = data.errorRate || 0
    this.throughput = data.throughput || 0
    this.softwareId = data.softwareId || null
    this.serverId = data.serverId || null
    this.type = data.type || 'system'
    this.unit = data.unit || 'percentage'
    this.source = data.source || 'system'
  }

  validate() {
    const errors = []
    
    if (this.cpu < 0 || this.cpu > 100) {
      errors.push('El valor de CPU debe estar entre 0 y 100')
    }
    
    if (this.memory < 0 || this.memory > 100) {
      errors.push('El valor de memoria debe estar entre 0 y 100')
    }
    
    if (this.disk < 0 || this.disk > 100) {
      errors.push('El valor de disco debe estar entre 0 y 100')
    }
    
    if (this.activeUsers < 0) {
      errors.push('El número de usuarios activos no puede ser negativo')
    }
    
    if (this.responseTime < 0) {
      errors.push('El tiempo de respuesta no puede ser negativo')
    }
    
    if (this.errorRate < 0 || this.errorRate > 100) {
      errors.push('La tasa de error debe estar entre 0 y 100')
    }
    
    return errors
  }

  toJSON() {
    return {
      timestamp: this.timestamp,
      cpu: this.cpu,
      memory: this.memory,
      disk: this.disk,
      network: this.network,
      activeUsers: this.activeUsers,
      responseTime: this.responseTime,
      errorRate: this.errorRate,
      throughput: this.throughput,
      softwareId: this.softwareId,
      serverId: this.serverId,
      type: this.type,
      unit: this.unit,
      source: this.source
    }
  }

  static fromJSON(json) {
    return new MetricsModel(json)
  }

  static createSystemMetrics(data) {
    return new MetricsModel({
      ...data,
      type: 'system',
      source: 'system-monitor'
    })
  }

  static createSoftwareMetrics(softwareId, data) {
    return new MetricsModel({
      ...data,
      softwareId,
      type: 'software',
      source: 'software-monitor'
    })
  }

  static createPerformanceMetrics(data) {
    return new MetricsModel({
      ...data,
      type: 'performance',
      source: 'performance-monitor'
    })
  }

  static createUserMetrics(data) {
    return new MetricsModel({
      ...data,
      type: 'users',
      source: 'user-tracker'
    })
  }

  getHealthStatus() {
    if (this.errorRate > 10) return 'critical'
    if (this.cpu > 90 || this.memory > 90) return 'warning'
    if (this.responseTime > 5000) return 'warning'
    if (this.errorRate > 5) return 'warning'
    return 'healthy'
  }

  getPerformanceScore() {
    let score = 100
    
    if (this.cpu > 80) score -= (this.cpu - 80) * 2
    if (this.memory > 80) score -= (this.memory - 80) * 2
    if (this.errorRate > 0) score -= this.errorRate * 5
    if (this.responseTime > 1000) score -= (this.responseTime - 1000) / 100
    
    return Math.max(0, Math.min(100, score))
  }

  isAnomaly(baselineMetrics) {
    if (!baselineMetrics) return false
    
    const cpuDiff = Math.abs(this.cpu - baselineMetrics.cpu)
    const memoryDiff = Math.abs(this.memory - baselineMetrics.memory)
    const responseDiff = Math.abs(this.responseTime - baselineMetrics.responseTime)
    
    return cpuDiff > 30 || memoryDiff > 30 || responseDiff > 2000
  }

  getTrend(previousMetrics) {
    if (!previousMetrics) return 'stable'
    
    const cpuChange = this.cpu - previousMetrics.cpu
    const memoryChange = this.memory - previousMetrics.memory
    const responseChange = this.responseTime - previousMetrics.responseTime
    
    const totalChange = Math.abs(cpuChange) + Math.abs(memoryChange) + Math.abs(responseChange / 100)
    
    if (totalChange > 20) return cpuChange > 0 ? 'increasing' : 'decreasing'
    return 'stable'
  }
}

export default MetricsModel
