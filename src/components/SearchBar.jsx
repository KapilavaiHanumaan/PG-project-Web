import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Wallet, Users, ChevronDown, Sparkles } from 'lucide-react';
import { LOCALITIES, BUDGET_RANGES, GENDER_OPTIONS } from '../data/mockData';

export default function SearchBar({ onFilterChange }) {
  const [selectedLocality, setSelectedLocality] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('Any Budget');
  const [selectedGender, setSelectedGender] = useState('all');

  const quickChips = [
    { name: 'Madhapur', id: 'madhapur' },
    { name: 'Gachibowli', id: 'gachibowli' },
    { name: 'Kukatpally', id: 'kukatpally' },
    { name: 'Ameerpet', id: 'ameerpet' },
    { name: 'Hitech City', id: 'hitech' },
  ];

  const handleApplyFilter = (e) => {
    e?.preventDefault();
    if (onFilterChange) {
      onFilterChange({
        locality: selectedLocality,
        budget: selectedBudget,
        gender: selectedGender
      });
    }
    const el = document.getElementById('featured-pgs');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChipClick = (id) => {
    setSelectedLocality(id);
    if (onFilterChange) {
      onFilterChange({
        locality: id,
        budget: selectedBudget,
        gender: selectedGender
      });
    }
    const el = document.getElementById('featured-pgs');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative -mt-8 z-20 max-w-6xl mx-auto px-4 sm:px-6">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white/95 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-200/80"
      >
        <form onSubmit={handleApplyFilter} className="grid grid-cols-1 md:grid-cols-12 gap-3 lg:gap-4 items-center">
          
          {/* Location Field */}
          <div className="md:col-span-4 bg-slate-50 hover:bg-slate-100/80 p-3 rounded-2xl border border-slate-200 transition-all group">
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-0.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-primary-600" /> Locality / Area
            </label>
            <div className="relative">
              <select
                value={selectedLocality}
                onChange={(e) => setSelectedLocality(e.target.value)}
                className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none cursor-pointer pr-6 appearance-none"
              >
                {LOCALITIES.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} {loc.tag ? `(${loc.tag})` : ''}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-1 top-1 pointer-events-none" />
            </div>
          </div>

          {/* Budget Range Field */}
          <div className="md:col-span-3 bg-slate-50 hover:bg-slate-100/80 p-3 rounded-2xl border border-slate-200 transition-all">
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-0.5 flex items-center gap-1">
              <Wallet className="w-3.5 h-3.5 text-accent-500" /> Budget / Month
            </label>
            <div className="relative">
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none cursor-pointer pr-6 appearance-none"
              >
                {BUDGET_RANGES.map((b, idx) => (
                  <option key={idx} value={b.label}>{b.label}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-1 top-1 pointer-events-none" />
            </div>
          </div>

          {/* Gender Preference Field */}
          <div className="md:col-span-3 bg-slate-50 hover:bg-slate-100/80 p-3 rounded-2xl border border-slate-200 transition-all">
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-0.5 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-secondary-600" /> Room / Sharing
            </label>
            <div className="relative">
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none cursor-pointer pr-6 appearance-none"
              >
                {GENDER_OPTIONS.map((g, idx) => (
                  <option key={idx} value={g.value}>{g.label}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-1 top-1 pointer-events-none" />
            </div>
          </div>

          {/* Search Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-extrabold rounded-2xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>

        </form>

        {/* Quick Search Chips */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Popular Hyderabad Hubs:
          </span>
          {quickChips.map((chip) => (
            <button
              key={chip.id}
              onClick={() => handleChipClick(chip.id)}
              className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${
                selectedLocality === chip.id
                  ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                  : 'bg-slate-100/90 hover:bg-primary-50 text-slate-700 hover:text-primary-700 border-slate-200'
              }`}
            >
              {chip.name}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
