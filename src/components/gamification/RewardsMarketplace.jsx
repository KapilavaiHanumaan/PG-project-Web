import React, { useState } from 'react'
import { Gift, Utensils, Train, Building2, ShoppingBag, Search, Sparkles, CheckCircle2 } from 'lucide-react'
import { REWARDS_CATALOG } from '../../data/mockGamificationData'
import { useWalletStore } from '../../store/useWalletStore'

export default function RewardsMarketplace({ onSelectReward }) {
  const { pointsBalance } = useWalletStore()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRewards = REWARDS_CATALOG.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return item.title.toLowerCase().includes(q) || item.provider.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="space-y-6 font-sans">
      {/* Header & Category Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Gift className="w-5 h-5 text-amber-400" /> Rewards Marketplace
          </h2>
          <p className="text-xs text-slate-400">Redeem points for Swiggy coupons, Metro recharges, & rent vouchers</p>
        </div>

        {/* Category Badges */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs overflow-x-auto">
          {[
            { id: 'all', label: 'All Rewards' },
            { id: 'food', label: 'Food & Dining' },
            { id: 'travel', label: 'Hyderabad Metro' },
            { id: 'pg_benefits', label: 'PG Services' },
            { id: 'shopping', label: 'Shopping' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
                selectedCategory === cat.id ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rewards Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map((reward) => {
          const canAfford = pointsBalance >= reward.costPoints
          return (
            <div
              key={reward.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-3xl overflow-hidden backdrop-blur-xl flex flex-col justify-between group shadow-xl transition-all"
            >
              <div className="relative h-44 overflow-hidden bg-slate-950">
                <img
                  src={reward.image}
                  alt={reward.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-xl shadow-md">
                  {reward.costPoints} Pts
                </div>
                <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg border border-slate-800">
                  ₹{reward.rupeeValue} Value
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">{reward.provider}</span>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">{reward.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{reward.description}</p>
                </div>

                <button
                  onClick={() => onSelectReward(reward)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-lg text-center ${
                    canAfford
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {canAfford ? 'Redeem Voucher Now' : `Need ${reward.costPoints - pointsBalance} More Pts`}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
