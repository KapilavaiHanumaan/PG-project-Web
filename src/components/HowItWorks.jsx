import React from 'react';
import { motion } from 'framer-motion';
import { Search, FileCheck2, UploadCloud, Gift, ArrowRight } from 'lucide-react';
import { TIMELINE_STEPS } from '../data/mockData';

export default function HowItWorks() {
  const iconMap = {
    Search: Search,
    FileCheck2: FileCheck2,
    UploadCloud: UploadCloud,
    Gift: Gift,
  };

  return (
    <section id="how-it-works" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="px-3.5 py-1.5 bg-secondary-50 text-secondary-700 font-bold text-xs rounded-full border border-secondary-100 uppercase tracking-wider">
            Simple 4-Step Journey
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            How <span className="gradient-text-primary">PGTrust</span> Works
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            From discovering your ideal room to earning free metro recharges — here is how easy it is.
          </p>
        </div>

        {/* Timeline Grid with Connecting Line */}
        <div className="relative">
          
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-amber-500 -z-0 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {TIMELINE_STEPS.map((item, idx) => {
              const IconComp = iconMap[item.icon] || Search;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between"
                >
                  {/* Number Circle Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-600 text-white font-black text-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <span className="text-3xl font-black text-slate-300 group-hover:text-primary-600 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center text-xs font-bold text-primary-600 group-hover:translate-x-1 transition-transform">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
