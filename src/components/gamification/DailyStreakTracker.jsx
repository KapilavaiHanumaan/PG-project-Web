import React from 'react'
import { Flame, Shield, CheckCircle2, Calendar, Sparkles } from 'lucide-react'
import { useGamificationStore } from '../../store/useGamificationStore'
import { useWalletStore } from '../../store/useWalletStore'
import { toast } from '../../utils/toast'

const milestones = [
  { days: 3, points: 10, claimed: true },
  { days: 7, points: 25, claimed: true },
  { days: 15, points: 50, claimed: false },
  { days: 30, points: 100, claimed: false },
]

export default function DailyStreakTracker() {
  const { streakCount, streakFreezeActive, toggleStreakFreeze } = useGamificationStore()
  const { addPoints } = useWalletStore()

  const handleClaimMilestone = (m) => {
    if (streakCount >= m.days && !m.claimed) {
      addPoints(m.points, `${m.days}-Day Streak Bonus`, 'streak')
      toast.success('Streak Reward Claimed!', `+${m.points} Points added to your wallet.`)
    } else {
      toast.info('Streak Milestone', `Reach ${m.days} consecutive active days to unlock +${m.points} Points.`)
    }
  }

  return (
    <div className="bg-gradient-to-r from-orange-950/80 via-slate-900 to-amber-950/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-6 font-sans shadow-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/20 border border-orange-500/40 text-orange-400 flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-orange-500/20">
            <Flame className="w-8 h-8 text-orange-500 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-white">{streakCount}-Day Login Streak</h3>
              <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-orange-500" /> Active 🔥
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">Visit daily & post reviews to keep your streak multiplier active.</p>
          </div>
        </div>

        {/* Streak Freeze Shield Toggle */}
        <button
          onClick={toggleStreakFreeze}
          className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
            streakFreezeActive
              ? 'bg-blue-600/20 border-blue-500/40 text-blue-300'
              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Shield className={`w-4 h-4 ${streakFreezeActive ? 'text-blue-400 fill-blue-400/20' : ''}`} />
          <span>Streak Freeze Shield ({streakFreezeActive ? 'ENABLED' : 'DISABLED'})</span>
        </button>
      </div>

      {/* Milestone Unlock Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {milestones.map((m) => {
          const isReached = streakCount >= m.days
          return (
            <div
              key={m.days}
              onClick={() => handleClaimMilestone(m)}
              className={`p-3.5 rounded-2xl border text-center cursor-pointer transition-all ${
                isReached
                  ? 'bg-orange-500/10 border-orange-500/40 text-white shadow-md shadow-orange-500/10'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="text-[10px] font-bold uppercase text-slate-400 block">{m.days} Days Milestone</span>
              <span className="text-lg font-black text-amber-400 block my-1">+{m.points} Pts</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md inline-block ${isReached ? 'bg-orange-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                {isReached ? 'UNLOCKED' : 'LOCKED'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
