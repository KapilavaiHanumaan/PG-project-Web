import React, { useState, useMemo } from 'react'
import { ArrowUpDown, Filter, ShieldCheck, Camera, Sparkles } from 'lucide-react'
import ReviewCard from './ReviewCard'
import { useReviewStore } from '../../store/useReviewStore'

export default function ReviewDisplayList() {
  const { reviews } = useReviewStore()
  const [sortBy, setSortBy] = useState('most_trusted') // 'most_trusted' | 'most_helpful' | 'newest' | 'rating_high' | 'rating_low'
  const [filterMode, setFilterMode] = useState('all') // 'all' | 'verified_only' | 'photos_only'

  const filteredAndSortedReviews = useMemo(() => {
    return reviews
      .filter((r) => {
        if (filterMode === 'verified_only' && !r.verifiedStay) return false
        if (filterMode === 'photos_only' && (!r.photos || r.photos.length === 0)) return false
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'most_trusted') return (b.trustScore || 0) - (a.trustScore || 0)
        if (sortBy === 'most_helpful') return (b.helpfulCount || 0) - (a.helpfulCount || 0)
        if (sortBy === 'rating_high') return b.overallRating - a.overallRating
        if (sortBy === 'rating_low') return a.overallRating - b.overallRating
        return 0
      })
  }, [reviews, sortBy, filterMode])

  return (
    <div className="space-y-6 font-sans">
      {/* Controls Bar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-xl">
        {/* Filter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: 'All Reviews', icon: Filter },
            { id: 'verified_only', label: 'Verified Tenants Only', icon: ShieldCheck },
            { id: 'photos_only', label: 'With Photo Evidence', icon: Camera },
          ].map((item) => {
            const Icon = item.icon
            const isActive = filterMode === item.id
            return (
              <button
                key={item.id}
                onClick={() => setFilterMode(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 border ${
                  isActive
                    ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 shrink-0">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-400 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-950/80 border border-slate-800 text-xs rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="most_trusted">Highest Trust Score (0-100)</option>
            <option value="most_helpful">Most Helpful Votes</option>
            <option value="newest">Newest First</option>
            <option value="rating_high">Rating: High to Low</option>
            <option value="rating_low">Rating: Low to High</option>
          </select>
        </div>
      </div>

      {/* Reviews Cards List */}
      <div className="space-y-6">
        {filteredAndSortedReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
}
