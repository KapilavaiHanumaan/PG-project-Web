import React, { useState, useMemo } from 'react'
import { ArrowDownLeft, ArrowUpRight, Search, Download, Filter, FileText } from 'lucide-react'
import { useWalletStore } from '../../store/useWalletStore'
import { toast } from '../../utils/toast'

export default function TransactionHistoryLedger() {
  const { transactions } = useWalletStore()
  const [filterType, setFilterType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      if (filterType === 'credits' && !t.isCredit) return false
      if (filterType === 'debits' && t.isCredit) return false
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        return t.title.toLowerCase().includes(q) || t.type.toLowerCase().includes(q)
      }
      return true
    })
  }, [transactions, filterType, searchQuery])

  const handleExportCSV = () => {
    toast.success('Exporting Ledger', 'Financial transaction log exported to CSV.')
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            Points Transaction History Ledger
          </h3>
          <p className="text-xs text-slate-400">Complete audit trail of earned and redeemed PGTrust points</p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" /> Export CSV
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search ledger by transaction title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          {[
            { id: 'all', label: 'All Transactions' },
            { id: 'credits', label: 'Credits (+)' },
            { id: 'debits', label: 'Debits (-)' },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setFilterType(type.id)}
              className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                filterType === type.id ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ledger Table */}
      <div className="divide-y divide-slate-800/80">
        {filteredTransactions.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">No transactions match your search filters.</div>
        ) : (
          filteredTransactions.map((tx) => (
            <div key={tx.id} className="py-3.5 px-2 hover:bg-slate-800/40 rounded-xl transition-colors flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${
                    tx.isCredit
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}
                >
                  {tx.isCredit ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="font-bold text-white">{tx.title}</h4>
                  <span className="text-[10px] text-slate-500">{tx.date} • {tx.type}</span>
                </div>
              </div>

              <div className="text-right">
                <span className={`text-sm font-extrabold ${tx.isCredit ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {tx.isCredit ? `+${tx.points}` : `${tx.points}`} Pts
                </span>
                <span className="text-[10px] text-slate-500 block">
                  ({tx.isCredit ? `≈ +₹${Math.round(tx.points / 10)}` : `≈ -₹${Math.round(Math.abs(tx.points) / 10)}`})
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
