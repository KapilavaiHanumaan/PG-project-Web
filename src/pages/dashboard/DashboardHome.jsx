import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ShieldCheck,
  Star,
  MapPin,
  Sparkles,
  Heart,
  Award,
  Wallet,
  ArrowRight,
  CheckCircle2,
  Building2,
  TrendingUp,
  UserCheck,
} from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'

const sampleRecommendedPGs = [
  {
    id: 'pg-1',
    name: 'Sri Sai Deluxe Executive PG',
    location: 'Gachibowli, Hyderabad',
    distance: '0.8 km from DLF Cyber City',
    price: '₹9,500 / mo',
    rating: 4.8,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
    tags: ['AC Available', '3-Time Food', 'Wi-Fi 200Mbps'],
  },
  {
    id: 'pg-2',
    name: 'Stanza Living Cyber Hub',
    location: 'HITECH City, Hyderabad',
    distance: '1.2 km from Mindspace IT Park',
    price: '₹14,000 / mo',
    rating: 4.9,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
    tags: ['Biometric Entry', 'Daily Housekeeping', 'Gym'],
  },
  {
    id: 'pg-3',
    name: 'Sri Lakshmi Luxury Coliving',
    location: 'Kondapur, Hyderabad',
    distance: '0.5 km from Botanical Garden',
    price: '₹11,000 / mo',
    rating: 4.7,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
    tags: ['Single Room', 'North Food', 'Power Backup'],
  },
]

export default function DashboardHome() {
  const { user, role } = useAuthStore()
  const navigate = useNavigate()

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-blue-950/90 via-slate-900 to-indigo-950/90 border border-slate-800 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
              alt={user?.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-blue-500 shadow-xl shadow-blue-500/20"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                  Welcome back, {user?.name || 'Explorer'}!
                </h1>
                <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verified Member
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                {role === 'pg_owner'
                  ? 'Manage your PG properties, tenant inquiries & respond to reviews.'
                  : 'Discover 100% verified PGs with food reviews and reward points in Hyderabad.'}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-400 mt-3">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-blue-400" /> {user?.city || 'Hyderabad'}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5 text-purple-400" /> {user?.occupation || 'Working Professional'}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/dashboard/search')}
            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold py-3 px-6 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <span>Explore Verified PGs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'PGTrust Points',
            value: user?.points || 1250,
            unit: 'Pts',
            desc: 'Earned via reviews',
            icon: Award,
            color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
            link: '/dashboard/rewards',
          },
          {
            title: 'Saved PGs',
            value: user?.savedPGsCount || 4,
            unit: 'Properties',
            desc: 'Bookmarked for visit',
            icon: Heart,
            color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
            link: '/dashboard/saved',
          },
          {
            title: 'Reviews Authored',
            value: user?.reviewsCount || 3,
            unit: 'Verified',
            desc: 'Badged contributor',
            icon: Star,
            color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
            link: '/dashboard/reviews',
          },
          {
            title: 'Wallet Balance',
            value: `₹${user?.walletBalance || 850}`,
            unit: 'Cashback',
            desc: 'Ready to redeem',
            icon: Wallet,
            color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
            link: '/dashboard/wallet',
          },
        ].map((item, idx) => {
          const Icon = item.icon
          return (
            <div
              key={idx}
              onClick={() => navigate(item.link)}
              className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 backdrop-blur-xl cursor-pointer transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400">{item.title}</span>
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-2xl font-extrabold text-white tracking-tight">{item.value}</span>
                <span className="text-xs text-slate-400 font-medium">{item.unit}</span>
              </div>
              <p className="text-[11px] text-slate-500">{item.desc}</p>
            </div>
          )
        })}
      </div>

      {/* Recommended PGs Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              Recommended PGs in {user?.preferredLocations?.[0] || 'Gachibowli'}
            </h2>
            <p className="text-xs text-slate-400">Based on your budget and location preferences</p>
          </div>
          <Link
            to="/dashboard/search"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleRecommendedPGs.map((pg) => (
            <div
              key={pg.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pg.image}
                  alt={pg.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700/60 flex items-center gap-1 text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{pg.rating}</span>
                </div>
                <div className="absolute bottom-3 left-3 bg-blue-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-md">
                  PGTRUST VERIFIED
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {pg.name}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    {pg.location}
                  </p>

                  <div className="flex flex-wrap gap-1.5 my-3">
                    {pg.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-slate-950/60 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between mt-2">
                  <div>
                    <span className="text-xs text-slate-500 block">Starting from</span>
                    <span className="text-sm font-extrabold text-emerald-400">{pg.price}</span>
                  </div>
                  <button
                    onClick={() => navigate('/dashboard/search')}
                    className="text-xs font-semibold px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
