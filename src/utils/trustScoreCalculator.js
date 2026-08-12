/**
 * Calculates a dynamic 0 - 100 Trust Score for a PG Review based on weighted signals:
 * 1. Stay Verification (+35 pts)
 * 2. Media Evidence (+20 pts)
 * 3. Text Detail & Pros/Cons (+15 pts)
 * 4. Helpful Votes Ratio (+15 pts)
 * 5. Reviewer Reputation Level (+15 pts)
 */
export function calculateTrustScore(review) {
  let score = 25 // base score for any review

  // 1. Stay Verification Signal (+35 pts)
  if (review.verifiedStay || review.proofStatus === 'verified') {
    score += 35
  } else if (review.proofStatus === 'under_review') {
    score += 15
  }

  // 2. Media Evidence Signal (+20 pts)
  if (review.photos && review.photos.length >= 3) {
    score += 20
  } else if (review.photos && review.photos.length >= 1) {
    score += 10
  }

  // 3. Text Detail & Pros/Cons Signal (+15 pts)
  const commentLength = review.comment ? review.comment.length : 0
  if (commentLength > 150) score += 5
  if (review.pros && review.pros.length >= 2) score += 5
  if (review.cons && review.cons.length >= 1) score += 5

  // 4. Helpful Votes Ratio (+15 pts)
  const totalVotes = (review.helpfulCount || 0) + (review.unhelpfulCount || 0)
  if (totalVotes > 0) {
    const ratio = (review.helpfulCount || 0) / totalVotes
    score += Math.round(ratio * 15)
  }

  // 5. Reviewer Reputation Signal (+15 pts)
  if (review.reviewerReputation === 'Elite Reviewer') score += 15
  else if (review.reviewerReputation === 'Expert Reviewer') score += 12
  else if (review.reviewerReputation === 'Trusted Reviewer') score += 8
  else if (review.reviewerReputation === 'Community Contributor') score += 5

  const finalScore = Math.min(100, Math.max(0, score))

  return {
    score: finalScore,
    category: getTrustCategory(finalScore),
  }
}

export function getTrustCategory(score) {
  if (score >= 90) return { label: 'Highly Trusted', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30', badge: '🛡️ Highly Trusted Review' }
  if (score >= 75) return { label: 'Trusted', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30', badge: '✓ Trusted Review' }
  if (score >= 50) return { label: 'Average', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30', badge: '⚡ Unverified Stay' }
  return { label: 'Suspicious', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30', badge: '⚠️ Suspicious Activity' }
}

/**
 * Anti-Fraud Detection Algorithm detecting suspicious signals
 */
export function detectFraudSignals(review) {
  const signals = []
  let riskScore = 0

  if (!review.verifiedStay && review.comment?.length < 30) {
    signals.push({ id: 'short_unverified', text: 'Extremely short text without stay proof', severity: 'medium' })
    riskScore += 25
  }

  if (review.rating === 5 && !review.cons?.length && !review.photos?.length) {
    signals.push({ id: 'perfect_generic', text: 'Generic 5-star rating with zero photos or cons', severity: 'high' })
    riskScore += 35
  }

  if (review.duplicateIpFlag) {
    signals.push({ id: 'ip_cluster', text: 'Multiple reviews submitted from identical IP address', severity: 'high' })
    riskScore += 40
  }

  return {
    riskScore: Math.min(100, riskScore),
    status: riskScore >= 50 ? 'Fraudulent' : riskScore >= 25 ? 'Suspicious' : 'Safe',
    signals,
  }
}
