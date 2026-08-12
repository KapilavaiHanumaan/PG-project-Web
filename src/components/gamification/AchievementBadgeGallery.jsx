import React from 'react'
import { Award, ShieldCheck, Lock, ThumbsUp, ShieldAlert, Flame, FileText, Sparkles } from 'lucide-react'
import { useGamificationStore } from '../../store/useGamificationStore'
import { toast } from '../../utils/toast'

const iconMap = {
  FileText: FileText,
  ShieldCheck: ShieldCheck,
  ThumbsUp: ThumbsUp,
  ShieldAlert: ShieldAlert,
  Award: Award,
  Flame: Flame,
}

export default function AchievementBadgeGallery() {
  const { badges } = useGamificationStore()

  const handleBadgeClick = (badge) => {
    if (badge.unlocked) {
      toast.success(`Badge Unlocked: ${badge.name}`, badge.desc)
    } else {
      toast.info(`Badge Locked: ${badge.name}`, `Progress: ${badge.progress || '0%'}. ${badge.desc}`)
    }
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            Achievements & Reputation Badges
          </h3>
          <p className="text-xs text-slate-400">Unlock badges to increase your reviewer trust score weight</p>
        </div>

        <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-xl">
          {badges.filter((b) => b.unlocked).length} / {badges.length} Unlocked
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((b) => {
          const Icon = iconMap[b.icon] || Award
          return (
            <div
              key={b.id}
              onClick={() => handleBadgeClick(b)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                b.unlocked
                  ? 'bg-slate-950/80 border-amber-500/30 hover:border-amber-500/60 shadow-lg shadow-amber-500/5'
                  : 'bg-slate-950/40 border-slate-800/60 opacity-60 hover:opacity-100'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 ${
                  b.unlocked
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                    : 'bg-slate-900 border-slate-800 text-slate-600'
                }`}
              >
                {b.unlocked ? <Icon className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h4 className="text-xs font-bold text-white truncate">{b.name}</h4>
                  <span className="text-[10px] font-extrabold text-amber-400">+{b.xp} XP</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal mb-2">{b.desc}</p>

                {!b.unlocked && b.progress && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                      <span>Progress</span>
                      <span className="text-blue-400">{b.progress}</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-blue-500 h-full w-2/3" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
