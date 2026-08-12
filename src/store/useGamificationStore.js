import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ACHIEVEMENT_BADGES, LEADERBOARD_USERS } from '../data/mockGamificationData'

export const useGamificationStore = create(
  persist(
    (set, get) => ({
      streakCount: 7,
      streakFreezeActive: true,
      lastActiveDate: '2026-08-12',
      referralCode: 'PGTRUST-CHAITANYA-99',
      referralStats: {
        totalInvited: 5,
        totalJoined: 3,
        pointsEarned: 600,
      },
      referralsList: [
        { id: 'ref-1', name: 'Vikram Mehta', status: 'Joined & Verified', date: '05 Aug 2026', bonus: '+200 Pts' },
        { id: 'ref-2', name: 'Pooja Hegde', status: 'Joined & Verified', date: '01 Aug 2026', bonus: '+200 Pts' },
        { id: 'ref-3', name: 'Rohan Sharma', status: 'Invite Sent', date: '10 Aug 2026', bonus: 'Pending' },
      ],
      badges: ACHIEVEMENT_BADGES,
      leaderboard: LEADERBOARD_USERS,

      // Actions
      incrementStreak: () => {
        set((state) => ({ streakCount: state.streakCount + 1 }))
      },

      toggleStreakFreeze: () => {
        set((state) => ({ streakFreezeActive: !state.streakFreezeActive }))
      },

      inviteFriend: (destination) => {
        const newRef = {
          id: 'ref-' + Date.now(),
          name: destination.split('@')[0] || destination,
          status: 'Invite Sent',
          date: 'Just now',
          bonus: '+100 Pts upon signup',
        }

        set((state) => ({
          referralsList: [newRef, ...state.referralsList],
          referralStats: {
            ...state.referralStats,
            totalInvited: state.referralStats.totalInvited + 1,
          },
        }))
      },

      unlockBadge: (badgeId) => {
        set((state) => ({
          badges: state.badges.map((b) => (b.id === badgeId ? { ...b, unlocked: true } : b)),
        }))
      },
    }),
    {
      name: 'pgtrust-gamification-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
