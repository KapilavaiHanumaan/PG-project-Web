import React from 'react'
import { Award, Gift, Zap, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'
import { toast } from '../../utils/toast'

const rewardCoupons = [
  {
    id: 'c1',
    title: '₹500 Rent Off Coupon',
    cost: '500 Points',
    code: 'PGTRUST500',
    desc: 'Applicable on any verified PG booking in Gachibowli & Madhapur.',
  },
  {
    id: 'c2',
    title: '₹1,000 Rent Discount Voucher',
    cost: '950 Points',
    code: 'HYDRENTER1000',
    desc: 'Valid on first month rent deposit for Co-living spaces.',
  },
  {
    id: 'c3',
    title: 'Free Laundry Subscription',
    cost: '400 Points',
    code: 'CLEANLAUNDRY',
    desc: '1 Month complimentary washing & ironing service.',
  },
]

export default function RewardsView() {
  const { user } = useAuthStore()

  const handleRedeem = (title, code) => {
    toast.success('Coupon Redeemed!', `Claimed ${title}. Use code: ${code}`)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-purple-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">PGTrust Rewards Program</h1>
            <p className="text-xs text-slate-300">Earn points by posting verified PG reviews and photos.</p>
          </div>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 px-6 text-center">
          <span className="text-xs text-slate-400 uppercase font-semibold block">Available Points</span>
          <span className="text-3xl font-black text-amber-400">{user?.points || 1250} Pts</span>
        </div>
      </div>

      {/* Coupons */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Gift className="w-5 h-5 text-amber-400" /> Redeemable Rewards & Rent Vouchers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rewardCoupons.map((c) => (
            <div key={c.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold px-2.5 py-1 rounded-lg">
                    {c.cost}
                  </span>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">{c.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{c.desc}</p>
              </div>

              <button
                onClick={() => handleRedeem(c.title, c.code)}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-amber-600/30 transition-all text-center"
              >
                Redeem Voucher
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
