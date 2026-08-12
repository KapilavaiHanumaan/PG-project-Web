import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react'
import { getTrustCategory } from '../../utils/trustScoreCalculator'

export default function TrustScoreMeter({ score = 92, showDetails = false }) {
  const meta = getTrustCategory(score)

  // Calculate gauge SVG circle stroke dash offsets
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className="flex items-center gap-3">
      {/* Animated Gauge Ring */}
      <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
        <svg className="w-14 h-14 -rotate-90 transform" viewBox="0 0 64 64">
          {/* Background Track */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="currentColor"
            strokeWidth="4.5"
            className="text-slate-800"
            fill="transparent"
          />
          {/* Animated Value Ring */}
          <motion.circle
            cx="32"
            cy="32"
            r={radius}
            stroke="currentColor"
            strokeWidth="4.5"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: 'easeOut' }}
            strokeLinecap="round"
            className={
              score >= 90
                ? 'text-emerald-400'
                : score >= 75
                ? 'text-blue-400'
                : score >= 50
                ? 'text-amber-400'
                : 'text-rose-400'
            }
            fill="transparent"
          />
        </svg>

        {/* Center Text */}
        <span className="absolute font-black text-xs text-white">{score}</span>
      </div>

      {/* Label Badge */}
      <div className="flex flex-col">
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg border text-[11px] font-bold ${meta.color}`}>
          {score >= 75 ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
          <span>{meta.label} ({score}/100)</span>
        </span>
        <span className="text-[10px] text-slate-400 mt-1">
          {score >= 90 ? 'Verified Stay + Media Evidence' : score >= 75 ? 'Authentic User Contribution' : 'Unverified Stay Proof'}
        </span>
      </div>
    </div>
  )
}
