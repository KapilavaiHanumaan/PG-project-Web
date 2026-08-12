import React, { useState } from 'react'
import { ShieldCheck, ShieldAlert, Check, X, AlertTriangle, UserX, FileText, Lock } from 'lucide-react'
import { useReviewStore } from '../../store/useReviewStore'
import { toast } from '../../utils/toast'

export default function ReviewModerationPanel() {
  const { reviews, approveReview, rejectReview, reportedReviews } = useReviewStore()
  const [activeTab, setActiveTab] = useState('all')

  const handleApprove = (id) => {
    approveReview(id)
    toast.success('Review Approved', 'Published to PGTrust Hyderabad platform.')
  }

  const handleReject = (id) => {
    rejectReview(id)
    toast.error('Review Rejected', 'Removed from active listings.')
  }

  const handleBanUser = (user) => {
    toast.error('User Suspended', `${user} suspended for policy violation.`)
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Moderation Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-purple-400" /> Admin Review Moderation Panel
          </h2>
          <p className="text-xs text-slate-400">Review flag queues, community reports, and policy enforcement</p>
        </div>

        {/* Tab Badges */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'reported', label: `Reported (${reportedReviews.length})` },
            { id: 'unverified', label: 'Pending Verification' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                activeTab === t.id ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Queue List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{rev.user}</h4>
                <span className="text-xs text-slate-400">{rev.pgName} • {rev.locality}</span>
              </div>
              <span className="text-xs font-bold text-amber-400">★ {rev.overallRating}</span>
            </div>

            <p className="text-xs text-slate-300 italic">"{rev.comment}"</p>

            {/* Actions Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
              <span className="text-slate-500">Trust Score: <strong className="text-blue-400">{rev.trustScore}/100</strong></span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleApprove(rev.id)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold transition-colors flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" /> Approve
                </button>
                <button
                  onClick={() => handleReject(rev.id)}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-semibold transition-colors flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> Reject
                </button>
                <button
                  onClick={() => handleBanUser(rev.user)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-rose-950 text-rose-400 border border-slate-700 rounded-xl font-semibold transition-colors flex items-center gap-1"
                >
                  <UserX className="w-3.5 h-3.5" /> Ban User
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
