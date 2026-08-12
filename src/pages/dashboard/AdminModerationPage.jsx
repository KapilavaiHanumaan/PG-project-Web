import React from 'react'
import ReviewModerationPanel from '../../components/reviews/ReviewModerationPanel'
import FakeReviewDetector from '../../components/reviews/FakeReviewDetector'

export default function AdminModerationPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans pb-12">
      <FakeReviewDetector />
      <ReviewModerationPanel />
    </div>
  )
}
