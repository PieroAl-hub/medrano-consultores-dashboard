import { apiService } from '../services/apiService'

class SoftwareController {
  async getAllSoftware() {
    try {
      const response = await apiService.get('/api/software')
      return response.data
    } catch (error) {
      console.error('Error fetching software:', error)
      throw error
    }
  }

  async getSoftwareById(id) {
    try {
      const response = await apiService.get(`/api/software/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching software ${id}:`, error)
      throw error
    }
  }

  async createSoftware(data) {
    try {
      const response = await apiService.post('/api/software', data)
      return response.data
    } catch (error) {
      console.error('Error creating software:', error)
      throw error
    }
  }

  async updateSoftware(id, data) {
    try {
      const response = await apiService.put(`/api/software/${id}`, data)
      return response.data
    } catch (error) {
      console.error(`Error updating software ${id}:`, error)
      throw error
    }
  }

  async deleteSoftware(id) {
    try {
      const response = await apiService.delete(`/api/software/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error deleting software ${id}:`, error)
      throw error
    }
  }

  async getSoftwareMetrics(id) {
    try {
      const response = await apiService.get(`/api/software/${id}/metrics`)
      return response.data
    } catch (error) {
      console.error(`Error fetching software metrics ${id}:`, error)
      throw error
    }
  }

  async restartSoftware(id) {
    try {
      const response = await apiService.post(`/api/software/${id}/restart`)
      return response.data
    } catch (error) {
      console.error(`Error restarting software ${id}:`, error)
      throw error
    }
  }
}

export default new SoftwareController()
