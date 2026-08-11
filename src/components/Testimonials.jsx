import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary-50 text-primary-700 rounded-full text-xs font-bold border border-primary-100">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span>Hyderabad Tenants Speak</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Loved by <span className="gradient-text-primary">Students & Techies</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Read real stories from students and working professionals who found safe, honest PG accommodations across Madhapur, Gachibowli, and Kukatpally.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 hover:border-primary-400/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="w-10 h-10 text-primary-200 absolute top-6 right-6 pointer-events-none group-hover:text-primary-400 transition-colors" />

              <div className="space-y-4">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote Body */}
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* User Profile Card Footer */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary-500 shadow-md"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-extrabold text-sm text-slate-900">{item.name}</h4>
                    <ShieldCheck className="w-4 h-4 text-emerald-500" title="Verified Tenant" />
                  </div>
                  <p className="text-xs text-primary-600 font-semibold">{item.role}</p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" /> {item.locality}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
