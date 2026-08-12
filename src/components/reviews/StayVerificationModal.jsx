import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  X,
  FileCheck,
  ShieldCheck,
  UploadCloud,
  FileText,
  CreditCard,
  Building2,
  Key,
  Loader2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { useReviewStore } from '../../store/useReviewStore'
import { toast } from '../../utils/toast'

const verificationMethods = [
  { id: 'receipt', name: 'Rent Receipt Upload', desc: 'Upload digital or printed rent receipt PDF/Image', icon: FileText },
  { id: 'id_card', name: 'PG ID Card Upload', desc: 'Upload resident photo ID card issued by PG management', icon: CreditCard },
  { id: 'agreement', name: 'PG Lease Agreement', desc: 'Upload rental agreement or booking confirmation', icon: Building2 },
  { id: 'owner_code', name: 'Owner Verification Code', desc: 'Enter 6-digit verification pin provided by PG owner', icon: Key },
]

export default function StayVerificationModal({ isOpen, onClose }) {
  if (!isOpen) return null

  const { uploadStayProof, userVerifications } = useReviewStore()
  const [selectedMethod, setSelectedMethod] = useState('receipt')
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [ocrData, setOcrData] = useState(null)
  const [ownerCodeInput, setOwnerCodeInput] = useState('')

  const handleSimulateDocumentUpload = () => {
    setIsScanning(true)
    setScanProgress(20)

    setTimeout(() => setScanProgress(55), 500)
    setTimeout(() => setScanProgress(85), 900)

    setTimeout(() => {
      setScanProgress(100)
      setIsScanning(false)
      const extracted = {
        tenantName: 'Chaitanya Kumar',
        pgName: 'Stanza Living - Skyline House',
        location: 'Madhapur, Hyderabad',
        amount: '₹11,500',
        receiptNo: 'REC-HYD-2026-981',
      }
      setOcrData(extracted)

      uploadStayProof({
        documentType: verificationMethods.find((m) => m.id === selectedMethod)?.name,
        fileName: `${selectedMethod}_proof_2026.pdf`,
        extractedData: extracted,
      })

      toast.success('Stay Verified Successfully!', 'Earned +100 XP & Verified Tenant Badge.')
    }, 1300)
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white space-y-6 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <div>
              <h2 className="text-lg font-bold text-white">Stay Verification System</h2>
              <p className="text-xs text-slate-400">Verify your residence to unlock Verified Tenant Badges</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verification Method Chooser */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Choose Verification Method
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {verificationMethods.map((m) => {
              const Icon = m.icon
              const isSelected = selectedMethod === m.id
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedMethod(m.id)
                    setOcrData(null)
                  }}
                  className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-500/10 text-white shadow-md shadow-emerald-500/10'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Icon className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white">{m.name}</h4>
                    <p className="text-[10px] text-slate-400 leading-normal">{m.desc}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Upload Box / OCR Progress */}
        {selectedMethod !== 'owner_code' ? (
          <div className="space-y-4">
            <div
              onClick={handleSimulateDocumentUpload}
              className="border-2 border-dashed border-slate-700 hover:border-emerald-500 bg-slate-950/80 rounded-2xl p-8 text-center cursor-pointer transition-colors"
            >
              {isScanning ? (
                <div className="space-y-3">
                  <Loader2 className="w-10 h-10 text-emerald-400 animate-spin mx-auto" />
                  <p className="text-xs font-bold text-white">AI OCR Extraction in Progress ({scanProgress}%)</p>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden max-w-xs mx-auto">
                    <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${scanProgress}%` }} />
                  </div>
                </div>
              ) : (
                <>
                  <UploadCloud className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-white">Click to Upload Document for Auto OCR Verification</p>
                  <span className="text-[10px] text-slate-400">PDF, JPG, PNG up to 10MB</span>
                </>
              )}
            </div>

            {/* Extracted OCR Card Output */}
            {ocrData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 space-y-2 text-xs"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" /> OCR Match Confirmed!
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1 border-t border-emerald-500/20">
                  <div>Tenant: <strong className="text-white">{ocrData.tenantName}</strong></div>
                  <div>Property: <strong className="text-white">{ocrData.pgName}</strong></div>
                  <div>Rent Paid: <strong className="text-emerald-400">{ocrData.amount}</strong></div>
                  <div>Receipt #: <strong className="text-white">{ocrData.receiptNo}</strong></div>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-300">Enter Owner Verification Code</label>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                placeholder="e.g. 981245"
                value={ownerCodeInput}
                onChange={(e) => setOwnerCodeInput(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-mono tracking-widest text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleSimulateDocumentUpload}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Verify Code
              </button>
            </div>
          </div>
        )}

        {/* Existing Verifications List */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Verification History ({userVerifications.length})
          </span>
          <div className="space-y-2">
            {userVerifications.map((v) => (
              <div key={v.id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  <div>
                    <h5 className="font-bold text-white">{v.documentType}</h5>
                    <span className="text-[10px] text-slate-500">{v.date}</span>
                  </div>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                  {v.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
