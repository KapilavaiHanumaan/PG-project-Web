import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const initialFilterState = {
  searchQuery: '',
  locality: 'all',
  minPrice: 4000,
  maxPrice: 25000,
  gender: 'all',
  roomType: 'all',
  foodOption: 'all',
  minRating: 0,
  selectedAmenities: [],
  sortBy: 'recommended',
  viewMode: 'split', // 'split' | 'grid' | 'list' | 'map'
}

export const useDiscoveryStore = create(
  persist(
    (set, get) => ({
      ...initialFilterState,

      // Extra collections
      savedIds: ['pg-101', 'pg-103'], // pre-saved items for demo
      compareIds: [],
      searchHistory: ['Gachibowli', 'HITECH City', 'Girls PG Madhapur', 'AC Rooms under 10k'],
      selectedPGForModal: null,

      // Actions
      setSearchQuery: (searchQuery) => {
        set({ searchQuery })
        if (searchQuery.trim().length > 2) {
          get().addSearchHistory(searchQuery.trim())
        }
      },

      setLocality: (locality) => set({ locality }),

      setFilter: (key, value) => set({ [key]: value }),

      toggleAmenity: (amenityName) => {
        const current = get().selectedAmenities
        const exists = current.includes(amenityName)
        if (exists) {
          set({ selectedAmenities: current.filter((a) => a !== amenityName) })
        } else {
          set({ selectedAmenities: [...current, amenityName] })
        }
      },

      resetFilters: () => {
        set({
          searchQuery: '',
          locality: 'all',
          minPrice: 4000,
          maxPrice: 25000,
          gender: 'all',
          roomType: 'all',
          foodOption: 'all',
          minRating: 0,
          selectedAmenities: [],
          sortBy: 'recommended',
        })
      },

      toggleSave: (pgId) => {
        const saved = get().savedIds
        if (saved.includes(pgId)) {
          set({ savedIds: saved.filter((id) => id !== pgId) })
        } else {
          set({ savedIds: [...saved, pgId] })
        }
      },

      toggleCompare: (pgId) => {
        const compare = get().compareIds
        if (compare.includes(pgId)) {
          set({ compareIds: compare.filter((id) => id !== pgId) })
        } else {
          if (compare.length >= 4) {
            throw new Error('Maximum 4 PGs can be compared simultaneously.')
          }
          set({ compareIds: [...compare, pgId] })
        }
      },

      clearCompare: () => set({ compareIds: [] }),

      setViewMode: (viewMode) => set({ viewMode }),

      setSortBy: (sortBy) => set({ sortBy }),

      setSelectedPGForModal: (pg) => set({ selectedPGForModal: pg }),

      addSearchHistory: (term) => {
        const history = get().searchHistory
        if (!history.includes(term)) {
          set({ searchHistory: [term, ...history].slice(0, 6) })
        }
      },

      clearSearchHistory: () => set({ searchHistory: [] }),
    }),
    {
      name: 'pgtrust-discovery-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
