import React, { useState } from 'react'
import { Trophy, Award, Star, ShieldCheck, Sparkles, Filter } from 'lucide-react'
import { useGamificationStore } from '../../store/useGamificationStore'

export default function CommunityLeaderboard() {
  const { leaderboard } = useGamificationStore()
  const [timePeriod, setTimePeriod] = useState('monthly') // 'weekly' | 'monthly' | 'all_time'

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            Hyderabad Resident Community Leaderboard
          </h3>
          <p className="text-xs text-slate-400">Top reviewers, trust guardians, & active community contributors</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs">
          {[
            { id: 'weekly', label: 'This Week' },
            { id: 'monthly', label: 'This Month' },
            { id: 'all_time', label: 'All Time' },
          ].map((period) => (
            <button
              key={period.id}
              onClick={() => setTimePeriod(period.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                timePeriod === period.id ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Table / Cards */}
      <div className="space-y-3">
        {leaderboard.map((user) => (
          <div
            key={user.rank}
            className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
              user.isCurrentUser
                ? 'bg-blue-950/60 border-blue-500/50 shadow-lg shadow-blue-500/10'
                : user.rank === 1
                ? 'bg-amber-500/10 border-amber-500/30'
                : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Rank Circle */}
              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center font-black text-sm shrink-0 ${
                  user.rank === 1
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : user.rank === 2
                    ? 'bg-slate-300 text-slate-950 border-slate-200'
                    : user.rank === 3
                    ? 'bg-amber-700 text-white border-amber-600'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                #{user.rank}
              </div>

              {/* Avatar & User Details */}
              <img src={user.avatar} alt={user.name} className="w-11 h-11 rounded-xl object-cover border border-slate-700" />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{user.name}</h4>
                  {user.isCurrentUser && (
                    <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-500/30 uppercase">
                      YOU
                    </span>
                  )}
                  {user.badge && (
                    <span className="text-[10px] font-bold text-amber-400">{user.badge}</span>
                  )}
                </div>
                <span className="text-xs text-slate-400">{user.title} • {user.reviews} Verified Reviews</span>
              </div>
            </div>

            {/* Score & Points */}
            <div className="flex items-center gap-4 text-right self-end sm:self-center">
              <div>
                <span className="text-xs font-bold text-slate-400 block">Trust Score</span>
                <span className="text-xs font-extrabold text-emerald-400">{user.trustScore}/100</span>
              </div>
              <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                <span className="text-xs font-black text-amber-400">{user.points.toLocaleString()} Pts</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
