import React from 'react'
import { Star, MessageSquareQuote, ShieldCheck, Award, Plus } from 'lucide-react'
import { toast } from '../../utils/toast'

const userReviews = [
  {
    id: 'rev-1',
    pgName: 'Sri Sai Deluxe Executive PG',
    location: 'Gachibowli',
    rating: 5.0,
    date: '10 Aug 2026',
    comment: 'Exceptional food quality! North Indian thali is prepared fresh twice daily. Clean rooms and fast 200Mbps Wi-Fi.',
    status: 'Verified & Rewarded (+250 Pts)',
  },
  {
    id: 'rev-2',
    pgName: 'Stanza Living Cyber Hub',
    location: 'HITECH City',
    rating: 4.5,
    date: '25 July 2026',
    comment: 'Great security with biometric doors. Housekeeping comes every morning without fail.',
    status: 'Verified & Rewarded (+250 Pts)',
  },
]

export default function ReviewsView() {
  const handleWriteReview = () => {
    toast.info('Write Review', 'Select a PG from Search tab to submit a verified physical review.')
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">My Reviews & Badges</h1>
          <p className="text-xs text-slate-400">Write authentic PG reviews and earn PGTrust Reward Points</p>
        </div>

        <button
          onClick={handleWriteReview}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Write New PG Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userReviews.map((rev) => (
          <div key={rev.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-white">{rev.pgName}</h3>
                <span className="text-xs text-slate-400">{rev.location}, Hyderabad</span>
              </div>
              <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-lg border border-amber-500/20 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> {rev.rating}
              </div>
            </div>

            <p className="text-xs text-slate-300 italic mb-4">"{rev.comment}"</p>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500">{rev.date}</span>
              <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> {rev.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
