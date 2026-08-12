import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const initialTransactions = [
  { id: 'tx-101', type: 'verified_review', title: 'Verified PG Review Submission', date: '08 Aug 2026', points: 50, isCredit: true },
  { id: 'tx-102', type: 'photo_upload', title: 'Added 2 Real Room Photos', date: '08 Aug 2026', points: 20, isCredit: true },
  { id: 'tx-103', type: 'referral', title: 'Referral Bonus (Friend Joined PG)', date: '01 Aug 2026', points: 200, isCredit: true },
  { id: 'tx-104', type: 'redemption', title: 'Redeemed Swiggy ₹50 Voucher', date: '28 Jul 2026', points: -500, isCredit: false },
  { id: 'tx-105', type: 'welcome', title: 'Onboarding Welcome Bonus', date: '15 Jul 2026', points: 100, isCredit: true },
]

export const useWalletStore = create(
  persist(
    (set, get) => ({
      pointsBalance: 1250,
      lifetimeEarned: 1850,
      lifetimeRedeemed: 600,
      pendingPoints: 150,
      thisMonthEarnings: 450,
      transactions: initialTransactions,
      redeemedCoupons: [
        {
          id: 'coup-1',
          title: 'Swiggy ₹50 Food Voucher',
          provider: 'Swiggy',
          code: 'SWIGGY-HYD-9812',
          date: '28 Jul 2026',
          expiryDate: '28 Oct 2026',
          rupeeValue: 50,
        },
      ],
      withdrawals: [],

      // Actions
      addPoints: (amount, title, type = 'bonus') => {
        const id = 'tx-' + Date.now()
        const newTx = {
          id,
          type,
          title,
          date: 'Just now',
          points: amount,
          isCredit: amount > 0,
        }

        set((state) => ({
          pointsBalance: state.pointsBalance + amount,
          lifetimeEarned: amount > 0 ? state.lifetimeEarned + amount : state.lifetimeEarned,
          thisMonthEarnings: amount > 0 ? state.thisMonthEarnings + amount : state.thisMonthEarnings,
          transactions: [newTx, ...state.transactions],
        }))
      },

      redeemReward: (reward) => {
        const currentBalance = get().pointsBalance
        if (currentBalance < reward.costPoints) {
          throw new Error(`Insufficient points. You need ${reward.costPoints - currentBalance} more points.`)
        }

        const couponCode = `${reward.provider.toUpperCase().replace(/\s+/g, '')}-HYD-${Math.floor(1000 + Math.random() * 9000)}`
        const newCoupon = {
          id: 'coup-' + Date.now(),
          title: reward.title,
          provider: reward.provider,
          code: couponCode,
          date: 'Just now',
          expiryDate: '90 Days from now',
          rupeeValue: reward.rupeeValue,
        }

        const tx = {
          id: 'tx-' + Date.now(),
          type: 'redemption',
          title: `Redeemed ${reward.title}`,
          date: 'Just now',
          points: -reward.costPoints,
          isCredit: false,
        }

        set((state) => ({
          pointsBalance: state.pointsBalance - reward.costPoints,
          lifetimeRedeemed: state.lifetimeRedeemed + reward.costPoints,
          redeemedCoupons: [newCoupon, ...state.redeemedCoupons],
          transactions: [tx, ...state.transactions],
        }))

        return newCoupon
      },

      requestWithdrawal: (amountRupees, upiId) => {
        const pointsNeeded = amountRupees * 10 // 10 Pts = ₹1 INR
        const currentBalance = get().pointsBalance
        if (currentBalance < pointsNeeded) {
          throw new Error(`Insufficient balance for ₹${amountRupees} withdrawal.`)
        }

        const newWithdrawal = {
          id: 'wth-' + Date.now(),
          amount: amountRupees,
          upiId,
          status: 'processing',
          date: 'Just now',
        }

        const tx = {
          id: 'tx-' + Date.now(),
          type: 'withdrawal',
          title: `UPI Withdrawal to ${upiId}`,
          date: 'Just now',
          points: -pointsNeeded,
          isCredit: false,
        }

        set((state) => ({
          pointsBalance: state.pointsBalance - pointsNeeded,
          lifetimeRedeemed: state.lifetimeRedeemed + pointsNeeded,
          withdrawals: [newWithdrawal, ...state.withdrawals],
          transactions: [tx, ...state.transactions],
        }))
      },
    }),
    {
      name: 'pgtrust-wallet-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
