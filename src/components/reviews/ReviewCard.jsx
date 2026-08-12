import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, Calendar, Clock, ThumbsUp, X } from 'lucide-react'
import TrustScoreMeter from './TrustScoreMeter'
import CommunityVotingBar from './CommunityVotingBar'

export default function ReviewCard({ review }) {
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  return (
    <div className="bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 rounded-3xl p-6 backdrop-blur-xl space-y-4 font-sans transition-all shadow-xl">
      {/* Top Header: User Profile Info & Trust Meter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <img
            src={review.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
            alt={review.user}
            className="w-12 h-12 rounded-2xl object-cover border border-blue-500/40"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white">{review.user}</h4>
              {review.verifiedStay && (
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> VERIFIED TENANT
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">{review.occupation}</p>
            <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
              <span>{review.pgName} ({review.locality})</span>
              <span>•</span>
              <span>Stayed {review.stayDuration}</span>
            </div>
          </div>
        </div>

        {/* Dynamic 0-100 Trust Score Gauge */}
        <TrustScoreMeter score={review.trustScore || 88} />
      </div>

      {/* Star Rating Overview & Rating Breakdown Accordion */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-amber-400 font-extrabold text-base bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{review.overallRating?.toFixed(1)}</span>
            </div>
            <h3 className="text-base font-bold text-white leading-tight">{review.title}</h3>
          </div>

          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
          >
            <span>Detailed Scores</span>
            {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Rating Breakdown Accordion */}
        <AnimatePresence>
          {showBreakdown && review.ratings && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-slate-950/60 rounded-2xl p-4 my-3 border border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs"
            >
              {[
                { label: 'Room Space', val: review.ratings.room },
                { label: 'Food Quality', val: review.ratings.food },
                { label: 'Cleanliness', val: review.ratings.cleanliness },
                { label: 'Security', val: review.ratings.security },
                { label: 'Wi-Fi Speed', val: review.ratings.wifi },
                { label: 'Staff Behavior', val: review.ratings.staff },
                { label: 'Value for Money', val: review.ratings.value },
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 text-[11px]">{r.label}</span>
                  <span className="font-bold text-amber-400">★ {r.val}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Review Text */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed my-3">{review.comment}</p>

        {/* Pros & Cons Bullets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          {review.pros?.length > 0 && (
            <div className="p-3 bg-emerald-500/5 rounded-2xl border border-emerald-500/20 text-xs">
              <span className="font-bold text-emerald-400 block mb-1">PROS:</span>
              <ul className="space-y-1 text-slate-300">
                {review.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {review.cons?.length > 0 && (
            <div className="p-3 bg-rose-500/5 rounded-2xl border border-rose-500/20 text-xs">
              <span className="font-bold text-rose-400 block mb-1">CONS:</span>
              <ul className="space-y-1 text-slate-300">
                {review.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-400 font-bold shrink-0">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Real Photo Evidence Gallery */}
        {review.photos?.length > 0 && (
          <div className="my-4">
            <span className="text-[11px] font-bold text-slate-400 block mb-2">Real Room & Food Evidence Photos:</span>
            <div className="flex items-center gap-3 overflow-x-auto">
              {review.photos.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt="Review photo"
                  onClick={() => setSelectedPhoto(url)}
                  className="w-20 h-20 rounded-xl object-cover border border-slate-700 cursor-pointer hover:scale-105 transition-all shrink-0"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Community Voting Bar */}
      <CommunityVotingBar review={review} />

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedPhoto(null)}>
          <div className="relative max-w-2xl w-full">
            <img src={selectedPhoto} alt="Enlarged review photo" className="w-full max-h-[80vh] object-contain rounded-2xl border border-slate-800" />
            <button onClick={() => setSelectedPhoto(null)} className="absolute -top-10 right-0 text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
