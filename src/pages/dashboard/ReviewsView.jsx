import React, { useState } from 'react'
import { Plus, ShieldCheck, Star, BarChart2, ShieldAlert, Sparkles } from 'lucide-react'
import ReviewerReputationCard from '../../components/reviews/ReviewerReputationCard'
import ReviewDisplayList from '../../components/reviews/ReviewDisplayList'
import ReviewSubmissionModal from '../../components/reviews/ReviewSubmissionModal'
import StayVerificationModal from '../../components/reviews/StayVerificationModal'
import ReviewAnalyticsDashboard from '../../components/reviews/ReviewAnalyticsDashboard'
import FakeReviewDetector from '../../components/reviews/FakeReviewDetector'
import ReviewModerationPanel from '../../components/reviews/ReviewModerationPanel'

export default function ReviewsView() {
  const [activeTab, setActiveTab] = useState('feed') // 'feed' | 'analytics' | 'fraud' | 'moderation'
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [showVerifyModal, setShowVerifyModal] = useState(false)

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Verified Reviews & Trust System
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Hyderabad's #1 receipt-verified PG reviews, trust scores, & reviewer reputation network.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowVerifyModal(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Verify Stay Proof
          </button>
          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Write PG Review (+50 Pts)
          </button>
        </div>
      </div>

      {/* Reviewer Reputation Card */}
      <ReviewerReputationCard onOpenVerificationModal={() => setShowVerifyModal(true)} />

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: 'feed', label: 'Verified Reviews Feed', icon: Star },
          { id: 'analytics', label: 'Review Analytics', icon: BarChart2 },
          { id: 'fraud', label: 'AI Fake Review Detector', icon: ShieldAlert },
          { id: 'moderation', label: 'Admin Moderation', icon: ShieldCheck },
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

      {/* Tab Panels */}
      {activeTab === 'feed' && <ReviewDisplayList />}
      {activeTab === 'analytics' && <ReviewAnalyticsDashboard />}
      {activeTab === 'fraud' && <FakeReviewDetector />}
      {activeTab === 'moderation' && <ReviewModerationPanel />}

      {/* Modals */}
      <ReviewSubmissionModal isOpen={showSubmitModal} onClose={() => setShowSubmitModal(false)} />
      <StayVerificationModal isOpen={showVerifyModal} onClose={() => setShowVerifyModal(false)} />
    </div>
  )
}
