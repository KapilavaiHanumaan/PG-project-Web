import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { GraduationCap, Briefcase, Building2, CheckCircle2, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'
import { toast } from '../../utils/toast'

const roles = [
  {
    id: 'student',
    title: 'Student',
    subtitle: 'Undergraduates, Graduates & Aspirants',
    icon: GraduationCap,
    gradient: 'from-blue-600/20 to-cyan-600/20 border-blue-500/40 text-blue-400',
    selectedBorder: 'border-blue-500 bg-blue-500/10 shadow-blue-500/20',
    description: 'Looking for budget-friendly, safe PGs near universities, coaching hubs (Ameerpet, Dilsukhnagar) or tech hubs.',
    perks: ['Budget filter options', 'Shared room preference matcher', 'Student review badges'],
  },
  {
    id: 'working_professional',
    title: 'Working Professional',
    subtitle: 'IT, Corporate & Tech Workforce',
    icon: Briefcase,
    gradient: 'from-purple-600/20 to-indigo-600/20 border-purple-500/40 text-purple-400',
    selectedBorder: 'border-purple-500 bg-purple-500/10 shadow-purple-500/20',
    description: 'Seeking premium PGs & co-living spaces with Wi-Fi, food services near Gachibowli, HITECH City, Madhapur, & Kondapur.',
    perks: ['Single sharing & AC filters', 'Commute distance calculations', 'Food quality rating matrix'],
  },
  {
    id: 'pg_owner',
    title: 'PG Owner / Manager',
    subtitle: 'Property Owners & Housing Operators',
    icon: Building2,
    gradient: 'from-amber-600/20 to-orange-600/20 border-amber-500/40 text-amber-400',
    selectedBorder: 'border-amber-500 bg-amber-500/10 shadow-amber-500/20',
    description: 'List your PG property, manage room vacancies, collect verified reviews, respond to tenant feedback & boost bookings.',
    perks: ['Verified PG Trust Badge', 'Tenant inquiry lead management', 'Review analytics dashboard'],
  },
]

export default function RoleSelectionPage() {
  const { setRole, role: currentRole } = useAuthStore()
  const [selectedRole, setSelectedRole] = useState(currentRole || 'working_professional')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleContinue = async () => {
    if (!selectedRole) {
      toast.warning('Please select a role', 'Select how you plan to use PGTrust Hyderabad.')
      return
    }

    setIsSubmitting(true)
    try {
      await setRole(selectedRole)
      toast.success('Role Saved!', `Configured account as ${selectedRole.replace('_', ' ').toUpperCase()}.`)
      navigate('/complete-profile')
    } catch (err) {
      toast.error('Failed to save role', err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans">
      {/* Background glow Orbs */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full">
        {/* Header Branding */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" /> Onboarding Step 1 of 2
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Choose Your Platform Role
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Tell us how you intend to use PGTrust Hyderabad so we can customize your dashboard & search preferences.
          </p>
        </div>

        {/* Role Selection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {roles.map((item) => {
            const Icon = item.icon
            const isSelected = selectedRole === item.id

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedRole(item.id)}
                className={`relative rounded-2xl p-6 border cursor-pointer transition-all duration-200 backdrop-blur-xl flex flex-col justify-between ${
                  isSelected
                    ? item.selectedBorder
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                {/* Checkmark Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.gradient}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-500/30'
                        : 'border-slate-700 bg-slate-950/60'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-xs font-medium text-slate-400 mb-3">{item.subtitle}</p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{item.description}</p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-800/60">
                  {item.perks.map((perk, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-400">
                      <Sparkles className="w-3 h-3 text-blue-400 shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Continue Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:px-6 backdrop-blur-xl">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            Selected Role: <strong className="text-white capitalize">{selectedRole?.replace('_', ' ')}</strong>
          </div>
          <button
            onClick={handleContinue}
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 px-8 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>Continue to Profile Wizard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
