import React from 'react'
import { motion } from 'framer-motion'
import { CheckSquare, X, ArrowRight, Trash2 } from 'lucide-react'
import { useDiscoveryStore } from '../../store/useDiscoveryStore'
import { EXPANDED_PGS } from '../../data/mockDiscoveryData'

export default function CompareTrayBar({ onOpenCompareModal }) {
  const { compareIds, toggleCompare, clearCompare } = useDiscoveryStore()

  if (compareIds.length === 0) return null

  const comparedPGs = EXPANDED_PGS.filter((p) => compareIds.includes(p.id))

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 border border-slate-800 rounded-2xl p-3 sm:px-6 shadow-2xl backdrop-blur-2xl flex items-center gap-4 max-w-2xl w-[90%]"
    >
      <div className="flex items-center gap-2">
        <CheckSquare className="w-5 h-5 text-blue-400 shrink-0" />
        <div className="hidden sm:block">
          <h4 className="text-xs font-bold text-white">Compare PGs ({compareIds.length}/4)</h4>
          <span className="text-[10px] text-slate-400">Side-by-side metric comparison</span>
        </div>
      </div>

      {/* Selected Items Avatars */}
      <div className="flex items-center gap-2 flex-1 overflow-x-auto scrollbar-none">
        {comparedPGs.map((pg) => (
          <div key={pg.id} className="relative group shrink-0">
            <img
              src={pg.images[0]}
              alt={pg.name}
              className="w-10 h-10 rounded-xl object-cover border border-blue-500/50"
            />
            <button
              onClick={() => toggleCompare(pg.id)}
              className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-slate-950 border border-slate-700 text-rose-400 hover:text-white flex items-center justify-center text-[10px]"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={clearCompare}
          className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          title="Clear all"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenCompareModal}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-1.5"
        >
          <span>Compare Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}
