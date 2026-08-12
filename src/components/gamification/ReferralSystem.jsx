import React, { useState } from 'react'
import { Share2, Copy, Send, Users, CheckCircle2, Award, Sparkles, MessageSquare } from 'lucide-react'
import { useGamificationStore } from '../../store/useGamificationStore'
import { toast } from '../../utils/toast'

export default function ReferralSystem() {
  const { referralCode, referralStats, referralsList, inviteFriend } = useGamificationStore()
  const [inviteInput, setInviteInput] = useState('')

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(referralCode)
      toast.success('Code Copied!', `Referral code ${referralCode} copied to clipboard.`)
    }
  }

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Join PGTrust Hyderabad using my referral code ${referralCode} to find 100% verified PGs near IT Parks & earn ₹100 welcome bonus points!\nhttps://pgtrust.in/invite?code=${referralCode}`
    )
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  const handleSendInvite = (e) => {
    e.preventDefault()
    if (!inviteInput.trim()) return

    inviteFriend(inviteInput.trim())
    setInviteInput('')
    toast.success('Invite Sent!', 'Referral invite sent to your friend.')
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            Referral & Invite Program
          </h3>
          <p className="text-xs text-slate-400">Invite flatmates & earn +100 Pts when they join +200 Pts on first review</p>
        </div>

        {/* 1-Click WhatsApp Button */}
        <button
          onClick={handleWhatsAppShare}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-2 shrink-0 transition-colors"
        >
          <MessageSquare className="w-4 h-4 fill-white" /> Share on WhatsApp
        </button>
      </div>

      {/* Referral Code Box & Invite Input */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Code Box */}
        <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">YOUR UNIQUE REFERRAL CODE</span>
          <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
            <span className="font-mono text-base font-black text-amber-400 tracking-wider">{referralCode}</span>
            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 font-bold text-xs rounded-lg transition-colors border border-amber-500/30 flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" /> Copy Code
            </button>
          </div>
        </div>

        {/* Send Direct Invite */}
        <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">DIRECT INITE (EMAIL / WHATSAPP)</span>
          <form onSubmit={handleSendInvite} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. friend@gmail.com or 9876543210"
              value={inviteInput}
              onChange={(e) => setInviteInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Referral History Ledger */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Invited Friends History ({referralsList.length})
        </span>
        <div className="space-y-2">
          {referralsList.map((ref) => (
            <div key={ref.id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <div>
                  <h5 className="font-bold text-white">{ref.name}</h5>
                  <span className="text-[10px] text-slate-500">{ref.date} • {ref.status}</span>
                </div>
              </div>
              <span className="font-bold text-amber-400 text-xs">{ref.bonus}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
