import React from 'react';
import { ShieldCheck, MapPin, Twitter, Linkedin, Instagram, Youtube, Heart, Mail, Phone } from 'lucide-react';

export default function Footer({ onSearchClick }) {
  return (
    <footer id="footer" className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 to-secondary-600 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-white">
                  <ShieldCheck className="w-5 h-5 text-primary-400" />
                </div>
              </div>
              <span className="text-xl font-black text-white">
                PG<span className="gradient-text-primary">Trust</span>
              </span>
              <span className="px-1.5 py-0.5 bg-accent-500/10 text-accent-400 font-bold text-[10px] rounded border border-accent-500/20">
                HYDERABAD
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Hyderabad’s premier stay-verified accommodation discovery platform. Eliminating broker traps through rent receipt auditing and community rewards.
            </p>

            <div className="space-y-1.5 text-xs text-slate-400 pt-2">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-400" /> Hitech City Cyber Towers Corridor, Hyderabad, TG 500081
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400" /> support@pgtrust.in
              </p>
            </div>
          </div>

          {/* Col 1: Product */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li><button onClick={onSearchClick} className="hover:text-primary-400 transition-colors">Search PGs</button></li>
              <li><a href="#features" className="hover:text-primary-400 transition-colors">Verified Reviews</a></li>
              <li><a href="#rewards" className="hover:text-primary-400 transition-colors">PGCoin Rewards</a></li>
              <li><a href="#featured-pgs" className="hover:text-primary-400 transition-colors">Metro PG Guide</a></li>
              <li><a href="#footer" className="hover:text-primary-400 transition-colors">PG Owner Portal</a></li>
            </ul>
          </div>

          {/* Col 2: Company */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li><a href="#hero" className="hover:text-primary-400 transition-colors">About Us</a></li>
              <li><a href="#features" className="hover:text-primary-400 transition-colors">Careers <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] rounded">Hiring</span></a></li>
              <li><a href="#footer" className="hover:text-primary-400 transition-colors">Contact Us</a></li>
              <li><a href="#hero" className="hover:text-primary-400 transition-colors">Press & Media</a></li>
            </ul>
          </div>

          {/* Col 3: Support & Social */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Support & Legal</h4>
            <ul className="space-y-2.5 text-xs font-semibold mb-6">
              <li><a href="#features" className="hover:text-primary-400 transition-colors">Help Center</a></li>
              <li><a href="#features" className="hover:text-rose-400 transition-colors">Report Fraud PG</a></li>
              <li><a href="#footer" className="hover:text-primary-400 transition-colors">Terms of Service</a></li>
              <li><a href="#footer" className="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
            </ul>

            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Follow Us</h4>
            <div className="flex items-center gap-3">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 hover:bg-primary-600 text-slate-400 hover:text-white rounded-xl transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 hover:bg-primary-600 text-slate-400 hover:text-white rounded-xl transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 hover:bg-primary-600 text-slate-400 hover:text-white rounded-xl transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 bg-slate-900 hover:bg-primary-600 text-slate-400 hover:text-white rounded-xl transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 PGTrust Hyderabad. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> for Hyderabad IT Corridor & Students.
          </p>
        </div>

      </div>
    </footer>
  );
}
