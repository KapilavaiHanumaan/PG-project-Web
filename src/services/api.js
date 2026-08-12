import axios from 'axios'

// Create Axios instance with base configuration
const api = axios.create({
  baseURL: 'https://api.pgtrust-hyderabad.com/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor: Attach Access Token
api.interceptors.request.use(
  (config) => {
    try {
      const storage = localStorage.getItem('pgtrust-auth-storage')
      if (storage) {
        const parsed = JSON.parse(storage)
        const token = parsed?.state?.tokens?.accessToken
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
    } catch (e) {
      console.warn('Error reading token from storage:', e)
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor: Auto Token Refresh & Error Handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        // Attempt simulated token refresh
        console.log('Simulating token auto-refresh...')
        const storage = localStorage.getItem('pgtrust-auth-storage')
        if (storage) {
          const parsed = JSON.parse(storage)
          if (parsed?.state?.tokens?.refreshToken) {
            parsed.state.tokens.accessToken = 'mock_refreshed_access_token_' + Date.now()
            localStorage.setItem('pgtrust-auth-storage', JSON.stringify(parsed))
            originalRequest.headers.Authorization = `Bearer ${parsed.state.tokens.accessToken}`
            return api(originalRequest)
          }
        }
      } catch (refreshErr) {
        console.error('Session expired, logging out', refreshErr)
      }
    }
    return Promise.reject(error)
  }
)

export default api
