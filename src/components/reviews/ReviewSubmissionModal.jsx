import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Star,
  CheckCircle2,
  Plus,
  Trash2,
  Upload,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Save,
} from 'lucide-react'
import { useReviewStore } from '../../store/useReviewStore'
import { toast } from '../../utils/toast'

export default function ReviewSubmissionModal({ isOpen, onClose }) {
  if (!isOpen) return null

  const { addReview } = useReviewStore()
  const [step, setStep] = useState(1)

  const [ratings, setRatings] = useState({
    overall: 5,
    room: 5,
    food: 4,
    cleanliness: 5,
    security: 5,
    wifi: 4,
    staff: 5,
    value: 5,
  })

  const [details, setDetails] = useState({
    title: '',
    comment: '',
    proInput: '',
    pros: ['Fast 200Mbps Wi-Fi', 'Clean daily housekeeping'],
    conInput: '',
    cons: ['Peak morning hot water wait'],
    moveInDate: '2026-01-01',
    moveOutDate: 'Present',
    photos: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
    ],
  })

  const handleAddPro = () => {
    if (details.proInput.trim()) {
      setDetails((prev) => ({ ...prev, pros: [...prev.pros, prev.proInput.trim()], proInput: '' }))
    }
  }

  const handleAddCon = () => {
    if (details.conInput.trim()) {
      setDetails((prev) => ({ ...prev, cons: [...prev.cons, prev.conInput.trim()], conInput: '' }))
    }
  }

  const handleSimulatePhotoUpload = () => {
    const samplePhotos = [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
    ]
    const nextPhoto = samplePhotos[details.photos.length % samplePhotos.length]
    setDetails((prev) => ({ ...prev, photos: [...prev.photos, nextPhoto] }))
    toast.success('Photo Uploaded', 'Added room evidence photo to review draft.')
  }

  const handleSubmitReview = () => {
    if (!details.title || !details.comment) {
      toast.error('Validation Error', 'Please fill in review title and comment.')
      return
    }

    addReview({
      overallRating: ratings.overall,
      ratings: {
        room: ratings.room,
        food: ratings.food,
        cleanliness: ratings.cleanliness,
        security: ratings.security,
        wifi: ratings.wifi,
        staff: ratings.staff,
        value: ratings.value,
      },
      title: details.title,
      comment: details.comment,
      pros: details.pros,
      cons: details.cons,
      photos: details.photos,
      moveInDate: details.moveInDate,
      moveOutDate: details.moveOutDate,
    })

    toast.success('Review Submitted!', 'Earned +50 PGTrust Points for your verified review.')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto space-y-6"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
              Step {step} of 3 • Review Wizard
            </span>
            <h2 className="text-xl font-extrabold text-white mt-0.5">Submit PG Review</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: Star Ratings Grid */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold text-blue-300">Rate 8 Dimensions to Earn Points</span>
              </div>
              <span className="text-xs font-extrabold text-amber-400">+50 Points</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'overall', label: 'Overall Experience' },
                { key: 'room', label: 'Room Space & Comfort' },
                { key: 'food', label: 'Food Quality & Taste' },
                { key: 'cleanliness', label: 'Cleanliness & Hygiene' },
                { key: 'security', label: 'Safety & Security' },
                { key: 'wifi', label: 'Wi-Fi Speed & Backup' },
                { key: 'staff', label: 'Warden & Staff Behavior' },
                { key: 'value', label: 'Value For Money' },
              ].map((item) => (
                <div key={item.key} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-300">{item.label}</span>
                    <span className="text-xs font-extrabold text-amber-400">{ratings[item.key]} / 5</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatings({ ...ratings, [item.key]: star })}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-5 h-5 ${star <= ratings[item.key] ? 'fill-amber-400' : 'text-slate-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2"
              >
                <span>Next: Review Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Review Title, Text & Pros/Cons */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Headline / Title</label>
              <input
                type="text"
                placeholder="e.g. Excellent Wi-Fi and safe female warden near DLF Cybercity"
                value={details.title}
                onChange={(e) => setDetails({ ...details, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold uppercase text-slate-300">Detailed Feedback</label>
                <span className="text-[10px] text-slate-400">{details.comment.length} / 500 chars</span>
              </div>
              <textarea
                rows={4}
                maxLength={500}
                placeholder="Describe your authentic experience regarding food taste, hot water timing, deposit return, and owner responsiveness..."
                value={details.comment}
                onChange={(e) => setDetails({ ...details, comment: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Pros Input */}
            <div>
              <label className="block text-xs font-bold text-emerald-400 mb-1">Add Key Pros (+)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Fast 300Mbps fiber internet"
                  value={details.proInput}
                  onChange={(e) => setDetails({ ...details, proInput: e.target.value })}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
                <button
                  onClick={handleAddPro}
                  type="button"
                  className="px-3 py-2 bg-emerald-600/20 text-emerald-400 font-bold text-xs rounded-xl border border-emerald-500/30"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {details.pros.map((p, i) => (
                  <span key={i} className="text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                    ✓ {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2.5 bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl"
              >
                Previous
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2"
              >
                <span>Next: Media Evidence</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Photo Upload & Submit */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-2xl">
              <h4 className="text-xs font-bold text-purple-300 mb-1">Add Real Room & Food Evidence Photos</h4>
              <p className="text-[11px] text-slate-400">Reviews with photo evidence receive an automatic +20 Trust Score boost.</p>
            </div>

            {/* Photo Uploader Box */}
            <div
              onClick={handleSimulatePhotoUpload}
              className="border-2 border-dashed border-slate-700 hover:border-blue-500 bg-slate-950/60 rounded-2xl p-6 text-center cursor-pointer transition-colors"
            >
              <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-white">Click to Upload Room / Food Photos</p>
              <span className="text-[10px] text-slate-400">Supports JPG, PNG, MP4 (Max 15MB)</span>
            </div>

            {/* Uploaded Photos Preview */}
            {details.photos.length > 0 && (
              <div>
                <span className="text-xs font-bold text-slate-300 block mb-2">Attached Photos ({details.photos.length})</span>
                <div className="flex gap-3">
                  {details.photos.map((url, i) => (
                    <img key={i} src={url} alt="Attached" className="w-20 h-20 rounded-xl object-cover border border-slate-700" />
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button onClick={() => setStep(2)} className="px-4 py-2.5 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl">
                Previous
              </button>
              <button
                onClick={handleSubmitReview}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs py-3.5 px-8 rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Publish Verified Review
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
