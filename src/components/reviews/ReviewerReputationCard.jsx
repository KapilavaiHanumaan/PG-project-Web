import React from 'react'
import { Award, ShieldCheck, Lock, Star, Sparkles, CheckCircle2 } from 'lucide-react'
import { useReviewStore } from '../../store/useReviewStore'
import { useAuthStore } from '../../store/useAuthStore'

export default function ReviewerReputationCard({ onOpenVerificationModal }) {
  const { userReputation } = useReviewStore()
  const { user } = useAuthStore()

  const progressPercent = Math.round((userReputation.xp / userReputation.nextLevelXp) * 100)

  return (
    <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-purple-950/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-blue-500/30 shrink-0">
            L{userReputation.level}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">{userReputation.title}</h3>
              <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Tier {userReputation.level} Reviewer
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {user?.name || 'Explorer'} • {userReputation.xp} / {userReputation.nextLevelXp} Reputation XP
            </p>
          </div>
        </div>

        <button
          onClick={onOpenVerificationModal}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 shrink-0"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Verify Stay Proof (+100 XP)</span>
        </button>
      </div>

      {/* Progress XP Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] font-bold text-slate-400">
          <span>Reputation XP Progress</span>
          <span className="text-blue-400">{progressPercent}% to Level {userReputation.level + 1}</span>
        </div>
        <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Unlocked Badges Showcase */}
      <div className="pt-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Unlocked Reputation Badges ({userReputation.badges?.length})
        </span>
        <div className="flex flex-wrap gap-2">
          {userReputation.badges?.map((badge) => (
            <div
              key={badge.id}
              className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2"
            >
              <Award className={`w-3.5 h-3.5 ${badge.color}`} />
              <span>{badge.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
