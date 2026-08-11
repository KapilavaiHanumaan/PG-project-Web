import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Search, Star, MapPin, Sparkles, Award, 
  CheckCircle2, ArrowRight, TrendingUp, Users, Heart
} from 'lucide-react';

export default function HeroSection({ onStartSearch, onExploreReviews }) {
  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-slate-50 bg-grid-pattern">
      {/* Glow Orbs Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-primary-400/20 via-secondary-400/20 to-accent-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-secondary-400/15 rounded-full blur-2xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm rounded-full text-xs sm:text-sm font-bold text-slate-800">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-primary-700">#1 Verified PG Network</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-accent-500" /> Hyderabad IT Corridor
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Find Trusted PGs in Hyderabad <span className="gradient-text-primary">Without the Guesswork</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Browse verified PG reviews, compare amenities, earn rewards for genuine feedback, and make smarter accommodation decisions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onStartSearch}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-600 via-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
              >
                <Search className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>Start Searching</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreReviews}
                className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-base rounded-2xl border border-slate-300 shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Explore Reviews</span>
              </button>
            </div>

            {/* Trust Micro Indicators */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-semibold text-slate-500 border-t border-slate-200/60">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Zero Broker Commission</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Rent Receipt Audited</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Instant Metro Proximity</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Modern Mockup Dashboard */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Dashboard Container */}
            <div className="relative mx-auto max-w-md lg:max-w-none bg-white p-4 sm:p-5 rounded-3xl shadow-2xl border border-slate-200/80">
              
              {/* Fake Window Controls Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex items-center gap-1 px-3 py-1 bg-slate-100 rounded-full text-[11px] font-semibold text-slate-600">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary-600" />
                  <span>pgtrust.in/hyderabad/madhapur</span>
                </div>
              </div>

              {/* Sample PG Card inside Mockup */}
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden shadow-md group">
                  <img 
                    src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80" 
                    alt="Stanza Living Madhapur"
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-emerald-500/90 text-white font-bold text-[11px] px-2.5 py-1 rounded-full backdrop-blur-md">
                    <ShieldCheck className="w-3.5 h-3.5" /> Rent Proof Verified
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-extrabold text-base">Stanza Living - Skyline House</h4>
                        <p className="text-xs text-slate-200 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-accent-400" /> Madhapur • 350m to Metro
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-extrabold text-white">₹11,500<span className="text-[10px] font-normal">/mo</span></p>
                        <div className="flex items-center justify-end gap-1 text-amber-400 text-xs font-bold">
                          <Star className="w-3 h-3 fill-current" /> 4.8 (142)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating & Proof Check Bar */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs">
                      AI
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Fake Review Filter</p>
                      <p className="text-[10px] text-slate-500">128 stay proofs audited</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg text-[11px]">
                    96% Authentic Score
                  </span>
                </div>
              </div>

              {/* Floating Badge 1: Verified Reviews */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -left-6 hidden sm:flex items-center gap-3 px-4 py-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/80"
              >
                <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Community Trust</p>
                  <p className="text-sm font-black text-slate-900">2,500+ Verified Reviews</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Hyderabad PGs */}
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 px-4 py-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/80"
              >
                <div className="p-2.5 bg-purple-100 text-purple-600 rounded-xl">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Covering All Hubs</p>
                  <p className="text-sm font-black text-slate-900">1,200+ Hyderabad PGs</p>
                </div>
              </motion.div>

              {/* Floating Badge 3: Reward Points Toast */}
              <motion.div 
                animate={{ scale: [0.98, 1.02, 0.98] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/2 -right-10 hidden lg:flex items-center gap-2.5 px-3.5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl shadow-lg border border-amber-400/40 text-xs font-bold"
              >
                <Sparkles className="w-4 h-4 text-amber-200 animate-spin" />
                <span>Earn up to 50 pts per review</span>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
