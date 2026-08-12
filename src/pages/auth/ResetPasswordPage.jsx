import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, CheckCircle2, Loader2, KeyRound } from 'lucide-react'
import AuthLayout from '../../components/auth/AuthLayout'
import { toast } from '../../utils/toast'

const resetSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Must contain at least one number'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetSchema),
  })

  const onSubmit = async () => {
    setLoading(true)
    await new Promise((res) => setTimeout(res, 900))
    setLoading(false)
    toast.success('Password Reset Successful!', 'You can now log in with your new password.')
    navigate('/login')
  }

  return (
    <AuthLayout
      title="Create New Password"
      subtitle="Your new password must be different from previously used passwords."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* New Password */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            New Password
          </label>
          <div className="relative">
            <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••••"
              className={`w-full bg-slate-950/80 border text-sm rounded-xl pl-11 pr-11 py-3 text-white placeholder-slate-500 focus:outline-none transition-all ${
                errors.password
                  ? 'border-rose-500/80 focus:ring-2 focus:ring-rose-500/30'
                  : 'border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-1"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-rose-400 mt-1 font-medium">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Confirm New Password
          </label>
          <div className="relative">
            <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••••••"
              className={`w-full bg-slate-950/80 border text-sm rounded-xl pl-11 pr-11 py-3 text-white placeholder-slate-500 focus:outline-none transition-all ${
                errors.confirmPassword
                  ? 'border-rose-500/80 focus:ring-2 focus:ring-rose-500/30'
                  : 'border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-1"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-rose-400 mt-1 font-medium">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Password Requirements List */}
        <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
          <p className="font-semibold text-slate-300">Password must contain:</p>
          <p className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Minimum 8 characters
          </p>
          <p className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> At least 1 uppercase letter & 1 number
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Updating Password...</span>
            </>
          ) : (
            <>
              <KeyRound className="w-4 h-4" />
              <span>Reset & Update Password</span>
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  )
}
