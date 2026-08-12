import React from 'react'
import { motion } from 'framer-motion'
import { X, CheckCircle2, Star, ShieldCheck, Sparkles, Printer } from 'lucide-react'
import { useDiscoveryStore } from '../../store/useDiscoveryStore'
import { EXPANDED_PGS } from '../../data/mockDiscoveryData'
import { getNearestLandmarks } from '../../utils/distanceCalculator'

export default function ComparePGsModal({ isOpen, onClose }) {
  const { compareIds, clearCompare } = useDiscoveryStore()

  if (!isOpen || compareIds.length === 0) return null

  const items = EXPANDED_PGS.filter((p) => compareIds.includes(p.id))

  // Find lowest price item for best value badge highlight
  const lowestPriceId = items.reduce((min, item) => (item.price < min.price ? item : min), items[0])?.id

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md p-4 sm:p-6 lg:p-8 flex items-center justify-center font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-white max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-4 sm:px-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-extrabold text-white">Side-by-Side PG Comparison Matrix</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 p-2"
            >
              <Printer className="w-4 h-4" /> Print Report
            </button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Table Content */}
        <div className="p-6 overflow-x-auto overflow-y-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="p-3 text-xs font-bold uppercase text-slate-400 w-1/5">Attribute</th>
                {items.map((pg) => (
                  <th key={pg.id} className="p-3 w-1/4 text-center">
                    <div className="relative">
                      {pg.id === lowestPriceId && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full uppercase">
                          Best Price Value
                        </span>
                      )}
                      <img src={pg.images[0]} alt={pg.name} className="w-20 h-20 rounded-2xl object-cover mx-auto mb-2 border border-slate-800" />
                      <h4 className="text-xs font-bold text-white truncate">{pg.name}</h4>
                      <p className="text-[10px] text-slate-400">{pg.locality}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs">
              {/* Monthly Rent */}
              <tr>
                <td className="p-3.5 font-semibold text-slate-300">Monthly Rent</td>
                {items.map((pg) => (
                  <td key={pg.id} className="p-3.5 text-center font-extrabold text-emerald-400 text-sm">
                    ₹{pg.price.toLocaleString()} / mo
                  </td>
                ))}
              </tr>

              {/* Security Deposit */}
              <tr>
                <td className="p-3.5 font-semibold text-slate-300">Refundable Deposit</td>
                {items.map((pg) => (
                  <td key={pg.id} className="p-3.5 text-center text-slate-200">
                    ₹{pg.deposit.toLocaleString()}
                  </td>
                ))}
              </tr>

              {/* Gender Preference */}
              <tr>
                <td className="p-3.5 font-semibold text-slate-300">Gender Rules</td>
                {items.map((pg) => (
                  <td key={pg.id} className="p-3.5 text-center capitalize font-medium text-slate-300">
                    {pg.gender}
                  </td>
                ))}
              </tr>

              {/* Rating & Reviews */}
              <tr>
                <td className="p-3.5 font-semibold text-slate-300">Rating & Reviews</td>
                {items.map((pg) => (
                  <td key={pg.id} className="p-3.5 text-center text-amber-400 font-bold">
                    ★ {pg.rating} ({pg.reviewsCount} reviews)
                  </td>
                ))}
              </tr>

              {/* Food Option */}
              <tr>
                <td className="p-3.5 font-semibold text-slate-300">Food Option</td>
                {items.map((pg) => (
                  <td key={pg.id} className="p-3.5 text-center text-slate-300">
                    {pg.foodOption}
                  </td>
                ))}
              </tr>

              {/* Nearest Landmark Commute */}
              <tr>
                <td className="p-3.5 font-semibold text-slate-300">Nearest Landmark</td>
                {items.map((pg) => {
                  const nearest = getNearestLandmarks(pg.lat, pg.lng)[0]
                  return (
                    <td key={pg.id} className="p-3.5 text-center text-slate-300">
                      {nearest.name} ({nearest.distanceKm} km)
                    </td>
                  )
                })}
              </tr>

              {/* Key Amenities */}
              <tr>
                <td className="p-3.5 font-semibold text-slate-300">Key Amenities</td>
                {items.map((pg) => (
                  <td key={pg.id} className="p-3.5 text-center text-slate-400 text-[11px]">
                    {pg.amenities?.slice(0, 4).join(', ')}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
