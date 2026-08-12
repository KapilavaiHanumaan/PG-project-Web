import React, { useState } from 'react'
import { Heart, Star, MapPin, Trash2, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from '../../utils/toast'

const initialSaved = [
  {
    id: 'spg-1',
    name: 'Sri Sai Deluxe Executive PG',
    locality: 'Gachibowli',
    price: '₹9,500 / mo',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'spg-2',
    name: 'Stanza Living Cyber Hub',
    locality: 'HITECH City',
    price: '₹14,000 / mo',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'spg-3',
    name: 'Sri Lakshmi Luxury Coliving',
    locality: 'Kondapur',
    price: '₹11,000 / mo',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
  },
]

export default function SavedPGsView() {
  const [savedList, setSavedList] = useState(initialSaved)
  const navigate = useNavigate()

  const handleRemove = (id, name) => {
    setSavedList((prev) => prev.filter((p) => p.id !== id))
    toast.info('Removed Bookmark', `${name} removed from your saved list.`)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Saved PGs & Bookmarks</h1>
          <p className="text-xs text-slate-400">Keep track of properties you plan to visit in Hyderabad</p>
        </div>
        <span className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" /> {savedList.length} Saved
        </span>
      </div>

      {savedList.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center max-w-md mx-auto my-12">
          <Heart className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-1">No Saved PGs Yet</h3>
          <p className="text-xs text-slate-400 mb-6">Browse verified PGs in Hyderabad and click the heart icon to save them.</p>
          <button
            onClick={() => navigate('/dashboard/search')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-blue-600/30"
          >
            Explore PGs
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {savedList.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="relative h-44">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <button
                  onClick={() => handleRemove(item.id, item.name)}
                  className="absolute top-3 right-3 p-2 bg-slate-950/80 hover:bg-rose-500 text-rose-400 hover:text-white rounded-xl transition-colors border border-slate-700/60"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-white mb-1">{item.name}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" /> {item.locality}, Hyderabad
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <span className="text-sm font-extrabold text-emerald-400">{item.price}</span>
                  <button
                    onClick={() => navigate('/dashboard/search')}
                    className="text-xs font-semibold px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors flex items-center gap-1"
                  >
                    View <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
