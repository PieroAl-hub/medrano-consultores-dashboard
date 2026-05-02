import axios from 'axios'

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.setupInterceptors()
  }

  setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.client.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  async get(url, config = {}) {
    try {
      const response = await this.client.get(url, config)
      return response
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  async post(url, data = {}, config = {}) {
    try {
      const response = await this.client.post(url, data, config)
      return response
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  async put(url, data = {}, config = {}) {
    try {
      const response = await this.client.put(url, data, config)
      return response
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  async patch(url, data = {}, config = {}) {
    try {
      const response = await this.client.patch(url, data, config)
      return response
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  async delete(url, config = {}) {
    try {
      const response = await this.client.delete(url, config)
      return response
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  handleError(error) {
    if (error.response) {
      console.error('API Error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url
      })
    } else if (error.request) {
      console.error('Network Error:', error.message)
    } else {
      console.error('Request Error:', error.message)
    }
  }

  setAuthToken(token) {
    localStorage.setItem('authToken', token)
  }

  removeAuthToken() {
    localStorage.removeItem('authToken')
  }

  getAuthToken() {
    return localStorage.getItem('authToken')
  }

  updateBaseURL(baseURL) {
    this.client.defaults.baseURL = baseURL
  }

  createFormDataEndpoint() {
    const formDataClient = axios.create({
      baseURL: this.client.defaults.baseURL,
      timeout: this.client.defaults.timeout,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    formDataClient.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    return formDataClient
  }
}

export const apiService = new ApiService()
export default apiService
