import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, CheckCircle2, Award, Gift, Info, ShieldCheck, X } from 'lucide-react'

const mockNotifications = [
  {
    id: 'n1',
    title: 'Review Reward Earned!',
    desc: 'You received +250 PGTrust Points for verifying your review on Sri Sai Deluxe PG.',
    time: '10 mins ago',
    icon: Award,
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  {
    id: 'n2',
    title: 'PG Verification Passed',
    desc: 'Sri Lakshmi Executive PG Gachibowli has passed physical verification.',
    time: '2 hours ago',
    icon: ShieldCheck,
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    id: 'n3',
    title: 'Special Rent Coupon',
    desc: 'Get ₹1,000 instant cashback on booking Madhapur PGs this weekend.',
    time: '1 day ago',
    icon: Gift,
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  },
]

export default function NotificationsPopover({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-2xl border border-slate-800 bg-slate-900/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white">Notifications</h3>
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              3 New
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
          {mockNotifications.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.id} className="p-4 hover:bg-slate-800/40 transition-colors flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="text-xs font-semibold text-white leading-tight">{item.title}</h4>
                    <span className="text-[10px] text-slate-500">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-normal">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950/60 border-t border-slate-800 text-center">
          <button className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors">
            Mark all notifications as read
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
