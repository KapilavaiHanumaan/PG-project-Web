import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail, User, Phone, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react'
import AuthLayout from '../../components/auth/AuthLayout'
import { useAuthStore } from '../../store/useAuthStore'
import { toast } from '../../utils/toast'

const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Full Name must be at least 2 characters'),
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    mobile: z
      .string()
      .min(10, 'Mobile number must be 10 digits')
      .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the Terms of Service & Privacy Policy',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { register: registerUser, authStatus } = useAuthStore()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  })

  const onSubmit = async (data) => {
    try {
      await registerUser(data)
      toast.success('Registration Initiated', 'A 6-digit OTP code has been dispatched.')
      navigate('/verify-otp')
    } catch (err) {
      toast.error('Registration Failed', err.message || 'Please try again.')
    }
  }

  const handleFillDemo = () => {
    setValue('fullName', 'Ananya Sharma', { shouldValidate: true })
    setValue('email', 'ananya@pgtrust.com', { shouldValidate: true })
    setValue('mobile', '9876543210', { shouldValidate: true })
    setValue('password', 'PGTrust2026!', { shouldValidate: true })
    setValue('confirmPassword', 'PGTrust2026!', { shouldValidate: true })
    setValue('acceptTerms', true, { shouldValidate: true })
    toast.info('Demo Signup Details Filled', 'Click Register Now to test OTP verification.')
  }

  const isLoading = authStatus === 'loading'

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Join Hyderabad's premier PG community to unlock verified reviews & rewards."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              {...register('fullName')}
              type="text"
              placeholder="e.g. Ananya Sharma"
              className={`w-full bg-slate-950/80 border text-sm rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none transition-all ${
                errors.fullName
                  ? 'border-rose-500/80 focus:ring-2 focus:ring-rose-500/30'
                  : 'border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
              }`}
            />
          </div>
          {errors.fullName && (
            <p className="text-xs text-rose-400 mt-1 font-medium">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email & Mobile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                {...register('email')}
                type="email"
                placeholder="ananya@example.com"
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

          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Mobile Number
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                {...register('mobile')}
                type="tel"
                placeholder="9876543210"
                className={`w-full bg-slate-950/80 border text-sm rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none transition-all ${
                  errors.mobile
                    ? 'border-rose-500/80 focus:ring-2 focus:ring-rose-500/30'
                    : 'border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                }`}
              />
            </div>
            {errors.mobile && (
              <p className="text-xs text-rose-400 mt-1 font-medium">{errors.mobile.message}</p>
            )}
          </div>
        </div>

        {/* Password & Confirm Password Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Password
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-rose-400 mt-1 font-medium">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Confirm Password
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-1"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-rose-400 mt-1 font-medium">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              {...register('acceptTerms')}
              type="checkbox"
              className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500/50 shrink-0"
            />
            <span className="text-xs text-slate-300 leading-relaxed">
              I agree to the PGTrust{' '}
              <a href="#terms" onClick={(e) => e.preventDefault()} className="text-blue-400 hover:underline">
                Terms of Service
              </a>{' '}
              &{' '}
              <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-blue-400 hover:underline">
                Privacy Policy
              </a>
              . I consent to receive OTP and verification SMS alerts.
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="text-xs text-rose-400 mt-1 font-medium">{errors.acceptTerms.message}</p>
          )}
        </div>

        {/* Demo Fill Helper */}
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs text-slate-400 hover:text-slate-200 underline decoration-slate-600 underline-offset-4"
          >
            Auto-fill demo registration data
          </button>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing Registration...</span>
            </>
          ) : (
            <>
              <span>Continue to OTP Verification</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Existing user link */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
            Sign In Here
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
