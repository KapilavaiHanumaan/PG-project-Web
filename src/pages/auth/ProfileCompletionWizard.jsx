import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  User,
  Calendar,
  Building2,
  Briefcase,
  MapPin,
  Utensils,
  BedDouble,
  ArrowRight,
  ArrowLeft,
  Save,
  CheckCircle2,
  Sparkles,
  Camera,
} from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'
import { toast } from '../../utils/toast'

const avatarPresets = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
]

const hyderabadLocalities = [
  'Gachibowli',
  'HITECH City',
  'Madhapur',
  'Kondapur',
  'Financial District',
  'Kukatpally',
  'Ameerpet',
  'Banjara Hills',
  'Jubilee Hills',
  'Dilsukhnagar',
]

export default function ProfileCompletionWizard() {
  const { user, completeProfile } = useAuthStore()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    avatar: user?.avatar || avatarPresets[0],
    gender: user?.gender || 'Male',
    dob: user?.dob || '1999-08-15',
    city: user?.city || 'Hyderabad',
    occupation: user?.occupation || 'Software Engineer',
    company: user?.company || 'Microsoft Hyderabad',
    budgetMin: 8000,
    budgetMax: 16000,
    preferredLocations: user?.preferredLocations || ['Gachibowli', 'HITECH City'],
    foodPref: user?.foodPref || 'North & South Indian',
    roomType: user?.roomType || 'Single Sharing',
  })

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleLocation = (loc) => {
    setFormData((prev) => {
      const exists = prev.preferredLocations.includes(loc)
      if (exists) {
        return { ...prev, preferredLocations: prev.preferredLocations.filter((l) => l !== loc) }
      } else {
        return { ...prev, preferredLocations: [...prev.preferredLocations, loc] }
      }
    })
  }

  const handleSaveDraft = () => {
    toast.info('Draft Saved', 'Your profile progress has been temporarily cached.')
  }

  const handleNextStep = () => {
    if (step === 1 && !formData.name) {
      toast.error('Validation Error', 'Please fill in your full name.')
      return
    }
    if (step === 2 && (!formData.occupation || !formData.company)) {
      toast.error('Validation Error', 'Please enter your occupation and company/college.')
      return
    }
    setStep((prev) => Math.min(prev + 1, 3))
  }

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleFinish = async () => {
    try {
      await completeProfile({
        ...formData,
        budget: `₹${formData.budgetMin.toLocaleString()} - ₹${formData.budgetMax.toLocaleString()}`,
      })
      toast.success('Profile Completed!', 'Welcome to your PGTrust Dashboard.')
      navigate('/dashboard')
    } catch (err) {
      toast.error('Error Completing Profile', err.message)
    }
  }

  const progressPercent = Math.round((step / 3) * 100)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans">
      {/* Glow Orbs */}
      <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full">
        {/* Header Progress indicator */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Step {step} of 3 • {progressPercent}% Complete
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                {step === 1 && 'Personal Information'}
                {step === 2 && 'Residence & Occupation'}
                {step === 3 && 'PG Preferences'}
              </h1>
            </div>

            <button
              onClick={handleSaveDraft}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
            >
              <Save className="w-3.5 h-3.5" /> Save Draft
            </button>
          </div>

          {/* Progress Bar Line */}
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-8">
            <motion.div
              className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full"
              initial={{ width: `${((step - 1) / 3) * 100}%` }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Form Step Content */}
          <AnimatePresence mode="wait">
            {/* STEP 1: Personal Info */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Avatar Picker */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Profile Avatar
                  </label>
                  <div className="flex items-center gap-4">
                    <img
                      src={formData.avatar}
                      alt="Selected Avatar"
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow-lg shadow-blue-500/20"
                    />
                    <div>
                      <p className="text-xs text-slate-400 mb-2">Choose preset profile avatar:</p>
                      <div className="flex items-center gap-2">
                        {avatarPresets.map((url, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => updateField('avatar', url)}
                            className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition-all ${
                              formData.avatar === url
                                ? 'border-blue-500 scale-110'
                                : 'border-slate-800 opacity-60 hover:opacity-100'
                            }`}
                          >
                            <img src={url} alt="Avatar option" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-slate-950/80 border border-slate-800 text-sm rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                    />
                  </div>
                </div>

                {/* Gender & DOB */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Gender */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Gender
                    </label>
                    <div className="flex items-center gap-2">
                      {['Male', 'Female', 'Other'].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => updateField('gender', g)}
                          className={`flex-1 py-3 px-3 rounded-xl border text-xs font-semibold transition-all ${
                            formData.gender === g
                              ? 'border-blue-500 bg-blue-500/20 text-white'
                              : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <Calendar className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        value={formData.dob}
                        onChange={(e) => updateField('dob', e.target.value)}
                        className="w-full bg-slate-950/80 border border-slate-800 text-sm rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Residence & Occupation */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Current City */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Current City
                  </label>
                  <div className="relative">
                    <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={formData.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-800 text-sm rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Pune">Pune</option>
                      <option value="Chennai">Chennai</option>
                    </select>
                  </div>
                </div>

                {/* Occupation */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Occupation
                  </label>
                  <div className="relative">
                    <Briefcase className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.occupation}
                      onChange={(e) => updateField('occupation', e.target.value)}
                      placeholder="e.g. Software Engineer / Student"
                      className="w-full bg-slate-950/80 border border-slate-800 text-sm rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Company / College */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Company or Institution Name
                  </label>
                  <div className="relative">
                    <Building2 className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => updateField('company', e.target.value)}
                      placeholder="e.g. Microsoft Hyderabad / IIIT Hyderabad"
                      className="w-full bg-slate-950/80 border border-slate-800 text-sm rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Preferences */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Budget Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Monthly Budget Range
                    </label>
                    <span className="text-sm font-bold text-blue-400">
                      ₹{formData.budgetMin.toLocaleString()} - ₹{formData.budgetMax.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={4000}
                    max={30000}
                    step={1000}
                    value={formData.budgetMax}
                    onChange={(e) => updateField('budgetMax', parseInt(e.target.value))}
                    className="w-full accent-blue-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>₹4,000</span>
                    <span>₹15,000</span>
                    <span>₹30,000+</span>
                  </div>
                </div>

                {/* Preferred Locations Badges */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Preferred Hyderabad Localities
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {hyderabadLocalities.map((loc) => {
                      const isSelected = formData.preferredLocations.includes(loc)
                      return (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => toggleLocation(loc)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                            isSelected
                              ? 'border-blue-500 bg-blue-500/20 text-white'
                              : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {loc} {isSelected && '✓'}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Food & Room Type Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Food Preference */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Food Preference
                    </label>
                    <div className="relative">
                      <Utensils className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        value={formData.foodPref}
                        onChange={(e) => updateField('foodPref', e.target.value)}
                        className="w-full bg-slate-950/80 border border-slate-800 text-sm rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="North & South Indian">North & South Indian</option>
                        <option value="North Indian Only">North Indian Only</option>
                        <option value="South Indian Only">South Indian Only</option>
                        <option value="Veg Only">Veg Only</option>
                        <option value="Self Cooking / No Food">Self Cooking / No Food</option>
                      </select>
                    </div>
                  </div>

                  {/* Room Type */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Sharing Preference
                    </label>
                    <div className="relative">
                      <BedDouble className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <select
                        value={formData.roomType}
                        onChange={(e) => updateField('roomType', e.target.value)}
                        className="w-full bg-slate-950/80 border border-slate-800 text-sm rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="Single Sharing">Single Room (Private)</option>
                        <option value="2 Sharing">2 Sharing</option>
                        <option value="3 Sharing">3 Sharing</option>
                        <option value="4 Sharing">4 Sharing</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-8 border-t border-slate-800/80 mt-8">
            {step > 1 ? (
              <button
                onClick={handlePrevStep}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white px-4 py-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Previous Step
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/30 transition-all ml-auto"
              >
                <span>Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-600/30 transition-all ml-auto"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete Onboarding & Enter Dashboard</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
