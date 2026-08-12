import React from 'react'
import { Award, Sparkles, CheckCircle2, Zap, ShieldCheck } from 'lucide-react'
import { EARNING_RULES } from '../../data/mockGamificationData'

export default function PointsEarningRules() {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            Points Earning Engine & Activity Rules
          </h3>
          <p className="text-xs text-slate-400">Complete community actions to earn points convertible to real vouchers</p>
        </div>

        {/* Daily Cap Badge */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3 text-right">
          <span className="text-[10px] text-amber-300 font-bold uppercase block">Daily Cap Limit</span>
          <span className="text-xs font-black text-white">70 / 200 Pts Earned Today</span>
        </div>
      </div>

      {/* Rules Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EARNING_RULES.map((rule, idx) => (
          <div key={idx} className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
              {rule.badge}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-xs font-bold text-white truncate">{rule.activity}</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-amber-300">
                  +{rule.points} Pts
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">{rule.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
