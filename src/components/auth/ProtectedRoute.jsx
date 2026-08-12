import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'

export default function ProtectedRoute({ children }) {
  const { authStatus, onboardingStep, user } = useAuthStore()
  const location = useLocation()

  if (authStatus === 'loading') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (authStatus !== 'authenticated' || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Redirect to incomplete onboarding step if not finished
  if (onboardingStep === 'otp') {
    return <Navigate to="/verify-otp" replace />
  }
  if (onboardingStep === 'role') {
    return <Navigate to="/select-role" replace />
  }
  if (onboardingStep === 'profile') {
    return <Navigate to="/complete-profile" replace />
  }

  return children
}
