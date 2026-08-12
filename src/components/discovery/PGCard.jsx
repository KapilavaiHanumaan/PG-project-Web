import React from 'react'
import { motion } from 'framer-motion'
import { Star, MapPin, Heart, ShieldCheck, CheckSquare, Square, ArrowRight, Utensils, Wifi, Sparkles } from 'lucide-react'
import { useDiscoveryStore } from '../../store/useDiscoveryStore'
import { getNearestLandmarks } from '../../utils/distanceCalculator'
import { toast } from '../../utils/toast'

export default function PGCard({ pg, onSelectPG }) {
  const { savedIds, toggleSave, compareIds, toggleCompare } = useDiscoveryStore()

  const isSaved = savedIds.includes(pg.id)
  const isCompared = compareIds.includes(pg.id)

  const nearestLandmarks = getNearestLandmarks(pg.lat, pg.lng)
  const nearest = nearestLandmarks[0] // closest IT park or metro

  const handleSave = (e) => {
    e.stopPropagation()
    toggleSave(pg.id)
    if (isSaved) {
      toast.info('Bookmark Removed', `${pg.name} removed from saved list.`)
    } else {
      toast.success('PG Saved!', `${pg.name} added to your saved PGs.`)
    }
  }

  const handleCompare = (e) => {
    e.stopPropagation()
    try {
      toggleCompare(pg.id)
      if (isCompared) {
        toast.info('Removed from Compare', `${pg.name} removed.`)
      } else {
        toast.success('Added to Comparison', `${pg.name} added to compare tray.`)
      }
    } catch (err) {
      toast.warning('Compare Limit Reached', err.message)
    }
  }

  const genderLabel =
    pg.gender === 'girls' ? 'Girls PG' : pg.gender === 'boys' ? 'Boys PG' : 'Co-Living'

  const genderColor =
    pg.gender === 'girls'
      ? 'bg-pink-500/10 text-pink-400 border-pink-500/20'
      : pg.gender === 'boys'
      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      : 'bg-purple-500/10 text-purple-400 border-purple-500/20'

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelectPG(pg)}
      className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-3xl overflow-hidden backdrop-blur-xl cursor-pointer flex flex-col justify-between group shadow-xl"
    >
      {/* Top Cover Image & Badges */}
      <div className="relative h-52 overflow-hidden bg-slate-950">
        <img
          src={pg.images?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80'}
          alt={pg.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border backdrop-blur-md ${genderColor}`}>
            {genderLabel}
          </span>

          <span className="bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-md flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> VERIFIED
          </span>
        </div>

        {/* Save & Compare Buttons Top Right */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            onClick={handleCompare}
            title={isCompared ? 'Remove from compare' : 'Add to compare tray'}
            className={`p-2 rounded-xl backdrop-blur-md transition-all border ${
              isCompared
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/40'
                : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            {isCompared ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
          </button>

          <button
            onClick={handleSave}
            title={isSaved ? 'Remove bookmark' : 'Save PG'}
            className={`p-2 rounded-xl backdrop-blur-md transition-all border ${
              isSaved
                ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-600/40'
                : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:text-rose-400 hover:bg-slate-900'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Rating Floating Badge at bottom right of image */}
        <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-800 flex items-center gap-1 text-amber-400 text-xs font-bold">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span>{pg.rating}</span>
          <span className="text-[10px] text-slate-400">({pg.reviewsCount})</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-white mb-1 group-hover:text-blue-400 transition-colors line-clamp-1">
            {pg.name}
          </h3>

          <p className="text-xs text-slate-400 flex items-center gap-1 mb-2">
            <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>{pg.locality}, Hyderabad</span>
            {nearest && (
              <span className="text-slate-500 text-[10px]">({nearest.distanceKm} km to {nearest.name})</span>
            )}
          </p>

          {/* Amenities Chips */}
          <div className="flex flex-wrap gap-1.5 my-3">
            {pg.amenities?.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-slate-950/60 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md"
              >
                {amenity}
              </span>
            ))}
            {pg.amenities?.length > 3 && (
              <span className="text-[10px] bg-slate-800/60 text-slate-400 px-2 py-0.5 rounded-md">
                +{pg.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Bottom Price & View Button */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between mt-2">
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-semibold">Monthly Rent</span>
            <span className="text-base font-black text-emerald-400">₹{pg.price?.toLocaleString()}</span>
            <span className="text-[10px] text-slate-400 font-normal"> / mo</span>
          </div>

          <button
            onClick={() => onSelectPG(pg)}
            className="text-xs font-semibold px-4 py-2 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 hover:border-blue-500 rounded-xl transition-all flex items-center gap-1 shadow-sm"
          >
            <span>View PG</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
