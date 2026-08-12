import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Search,
  Heart,
  MessageSquareQuote,
  Award,
  Wallet,
  Settings,
  ShieldCheck,
  LogOut,
  ChevronLeft,
  X,
  UserCheck,
  ShieldAlert,
  Cpu,
} from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'
import { toast } from '../../utils/toast'

const baseNavItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { path: '/dashboard/search', label: 'Search PGs', icon: Search },
  { path: '/dashboard/saved', label: 'Saved PGs', icon: Heart, badge: '4' },
  { path: '/dashboard/reviews', label: 'Reviews & Trust', icon: MessageSquareQuote },
  { path: '/dashboard/rewards', label: 'Rewards', icon: Award, badge: '1,250 Pts' },
  { path: '/dashboard/wallet', label: 'Wallet', icon: Wallet, badge: '₹850' },
  { path: '/dashboard/ai-hub', label: 'AI Intelligence Hub', icon: Cpu, badge: 'AI' },
  { path: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ isOpen, onClose }) {
  const { user, role, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.info('Logged Out', 'You have been safely signed out.')
    navigate('/login')
  }

  const roleLabel =
    role === 'pg_owner'
      ? 'PG Owner'
      : role === 'working_professional'
      ? 'Working Pro'
      : role === 'student'
      ? 'Student'
      : 'Member'

  const navItems = [
    ...baseNavItems,
    { path: '/dashboard/admin/moderation', label: 'Admin Moderation', icon: ShieldAlert },
  ]

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header Logo */}
        <div>
          <div className="h-16 px-6 border-b border-slate-800 flex items-center justify-between">
            <NavLink to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white">PGTrust</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 block -mt-1">
                  Hyderabad
                </span>
              </div>
            </NavLink>

            <button
              onClick={onClose}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Quick Info Badge */}
          <div className="p-4 mx-3 my-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 flex items-center gap-3">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
              alt={user?.name}
              className="w-10 h-10 rounded-xl object-cover border border-blue-500/40"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-white truncate">{user?.name || 'Chaitanya'}</h4>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full mt-0.5">
                <UserCheck className="w-3 h-3" /> {roleLabel}
              </span>
            </div>
          </div>

          {/* Nav Items List */}
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  onClick={() => onClose && onClose()}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              )
            })}
          </nav>
        </div>

        {/* Bottom Logout & Support */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  )
}
