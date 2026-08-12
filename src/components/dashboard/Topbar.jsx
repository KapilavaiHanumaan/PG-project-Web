import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Menu,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Award,
} from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'
import NotificationsPopover from './NotificationsPopover'
import { toast } from '../../utils/toast'

export default function Topbar({ onOpenMobileSidebar }) {
  const { user, role, updateRole, logout } = useAuthStore()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const navigate = useNavigate()

  const handleRoleSwitch = (newRole) => {
    updateRole(newRole)
    toast.success('Role Switched', `Switched dashboard perspective to ${newRole.replace('_', ' ').toUpperCase()}`)
    setShowUserMenu(false)
  }

  const handleLogout = () => {
    logout()
    toast.info('Signed Out', 'Your session has ended.')
    navigate('/login')
  }

  return (
    <header className="h-16 bg-slate-900/80 border-b border-slate-800 backdrop-blur-xl sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left Search & Mobile Toggle */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/60 border border-slate-700/60"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search PGs in Gachibowli, HITECH City, Madhapur..."
            onClick={() => navigate('/dashboard/search')}
            className="w-full bg-slate-950/80 border border-slate-800/80 text-xs rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Right User Controls & Notifications */}
      <div className="flex items-center gap-3">
        {/* Points Quick Display */}
        <div
          onClick={() => navigate('/dashboard/rewards')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold cursor-pointer hover:bg-amber-500/20 transition-all"
        >
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>{user?.points || 1250} Pts</span>
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-slate-900" />
          </button>

          <NotificationsPopover
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
          />
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 p-1.5 pl-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
              alt={user?.name}
              className="w-7 h-7 rounded-lg object-cover"
            />
            <span className="hidden md:block text-xs font-semibold text-white max-w-[100px] truncate">
              {user?.name?.split(' ')[0] || 'User'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
              <div className="absolute right-0 top-12 z-50 w-56 rounded-2xl border border-slate-800 bg-slate-900/95 backdrop-blur-2xl shadow-2xl p-2 text-xs">
                <div className="p-2 border-b border-slate-800 mb-1">
                  <p className="font-bold text-white truncate">{user?.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
                </div>

                {/* Role Switcher Demo */}
                <div className="py-1">
                  <p className="px-2 text-[10px] uppercase font-bold text-slate-500 mb-1">
                    Switch Persona View
                  </p>
                  {[
                    { id: 'working_professional', label: 'Working Professional' },
                    { id: 'student', label: 'Student' },
                    { id: 'pg_owner', label: 'PG Owner' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => handleRoleSwitch(r.id)}
                      className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                        role === r.id ? 'bg-blue-600/20 text-blue-400 font-bold' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>{r.label}</span>
                      {role === r.id && <Sparkles className="w-3 h-3 text-blue-400" />}
                    </button>
                  ))}
                </div>

                <div className="border-t border-slate-800 pt-1 mt-1">
                  <button
                    onClick={() => {
                      setShowUserMenu(false)
                      navigate('/dashboard/settings')
                    }}
                    className="w-full text-left px-2 py-2 rounded-lg text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                    <span>Account Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-2 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
