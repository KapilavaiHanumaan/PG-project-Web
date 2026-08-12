import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react'
import { useNotificationStore } from '../../store/useNotificationStore'

const toastIcons = {
  success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
  error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
  info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
}

const toastStyles = {
  success: 'border-emerald-200 bg-white/95 text-slate-800 shadow-emerald-500/10',
  error: 'border-rose-200 bg-white/95 text-slate-800 shadow-rose-500/10',
  warning: 'border-amber-200 bg-white/95 text-slate-800 shadow-amber-500/10',
  info: 'border-blue-200 bg-white/95 text-slate-800 shadow-blue-500/10',
}

const toastProgressColor = {
  success: 'bg-emerald-500',
  error: 'bg-rose-500',
  warning: 'bg-amber-500',
  info: 'bg-blue-500',
}

export default function ToastContainer() {
  const { notifications, removeNotification } = useNotificationStore()

  return (
    <div
      aria-live="polite"
      className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none"
    >
      <AnimatePresence mode="sync">
        {notifications.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`pointer-events-auto relative overflow-hidden rounded-xl border backdrop-blur-xl p-4 shadow-xl flex items-start gap-3 ${toastStyles[item.type]}`}
          >
            {toastIcons[item.type]}
            <div className="flex-1 pr-2 min-w-0">
              <h4 className="text-sm font-semibold text-slate-900 leading-tight">
                {item.message}
              </h4>
              {item.description && (
                <p className="text-xs text-slate-600 mt-1 leading-normal">
                  {item.description}
                </p>
              )}
            </div>
            <button
              onClick={() => removeNotification(item.id)}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100 shrink-0"
              aria-label="Close toast notification"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Progress line */}
            {item.duration > 0 && (
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: item.duration / 1000, ease: 'linear' }}
                className={`absolute bottom-0 left-0 h-1 ${toastProgressColor[item.type]}`}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
