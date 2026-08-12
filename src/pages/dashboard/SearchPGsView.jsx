import React, { useState } from 'react'
import DiscoveryHeader from '../../components/discovery/DiscoveryHeader'
import AdvancedFilterDrawer from '../../components/discovery/AdvancedFilterDrawer'
import PGListingGrid from '../../components/discovery/PGListingGrid'
import InteractiveMap from '../../components/discovery/InteractiveMap'
import CompareTrayBar from '../../components/discovery/CompareTrayBar'
import ComparePGsModal from '../../components/discovery/ComparePGsModal'
import PGDetailsView from '../../components/discovery/PGDetailsView'
import SmartRecommendations from '../../components/discovery/SmartRecommendations'
import NearbyIntelligence from '../../components/discovery/NearbyIntelligence'
import { useDiscoveryStore } from '../../store/useDiscoveryStore'

export default function SearchPGsView() {
  const { viewMode, selectedPGForModal, setSelectedPGForModal } = useDiscoveryStore()
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [showCompareModal, setShowCompareModal] = useState(false)

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans pb-16">
      {/* Search Header Bar */}
      <DiscoveryHeader onOpenMobileFilters={() => setMobileFilterOpen(true)} />

      {/* Main Content Layout based on viewMode ('split' | 'grid' | 'list' | 'map') */}
      <div className="flex items-start gap-6">
        {/* Desktop Filter Sidebar (Hidden on Map-Only view) */}
        {viewMode !== 'map' && (
          <AdvancedFilterDrawer
            isOpen={mobileFilterOpen}
            onClose={() => setMobileFilterOpen(false)}
          />
        )}

        {/* View Mode Router Panel */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Split Mode: Grid on Left, Map on Right */}
          {viewMode === 'split' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7">
                <PGListingGrid onSelectPG={(pg) => setSelectedPGForModal(pg)} />
              </div>
              <div className="lg:col-span-5 h-[650px] sticky top-20">
                <InteractiveMap onSelectPG={(pg) => setSelectedPGForModal(pg)} />
              </div>
            </div>
          )}

          {/* Grid Mode */}
          {viewMode === 'grid' && (
            <PGListingGrid onSelectPG={(pg) => setSelectedPGForModal(pg)} />
          )}

          {/* List Mode */}
          {viewMode === 'list' && (
            <PGListingGrid onSelectPG={(pg) => setSelectedPGForModal(pg)} />
          )}

          {/* Map Only Mode */}
          {viewMode === 'map' && (
            <div className="h-[750px]">
              <InteractiveMap onSelectPG={(pg) => setSelectedPGForModal(pg)} />
            </div>
          )}

          {/* Smart Recommendations Section */}
          <SmartRecommendations onSelectPG={(pg) => setSelectedPGForModal(pg)} />

          {/* Nearby Intelligence Commute Widget */}
          <NearbyIntelligence />
        </div>
      </div>

      {/* Compare Floating Bar & Comparison Modal */}
      <CompareTrayBar onOpenCompareModal={() => setShowCompareModal(true)} />
      <ComparePGsModal isOpen={showCompareModal} onClose={() => setShowCompareModal(false)} />

      {/* Full Details Modal View */}
      {selectedPGForModal && (
        <PGDetailsView
          pg={selectedPGForModal}
          onClose={() => setSelectedPGForModal(null)}
        />
      )}
    </div>
  )
}
