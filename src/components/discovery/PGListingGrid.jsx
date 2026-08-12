import React, { useMemo } from 'react'
import { ArrowUpDown, AlertCircle, RefreshCw, LayoutGrid, List } from 'lucide-react'
import PGCard from './PGCard'
import { useDiscoveryStore } from '../../store/useDiscoveryStore'
import { EXPANDED_PGS } from '../../data/mockDiscoveryData'
import { AuthFormSkeleton } from '../common/Skeletons'

export default function PGListingGrid({ onSelectPG }) {
  const {
    searchQuery,
    locality,
    minPrice,
    maxPrice,
    gender,
    roomType,
    foodOption,
    minRating,
    selectedAmenities,
    sortBy,
    setSortBy,
    resetFilters,
  } = useDiscoveryStore()

  // Filter & Sort Pipeline
  const filteredPGs = useMemo(() => {
    return EXPANDED_PGS.filter((pg) => {
      // 1. Locality Filter
      if (locality !== 'all' && pg.locality.toLowerCase() !== locality.toLowerCase()) {
        const matchesLocalityName = pg.locality.toLowerCase().includes(locality.toLowerCase())
        if (!matchesLocalityName) return false
      }

      // 2. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const nameMatch = pg.name.toLowerCase().includes(q)
        const locMatch = pg.locality.toLowerCase().includes(q)
        const descMatch = pg.description?.toLowerCase().includes(q)
        const amenMatch = pg.amenities?.some((a) => a.toLowerCase().includes(q))
        if (!nameMatch && !locMatch && !descMatch && !amenMatch) return false
      }

      // 3. Price Filter
      if (pg.price > maxPrice) return false

      // 4. Gender Filter
      if (gender !== 'all' && pg.gender !== gender) return false

      // 5. Room Type Filter
      if (roomType !== 'all' && !pg.roomTypes?.includes(roomType)) return false

      // 6. Food Option Filter
      if (foodOption !== 'all' && pg.foodOption !== foodOption) return false

      // 7. Rating Filter
      if (minRating > 0 && pg.rating < minRating) return false

      // 8. Amenities Multi-select
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every((amen) =>
          pg.amenities?.includes(amen)
        )
        if (!hasAllAmenities) return false
      }

      return true
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price
      if (sortBy === 'price_high') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount
      return 0 // default recommended order
    })
  }, [
    searchQuery,
    locality,
    maxPrice,
    gender,
    roomType,
    foodOption,
    minRating,
    selectedAmenities,
    sortBy,
  ])

  return (
    <div className="space-y-4">
      {/* Sorting Control Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 backdrop-blur-xl">
        <div className="text-xs text-slate-300">
          Showing <strong className="text-white text-sm">{filteredPGs.length}</strong> verified PGs in Hyderabad
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-400 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-950/80 border border-slate-800 text-xs rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="recommended">Recommended & Featured</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Highest Rated (★ 4.8+)</option>
            <option value="reviews">Most Reviewed</option>
          </select>
        </div>
      </div>

      {/* Results Grid */}
      {filteredPGs.length === 0 ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-10 text-center max-w-md mx-auto my-8">
          <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No PGs Found</h3>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            No properties match your current price, amenity, or location combination. Try broadening your filter options.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-600/30 inline-flex items-center gap-2 transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredPGs.map((pg) => (
            <PGCard key={pg.id} pg={pg} onSelectPG={onSelectPG} />
          ))}
        </div>
      )}
    </div>
  )
}
