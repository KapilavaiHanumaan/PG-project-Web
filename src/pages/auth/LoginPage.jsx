import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react'
import AuthLayout from '../../components/auth/AuthLayout'
import { useAuthStore } from '../../store/useAuthStore'
import { toast } from '../../utils/toast'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
})

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { login, authStatus } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect route after login if attempted protected access
  const from = location.state?.from?.pathname || '/dashboard'

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  })

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password)
      toast.success('Welcome back to PGTrust Hyderabad!', 'Successfully authenticated.')
      navigate(from, { replace: true })
    } catch (err) {
      toast.error('Authentication Failed', err.message || 'Check your email and password.')
    }
  }

  const handleFillDemo = () => {
    setValue('email', 'chaitanya@pgtrust.com', { shouldValidate: true })
    setValue('password', 'Password@123', { shouldValidate: true })
    toast.info('Demo Credentials Auto-filled', 'Click Login to enter dashboard.')
  }

  const isLoading = authStatus === 'loading'

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Enter your credentials to access saved PGs, review rewards, and dashboard."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Email Address
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

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
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

        {/* Remember Me & Fill Demo */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              {...register('rememberMe')}
              type="checkbox"
              className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500/50"
            />
            <span className="text-xs text-slate-300 font-medium">Remember me</span>
          </label>

          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs text-slate-400 hover:text-slate-200 underline decoration-slate-600 underline-offset-4"
          >
            Auto-fill demo test credentials
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <span className="relative bg-slate-900 px-3 text-xs uppercase tracking-wider text-slate-500 font-semibold">
            Or continue with
          </span>
        </div>

        {/* Google Login UI Button */}
        <button
          type="button"
          onClick={() => {
            toast.info('Google OAuth Simulated', 'Logging in via Google...')
            useAuthStore.getState().quickDemoLogin('working_professional')
            navigate('/dashboard')
          }}
          className="w-full bg-slate-950/80 hover:bg-slate-900 border border-slate-800 text-slate-200 font-medium py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Sign in with Google</span>
        </button>

        {/* Link to Register */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Don't have a PGTrust account yet?{' '}
          <Link to="/register" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
            Create an Account
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
