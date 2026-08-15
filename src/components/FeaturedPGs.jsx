import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, ShieldCheck, MapPin, Train, Wifi, Utensils, 
  Wind, Lock, ArrowRight, Eye, Sparkles, Filter, CheckCircle2 
} from 'lucide-react';
import { FEATURED_PGS, LOCALITIES } from '../data/mockData';

export default function FeaturedPGs({ onSelectPG, filterState }) {
  const [activeLocality, setActiveLocality] = useState('all');
  const [activeGender, setActiveGender] = useState('all');

  // Filter logic combining top search bar filterState or local tab click
  const filteredPGs = FEATURED_PGS.filter((pg) => {
    // Locality check
    const targetLocality = filterState?.locality && filterState.locality !== 'all' 
      ? filterState.locality 
      : activeLocality;
    if (targetLocality !== 'all' && pg.locality.toLowerCase() !== targetLocality.toLowerCase()) {
      return false;
    }

    // Gender check
    const targetGender = filterState?.gender && filterState.gender !== 'all' 
      ? filterState.gender 
      : activeGender;
    if (targetGender !== 'all' && pg.gender !== targetGender) {
      return false;
    }

    return true;
  });

  return (
    <section id="featured-pgs" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary-50 text-primary-700 rounded-full text-xs font-bold border border-primary-100 mb-3">
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span>Handpicked & Stay Audited</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Featured <span className="gradient-text-primary">Hyderabad PGs</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Verified rent receipts, zero broker deposit traps, and 100% authentic food ratings.
            </p>
          </div>

          {/* Gender Filter Buttons */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm self-start md:self-auto">
            {[
              { label: 'All PGs', val: 'all' },
              { label: 'Boys', val: 'boys' },
              { label: 'Girls', val: 'girls' },
              { label: 'Co-Living', val: 'co-living' },
            ].map((tab) => (
              <button
                key={tab.val}
                onClick={() => setActiveGender(tab.val)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeGender === tab.val
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Locality Chips Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Locality:
          </span>
          {LOCALITIES.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setActiveLocality(loc.id)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all border ${
                activeLocality === loc.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {loc.name}
            </button>
          ))}
        </div>

        {/* PG Cards Grid */}
        {filteredPGs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <p className="text-lg font-bold text-slate-800">No PGs match your selected filter criteria.</p>
            <p className="text-sm text-slate-500">Try selecting 'All Areas' or 'All PGs' to view more accommodations.</p>
            <button 
              onClick={() => { setActiveLocality('all'); setActiveGender('all'); }}
              className="px-5 py-2.5 bg-primary-600 text-white text-xs font-bold rounded-xl shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPGs.map((pg, idx) => (
              <motion.div
                key={pg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Image Header Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                    <img 
                      src={pg.image} 
                      alt={pg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-3 py-1 bg-emerald-500/90 text-white font-bold text-[11px] rounded-full backdrop-blur-md flex items-center gap-1 shadow-md">
                        <ShieldCheck className="w-3.5 h-3.5" /> Rent Proof Verified
                      </span>
                      <span className="px-2.5 py-1 bg-slate-900/80 text-white font-bold text-[11px] rounded-full backdrop-blur-md capitalize">
                        {pg.gender} PG
                      </span>
                    </div>

                    {/* Bottom Info Bar inside image */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 bg-accent-500 text-slate-900 rounded mb-1 inline-block">
                        {pg.badge}
                      </span>
                      <h3 className="text-lg font-extrabold leading-snug">{pg.name}</h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-4">
                    
                    {/* Location & Metro Distance */}
                    <div className="space-y-1 text-xs text-slate-600">
                      <p className="flex items-center gap-1.5 font-semibold text-slate-900">
                        <MapPin className="w-4 h-4 text-accent-500" /> {pg.locality}, Hyderabad
                      </p>
                      <p className="flex items-center gap-1.5 text-slate-500">
                        <Train className="w-4 h-4 text-primary-600" /> {pg.distanceMetro}
                      </p>
                    </div>

                    {/* Price & Rating */}
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Rent / Mo</span>
                        <span className="text-xl font-extrabold text-slate-900">₹{pg.price?.toLocaleString() || '0'}</span>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-amber-500 font-extrabold text-sm justify-end">
                          <Star className="w-4 h-4 fill-current" /> {pg.rating}
                        </div>
                        <span className="text-[11px] text-slate-500">{pg.verifiedCount} verified reviews</span>
                      </div>
                    </div>

                    {/* Amenity Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {pg.amenities.slice(0, 4).map((amenity, aIdx) => (
                        <span key={aIdx} className="px-2.5 py-1 bg-slate-100 text-slate-700 font-medium text-[11px] rounded-lg">
                          {amenity}
                        </span>
                      ))}
                      {pg.amenities.length > 4 && (
                        <span className="px-2 py-1 bg-primary-50 text-primary-700 font-bold text-[11px] rounded-lg">
                          +{pg.amenities.length - 4} more
                        </span>
                      )}
                    </div>

                  </div>
                </div>

                {/* Card Footer Button */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => onSelectPG(pg)}
                    className="w-full py-3 bg-slate-900 hover:bg-primary-600 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm group-hover:bg-primary-600"
                  >
                    <Eye className="w-4 h-4" /> View Details & Reviews
                  </button>
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
