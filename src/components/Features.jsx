import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BrainCircuit, Coins, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { FEATURES } from '../data/mockData';

export default function Features() {
  const iconMap = {
    ShieldCheck: ShieldCheck,
    BrainCircuit: BrainCircuit,
    Coins: Coins,
    MapPin: MapPin,
  };

  return (
    <section id="features" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary-50 text-primary-700 rounded-full text-xs font-bold border border-primary-100">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span>Why 18,000+ Hyderabadi Youth Trust PGTrust</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Built to Eliminate <span className="gradient-text-primary">PG Broker Lies</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            We combine stay proof validation, AI anti-fraud security, and PGCoin rewards to ensure you get exactly what you pay for.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, idx) => {
            const IconComponent = iconMap[feature.icon] || ShieldCheck;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200/80 hover:border-primary-400/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon Box */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                {/* Badge Stat Pill */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    {feature.stat}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
