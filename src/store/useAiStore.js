import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const initialChatMessages = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: 'Hello! I am your PGTrust AI Assistant. Ask me anything like "Best PG near Hitech City under ₹8000?" or "Good PGs for female students near Ameerpet?"',
    timestamp: 'Just now',
  },
]

export const useAiStore = create(
  persist(
    (set, get) => ({
      chatMessages: initialChatMessages,
      aiAnalytics: {
        fakeReviewsDetectedToday: 14,
        sentimentPositivePct: 78,
        sentimentNeutralPct: 15,
        sentimentNegativePct: 7,
        avgQualityScore: 84,
      },
      complaintCategories: [
        { category: 'Food Quality & Taste', count: 48, pct: 32, severity: 'High', color: 'text-rose-400 bg-rose-500/10' },
        { category: 'Wi-Fi Speed & Drops', count: 36, pct: 24, severity: 'Medium', color: 'text-amber-400 bg-amber-500/10' },
        { category: 'Cleanliness & Hygiene', count: 27, pct: 18, severity: 'Medium', color: 'text-purple-400 bg-purple-500/10' },
        { category: 'Security & Curfew', count: 21, pct: 14, severity: 'Low', color: 'text-blue-400 bg-blue-500/10' },
        { category: 'Maintenance & Water', count: 18, pct: 12, severity: 'Low', color: 'text-emerald-400 bg-emerald-500/10' },
      ],
      fraudLogs: [
        {
          id: 'frd-1',
          deviceId: 'FP-9812-HYD',
          ipAddress: '183.82.102.45 (Ameerpet)',
          riskScore: 88,
          status: 'Fraudulent',
          reason: '4 accounts created from identical device fingerprint in 10 minutes',
          date: 'Today, 2:15 PM',
        },
        {
          id: 'frd-2',
          deviceId: 'FP-4410-HYD',
          ipAddress: '49.207.215.12 (Gachibowli)',
          riskScore: 45,
          status: 'Suspicious',
          reason: 'Rapid 5-star review posting without stay proof attachment',
          date: 'Yesterday, 6:40 PM',
        },
      ],

      // Actions
      sendChatMessage: (userQuery) => {
        const userMsg = {
          id: 'msg-' + Date.now(),
          sender: 'user',
          text: userQuery,
          timestamp: 'Just now',
        }

        set((state) => ({ chatMessages: [...state.chatMessages, userMsg] }))

        // Simulate AI response synthesis
        setTimeout(() => {
          let replyText = `I analyzed top verified PGs in Hyderabad matching "${userQuery}". Here are the best recommendations:`
          const q = userQuery.toLowerCase()

          if (q.includes('hitech city') || q.includes('8000') || q.includes('budget')) {
            replyText = `Found 3 top budget-friendly PGs near HITECH City under ₹9,000/mo: 1) Sri Sai Luxury PG (Gachibowli - ₹8,500), 2) Venkateshwara PG (Ameerpet - ₹7,200), 3) Stanza Living (Madhapur - ₹11,500). All include 3-time meals and high-speed Wi-Fi!`
          } else if (q.includes('wifi') || q.includes('internet')) {
            replyText = `Stanza Living Skyline House in Madhapur has the highest rated Wi-Fi (300Mbps dedicated fiber with 99.8% uptime verified by 42 residents).`
          } else if (q.includes('female') || q.includes('women') || q.includes('girls')) {
            replyText = `Sri Sai Luxury PG for Women in Gachibowli is rated #1 for female safety (24/7 CCTV, female resident wardens, DLF walking distance).`
          }

          const aiMsg = {
            id: 'msg-' + (Date.now() + 1),
            sender: 'ai',
            text: replyText,
            timestamp: 'Just now',
            recommendedPgId: 'pg-101',
          }

          set((state) => ({ chatMessages: [...state.chatMessages, aiMsg] }))
        }, 600)
      },

      dismissFraudAlert: (id) => {
        set((state) => ({
          fraudLogs: state.fraudLogs.filter((f) => f.id !== id),
        }))
      },
    }),
    {
      name: 'pgtrust-ai-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
