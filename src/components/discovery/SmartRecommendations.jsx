import React from 'react'
import { Sparkles, Star, MapPin, ArrowRight, Heart } from 'lucide-react'
import { EXPANDED_PGS } from '../../data/mockDiscoveryData'
import { useDiscoveryStore } from '../../store/useDiscoveryStore'

export default function SmartRecommendations({ onSelectPG }) {
  const { toggleSave, savedIds } = useDiscoveryStore()

  const recommendedList = EXPANDED_PGS.filter((p) => p.rating >= 4.7)

  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" /> Smart Personalised Recommendations
          </h2>
          <p className="text-xs text-slate-400">Curated PGs matching tech worker & student preferences in Hyderabad</p>
        </div>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-none">
        {recommendedList.map((pg) => {
          const isSaved = savedIds.includes(pg.id)
          return (
            <div
              key={pg.id}
              onClick={() => onSelectPG(pg)}
              className="w-72 shrink-0 bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-3xl overflow-hidden backdrop-blur-xl cursor-pointer group shadow-xl flex flex-col justify-between"
            >
              <div className="relative h-40 overflow-hidden bg-slate-950">
                <img src={pg.images[0]} alt={pg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute top-3 left-3 bg-blue-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-md">
                  TOP PICK
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleSave(pg.id)
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-xl border backdrop-blur-md transition-all ${
                    isSaved ? 'bg-rose-600 border-rose-500 text-white' : 'bg-slate-950/70 border-slate-800 text-slate-300'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white truncate mb-1">{pg.name}</h4>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mb-2">
                    <MapPin className="w-3 h-3 text-blue-400" /> {pg.locality}, Hyderabad
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-sm font-extrabold text-emerald-400">₹{pg.price?.toLocaleString() || '0'}</span>
                  <span className="text-xs text-amber-400 font-bold flex items-center gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {pg.rating}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
