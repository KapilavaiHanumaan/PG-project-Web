import React from 'react'

export function AuthFormSkeleton() {
  return (
    <div className="w-full space-y-6 animate-pulse">
      <div className="h-8 bg-slate-200 dark:bg-slate-700/50 rounded-lg w-3/4"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded w-1/2"></div>
      <div className="space-y-4 pt-4">
        <div className="h-12 bg-slate-200 dark:bg-slate-700/50 rounded-xl w-full"></div>
        <div className="h-12 bg-slate-200 dark:bg-slate-700/50 rounded-xl w-full"></div>
        <div className="h-12 bg-blue-200 dark:bg-blue-900/40 rounded-xl w-full"></div>
      </div>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse p-6 max-w-7xl mx-auto">
      <div className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-36 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
        <div className="h-36 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
        <div className="h-36 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
      </div>
      <div className="h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full"></div>
    </div>
  )
}
