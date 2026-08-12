import React, { useState } from 'react'
import { Building2, GraduationCap, Train, Navigation, Footprints, Car } from 'lucide-react'
import { getNearestLandmarks } from '../../utils/distanceCalculator'

export default function NearbyIntelligence({ lat = 17.4435, lng = 78.3772 }) {
  const [activeCategory, setActiveCategory] = useState('all')

  const landmarks = getNearestLandmarks(lat, lng)

  const filtered = landmarks.filter((item) => {
    if (activeCategory === 'all') return true
    return item.category === activeCategory
  })

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Navigation className="w-4 h-4 text-blue-400" />
            Nearby Places & Commute Intelligence
          </h3>
          <p className="text-xs text-slate-400">Ground distances and estimated travel times in Hyderabad</p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
          {[
            { id: 'all', label: 'All Places' },
            { id: 'it_park', label: 'IT Parks' },
            { id: 'college', label: 'Colleges' },
            { id: 'metro', label: 'Metros' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeCategory === cat.id ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.slice(0, 6).map((item) => (
          <div key={item.id} className="p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
                {item.category === 'it_park' && <Building2 className="w-4 h-4" />}
                {item.category === 'college' && <GraduationCap className="w-4 h-4" />}
                {item.category === 'metro' && <Train className="w-4 h-4" />}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">{item.name}</h4>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                  <span className="flex items-center gap-1"><Footprints className="w-3 h-3 text-slate-500" /> {item.estimates.walk}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Car className="w-3 h-3 text-slate-500" /> {item.estimates.drive}</span>
                </div>
              </div>
            </div>

            <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
              {item.distanceKm} km
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
