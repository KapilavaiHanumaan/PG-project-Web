import React, { useState } from 'react'
import { Wallet, Gift, FileText, Zap, Ticket, CreditCard, ArrowUpRight } from 'lucide-react'
import WalletDashboard from '../../components/gamification/WalletDashboard'
import TransactionHistoryLedger from '../../components/gamification/TransactionHistoryLedger'
import PointsEarningRules from '../../components/gamification/PointsEarningRules'
import RewardsMarketplace from '../../components/gamification/RewardsMarketplace'
import RedemptionModal from '../../components/gamification/RedemptionModal'
import { useWalletStore } from '../../store/useWalletStore'

export default function WalletView() {
  const { redeemedCoupons } = useWalletStore()
  const [activeTab, setActiveTab] = useState('ledger') // 'ledger' | 'marketplace' | 'coupons' | 'rules'
  const [selectedReward, setSelectedReward] = useState(null)

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Wallet & Points Economy
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Manage point balances, track earnings history, and redeem digital vouchers for Swiggy, Metro, & Amazon.
        </p>
      </div>

      {/* Main Wallet Dashboard Summary Card */}
      <WalletDashboard
        onOpenMarketplace={() => setActiveTab('marketplace')}
        onOpenLedger={() => setActiveTab('ledger')}
      />

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: 'ledger', label: 'Transaction History Ledger', icon: FileText },
          { id: 'marketplace', label: 'Rewards Marketplace', icon: Gift },
          { id: 'coupons', label: `My Claimed Vouchers (${redeemedCoupons.length})`, icon: Ticket },
          { id: 'rules', label: 'How to Earn Points', icon: Zap },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Views */}
      {activeTab === 'ledger' && <TransactionHistoryLedger />}

      {activeTab === 'marketplace' && (
        <RewardsMarketplace onSelectReward={(reward) => setSelectedReward(reward)} />
      )}

      {activeTab === 'coupons' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white">Your Claimed Vouchers & Coupons</h3>
          {redeemedCoupons.length === 0 ? (
            <div className="p-8 bg-slate-900/60 rounded-3xl border border-slate-800 text-center text-xs text-slate-400">
              No vouchers claimed yet. Visit the Rewards Marketplace to convert points into vouchers.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {redeemedCoupons.map((c) => (
                <div key={c.id} className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400 uppercase text-[10px]">{c.provider}</span>
                    <span className="text-[10px] text-slate-400">Claimed {c.date}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{c.title}</h4>
                  <div className="p-3 bg-slate-950 rounded-xl border border-amber-500/30 font-mono text-center font-bold text-amber-400 tracking-wider">
                    {c.code}
                  </div>
                  <span className="text-[10px] text-slate-500 block text-center">Expires: {c.expiryDate}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'rules' && <PointsEarningRules />}

      {/* Redemption Checkout Modal */}
      {selectedReward && (
        <RedemptionModal reward={selectedReward} onClose={() => setSelectedReward(null)} />
      )}
    </div>
  )
}
