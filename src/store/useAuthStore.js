import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import api from '../services/api'

const initialMockUser = {
  id: 'usr_hyd_99',
  name: 'Chaitanya Kumar',
  email: 'chaitanya@pgtrust.com',
  mobile: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  verified: true,
  role: 'working_professional', // default pre-loaded role for demo or null
  gender: 'Male',
  dob: '1998-05-15',
  city: 'Hyderabad',
  occupation: 'Senior Software Engineer',
  company: 'Microsoft Hyderabad',
  budget: '12000-18000',
  preferredLocations: ['Gachibowli', 'HITECH City', 'Kondapur'],
  foodPref: 'North & South Indian',
  roomType: 'Single Sharing',
  points: 1250,
  savedPGsCount: 4,
  reviewsCount: 3,
  walletBalance: 850,
}

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      role: null,
      tokens: null,
      authStatus: 'unauthenticated', // 'authenticated' | 'unauthenticated' | 'loading'
      onboardingStep: 'signup', // 'signup' | 'otp' | 'role' | 'profile' | 'completed'
      pendingRegistration: null,

      // Actions
      login: async (email, password) => {
        set({ authStatus: 'loading' })
        
        if (email.toLowerCase() === 'error@pgtrust.com') {
          set({ authStatus: 'unauthenticated' })
          throw new Error('Invalid credentials. Please verify your email and password.')
        }

        try {
          const res = await api.post('/auth/login', { email, password })
          if (res.data && res.data.data) {
            const backendData = res.data.data
            const user = {
              ...initialMockUser,
              ...(backendData.user || {}),
              email: backendData.user?.email || email,
            }
            const tokens = {
              accessToken: backendData.token || backendData.accessToken || ('jwt_token_' + Date.now()),
              refreshToken: backendData.refreshToken || ('jwt_refresh_' + Date.now()),
              expiresAt: Date.now() + 3600 * 1000,
            }
            set({
              user,
              role: user.role || 'working_professional',
              tokens,
              authStatus: 'authenticated',
              onboardingStep: 'completed',
            })
            return user
          }
        } catch (apiErr) {
          console.warn('Backend API connection unavailable, utilizing fallback auth mode:', apiErr)
        }

        // Latency simulation fallback
        await new Promise((res) => setTimeout(res, 600))

        const user = {
          ...initialMockUser,
          email,
          name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        }

        const tokens = {
          accessToken: 'jwt_access_token_' + Date.now(),
          refreshToken: 'jwt_refresh_token_' + Date.now(),
          expiresAt: Date.now() + 3600 * 1000,
        }

        set({
          user,
          role: user.role,
          tokens,
          authStatus: 'authenticated',
          onboardingStep: 'completed',
        })

        return user
      },

      register: async (userData) => {
        set({ authStatus: 'loading' })
        await new Promise((res) => setTimeout(res, 800))

        const pendingUser = {
          name: userData.fullName,
          email: userData.email,
          mobile: userData.mobile,
          verified: false,
        }

        set({
          pendingRegistration: pendingUser,
          authStatus: 'unauthenticated',
          onboardingStep: 'otp',
        })

        return pendingUser
      },

      verifyOtp: async (otp) => {
        set({ authStatus: 'loading' })
        await new Promise((res) => setTimeout(res, 800))

        if (otp !== '123456' && otp.length === 6) {
          // Allow any 6 digits in demo, but throw if explicitly invalid pattern
        }

        const pending = get().pendingRegistration || {
          name: 'New PG Explorer',
          email: 'user@pgtrust.com',
          mobile: '+91 99887 76655',
        }

        const user = {
          ...initialMockUser,
          id: 'usr_' + Date.now(),
          name: pending.name,
          email: pending.email,
          mobile: pending.mobile,
          verified: true,
          role: null,
        }

        const tokens = {
          accessToken: 'mock_access_token_' + Date.now(),
          refreshToken: 'mock_refresh_token_' + Date.now(),
          expiresAt: Date.now() + 3600 * 1000,
        }

        set({
          user,
          role: null,
          tokens,
          authStatus: 'authenticated',
          onboardingStep: 'role',
        })

        return user
      },

      setRole: async (role) => {
        set({ authStatus: 'loading' })
        await new Promise((res) => setTimeout(res, 500))

        const currentUser = get().user || initialMockUser

        set({
          user: { ...currentUser, role },
          role,
          authStatus: 'authenticated',
          onboardingStep: 'profile',
        })
      },

      completeProfile: async (profileData) => {
        set({ authStatus: 'loading' })
        await new Promise((res) => setTimeout(res, 800))

        const currentUser = get().user || initialMockUser

        const updatedUser = {
          ...currentUser,
          ...profileData,
        }

        set({
          user: updatedUser,
          authStatus: 'authenticated',
          onboardingStep: 'completed',
        })

        return updatedUser
      },

      logout: () => {
        set({
          user: null,
          role: null,
          tokens: null,
          authStatus: 'unauthenticated',
          onboardingStep: 'signup',
          pendingRegistration: null,
        })
      },

      quickDemoLogin: (role = 'working_professional') => {
        const demoUser = {
          ...initialMockUser,
          role,
        }
        set({
          user: demoUser,
          role,
          tokens: {
            accessToken: 'mock_demo_access_token',
            refreshToken: 'mock_demo_refresh_token',
            expiresAt: Date.now() + 3600 * 1000,
          },
          authStatus: 'authenticated',
          onboardingStep: 'completed',
        })
      },

      updateProfile: (profileFields) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...profileFields } : null,
        }))
      },

      updateRole: (newRole) => {
        set((state) => ({
          role: newRole,
          user: state.user ? { ...state.user, role: newRole } : null,
        }))
      },
    }),
    {
      name: 'pgtrust-auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
