import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Sparkles, Mail, Lock, Phone, ArrowRight, User } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [isSignUp, setIsSignUp] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
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

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 border border-slate-100"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-bold mb-3 border border-primary-100">
              <ShieldCheck className="w-4 h-4 text-primary-600" />
              <span>Hyderabad Verified PG Network</span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              {isSignUp ? 'Create PGTrust Account' : 'Welcome Back to PGTrust'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isSignUp ? 'Get 50 Welcome PGCoin Points instantly on signup' : 'Access your saved PGs, reviews & reward balance'}
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
              <Sparkles className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-lg text-emerald-900">
                {isSignUp ? 'Welcome aboard!' : 'Signed in successfully!'}
              </h4>
              <p className="text-xs text-emerald-700">
                {isSignUp ? '50 PGCoin bonus added to your wallet!' : 'Redirecting to your verified dashboard...'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input 
                      type="text" 
                      required 
                      placeholder="Ananya Sharma"
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number or Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input 
                    type="text" 
                    required 
                    placeholder="user@hyderabad.com or +91..."
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input 
                    type="password" 
                    required 
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm mt-2"
              >
                <span>{isSignUp ? 'Register & Claim 50 Coins' : 'Sign In Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-semibold text-primary-600 hover:text-primary-800 transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign In' : 'New to PGTrust? Create Free Account'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
