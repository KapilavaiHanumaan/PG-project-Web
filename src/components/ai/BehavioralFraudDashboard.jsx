import React from 'react'
import { ShieldAlert, Cpu, Laptop, AlertOctagon, Check, X, ShieldCheck } from 'lucide-react'
import { useAiStore } from '../../store/useAiStore'
import { toast } from '../../utils/toast'

export default function BehavioralFraudDashboard() {
  const { fraudLogs, dismissFraudAlert } = useAiStore()

  const handleBlockDevice = (deviceId) => {
    toast.error('Device Fingerprint Blacklisted', `Device ${deviceId} blocked from reviewing.`)
  }

  const handleDismiss = (id) => {
    dismissFraudAlert(id)
    toast.info('Alert Cleared', 'Fraud telemetry alert resolved.')
  }

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-gradient-to-r from-rose-950/80 via-slate-900 to-purple-950/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-4 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center shrink-0">
              <Laptop className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">Behavioral Fraud & Device Fingerprinting</h2>
              <p className="text-xs text-slate-300">Detects multi-account clusters, rapid review farms, & coordinated rating manipulation.</p>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 px-6 text-center shrink-0">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Active Fraud Risk Index</span>
            <span className="text-2xl font-black text-rose-400">LOW (1.4%)</span>
          </div>
        </div>

        {/* Flagged Telemetry Queue */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Flagged Device Telemetry Logs ({fraudLogs.length})
          </span>

          {fraudLogs.length === 0 ? (
            <div className="p-6 bg-slate-950/60 rounded-2xl border border-slate-800 text-center text-xs text-slate-400">
              Zero active fraud threats. All device fingerprints currently clean.
            </div>
          ) : (
            fraudLogs.map((log) => (
              <div key={log.id} className="p-4 bg-slate-950/80 rounded-2xl border border-rose-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-white">{log.deviceId}</span>
                    <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                      Risk Score: {log.riskScore}% ({log.status})
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px]">{log.reason}</p>
                  <span className="text-[10px] text-slate-500 block mt-1">IP: {log.ipAddress} • {log.date}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleBlockDevice(log.deviceId)}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-colors shadow-md"
                  >
                    Blacklist Device
                  </button>
                  <button
                    onClick={() => handleDismiss(log.id)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
