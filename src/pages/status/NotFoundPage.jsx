import React from 'react'
import { Link } from 'react-router-dom'
import { FileQuestion, Home, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl">
        <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-8 h-8" />
        </div>

        <h1 className="text-3xl font-black text-white mb-2">404</h1>
        <h2 className="text-lg font-bold text-slate-200 mb-2">Page Not Found</h2>
        <p className="text-xs text-slate-400 leading-relaxed mb-6">
          The requested page could not be located on PGTrust Hyderabad.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Landing Page
          </Link>
          <Link
            to="/dashboard"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2"
          >
            <Home className="w-4 h-4" /> Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
