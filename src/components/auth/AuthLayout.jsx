import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Star, Sparkles, Building2, CheckCircle2, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'

export default function AuthLayout({ title, subtitle, children, showBackToHome = true }) {
  const { quickDemoLogin } = useAuthStore()

  return (
    <div className="min-h-screen relative bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden font-sans">
      {/* Dynamic Background Glow Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl">
        {/* Top bar navigation & demo test trigger */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          {showBackToHome ? (
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors bg-slate-900/60 hover:bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-800 backdrop-blur-md"
            >
              <ArrowLeft className="w-4 h-4" /> Back to PGTrust Home
            </Link>
          ) : <div />}

          {/* Quick Demo Credentials Auto-Fill Button */}
          <button
            onClick={() => quickDemoLogin('working_professional')}
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all shadow-sm"
            title="Instant Demo Access to Dashboard"
          >
            <Sparkles className="w-3.5 h-3.5" /> Quick Demo Login
          </button>
        </div>

        {/* Main Glassmorphism Card Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/80 backdrop-blur-2xl shadow-2xl shadow-slate-950/80"
        >
          {/* Left Panel: Branding & Platform Showcase (Hidden on small screens) */}
          <div className="hidden lg:flex lg:col-span-5 relative bg-gradient-to-br from-blue-950/80 via-slate-900 to-purple-950/80 p-8 flex-col justify-between border-r border-slate-800/80">
            {/* Top Logo */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-black tracking-tight text-white">PGTrust</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block -mt-1">Hyderabad</span>
                </div>
              </div>

              <h2 className="text-2xl font-extrabold text-white leading-tight mb-3">
                Hyderabad's #1 Verified PG Search & Review Network
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Join 15,000+ students & tech professionals finding safe, authentic PGs in Gachibowli, HITECH City, Madhapur & beyond.
              </p>

              {/* Feature Highlights */}
              <div className="space-y-3.5">
                {[
                  '100% Physical Property Verification',
                  'Earn PGTrust Points & Rent Discounts',
                  'Zero Brokerage & Transparent Food Ratings',
                  'Verified Owner & Roommate Badges',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial Quote Banner at bottom */}
            <div className="mt-8 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
                <span className="text-xs font-bold text-slate-300 ml-2">4.9 / 5.0 Rating</span>
              </div>
              <p className="text-xs italic text-slate-400">
                "PGTrust made moving to HITECH City stress-free. The owner reviews and verified food photos were spot on!"
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">
                  SK
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Sandeep K.</p>
                  <p className="text-[10px] text-slate-400">Software Engineer, Gachibowli</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Auth Form Container */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-slate-900/60">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                {title}
              </h1>
              {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
            </div>

            {/* Form Children */}
            {children}
          </div>
        </motion.div>

        {/* Security Footer Note */}
        <p className="text-center text-xs text-slate-500 mt-6">
          🔒 Secure 256-Bit Encrypted Authentication • PGTrust Hyderabad Platform Policy 2026
        </p>
      </div>
    </div>
  )
}
