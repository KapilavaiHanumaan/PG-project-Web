import React, { useState } from 'react'
import { Award, Flame, Gift, Users, Trophy, Sparkles } from 'lucide-react'
import DailyStreakTracker from '../../components/gamification/DailyStreakTracker'
import RewardsMarketplace from '../../components/gamification/RewardsMarketplace'
import AchievementBadgeGallery from '../../components/gamification/AchievementBadgeGallery'
import ReferralSystem from '../../components/gamification/ReferralSystem'
import CommunityLeaderboard from '../../components/gamification/CommunityLeaderboard'
import RedemptionModal from '../../components/gamification/RedemptionModal'

export default function RewardsView() {
  const [activeTab, setActiveTab] = useState('marketplace') // 'marketplace' | 'streaks' | 'badges' | 'referrals' | 'leaderboard'
  const [selectedReward, setSelectedReward] = useState(null)

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Rewards, Streaks & Gamification Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Earn points for verified reviews, maintain daily login streaks, unlock achievement badges, & invite friends.
        </p>
      </div>

      {/* Daily Streak Tracker Card */}
      <DailyStreakTracker />

      {/* Gamification Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: 'marketplace', label: 'Rewards Marketplace', icon: Gift },
          { id: 'badges', label: 'Achievement Badges', icon: Award },
          { id: 'referrals', label: 'Refer & Earn (+300 Pts)', icon: Users },
          { id: 'leaderboard', label: 'Community Leaderboard', icon: Trophy },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20'
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
      {activeTab === 'marketplace' && (
        <RewardsMarketplace onSelectReward={(reward) => setSelectedReward(reward)} />
      )}
      {activeTab === 'badges' && <AchievementBadgeGallery />}
      {activeTab === 'referrals' && <ReferralSystem />}
      {activeTab === 'leaderboard' && <CommunityLeaderboard />}

      {/* Redemption Modal */}
      {selectedReward && (
        <RedemptionModal reward={selectedReward} onClose={() => setSelectedReward(null)} />
      )}
    </div>
  )
}
