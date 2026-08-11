import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import SearchBar from '../components/SearchBar';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import FeaturedPGs from '../components/FeaturedPGs';
import TrustSection from '../components/TrustSection';
import RewardsPreview from '../components/RewardsPreview';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

import PGDetailModal from '../components/PGDetailModal';
import LoginModal from '../components/LoginModal';
import SearchModal from '../components/SearchModal';

export default function LandingPage() {
  const [selectedPG, setSelectedPG] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Global search bar filter state passed down to Featured PGs
  const [filterState, setFilterState] = useState({
    locality: 'all',
    budget: 'Any Budget',
    gender: 'all'
  });

  const handleOpenPGDetail = (pg) => {
    setSelectedPG(pg);
    setIsDetailModalOpen(true);
  };

  const handleApplySearch = (filters) => {
    setFilterState(filters);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-primary-500 selection:text-white">
      
      {/* Sticky Header */}
      <Navbar 
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />

      {/* Main Content Flow */}
      <main className="flex-grow">
        <HeroSection 
          onStartSearch={() => setIsSearchModalOpen(true)}
          onExploreReviews={() => {
            const el = document.getElementById('featured-pgs');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <SearchBar onFilterChange={handleApplySearch} />

        <Features />

        <HowItWorks />

        <FeaturedPGs 
          onSelectPG={handleOpenPGDetail}
          filterState={filterState}
        />

        <TrustSection />

        <RewardsPreview onClaimReward={() => setIsLoginModalOpen(true)} />

        <Testimonials />

        <CTASection 
          onSearchClick={() => setIsSearchModalOpen(true)}
          onLoginClick={() => setIsLoginModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer onSearchClick={() => setIsSearchModalOpen(true)} />

      {/* Interactive Modals */}
      <PGDetailModal 
        pg={selectedPG}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onOpenLogin={() => {
          setIsDetailModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <SearchModal 
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onApplySearch={handleApplySearch}
      />

    </div>
  );
}
