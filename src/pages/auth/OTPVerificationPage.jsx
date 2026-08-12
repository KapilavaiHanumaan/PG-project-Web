import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import { ShieldCheck, RefreshCw, ArrowRight, Loader2, Sparkles, CheckCircle2 } from 'lucide-react'
import AuthLayout from '../../components/auth/AuthLayout'
import OTPInput from '../../components/auth/OTPInput'
import { useAuthStore } from '../../store/useAuthStore'
import { toast } from '../../utils/toast'

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState('')
  const [timer, setTimer] = useState(60)
  const [isVerifying, setIsVerifying] = useState(false)
  const [hasError, setHasError] = useState(false)

  const { verifyOtp, pendingRegistration, authStatus } = useAuthStore()
  const navigate = useNavigate()

  // Countdown timer effect
  useEffect(() => {
    let interval = null
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000)
    }
    return () => clearInterval(interval)
  }, [timer])

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#7c3aed', '#10b981', '#f59e0b'],
      })
    } catch (e) {
      console.log('Confetti playback:', e)
    }
  }

  const handleVerify = async (codeToVerify = otp) => {
    if (codeToVerify.length !== 6) {
      setHasError(true)
      toast.error('Invalid OTP', 'Please enter all 6 digits.')
      return
    }

    setHasError(false)
    setIsVerifying(true)

    try {
      await verifyOtp(codeToVerify)
      triggerConfetti()
      toast.success('Mobile Verified Successfully!', 'Select your platform role to continue.')
      setTimeout(() => {
        navigate('/select-role')
      }, 700)
    } catch (err) {
      setHasError(true)
      toast.error('Verification Failed', err.message || 'Incorrect OTP entered.')
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResend = () => {
    if (timer > 0) return
    setTimer(60)
    setOtp('')
    setHasError(false)
    toast.info('New OTP Dispatched', 'Check your mobile SMS / Email for code 123456')
  }

  const handleFillTestOTP = () => {
    setOtp('123456')
    setHasError(false)
    toast.success('Test OTP 123456 Auto-Filled')
  }

  const destinationText = pendingRegistration?.mobile || pendingRegistration?.email || '+91 98765 43210'

  return (
    <AuthLayout
      title="Verify Mobile & Email"
      subtitle={`We have dispatched a 6-digit security code to ${destinationText}`}
    >
      <div className="space-y-6">
        {/* Helper Test Badge */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-blue-300">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Test Mode: Enter OTP <strong className="text-white font-mono text-sm">123456</strong></span>
          </div>
          <button
            onClick={handleFillTestOTP}
            className="text-xs font-semibold px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
          >
            Auto Fill
          </button>
        </div>

        {/* 6-Digit OTP Component */}
        <OTPInput
          length={6}
          value={otp}
          onChange={(val) => {
            setOtp(val)
            if (hasError) setHasError(false)
            if (val.length === 6) {
              handleVerify(val)
            }
          }}
          disabled={isVerifying}
          error={hasError}
        />

        {hasError && (
          <p className="text-xs text-center text-rose-400 font-medium">
            Incorrect security code. Please check and try again.
          </p>
        )}

        {/* Countdown & Resend Section */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
          <span>Didn't receive the code?</span>
          {timer > 0 ? (
            <span className="font-mono text-slate-300">Resend code in <strong className="text-blue-400">{timer}s</strong></span>
          ) : (
            <button
              onClick={handleResend}
              className="inline-flex items-center gap-1.5 font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Resend OTP
            </button>
          )}
        </div>

        {/* Verify Action Button */}
        <button
          onClick={() => handleVerify()}
          disabled={isVerifying || otp.length !== 6}
          className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerifying ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Verifying Security Code...</span>
            </>
          ) : (
            <>
              <span>Verify & Continue</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <div className="text-center">
          <button
            onClick={() => navigate('/register')}
            className="text-xs text-slate-500 hover:text-slate-400 transition-colors"
          >
            Wrong phone number? Change details
          </button>
        </div>
      </div>
    </AuthLayout>
  )
}
