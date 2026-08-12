import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, Send, CheckCircle2, Loader2 } from 'lucide-react'
import AuthLayout from '../../components/auth/AuthLayout'
import { toast } from '../../utils/toast'

const forgotSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address format'),
})

export default function ForgotPasswordPage() {
  const [submittedEmail, setSubmittedEmail] = useState(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotSchema),
  })

  const onSubmit = async (data) => {
    setLoading(true)
    await new Promise((res) => setTimeout(res, 800))
    setLoading(false)
    setSubmittedEmail(data.email)
    toast.success('Password Reset Dispatched', `Reset instructions sent to ${data.email}`)
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your registered email address and we'll send you instructions to reset your account password."
    >
      {submittedEmail ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Check Your Inbox</h3>
          <p className="text-sm text-slate-300 max-w-sm mx-auto">
            We have sent a secure password reset link to{' '}
            <span className="font-semibold text-blue-400">{submittedEmail}</span>.
          </p>
          <div className="pt-4 flex flex-col gap-3">
            <Link
              to="/reset-password"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-xl transition-colors text-center text-sm shadow-lg shadow-blue-600/30"
            >
              Simulate Clicking Email Reset Link
            </Link>
            <button
              onClick={() => setSubmittedEmail(null)}
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              Didn't receive email? Try another address
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Registered Email
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                {...register('email')}
                type="email"
                placeholder="name@example.com"
                className={`w-full bg-slate-950/80 border text-sm rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none transition-all ${
                  errors.email
                    ? 'border-rose-500/80 focus:ring-2 focus:ring-rose-500/30'
                    : 'border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-rose-400 mt-1 font-medium">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Sending Link...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Reset Link</span>
              </>
            )}
          </button>

          <div className="pt-4 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Sign In
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  )
}
