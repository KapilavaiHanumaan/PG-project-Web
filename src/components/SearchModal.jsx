import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, MapPin, Filter, Star, Sparkles, Building2 } from 'lucide-react';
import { LOCALITIES, BUDGET_RANGES, GENDER_OPTIONS } from '../data/mockData';

export default function SearchModal({ isOpen, onClose, onApplySearch }) {
  if (!isOpen) return null;

  const [selectedLocality, setSelectedLocality] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('Any Budget');
  const [selectedGender, setSelectedGender] = useState('all');
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onApplySearch({
      locality: selectedLocality,
      budget: selectedBudget,
      gender: selectedGender,
      query
    });
    onClose();
    const el = document.getElementById('featured-pgs');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 border border-slate-100"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 bg-primary-100 text-primary-700 rounded-xl">
              <Search className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-extrabold text-slate-900">Find Verified PGs in Hyderabad</h3>
          </div>
          <p className="text-xs text-slate-500 mb-6">Filter by IT hubs, budget, food preferences and verified stay ratings.</p>

          <form onSubmit={handleSearchSubmit} className="space-y-5">
            {/* Search Keyword Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Locality or Landmark Search</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-primary-600 absolute left-3.5 top-3.5" />
                <input 
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Ameerpet, Cyber Towers, Durgam Cheruvu Metro..."
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-500 outline-none bg-slate-50"
                />
              </div>
            </div>

            {/* Locality Quick Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Select Locality</label>
              <div className="flex flex-wrap gap-2">
                {LOCALITIES.map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setSelectedLocality(loc.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border ${
                      selectedLocality === loc.id
                        ? 'bg-primary-600 text-white border-primary-600 shadow-md'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget & Gender Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Budget Range</label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-500 outline-none bg-white font-medium"
                >
                  {BUDGET_RANGES.map((b, i) => (
                    <option key={i} value={b.label}>{b.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Gender Preference</label>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-500 outline-none bg-white font-medium"
                >
                  {GENDER_OPTIONS.map((g, i) => (
                    <option key={i} value={g.value}>{g.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 hover:from-primary-700 hover:to-secondary-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm mt-4"
            >
              <Search className="w-4 h-4" /> View Filtered Hyderabad PGs
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
