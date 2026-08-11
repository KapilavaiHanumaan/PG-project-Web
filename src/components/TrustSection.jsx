import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, CheckCircle2, FileText, Cpu, Award, Sparkles } from 'lucide-react';
import { TRUST_STATS, VERIFICATION_PIPELINE } from '../data/mockData';

export default function TrustSection() {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary-500/10 text-primary-400 rounded-full text-xs font-bold border border-primary-500/20">
            <ShieldCheck className="w-4 h-4 text-primary-400" />
            <span>Empirical Verification Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            How We Guarantee <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">100% Trust</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Say goodbye to fake 5-star ratings bought by landlords. Every PG score on PGTrust is backed by real stay documentation.
          </p>
        </div>

        {/* Split Layout: Left Statistics Cards, Right Verification Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Stats Cards */}
          <div className="lg:col-span-5 space-y-6">
            {TRUST_STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-6 bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700/80 hover:border-primary-500/50 shadow-xl transition-all group"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                  <ShieldCheck className="w-6 h-6 text-primary-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{stat.label}</h3>
                <p className="text-xs text-slate-400 mt-1">{stat.subtext}</p>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Visual Verification Flow Pipeline */}
          <div className="lg:col-span-7 bg-slate-800/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-white">Verification Pipeline</h3>
                <p className="text-xs text-slate-400">Strict 4-stage anti-fraud review publishing</p>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 font-bold text-xs rounded-full border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Live Active
              </span>
            </div>

            {/* Pipeline Flow Steps */}
            <div className="space-y-4">
              {VERIFICATION_PIPELINE.map((step, sIdx) => (
                <motion.div
                  key={sIdx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: sIdx * 0.1 }}
                  className="p-4 bg-slate-900/90 rounded-2xl border border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-600 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${step.color} animate-pulse`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold uppercase text-slate-400">{step.status}</span>
                        <span className="text-slate-600">•</span>
                        <h4 className="text-sm font-bold text-white">{step.title}</h4>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{step.desc}</p>
                    </div>
                  </div>

                  {sIdx < VERIFICATION_PIPELINE.length - 1 ? (
                    <span className="hidden sm:inline-block px-2.5 py-1 bg-slate-800 text-slate-300 font-mono text-[11px] rounded-lg border border-slate-700">
                      → Processing
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-300 font-extrabold text-xs rounded-lg border border-amber-500/30 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> +50 PGCoin
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Verification Guarantee Banner */}
            <div className="p-4 bg-gradient-to-r from-primary-900/50 to-purple-900/50 rounded-2xl border border-primary-500/30 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-primary-400 flex-shrink-0" />
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Landlords cannot pay to remove negative reviews.</strong> All reports are permanently logged on-chain once verified.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
