import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { calculateTrustScore, detectFraudSignals } from '../utils/trustScoreCalculator'

const initialMockReviews = [
  {
    id: 'rev-201',
    pgId: 'pg-101',
    pgName: 'Stanza Living - Skyline House',
    locality: 'Madhapur',
    user: 'Sandeep Varma',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    occupation: 'Senior Software Engineer at Microsoft',
    verifiedStay: true,
    proofStatus: 'verified',
    proofType: 'Rent Receipt OCR',
    reviewerReputation: 'Expert Reviewer',
    overallRating: 4.8,
    ratings: {
      room: 4.9,
      food: 4.6,
      cleanliness: 4.9,
      security: 5.0,
      wifi: 5.0,
      staff: 4.7,
      value: 4.6,
    },
    title: 'High-speed 300Mbps Wi-Fi and authentic food near Mindspace!',
    comment: 'Stayed here for 8 months during my tech onboarding. Biometric entrance gate gives total peace of mind. Food is prepared fresh twice daily with both North & South thalis.',
    pros: ['300Mbps fiber internet without drops', 'Daily room cleaning by 10 AM', 'Mindspace IT Park is 5 mins walk'],
    cons: ['Single sharing rent is slightly premium'],
    moveInDate: '2025-11-01',
    moveOutDate: 'Present',
    stayDuration: '8 Months',
    photos: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
    ],
    helpfulCount: 42,
    unhelpfulCount: 2,
    postedDate: '3 days ago',
    moderationStatus: 'approved',
    trustScore: 96,
  },
  {
    id: 'rev-202',
    pgId: 'pg-102',
    pgName: 'Sri Sai Luxury PG for Women',
    locality: 'Gachibowli',
    user: 'Ananya Roy',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    occupation: 'Mahindra University Student',
    verifiedStay: true,
    proofStatus: 'verified',
    proofType: 'College PG Agreement',
    reviewerReputation: 'Trusted Reviewer',
    overallRating: 4.7,
    ratings: {
      room: 4.7,
      food: 4.5,
      cleanliness: 4.8,
      security: 5.0,
      wifi: 4.6,
      staff: 4.8,
      value: 4.7,
    },
    title: 'Very safe environment with female wardens & DLF proximity',
    comment: 'Zero security worries. The female warden resides on campus and resolves maintenance queries within 15 minutes. RO water purifiers serviced monthly.',
    pros: ['24/7 CCTV & female security guards', 'Walking distance to DLF Cybercity', 'Unlimited South Indian breakfast'],
    cons: ['Curfew strictly enforced at 10:30 PM'],
    moveInDate: '2026-01-15',
    moveOutDate: 'Present',
    stayDuration: '6 Months',
    photos: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
    ],
    helpfulCount: 28,
    unhelpfulCount: 1,
    postedDate: '1 week ago',
    moderationStatus: 'approved',
    trustScore: 92,
  },
  {
    id: 'rev-203',
    pgId: 'pg-104',
    pgName: 'Venkateshwara Elite Boys PG',
    locality: 'Ameerpet',
    user: 'Suresh Kumar',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    occupation: 'Java Trainee at Naresh IT',
    verifiedStay: false,
    proofStatus: 'pending',
    reviewerReputation: 'New Reviewer',
    overallRating: 4.5,
    ratings: {
      room: 4.3,
      food: 4.4,
      cleanliness: 4.2,
      security: 4.5,
      wifi: 4.5,
      staff: 4.6,
      value: 4.9,
    },
    title: 'Best budget PG for Ameerpet coaching students',
    comment: 'Located right next to Ameerpet Metro interchange. Meals are warm and unlimited.',
    pros: ['Extremely low rent ₹7,200', 'Metro is 2 mins walk'],
    cons: ['4 sharing room is crowded during peak summer'],
    moveInDate: '2026-03-01',
    moveOutDate: 'Present',
    stayDuration: '3 Months',
    photos: [],
    helpfulCount: 12,
    unhelpfulCount: 0,
    postedDate: '2 weeks ago',
    moderationStatus: 'approved',
    trustScore: 68,
  },
]

export const useReviewStore = create(
  persist(
    (set, get) => ({
      reviews: initialMockReviews,
      userVerifications: [
        {
          id: 'ver-1',
          documentType: 'Rent Receipt Upload',
          fileName: 'Rent_Receipt_July_2026.pdf',
          status: 'verified',
          extractedData: { tenantName: 'Chaitanya Kumar', pgName: 'Stanza Living', amount: '₹11,500' },
          date: '10 Aug 2026',
        },
      ],
      userVotes: {}, // { [reviewId]: 'helpful' | 'unhelpful' }
      reportedReviews: [], // [{ reviewId, reason, date }]
      userReputation: {
        level: 3,
        title: 'Expert Reviewer',
        xp: 750,
        nextLevelXp: 1000,
        badges: [
          { id: 'b1', name: 'First Verified Review', icon: 'ShieldCheck', color: 'text-emerald-400' },
          { id: 'b2', name: 'Safety Sentinel', icon: 'Lock', color: 'text-purple-400' },
          { id: 'b3', name: '50+ Helpful Votes', icon: 'Award', color: 'text-amber-400' },
        ],
      },

      // Actions
      addReview: (reviewData) => {
        const id = 'rev-' + Date.now()
        const newReview = {
          id,
          pgId: reviewData.pgId || 'pg-101',
          pgName: reviewData.pgName || 'Sri Sai Executive PG',
          locality: reviewData.locality || 'Gachibowli',
          user: reviewData.user || 'Chaitanya Kumar',
          userAvatar: reviewData.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
          occupation: reviewData.occupation || 'Software Engineer',
          verifiedStay: reviewData.verifiedStay || false,
          proofStatus: reviewData.proofStatus || 'pending',
          reviewerReputation: get().userReputation.title,
          overallRating: reviewData.overallRating,
          ratings: reviewData.ratings,
          title: reviewData.title,
          comment: reviewData.comment,
          pros: reviewData.pros || [],
          cons: reviewData.cons || [],
          moveInDate: reviewData.moveInDate || '2026-01-01',
          moveOutDate: reviewData.moveOutDate || 'Present',
          stayDuration: reviewData.stayDuration || '6 Months',
          photos: reviewData.photos || [],
          helpfulCount: 0,
          unhelpfulCount: 0,
          postedDate: 'Just now',
          moderationStatus: 'approved',
        }

        // Calculate dynamic Trust Score
        const trustMeta = calculateTrustScore(newReview)
        newReview.trustScore = trustMeta.score

        set((state) => ({
          reviews: [newReview, ...state.reviews],
          userReputation: {
            ...state.userReputation,
            xp: state.userReputation.xp + 50,
          },
        }))

        return newReview
      },

      uploadStayProof: (documentData) => {
        const newDoc = {
          id: 'ver-' + Date.now(),
          documentType: documentData.documentType || 'Rent Receipt Upload',
          fileName: documentData.fileName || 'Proof_Document.pdf',
          status: 'verified',
          extractedData: documentData.extractedData || { tenantName: 'Chaitanya Kumar', pgName: 'PGTrust Verified PG' },
          date: 'Just now',
        }

        set((state) => ({
          userVerifications: [newDoc, ...state.userVerifications],
          // Update matching review proof status
          reviews: state.reviews.map((rev) =>
            rev.user === 'Chaitanya Kumar'
              ? { ...rev, verifiedStay: true, proofStatus: 'verified', trustScore: Math.min(100, rev.trustScore + 30) }
              : rev
          ),
          userReputation: {
            ...state.userReputation,
            xp: state.userReputation.xp + 100,
          },
        }))
      },

      voteReview: (reviewId, voteType) => {
        const currentVote = get().userVotes[reviewId]
        if (currentVote === voteType) return // already voted

        set((state) => {
          const updatedVotes = { ...state.userVotes, [reviewId]: voteType }
          const updatedReviews = state.reviews.map((r) => {
            if (r.id === reviewId) {
              let helpful = r.helpfulCount || 0
              let unhelpful = r.unhelpfulCount || 0

              if (voteType === 'helpful') {
                helpful += 1
                if (currentVote === 'unhelpful') unhelpful = Math.max(0, unhelpful - 1)
              } else if (voteType === 'unhelpful') {
                unhelpful += 1
                if (currentVote === 'helpful') helpful = Math.max(0, helpful - 1)
              }

              const updatedRev = { ...r, helpfulCount: helpful, unhelpfulCount: unhelpful }
              updatedRev.trustScore = calculateTrustScore(updatedRev).score
              return updatedRev
            }
            return r
          })

          return { userVotes: updatedVotes, reviews: updatedReviews }
        })
      },

      reportReview: (reviewId, reason) => {
        const report = { reviewId, reason, date: new Date().toISOString() }
        set((state) => ({
          reportedReviews: [...state.reportedReviews, report],
        }))
      },

      approveReview: (reviewId) => {
        set((state) => ({
          reviews: state.reviews.map((r) =>
            r.id === reviewId ? { ...r, moderationStatus: 'approved' } : r
          ),
        }))
      },

      rejectReview: (reviewId) => {
        set((state) => ({
          reviews: state.reviews.map((r) =>
            r.id === reviewId ? { ...r, moderationStatus: 'rejected' } : r
          ),
        }))
      },
    }),
    {
      name: 'pgtrust-review-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
