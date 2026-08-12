import api from './api'

export const authService = {
  login: async (credentials) => {
    // In production, returns api.post('/auth/login', credentials)
    return { data: { success: true, message: 'Logged in successfully' } }
  },

  register: async (userData) => {
    // In production, returns api.post('/auth/register', userData)
    return { data: { success: true, message: 'OTP sent to mobile & email' } }
  },

  sendOtp: async (mobileOrEmail) => {
    // In production, returns api.post('/auth/send-otp', { mobileOrEmail })
    return { data: { success: true, message: 'OTP re-sent successfully' } }
  },

  verifyOtp: async (otp) => {
    // In production, returns api.post('/auth/verify-otp', { otp })
    return { data: { success: true, message: 'Account verified successfully' } }
  },

  updateRole: async (role) => {
    // In production, returns api.patch('/user/role', { role })
    return { data: { success: true, role } }
  },

  completeProfile: async (profileData) => {
    // In production, returns api.post('/user/profile', profileData)
    return { data: { success: true, profile: profileData } }
  },

  resetPassword: async (email) => {
    // In production, returns api.post('/auth/forgot-password', { email })
    return { data: { success: true, message: 'Password reset link dispatched' } }
  },
}
