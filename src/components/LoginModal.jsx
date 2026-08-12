import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShieldCheck, Sparkles, Mail, Lock, ArrowRight, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { toast } from '../utils/toast'

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null

  const navigate = useNavigate()
  const { quickDemoLogin } = useAuthStore()

  const handleGoToFullLogin = () => {
    onClose()
    navigate('/login')
  }

  const handleGoToFullRegister = () => {
    onClose()
    navigate('/register')
  }

  const handleDemoAccess = () => {
    quickDemoLogin('working_professional')
    onClose()
    toast.success('Quick Demo Login Active', 'Entered dashboard as Working Professional.')
    navigate('/dashboard')
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-slate-900 rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 border border-slate-800 text-white"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-bold mb-3 border border-blue-500/20">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>PGTrust Hyderabad Auth</span>
            </div>
            <h3 className="text-2xl font-extrabold text-white">Access Your Account</h3>
            <p className="text-xs text-slate-400 mt-1">
              Sign in to manage saved PGs, review rewards & dashboard.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleGoToFullLogin}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <span>Sign In with Email / Password</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleGoToFullRegister}
              className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
            >
              <span>Register New Account</span>
            </button>

            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <span className="relative bg-slate-900 px-3 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                Instant Preview
              </span>
            </div>

            <button
              onClick={handleDemoAccess}
              className="w-full py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Demo Login to Dashboard</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
