import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ShieldCheck, Star, MapPin, Train, Building2, CheckCircle2, 
  Wifi, Utensils, Zap, Lock, Sparkles, MessageSquare, ThumbsUp, 
  PhoneCall, Heart, Send
} from 'lucide-react';

export default function PGDetailModal({ pg, isOpen, onClose, onOpenLogin }) {
  if (!isOpen || !pg) return null;

  const [activeTab, setActiveTab] = useState('overview');
  const [inquirySent, setInquirySent] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
    }, 4000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
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
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 border border-slate-100 max-h-[90vh] flex flex-col"
        >
          {/* Header Image Bar */}
          <div className="relative h-64 sm:h-72 w-full bg-slate-900 overflow-hidden flex-shrink-0">
            <img 
              src={pg.image} 
              alt={pg.name}
              className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
            
            {/* Top Action Buttons */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button 
                onClick={() => setSaved(!saved)}
                className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
                  saved ? 'bg-rose-500 text-white' : 'bg-white/20 text-white hover:bg-white/40'
                }`}
                title="Bookmark PG"
              >
                <Heart className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
              </button>
              <button 
                onClick={onClose}
                className="p-2.5 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-all"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Badges & Title overlay */}
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-primary-600 text-white font-semibold text-xs rounded-full flex items-center gap-1 shadow-lg">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Stay Proof
                </span>
                <span className="px-3 py-1 bg-amber-500/90 text-slate-900 font-bold text-xs rounded-full flex items-center gap-1 backdrop-blur-sm">
                  <Star className="w-3.5 h-3.5 fill-current text-slate-900" /> {pg.rating} ({pg.reviewsCount} Reviews)
                </span>
                <span className="px-3 py-1 bg-slate-800/80 text-slate-200 text-xs rounded-full font-medium capitalize">
                  {pg.gender} PG
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{pg.name}</h2>
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-200 mt-1">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-accent-400" /> {pg.locality}, Hyderabad</span>
                <span className="flex items-center gap-1"><Train className="w-4 h-4 text-primary-300" /> {pg.distanceMetro}</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-6 flex-shrink-0 text-sm font-semibold">
            {['overview', 'amenities', 'verified-reviews', 'book-visit'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 capitalize transition-all border-b-2 ${
                  activeTab === tab 
                    ? 'border-primary-600 text-primary-600 font-bold' 
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="p-6 overflow-y-auto flex-1 text-slate-700">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">About Accommodation</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{pg.description}</p>
                </div>

                {/* Price & Highlight Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-xs text-slate-500 font-medium">Monthly Rent</p>
                    <p className="text-xl font-extrabold text-slate-900 mt-0.5">₹{pg.price.toLocaleString()} <span className="text-xs font-normal text-slate-500">/mo</span></p>
                    <p className="text-[10px] text-emerald-600 font-semibold mt-1">Zero Brokerage Fee</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-xs text-slate-500 font-medium">Stay Proof Authenticity</p>
                    <p className="text-xl font-extrabold text-primary-600 mt-0.5">{pg.stayProofPercent}% Verified</p>
                    <p className="text-[10px] text-slate-500 mt-1">{pg.verifiedCount} receipts audited</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-xs text-slate-500 font-medium">Location Proximity</p>
                    <p className="text-xs font-bold text-slate-900 mt-1.5 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-secondary-600" /> {pg.distanceIT}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">Fast commute access</p>
                  </div>
                </div>

                {/* Verified Tenant Rating Breakdown */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3">Tenant Trust Breakdown</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                      <p className="text-xs text-amber-700 font-semibold">Food Quality</p>
                      <p className="text-lg font-black text-amber-900 mt-1">★ {pg.foodRating}</p>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                      <p className="text-xs text-emerald-700 font-semibold">Hygiene & Cleanliness</p>
                      <p className="text-lg font-black text-emerald-900 mt-1">★ {pg.hygieneRating}</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                      <p className="text-xs text-blue-700 font-semibold">Safety & Security</p>
                      <p className="text-lg font-black text-blue-900 mt-1">★ {pg.securityRating}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'amenities' && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Included Facilities & Services</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pg.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                      <div className="p-2 bg-primary-100 text-primary-700 rounded-lg">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold text-slate-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'verified-reviews' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">Tenant Reviews ({pg.recentReviews.length})</h3>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                    Audited by AI Anti-Fraud
                  </span>
                </div>
                {pg.recentReviews.map((rev, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center text-sm">
                          {rev.user[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{rev.user}</p>
                          <p className="text-xs text-slate-500">{rev.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-100 text-amber-900 font-bold text-xs px-2 py-0.5 rounded-md">
                        <Star className="w-3 h-3 fill-current text-amber-500" /> {rev.rating}
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed italic">"{rev.comment}"</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" /> Rent Receipt Verified
                      </span>
                      <span>{rev.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'book-visit' && (
              <div className="max-w-md mx-auto space-y-4 py-2">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-slate-900">Schedule Free Visit or Inquiry</h3>
                  <p className="text-xs text-slate-500 mt-1">Connect directly with verified owner without broker commission.</p>
                </div>

                {inquirySent ? (
                  <div className="p-6 bg-emerald-50 text-emerald-900 rounded-2xl border border-emerald-200 text-center space-y-2">
                    <Sparkles className="w-8 h-8 text-emerald-600 mx-auto" />
                    <h4 className="font-bold text-base">Inquiry Sent Successfully!</h4>
                    <p className="text-xs">The verified manager for {pg.name} will contact you via WhatsApp shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (WhatsApp)</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Expected Move-in Date</label>
                      <input 
                        type="date" 
                        required 
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-500 outline-none"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <Send className="w-4 h-4" /> Connect with PG Owner Now
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between flex-shrink-0">
            <div>
              <p className="text-xs text-slate-500">Starting From</p>
              <p className="text-lg font-extrabold text-slate-900">₹{pg.price.toLocaleString()} <span className="text-xs text-slate-500 font-normal">/month</span></p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setActiveTab('book-visit')}
                className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" /> Book Visit
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
