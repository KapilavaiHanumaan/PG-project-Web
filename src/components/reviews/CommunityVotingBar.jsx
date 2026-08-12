import React, { useState } from 'react'
import { ThumbsUp, ThumbsDown, Flag, X, ShieldAlert } from 'lucide-react'
import { useReviewStore } from '../../store/useReviewStore'
import { toast } from '../../utils/toast'

export default function CommunityVotingBar({ review }) {
  const { voteReview, userVotes, reportReview } = useReviewStore()
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportReason, setReportReason] = useState('Spam or Advertising')

  const userVote = userVotes[review.id]

  const handleVote = (type) => {
    try {
      voteReview(review.id, type)
      toast.success('Vote Recorded', type === 'helpful' ? 'Marked review as helpful.' : 'Feedback recorded.')
    } catch (e) {
      console.warn(e)
    }
  }

  const handleSendReport = (e) => {
    e.preventDefault()
    reportReview(review.id, reportReason)
    setShowReportModal(false)
    toast.info('Review Reported', 'Our moderation team will investigate this review.')
  }

  return (
    <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
      <div className="flex items-center gap-3">
        <span className="text-slate-400 font-medium">Was this review helpful?</span>

        <button
          onClick={() => handleVote('helpful')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
            userVote === 'helpful'
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold'
              : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
          }`}
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          <span>Yes ({review.helpfulCount || 0})</span>
        </button>

        <button
          onClick={() => handleVote('unhelpful')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
            userVote === 'unhelpful'
              ? 'bg-rose-500/20 border-rose-500 text-rose-400 font-bold'
              : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
          }`}
        >
          <ThumbsDown className="w-3.5 h-3.5" />
          <span>No ({review.unhelpfulCount || 0})</span>
        </button>
      </div>

      <button
        onClick={() => setShowReportModal(true)}
        className="text-slate-500 hover:text-rose-400 transition-colors flex items-center gap-1 text-[11px]"
      >
        <Flag className="w-3.5 h-3.5" /> Report
      </button>

      {/* REPORT MODAL */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 relative text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-bold text-sm flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" /> Report Review
              </h4>
              <button onClick={() => setShowReportModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendReport} className="space-y-3">
              <label className="block text-xs text-slate-300">Select Reason:</label>
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option>Spam or Commercial Advertising</option>
                <option>Fake Review / Non-Tenant</option>
                <option>Offensive / Inappropriate Language</option>
                <option>Conflict of Interest (PG Owner Self-Promotion)</option>
              </select>

              <button
                type="submit"
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-rose-600/30"
              >
                Submit Report to Moderators
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
