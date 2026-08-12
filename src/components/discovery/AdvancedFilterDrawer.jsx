import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, SlidersHorizontal, RotateCcw, Check, Star, ShieldCheck, Sparkles } from 'lucide-react'
import { useDiscoveryStore } from '../../store/useDiscoveryStore'
import { ALL_AMENITIES } from '../../data/mockDiscoveryData'

export default function AdvancedFilterDrawer({ isOpen, onClose }) {
  const {
    minPrice,
    maxPrice,
    gender,
    roomType,
    foodOption,
    minRating,
    selectedAmenities,
    setFilter,
    toggleAmenity,
    resetFilters,
  } = useDiscoveryStore()

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-blue-400" />
          <h3 className="text-base font-bold text-white">Filter Properties</h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 font-medium transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
        </button>
      </div>

      {/* 1. Monthly Rent Budget Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Max Monthly Rent
          </label>
          <span className="text-sm font-extrabold text-emerald-400">
            Up to ₹{maxPrice.toLocaleString()} / mo
          </span>
        </div>
        <input
          type="range"
          min={5000}
          max={25000}
          step={1000}
          value={maxPrice}
          onChange={(e) => setFilter('maxPrice', parseInt(e.target.value))}
          className="w-full accent-blue-500 h-2 bg-slate-950 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
          <span>₹5,000</span>
          <span>₹15,000</span>
          <span>₹25,000+</span>
        </div>
      </div>

      {/* 2. Gender Preference */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
          Gender Preference
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'all', label: 'All Preferences' },
            { id: 'boys', label: 'Boys PG' },
            { id: 'girls', label: 'Girls PG' },
            { id: 'co-living', label: 'Co-Living / Unisex' },
          ].map((g) => (
            <button
              key={g.id}
              onClick={() => setFilter('gender', g.id)}
              className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                gender === g.id
                  ? 'border-blue-500 bg-blue-500/20 text-white shadow-sm'
                  : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Room Occupancy Sharing Type */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
          Room Occupancy Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'all', label: 'Any Occupancy' },
            { id: 'Single Sharing', label: 'Single Room (Private)' },
            { id: '2 Sharing', label: '2 Sharing' },
            { id: '3 Sharing', label: '3 Sharing' },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setFilter('roomType', r.id)}
              className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                roomType === r.id
                  ? 'border-blue-500 bg-blue-500/20 text-white'
                  : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Minimum Rating Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
          Minimum PGTrust Rating
        </label>
        <div className="flex items-center gap-2">
          {[
            { val: 0, label: 'Any Rating' },
            { val: 4.0, label: '4.0+ ★' },
            { val: 4.5, label: '4.5+ ★' },
            { val: 4.8, label: '4.8+ ★ Top' },
          ].map((rate) => (
            <button
              key={rate.val}
              onClick={() => setFilter('minRating', rate.val)}
              className={`flex-1 py-2 rounded-xl border text-xs font-semibold transition-all ${
                minRating === rate.val
                  ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                  : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
              }`}
            >
              {rate.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Food Preferences */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
          Food Options
        </label>
        <div className="space-y-2">
          {[
            { id: 'all', label: 'All Meals Included' },
            { id: 'North & South Indian', label: 'North & South Indian Fusion' },
            { id: 'South Indian Only', label: 'South Indian Specials' },
          ].map((f) => (
            <label key={f.id} className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300">
              <input
                type="radio"
                name="foodOpt"
                checked={foodOption === f.id}
                onChange={() => setFilter('foodOption', f.id)}
                className="w-4 h-4 text-blue-600 bg-slate-950 border-slate-700 focus:ring-blue-500"
              />
              <span>{f.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 6. Multi-select Amenities */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
          Select Key Amenities ({selectedAmenities.length} selected)
        </label>
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {ALL_AMENITIES.map((amenity) => {
            const isChecked = selectedAmenities.includes(amenity.name)
            return (
              <label
                key={amenity.id}
                onClick={() => toggleAmenity(amenity.name)}
                className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer text-xs transition-all ${
                  isChecked
                    ? 'border-blue-500/60 bg-blue-500/10 text-white font-semibold'
                    : 'border-slate-800/80 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span>{amenity.name}</span>
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center ${
                    isChecked ? 'bg-blue-600 border-blue-500 text-white' : 'border-slate-700'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3" />}
                </div>
              </label>
            )
          })}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar Container */}
      <aside className="hidden lg:block w-72 shrink-0 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl h-fit sticky top-20">
        {content}
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto bg-slate-900 border-t border-slate-800 rounded-t-3xl p-6 shadow-2xl"
            >
              {content}
              <div className="pt-6 border-t border-slate-800 mt-6">
                <button
                  onClick={onClose}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3.5 px-4 rounded-xl shadow-lg shadow-blue-600/30"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
