import React from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, ShieldCheck, Sparkles, MapPin, ArrowRight } from 'lucide-react';

export default function CTASection({ onSearchClick, onLoginClick }) {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-r from-blue-950 via-slate-900 to-purple-950 text-white">
      {/* Background glow graphics */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-primary-600/30 via-secondary-600/20 to-amber-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        {/* Top Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs sm:text-sm font-bold border border-white/20 text-amber-300"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>No Brokers • Rent Receipt Audited • Instant Rewards</span>
        </motion.div>

        {/* Headline */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight"
        >
          Ready to Find Your Next PG <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-400 via-purple-300 to-amber-400 bg-clip-text text-transparent">
            with Confidence?
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Join thousands of students and working professionals using verified reviews to choose better PG accommodations in Hyderabad.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <button
            onClick={onSearchClick}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600 hover:from-primary-600 hover:to-secondary-600 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-primary-500/30 hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            <span>Search PGs Now</span>
          </button>

          <button
            onClick={onLoginClick}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-base rounded-2xl border border-white/30 backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <UserPlus className="w-5 h-5 text-amber-400" />
            <span>Create Free Account</span>
          </button>
        </motion.div>

        {/* Footer Micro Tag */}
        <div className="pt-6 text-xs text-slate-400 flex flex-wrap items-center justify-center gap-4">
          <span>📍 Covering Madhapur</span>
          <span>•</span>
          <span>Gachibowli</span>
          <span>•</span>
          <span>Ameerpet</span>
          <span>•</span>
          <span>Hitech City</span>
          <span>•</span>
          <span>Kukatpally</span>
        </div>

      </div>
    </section>
  );
}
