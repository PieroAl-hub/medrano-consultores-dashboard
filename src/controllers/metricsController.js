import { apiService } from '../services/apiService'

class MetricsController {
  async getSystemMetrics() {
    try {
      const response = await apiService.get('/api/metrics/system')
      return response.data
    } catch (error) {
      console.error('Error fetching system metrics:', error)
      throw error
    }
  }

  async getRealTimeMetrics() {
    try {
      const response = await apiService.get('/api/metrics/realtime')
      return response.data
    } catch (error) {
      console.error('Error fetching real-time metrics:', error)
      throw error
    }
  }

  async getHistoricalMetrics(params = {}) {
    try {
      const response = await apiService.get('/api/metrics/historical', { params })
      return response.data
    } catch (error) {
      console.error('Error fetching historical metrics:', error)
      throw error
    }
  }

  async getSoftwareMetrics(softwareId, timeRange = '24h') {
    try {
      const response = await apiService.get(`/api/metrics/software/${softwareId}`, {
        params: { timeRange }
      })
      return response.data
    } catch (error) {
      console.error(`Error fetching software metrics for ${softwareId}:`, error)
      throw error
    }
  }

  async getPerformanceMetrics(timeRange = '1h') {
    try {
      const response = await apiService.get('/api/metrics/performance', {
        params: { timeRange }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching performance metrics:', error)
      throw error
    }
  }

  async getUserMetrics(timeRange = '24h') {
    try {
      const response = await apiService.get('/api/metrics/users', {
        params: { timeRange }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching user metrics:', error)
      throw error
    }
  }

  async getAlertMetrics(severity = 'all') {
    try {
      const response = await apiService.get('/api/metrics/alerts', {
        params: { severity }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching alert metrics:', error)
      throw error
    }
  }

  async exportMetrics(format = 'json', filters = {}) {
    try {
      const response = await apiService.get('/api/metrics/export', {
        params: { format, ...filters },
        responseType: format === 'csv' ? 'blob' : 'json'
      })
      return response.data
    } catch (error) {
      console.error('Error exporting metrics:', error)
      throw error
    }
  }
}

export default new MetricsController()
