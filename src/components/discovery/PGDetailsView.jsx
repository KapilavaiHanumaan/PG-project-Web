import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Star,
  MapPin,
  ShieldCheck,
  Heart,
  CheckSquare,
  Square,
  Phone,
  MessageCircle,
  Share2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Building2,
  Utensils,
  Award,
  Clock,
  Sparkles,
} from 'lucide-react'
import { useDiscoveryStore } from '../../store/useDiscoveryStore'
import { getNearestLandmarks } from '../../utils/distanceCalculator'
import { toast } from '../../utils/toast'
import AiReviewSummaryBox from '../ai/AiReviewSummaryBox'

export default function PGDetailsView({ pg, onClose }) {
  const { savedIds, toggleSave, compareIds, toggleCompare } = useDiscoveryStore()
  const [activeImage, setActiveImage] = useState(pg?.images?.[0] || '')
  const [showInquiryModal, setShowInquiryModal] = useState(false)

  if (!pg) return null

  const isSaved = savedIds.includes(pg.id)
  const isCompared = compareIds.includes(pg.id)
  const landmarks = getNearestLandmarks(pg.lat, pg.lng)

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link Copied!', 'PG details URL copied to clipboard.')
    }
  }

  const handleBookVisit = (e) => {
    e.preventDefault()
    setShowInquiryModal(false)
    toast.success('Visit Requested!', `Owner ${pg.owner?.name} has been notified for your visit request.`)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md p-4 sm:p-6 lg:p-8 flex items-center justify-center font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl text-slate-100 max-h-[90vh] flex flex-col"
      >
        {/* Sticky Top Header Bar */}
        <div className="p-4 sm:px-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between sticky top-0 z-20 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> VERIFIED PROPERTY
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-white truncate max-w-md">{pg.name}</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Share link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleSave(pg.id)}
              className={`p-2 rounded-xl border transition-all ${
                isSaved ? 'bg-rose-600 border-rose-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
              title="Save property"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          {/* 1. Hero Image Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-8 relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
              <img
                src={activeImage || pg.images?.[0]}
                alt={pg.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-bold text-amber-400 flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{pg.rating}</span>
                <span className="text-slate-400">({pg.reviewsCount || 42} verified reviews)</span>
              </div>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-3">
              {pg.images?.slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`h-24 sm:h-28 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === img ? 'border-blue-500 scale-95' : 'border-slate-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* AI Executive Review Summary Box */}
          <AiReviewSummaryBox pgName={pg.name} locality={pg.locality} />

          {/* 2. Overview & Sticky Booking Side Column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {/* Title & Location */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">{pg.name}</h1>
                <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{pg.locality}, Hyderabad • Nearby IT Corridor & Metro</span>
                </p>
              </div>

              {/* Quality & Safety Scores */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Food Quality</span>
                  <span className="text-lg font-bold text-emerald-400">★ {pg.foodRating || 4.6} / 5</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Hygiene Score</span>
                  <span className="text-lg font-bold text-blue-400">★ {pg.hygieneRating || 4.8} / 5</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Security Score</span>
                  <span className="text-lg font-bold text-purple-400">★ {pg.securityRating || 4.9} / 5</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-base font-bold text-white mb-2">About Property</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{pg.description}</p>
              </div>

              {/* Amenities Grid */}
              <div>
                <h3 className="text-base font-bold text-white mb-3">Amenities Included</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {pg.amenities?.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* House Rules */}
              <div>
                <h3 className="text-base font-bold text-white mb-3">House Rules & Policies</h3>
                <div className="space-y-2">
                  {pg.rules?.map((rule, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby Landmarks Intelligence */}
              <div>
                <h3 className="text-base font-bold text-white mb-3">Proximity to IT Parks & Metro</h3>
                <div className="space-y-2">
                  {landmarks.slice(0, 4).map((lm) => (
                    <div key={lm.id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-blue-400" />
                        <span className="font-semibold text-white">{lm.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-emerald-400">{lm.distanceKm} km</span>
                        <span className="text-[10px] text-slate-400 ml-2">({lm.estimates.walk})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Pricing & Booking Card (Right Column) */}
            <div className="lg:col-span-4">
              <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 space-y-6 sticky top-24 shadow-2xl">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold block">Monthly Rent Starting</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-black text-emerald-400">₹{pg.price?.toLocaleString()}</span>
                    <span className="text-xs text-slate-400">/ month</span>
                  </div>
                  <span className="text-xs text-slate-400 mt-1 block">
                    Refundable Security Deposit: <strong className="text-white">₹{pg.deposit?.toLocaleString()}</strong>
                  </span>
                </div>

                {/* Owner Info Box */}
                <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm border border-blue-500/30">
                    {pg.owner?.name?.[0] || 'O'}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{pg.owner?.name}</h4>
                    <span className="text-[10px] font-semibold text-emerald-400">{pg.owner?.badge}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => setShowInquiryModal(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs py-3.5 px-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all text-center"
                  >
                    Schedule Property Visit
                  </button>

                  <a
                    href={`tel:${pg.owner?.phone}`}
                    className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" /> Call Owner Directly
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* SCHEDULE VISIT INQUIRY MODAL */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 relative text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold">Schedule Visit to {pg.name}</h3>
              <button onClick={() => setShowInquiryModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleBookVisit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Preferred Visit Date</label>
                <input
                  type="date"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Preferred Time Slot</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500">
                  <option>Morning (10:00 AM - 1:00 PM)</option>
                  <option>Afternoon (2:00 PM - 5:00 PM)</option>
                  <option>Evening (5:30 PM - 8:00 PM)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/30"
              >
                Confirm Visit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
