import React from 'react'
import { Wallet, ArrowDownRight, ArrowUpRight, ShieldCheck, DollarSign, Plus } from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'
import { toast } from '../../utils/toast'

const transactions = [
  { id: 'tx1', type: 'credit', title: 'PG Review Cashback Reward', date: '08 Aug 2026', amount: '+ ₹250' },
  { id: 'tx2', type: 'credit', title: 'Referral Bonus (Friend Joined Gachibowli PG)', date: '01 Aug 2026', amount: '+ ₹500' },
  { id: 'tx3', type: 'credit', title: 'Onboarding Welcome Bonus', date: '15 Jul 2026', amount: '+ ₹100' },
]

export default function WalletView() {
  const { user } = useAuthStore()

  const handleWithdraw = () => {
    toast.success('Withdrawal Initiated', `₹${user?.walletBalance || 850} requested to UPI ID.`)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Wallet Balance Banner */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <Wallet className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">PGTrust Wallet Balance</h1>
            <p className="text-xs text-slate-300">Direct cashbacks and referral earnings ready for UPI transfer.</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs text-slate-400 uppercase font-semibold block">Total Cash Balance</span>
            <span className="text-3xl font-black text-emerald-400">₹{user?.walletBalance || 850}</span>
          </div>

          <button
            onClick={handleWithdraw}
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-colors shrink-0"
          >
            Withdraw to UPI
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-xl">
        <h2 className="text-base font-bold text-white mb-4">Transaction History</h2>
        <div className="space-y-3">
          {transactions.map((t) => (
            <div key={t.id} className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <ArrowDownRight className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{t.title}</h4>
                  <span className="text-[10px] text-slate-500">{t.date}</span>
                </div>
              </div>
              <span className="text-sm font-extrabold text-emerald-400">{t.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
