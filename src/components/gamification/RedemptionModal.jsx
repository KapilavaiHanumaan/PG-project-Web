import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { X, CheckCircle2, Copy, Gift, Sparkles, QrCode, AlertCircle, ArrowRight } from 'lucide-react'
import { useWalletStore } from '../../store/useWalletStore'
import { toast } from '../../utils/toast'

export default function RedemptionModal({ reward, onClose }) {
  if (!reward) return null

  const { pointsBalance, redeemReward } = useWalletStore()
  const [step, setStep] = useState(1) // 1: Confirm, 2: Success
  const [generatedCoupon, setGeneratedCoupon] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const canAfford = pointsBalance >= reward.costPoints

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#2563eb', '#8b5cf6'],
      })
    } catch (e) {
      console.log('Confetti playback:', e)
    }
  }

  const handleConfirmRedeem = () => {
    if (!canAfford) return

    setIsProcessing(true)
    setTimeout(() => {
      try {
        const coupon = redeemReward(reward)
        setGeneratedCoupon(coupon)
        setIsProcessing(false)
        setStep(2)
        triggerConfetti()
        toast.success('Redemption Successful!', `Claimed ${reward.title}.`)
      } catch (err) {
        setIsProcessing(false)
        toast.error('Redemption Failed', err.message)
      }
    }, 1000)
  }

  const handleCopyCode = () => {
    if (generatedCoupon?.code && navigator.clipboard) {
      navigator.clipboard.writeText(generatedCoupon.code)
      toast.success('Code Copied!', 'Coupon code copied to clipboard.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-extrabold text-white">Reward Checkout</h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STEP 1: Confirmation */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <img src={reward.image} alt={reward.title} className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <span className="text-[10px] font-bold uppercase text-amber-400">{reward.provider}</span>
                <h4 className="text-xs font-bold text-white">{reward.title}</h4>
                <span className="text-sm font-black text-amber-400 block mt-1">{reward.costPoints} Points</span>
              </div>
            </div>

            {/* Balance check indicator */}
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Current Balance:</span>
              <span className={`font-bold ${canAfford ? 'text-emerald-400' : 'text-rose-400'}`}>
                {pointsBalance} Pts {canAfford ? '✓ Sufficient' : '✗ Insufficient'}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">{reward.instructions}</p>

            <button
              onClick={handleConfirmRedeem}
              disabled={!canAfford || isProcessing}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-amber-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Generating Digital Voucher...</span>
              ) : (
                <>
                  <span>Confirm & Redeem ({reward.costPoints} Pts)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

        {/* STEP 2: Success Voucher Code Display */}
        {step === 2 && generatedCoupon && (
          <div className="text-center space-y-4 py-2">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-white">Voucher Claimed Successfully!</h3>

            {/* Generated Code Box */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/40 space-y-2">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block">YOUR COUPON CODE</span>
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-xl font-black text-amber-400 tracking-wider">{generatedCoupon.code}</span>
                <button
                  onClick={handleCopyCode}
                  className="p-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-lg transition-colors border border-amber-500/30"
                  title="Copy code"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Simulated QR Code Box */}
            <div className="p-3 bg-white rounded-2xl max-w-[140px] mx-auto shadow-inner flex flex-col items-center">
              <QrCode className="w-24 h-24 text-slate-900" />
              <span className="text-[9px] font-bold text-slate-600 mt-1">SCAN AT COUNTER</span>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-blue-600/30"
            >
              Done & View Active Vouchers
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
