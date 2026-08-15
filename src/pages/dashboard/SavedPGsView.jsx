import React, { useState } from 'react'
import { Heart, Star, MapPin, Trash2, ArrowRight, Search, AlertCircle } from 'lucide-react'
import { useDiscoveryStore } from '../../store/useDiscoveryStore'
import { EXPANDED_PGS } from '../../data/mockDiscoveryData'
import PGDetailsView from '../../components/discovery/PGDetailsView'
import { toast } from '../../utils/toast'

export default function SavedPGsView() {
  const { savedIds, toggleSave, setSelectedPGForModal, selectedPGForModal } = useDiscoveryStore()
  const [filterQuery, setFilterQuery] = useState('')

  const savedList = EXPANDED_PGS.filter((p) => savedIds.includes(p.id)).filter((p) => {
    if (!filterQuery.trim()) return true
    const q = filterQuery.toLowerCase()
    return p.name.toLowerCase().includes(q) || p.locality.toLowerCase().includes(q)
  })

  const handleRemove = (id, name) => {
    toggleSave(id)
    toast.info('Removed Bookmark', `${name} removed from your saved list.`)
  }

  const handleClearAll = () => {
    savedIds.forEach((id) => toggleSave(id))
    toast.info('Cleared Saved List', 'All bookmarked PGs removed.')
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Saved PGs & Bookmarks</h1>
          <p className="text-xs text-slate-400">Manage saved properties and track availability in Hyderabad</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" /> {savedIds.length} Saved
          </span>
          {savedIds.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs text-slate-400 hover:text-rose-400 transition-colors font-medium"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Filter within Saved */}
      {savedIds.length > 0 && (
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search within saved PGs..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      )}

      {savedList.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center max-w-md mx-auto my-12">
          <Heart className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-1">No Saved PGs Found</h3>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            {filterQuery ? 'No saved PGs match your search term.' : 'Browse verified PGs in Hyderabad and click the heart icon to bookmark them.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {savedList.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="relative h-48">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                <button
                  onClick={() => handleRemove(item.id, item.name)}
                  className="absolute top-3 right-3 p-2 bg-slate-950/80 hover:bg-rose-500 text-rose-400 hover:text-white rounded-xl transition-colors border border-slate-700/60"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-3 bg-emerald-500/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-md">
                  {item.availableRooms} Vacancies Left
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-white mb-1">{item.name}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" /> {item.locality}, Hyderabad
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <span className="text-sm font-extrabold text-emerald-400">₹{item.price?.toLocaleString() || '0'}/mo</span>
                  <button
                    onClick={() => setSelectedPGForModal(item)}
                    className="text-xs font-semibold px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors flex items-center gap-1"
                  >
                    View Details <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedPGForModal && (
        <PGDetailsView pg={selectedPGForModal} onClose={() => setSelectedPGForModal(null)} />
      )}
    </div>
  )
}
