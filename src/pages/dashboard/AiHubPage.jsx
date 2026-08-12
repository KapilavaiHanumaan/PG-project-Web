import React, { useState } from 'react'
import { Cpu, ShieldAlert, Sparkles, AlertTriangle } from 'lucide-react'
import AiAnalyticsDashboard from '../../components/ai/AiAnalyticsDashboard'
import BehavioralFraudDashboard from '../../components/ai/BehavioralFraudDashboard'
import PersonalizedRecommendationsCarousel from '../../components/ai/PersonalizedRecommendationsCarousel'

export default function AiHubPage() {
  const [activeTab, setActiveTab] = useState('analytics') // 'analytics' | 'fraud' | 'recommendations'

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          AI, Fraud Detection & Analytics Intelligence Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          NLP Sentiment Analysis, Complaint Extraction, Behavioral Fraud Detection, & Smart Match Engine.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: 'analytics', label: 'AI Analytics & Sentiment', icon: Cpu },
          { id: 'fraud', label: 'Behavioral Fraud Detection', icon: ShieldAlert },
          { id: 'recommendations', label: 'Smart Recommendations', icon: Sparkles },
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

      {/* Active Tab View */}
      {activeTab === 'analytics' && <AiAnalyticsDashboard />}
      {activeTab === 'fraud' && <BehavioralFraudDashboard />}
      {activeTab === 'recommendations' && <PersonalizedRecommendationsCarousel />}
    </div>
  )
}
