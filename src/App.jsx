import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ToastContainer from './components/common/ToastContainer'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Public Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'

// Onboarding Pages
import OTPVerificationPage from './pages/auth/OTPVerificationPage'
import RoleSelectionPage from './pages/auth/RoleSelectionPage'
import ProfileCompletionWizard from './pages/auth/ProfileCompletionWizard'

// Dashboard Shell & Sub-views
import DashboardLayout from './components/dashboard/DashboardLayout'
import DashboardHome from './pages/dashboard/DashboardHome'
import SearchPGsView from './pages/dashboard/SearchPGsView'
import PGDetailPage from './pages/dashboard/PGDetailPage'
import SavedPGsView from './pages/dashboard/SavedPGsView'
import ReviewsView from './pages/dashboard/ReviewsView'
import RewardsView from './pages/dashboard/RewardsView'
import WalletView from './pages/dashboard/WalletView'
import SettingsPage from './pages/dashboard/SettingsPage'

// Status Pages
import UnauthorizedPage from './pages/status/UnauthorizedPage'
import NotFoundPage from './pages/status/NotFoundPage'

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Onboarding Flow */}
        <Route path="/verify-otp" element={<OTPVerificationPage />} />
        <Route path="/select-role" element={<RoleSelectionPage />} />
        <Route path="/complete-profile" element={<ProfileCompletionWizard />} />

        {/* Protected Dashboard Shell */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="search" element={<SearchPGsView />} />
          <Route path="pg/:id" element={<PGDetailPage />} />
          <Route path="saved" element={<SavedPGsView />} />
          <Route path="reviews" element={<ReviewsView />} />
          <Route path="rewards" element={<RewardsView />} />
          <Route path="wallet" element={<WalletView />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Status Pages */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
