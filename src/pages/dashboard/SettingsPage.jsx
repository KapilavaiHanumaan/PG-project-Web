import React, { useState } from 'react'
import {
  User,
  Shield,
  Bell,
  Eye,
  Trash2,
  Save,
  CheckCircle2,
  Lock,
  Smartphone,
  Mail,
  AlertTriangle,
  X,
} from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'
import { toast } from '../../utils/toast'

export default function SettingsPage() {
  const { user, updateProfile, logout } = useAuthStore()

  const [activeTab, setActiveTab] = useState('profile')
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    city: user?.city || 'Hyderabad',
    occupation: user?.occupation || 'Software Engineer',
    company: user?.company || 'Microsoft',
  })

  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactor: false,
  })

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: true,
    whatsappAlerts: true,
    marketing: false,
  })

  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showBadges: true,
  })

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')

  const handleSaveProfile = (e) => {
    e.preventDefault()
    updateProfile(profileForm)
    toast.success('Profile Settings Saved', 'Your account profile has been updated.')
  }

  const handleSaveSecurity = (e) => {
    e.preventDefault()
    if (securityForm.newPassword && securityForm.newPassword !== securityForm.confirmPassword) {
      toast.error('Password Mismatch', 'New passwords do not match.')
      return
    }
    toast.success('Security Updated', 'Password and security settings updated successfully.')
    setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '', twoFactor: securityForm.twoFactor })
  }

  const handleDeleteAccount = () => {
    if (deleteConfirmText.toLowerCase() !== 'delete account') {
      toast.error('Confirmation Failed', 'Type "DELETE ACCOUNT" to confirm.')
      return
    }
    setShowDeleteModal(false)
    logout()
    toast.error('Account Deleted', 'Your account and data have been removed.')
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Account Settings & Preferences</h1>
        <p className="text-xs text-slate-400">Manage your profile, security credentials, and privacy controls</p>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: 'profile', label: 'Profile Settings', icon: User },
          { id: 'security', label: 'Security & Password', icon: Shield },
          { id: 'notifications', label: 'Notification Preferences', icon: Bell },
          { id: 'privacy', label: 'Privacy Controls', icon: Eye },
          { id: 'account', label: 'Account Management', icon: Trash2 },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* TAB CONTENT: PROFILE */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6 backdrop-blur-xl">
          <h2 className="text-base font-bold text-white mb-4">Personal & Professional Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Full Name</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Email Address</label>
              <input
                type="email"
                disabled
                value={profileForm.email}
                className="w-full bg-slate-950/40 border border-slate-800/60 rounded-xl px-4 py-3 text-xs text-slate-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Mobile Number</label>
              <input
                type="text"
                value={profileForm.mobile}
                onChange={(e) => setProfileForm({ ...profileForm, mobile: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">City</label>
              <input
                type="text"
                value={profileForm.city}
                onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Occupation</label>
              <input
                type="text"
                value={profileForm.occupation}
                onChange={(e) => setProfileForm({ ...profileForm, occupation: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Company / College</label>
              <input
                type="text"
                value={profileForm.company}
                onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-3 px-6 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Profile Changes
            </button>
          </div>
        </form>
      )}

      {/* TAB CONTENT: SECURITY */}
      {activeTab === 'security' && (
        <form onSubmit={handleSaveSecurity} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6 backdrop-blur-xl">
          <h2 className="text-base font-bold text-white mb-4">Change Password & Security</h2>

          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Current Password</label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={securityForm.currentPassword}
                onChange={(e) => setSecurityForm({ ...securityForm, currentPassword: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">New Password</label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={securityForm.newPassword}
                onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1.5">Confirm New Password</label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={securityForm.confirmPassword}
                onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={securityForm.twoFactor}
                  onChange={(e) => setSecurityForm({ ...securityForm, twoFactor: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <span className="text-xs font-semibold text-white block">Enable 2-Factor Authentication (2FA)</span>
                  <span className="text-[11px] text-slate-400">Receive SMS verification code on login</span>
                </div>
              </label>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-3 px-6 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2"
            >
              <Lock className="w-4 h-4" /> Update Password & Security
            </button>
          </div>
        </form>
      )}

      {/* TAB CONTENT: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6 backdrop-blur-xl">
          <h2 className="text-base font-bold text-white mb-4">Notification Channels & Alerts</h2>

          <div className="space-y-4">
            {[
              { id: 'emailAlerts', title: 'Email Notifications', desc: 'Receive PG review updates, booking confirmations & point receipts.' },
              { id: 'smsAlerts', title: 'SMS Alerts', desc: 'Instant mobile alerts for OTP verification & owner contacts.' },
              { id: 'whatsappAlerts', title: 'WhatsApp Direct Alerts', desc: 'Get new PG listings in Gachibowli & HITECH City directly on WhatsApp.' },
              { id: 'marketing', title: 'Promotional Offers', desc: 'Exclusive rent discount vouchers and cashback campaigns.' },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
                <div>
                  <h4 className="text-xs font-bold text-white">{item.title}</h4>
                  <p className="text-[11px] text-slate-400">{item.desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications[item.id]}
                  onChange={(e) => {
                    setNotifications({ ...notifications, [item.id]: e.target.checked })
                    toast.info('Preference Updated', `${item.title} state toggled.`)
                  }}
                  className="w-5 h-5 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: PRIVACY */}
      {activeTab === 'privacy' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6 backdrop-blur-xl">
          <h2 className="text-base font-bold text-white mb-4">Privacy Controls</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
              <div>
                <h4 className="text-xs font-bold text-white">Public Profile Visibility</h4>
                <p className="text-[11px] text-slate-400">Allow other PG seekers to view your roommate preferences</p>
              </div>
              <input
                type="checkbox"
                checked={privacy.publicProfile}
                onChange={(e) => {
                  setPrivacy({ ...privacy, publicProfile: e.target.checked })
                  toast.info('Privacy Updated')
                }}
                className="w-5 h-5 rounded border-slate-700 bg-slate-950 text-blue-600"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-950/60 rounded-2xl border border-slate-800">
              <div>
                <h4 className="text-xs font-bold text-white">Show Verified Reviewer Badges</h4>
                <p className="text-[11px] text-slate-400">Display your Verified Reviewer badge next to written PG feedback</p>
              </div>
              <input
                type="checkbox"
                checked={privacy.showBadges}
                onChange={(e) => {
                  setPrivacy({ ...privacy, showBadges: e.target.checked })
                  toast.info('Privacy Updated')
                }}
                className="w-5 h-5 rounded border-slate-700 bg-slate-950 text-blue-600"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: ACCOUNT MANAGEMENT */}
      {activeTab === 'account' && (
        <div className="bg-slate-900/80 border border-rose-900/40 rounded-3xl p-6 space-y-6 backdrop-blur-xl">
          <h2 className="text-base font-bold text-rose-400 mb-2">Danger Zone — Account Management</h2>
          <p className="text-xs text-slate-400">Once you delete your account, there is no going back. All PGTrust points will be forfeited.</p>

          <div className="pt-4">
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs py-3 px-6 rounded-xl shadow-lg shadow-rose-600/30 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Delete PGTrust Account
            </button>
          </div>
        </div>
      )}

      {/* DELETE ACCOUNT CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-white text-center">Permanently Delete Account?</h3>
            <p className="text-xs text-slate-400 text-center leading-relaxed">
              This action cannot be undone. Type <strong className="text-rose-400">DELETE ACCOUNT</strong> below to confirm deletion.
            </p>

            <input
              type="text"
              placeholder="Type DELETE ACCOUNT"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:border-rose-500 focus:outline-none"
            />

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-600/30 transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
