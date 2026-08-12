import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, Award, TrendingUp, Gift, ArrowUpRight, ShieldCheck, Sparkles, CreditCard, Send } from 'lucide-react'
import { useWalletStore } from '../../store/useWalletStore'
import { useAuthStore } from '../../store/useAuthStore'
import { toast } from '../../utils/toast'

export default function WalletDashboard({ onOpenMarketplace, onOpenLedger, onOpenWithdrawalModal }) {
  const { pointsBalance, lifetimeEarned, lifetimeRedeemed, pendingPoints, thisMonthEarnings, transactions } = useWalletStore()
  const { user } = useAuthStore()

  const rupeeValue = Math.round(pointsBalance / 10)

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner Grid: Fintech Wallet Card & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Fintech-Inspired Gradient Wallet Card */}
        <div className="lg:col-span-5 relative rounded-3xl bg-gradient-to-tr from-blue-900 via-indigo-950 to-purple-900 p-6 sm:p-8 border border-blue-500/30 overflow-hidden shadow-2xl flex flex-col justify-between min-h-[220px]">
          <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Card Top Row */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                <Wallet className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-200">PGTrust Rewards Card</span>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
              Active Balance
            </span>
          </div>

          {/* Balance Amount */}
          <div className="my-4 relative z-10">
            <span className="text-xs text-slate-400 uppercase font-semibold block">Available Point Balance</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-black text-white tracking-tight">{pointsBalance.toLocaleString()}</span>
              <span className="text-sm font-bold text-amber-400">Pts</span>
              <span className="text-xs text-slate-300 ml-2">(≈ ₹{rupeeValue} INR)</span>
            </div>
          </div>

          {/* Card Footer: User & Quick Actions */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between relative z-10 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">CARD HOLDER</span>
              <span className="font-bold text-white uppercase">{user?.name || 'CHAITANYA KUMAR'}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenMarketplace}
                className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/20 transition-all text-xs flex items-center gap-1"
              >
                <Gift className="w-3.5 h-3.5" /> Redeem
              </button>
            </div>
          </div>
        </div>

        {/* Right: Wallet Metric Summary Cards */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 backdrop-blur-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">Lifetime Points Earned</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-black text-white">{lifetimeEarned.toLocaleString()} Pts</span>
            <span className="text-[10px] text-slate-500 mt-1">Verified reviews & photos</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 backdrop-blur-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">Lifetime Redeemed</span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-black text-white">{lifetimeRedeemed.toLocaleString()} Pts</span>
            <span className="text-[10px] text-slate-500 mt-1">Vouchers & Metro recharges</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 backdrop-blur-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">This Month Earnings</span>
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-black text-white">+{thisMonthEarnings.toLocaleString()} Pts</span>
            <span className="text-[10px] text-emerald-400 font-semibold mt-1">+18% vs last month</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 backdrop-blur-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">Pending Review Proof</span>
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <span className="text-2xl font-black text-white">+{pendingPoints} Pts</span>
            <span className="text-[10px] text-slate-500 mt-1">Under OCR verification</span>
          </div>
        </div>
      </div>

      {/* 30-Day Earnings Trend Bar Visualization */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">30-Day Earnings & Activity Trend</h3>
            <p className="text-xs text-slate-400">Monthly breakdown of earned reward points</p>
          </div>
          <button
            onClick={onOpenLedger}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
          >
            View Full Ledger <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="h-32 flex items-end gap-2 pt-4 border-b border-slate-800 pb-2">
          {[30, 45, 20, 60, 90, 40, 110, 80, 50, 130, 70, 150].map((val, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
              <div
                className="w-full bg-blue-600/40 group-hover:bg-blue-500 rounded-t-md transition-all relative"
                style={{ height: `${val}%` }}
              >
                <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[10px] px-1.5 py-0.5 rounded font-bold transition-opacity">
                  +{val * 2}
                </span>
              </div>
              <span className="text-[9px] text-slate-500">W{idx + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
