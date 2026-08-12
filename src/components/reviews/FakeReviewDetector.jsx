import React from 'react'
import { ShieldAlert, AlertTriangle, CheckCircle2, Eye, ShieldCheck, Cpu } from 'lucide-react'
import { useReviewStore } from '../../store/useReviewStore'
import { detectFraudSignals } from '../../utils/trustScoreCalculator'
import { toast } from '../../utils/toast'

export default function FakeReviewDetector() {
  const { reviews, rejectReview, approveReview } = useReviewStore()

  // Analyze all reviews through anti-fraud pipeline
  const analyzedReviews = reviews.map((r) => ({
    ...r,
    fraudMeta: detectFraudSignals(r),
  }))

  const suspiciousList = analyzedReviews.filter((r) => r.fraudMeta.riskScore >= 25)

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950/80 via-slate-900 to-amber-950/80 border border-slate-800 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center shrink-0">
            <Cpu className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">AI Fake Review & Fraud Detection Engine</h2>
            <p className="text-xs text-slate-300">Monitors IP telemetry, review brevity, rating manipulation & text duplication.</p>
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 px-6 text-center shrink-0">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Detection Accuracy</span>
          <span className="text-2xl font-black text-emerald-400">94.8%</span>
        </div>
      </div>

      {/* Investigation Queue */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            Fraud Investigation Queue ({suspiciousList.length})
          </h3>
          <span className="text-xs text-slate-400">Flagged by Anti-Bot & Telemetry System</span>
        </div>

        {suspiciousList.length === 0 ? (
          <div className="p-8 bg-slate-950/60 rounded-2xl border border-slate-800 text-center">
            <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-white">Zero Suspicious Reviews Flagged</h4>
            <p className="text-xs text-slate-400">All published PG reviews currently meet physical verification standards.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {suspiciousList.map((rev) => (
              <div key={rev.id} className="p-4 bg-slate-950/80 rounded-2xl border border-rose-900/40 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div>
                    <span className="text-xs font-bold text-white">{rev.user}</span>
                    <span className="text-[11px] text-slate-400 ml-2">({rev.pgName})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase">
                      Risk Score: {rev.fraudMeta.riskScore}% ({rev.fraudMeta.status})
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 italic">"{rev.comment}"</p>

                {/* Flagged Signals List */}
                <div className="space-y-1">
                  {rev.fraudMeta.signals.map((sig, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-rose-300">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>{sig.text}</span>
                    </div>
                  ))}
                </div>

                {/* Admin Actions */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => {
                      approveReview(rev.id)
                      toast.success('Approved Review', 'Marked review as verified safe.')
                    }}
                    className="px-3 py-1.5 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 rounded-xl text-xs font-semibold transition-colors"
                  >
                    Mark as Safe
                  </button>
                  <button
                    onClick={() => {
                      rejectReview(rev.id)
                      toast.error('Review Removed', 'Fake review purged from platform.')
                    }}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
                  >
                    Purge Fake Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
