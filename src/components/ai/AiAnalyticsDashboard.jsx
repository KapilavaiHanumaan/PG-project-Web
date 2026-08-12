import React from 'react'
import { Cpu, AlertTriangle, TrendingUp, BarChart2, PieChart, Download, Sparkles, ShieldCheck } from 'lucide-react'
import { useAiStore } from '../../store/useAiStore'
import { toast } from '../../utils/toast'

export default function AiAnalyticsDashboard() {
  const { aiAnalytics, complaintCategories } = useAiStore()

  const handleExport = () => {
    toast.success('AI Analytics Exported', 'Downloaded sentiment & complaint intelligence report.')
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-400" /> AI Intelligence & Predictive Analytics
          </h2>
          <p className="text-xs text-slate-400">NLP sentiment breakdown, complaint category extraction, & predictive demand</p>
        </div>

        <button
          onClick={handleExport}
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Export AI Report CSV
        </button>
      </div>

      {/* Top Metric Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400 block mb-2">Fake Reviews Caught Today</span>
          <span className="text-2xl font-black text-rose-400">{aiAnalytics.fakeReviewsDetectedToday} Flagged</span>
          <span className="text-[10px] text-slate-500 block mt-1">IP & duplication telemetry</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400 block mb-2">Positive Sentiment Ratio</span>
          <span className="text-2xl font-black text-emerald-400">{aiAnalytics.sentimentPositivePct}%</span>
          <span className="text-[10px] text-slate-500 block mt-1">78% positive resident sentiment</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400 block mb-2">Average Review Quality Score</span>
          <span className="text-2xl font-black text-blue-400">{aiAnalytics.avgQualityScore}/100</span>
          <span className="text-[10px] text-slate-500 block mt-1">Detailed text & media evidence</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400 block mb-2">HITECH Occupancy Demand</span>
          <span className="text-2xl font-black text-amber-400">+94% High</span>
          <span className="text-[10px] text-slate-500 block mt-1">Predictive seasonal peak</span>
        </div>
      </div>

      {/* Grid: Complaint Categories & Predictive Demand */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Complaint Intelligence Breakdown */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Top Extracted Complaint Categories
          </h3>

          <div className="space-y-3">
            {complaintCategories.map((c, i) => (
              <div key={i} className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{c.category}</span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${c.color}`}>
                    {c.pct}% ({c.count} mentions)
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Predictive Occupancy Insights */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Predictive Occupancy & Locality Demand
          </h3>

          <div className="space-y-3 pt-2">
            {[
              { locality: 'Madhapur (Mindspace IT Hub)', demand: '96% Peak Demand', trend: '+14% search volume' },
              { locality: 'Gachibowli (DLF Cybercity)', demand: '92% High Demand', trend: '+12% search volume' },
              { locality: 'Ameerpet (Student Hub)', demand: '88% High Demand', trend: '+18% search volume' },
              { locality: 'Kondapur & Financial District', demand: '84% Moderate Demand', trend: '+8% search volume' },
            ].map((loc, idx) => (
              <div key={idx} className="p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-white">{loc.locality}</h4>
                  <span className="text-[10px] text-emerald-400 font-semibold">{loc.trend}</span>
                </div>
                <span className="font-black text-amber-400 text-xs">{loc.demand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
