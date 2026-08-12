import React, { useState } from 'react'
import {
  Search,
  MapPin,
  Clock,
  X,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Map as MapIcon,
  Columns,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { useDiscoveryStore } from '../../store/useDiscoveryStore'
import { ALL_HYDERABAD_LOCALITIES } from '../../data/mockDiscoveryData'

export default function DiscoveryHeader({ onOpenMobileFilters, totalResultsCount }) {
  const {
    searchQuery,
    setSearchQuery,
    locality,
    setLocality,
    viewMode,
    setViewMode,
    searchHistory,
    clearSearchHistory,
  } = useDiscoveryStore()

  const [showHistory, setShowHistory] = useState(false)

  const handleSelectLocality = (locId) => {
    setLocality(locId)
    setShowHistory(false)
  }

  const handleSelectHistoryItem = (term) => {
    setSearchQuery(term)
    setShowHistory(false)
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 backdrop-blur-xl shadow-2xl space-y-4">
      {/* Top Search Bar & View Mode Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Main Input Field & History Popup */}
        <div className="relative flex-1">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-blue-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setShowHistory(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search PGs by name, area, IT park, college (e.g. DLF Cybercity, Madhapur, Girls PG)..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl pl-12 pr-10 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search History Dropdown */}
          {showHistory && searchHistory.length > 0 && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowHistory(false)} />
              <div className="absolute top-14 left-0 right-0 z-40 bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-2xl space-y-2">
                <div className="flex items-center justify-between px-2 text-[11px] font-bold uppercase text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-400" /> Recent Searches
                  </span>
                  <button
                    onClick={clearSearchHistory}
                    className="hover:text-slate-200 transition-colors text-[10px]"
                  >
                    Clear History
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectHistoryItem(item)}
                      className="px-3 py-1.5 rounded-xl bg-slate-950/80 hover:bg-blue-600/20 hover:border-blue-500/50 border border-slate-800 text-xs text-slate-300 transition-all flex items-center gap-1.5"
                    >
                      <span>{item}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* View Mode Toggle & Mobile Filter Trigger */}
        <div className="flex items-center gap-2">
          {/* Mobile Filter Button */}
          <button
            onClick={onOpenMobileFilters}
            className="lg:hidden flex-1 py-3 px-4 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 text-xs font-semibold flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter PGs</span>
          </button>

          {/* View Toggles */}
          <div className="bg-slate-950/80 border border-slate-800 p-1 rounded-2xl flex items-center gap-1">
            {[
              { id: 'split', label: 'Split Map', icon: Columns },
              { id: 'grid', label: 'Grid', icon: LayoutGrid },
              { id: 'list', label: 'List', icon: List },
              { id: 'map', label: 'Map Only', icon: MapIcon },
            ].map((mode) => {
              const Icon = mode.icon
              const isActive = viewMode === mode.id
              return (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id)}
                  title={mode.label}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{mode.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Trending Localities Quick Badges */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-1">
        <span className="text-[11px] font-bold uppercase text-slate-400 flex items-center gap-1 shrink-0 mr-1">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Hot Localities:
        </span>

        {ALL_HYDERABAD_LOCALITIES.map((loc) => {
          const isSelected = locality === loc.id
          return (
            <button
              key={loc.id}
              onClick={() => handleSelectLocality(loc.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {loc.name} {loc.count && <span className="opacity-60 text-[10px]">({loc.count})</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
