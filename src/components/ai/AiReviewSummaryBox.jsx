import React from 'react'
import { Cpu, CheckCircle2, AlertTriangle, Sparkles, UserCheck } from 'lucide-react'
import { generateAiReviewSummary } from '../../utils/aiPipelineEngine'

export default function AiReviewSummaryBox({ pgName = 'Stanza Living', locality = 'Madhapur' }) {
  const aiData = generateAiReviewSummary(pgName, locality)

  return (
    <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-purple-950/80 border border-blue-500/30 rounded-3xl p-6 backdrop-blur-xl space-y-4 font-sans shadow-2xl">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-blue-500/20 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white">AI Property Executive Review Summary</h3>
            <span className="text-[10px] text-blue-400 font-semibold">Synthesized from 42 Verified Tenant Reviews</span>
          </div>
        </div>
        <span className="bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" /> NLP Verified
        </span>
      </div>

      {/* Main Executive Summary Paragraph */}
      <p className="text-xs text-slate-300 leading-relaxed font-medium">{aiData.summary}</p>

      {/* Grid: Key Positives & Common Complaints */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {/* Most Mentioned Positives */}
        <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-emerald-500/20 space-y-2">
          <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Most Mentioned Positives (+)
          </span>
          <ul className="space-y-1.5 text-[11px] text-slate-300">
            {aiData.positives.map((pos, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold shrink-0">•</span>
                <span>{pos}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Common Complaints */}
        <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-rose-500/20 space-y-2">
          <span className="text-[11px] font-bold text-rose-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" /> Common Tenant Drawbacks (-)
          </span>
          <ul className="space-y-1.5 text-[11px] text-slate-300">
            {aiData.negatives.map((neg, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold shrink-0">•</span>
                <span>{neg}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended For Target Persona */}
      <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 flex items-center gap-2.5 text-xs text-blue-200">
        <UserCheck className="w-4 h-4 text-blue-400 shrink-0" />
        <div>
          <strong className="text-white">Recommended For Whom: </strong>
          <span>{aiData.recommendedFor}</span>
        </div>
      </div>
    </div>
  )
}
