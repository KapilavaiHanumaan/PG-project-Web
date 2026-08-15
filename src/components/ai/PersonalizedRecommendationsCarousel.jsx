import React from 'react'
import { Sparkles, Star, MapPin, ArrowRight, ShieldCheck } from 'lucide-react'
import { EXPANDED_PGS } from '../../data/mockDiscoveryData'
import { calculateSmartRank } from '../../utils/aiPipelineEngine'
import { useDiscoveryStore } from '../../store/useDiscoveryStore'

export default function PersonalizedRecommendationsCarousel() {
  const { setSelectedPGForModal } = useDiscoveryStore()

  // Score PGs using AI Smart Rank Engine
  const rankedPgs = EXPANDED_PGS.map((pg) => ({
    ...pg,
    smartRankScore: calculateSmartRank(pg),
  })).sort((a, b) => b.smartRankScore - a.smartRankScore)

  const topRecommendations = rankedPgs.slice(0, 3)

  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" /> AI Personalized PG Recommendations
          </h2>
          <p className="text-xs text-slate-400">Smart ranked using Trust Score (30%), Ratings (20%), & Proximity (20%)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topRecommendations.map((pg) => (
          <div
            key={pg.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-2xl overflow-hidden backdrop-blur-xl transition-all p-4 space-y-3 flex flex-col justify-between"
          >
            <div className="relative h-36 rounded-xl overflow-hidden">
              <img src={pg.images[0]} alt={pg.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-md shadow-md">
                {pg.smartRankScore}% Match Score
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> VERIFIED TRUST
                </span>
                <span className="text-xs font-bold text-amber-400">★ {pg.rating}</span>
              </div>
              <h3 className="text-sm font-bold text-white leading-snug">{pg.name}</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-blue-400" /> {pg.locality}, Hyderabad
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-sm font-black text-emerald-400">₹{pg.price?.toLocaleString() || '0'}/mo</span>
              <button
                onClick={() => setSelectedPGForModal(pg)}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1"
              >
                View PG <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
