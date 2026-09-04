import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { ProductGrid } from './components/ProductGrid';
import { InfrastructureSection } from './components/InfrastructureSection';
import { RfqSection } from './components/RfqSection';
import { Footer } from './components/Footer';
import { ProductsShowcasePage } from './components/ProductsShowcasePage';
import { AboutInfrastructurePage } from './components/AboutInfrastructurePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'products' | 'about'>('home');
  const [activePipeType, setActivePipeType] = useState<'hdpe' | 'mdpe' | 'drip' | 'plb'>('hdpe');
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [rfqTargetProduct, setRfqTargetProduct] = useState<string>('hdpe-water-pipe');
  const [rfqTargetQuantity, setRfqTargetQuantity] = useState<number>(1000);

  // Sync hash routing with page state
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('products') || hash.includes('showcase')) {
        setCurrentPage('products');
      } else if (hash.includes('about') || hash.includes('infrastructure')) {
        setCurrentPage('about');
      } else if (hash === '' || hash.includes('home') || hash === '#') {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: 'home' | 'products' | 'about') => {
    setCurrentPage(page);
    if (page === 'products') {
      window.location.hash = '#products-showcase';
    } else if (page === 'about') {
      window.location.hash = '#about-infrastructure';
    } else {
      window.location.hash = '#home';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRfq = (productId?: string, quantity?: number) => {
    if (productId) {
      setRfqTargetProduct(productId);
    }
    if (quantity) {
      setRfqTargetQuantity(quantity);
    }
    
    // If on home page, scroll to embedded RFQ or open modal
    if (currentPage === 'home') {
      const rfqElement = document.getElementById('rfq');
      if (rfqElement) {
        rfqElement.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    
    // On dedicated pages (Products Showcase, About), open sleek modal popup
    setRfqModalOpen(true);
  };

  const handlePreviewIn3D = (pipeType: 'hdpe' | 'mdpe' | 'drip' | 'plb') => {
    setActivePipeType(pipeType);
    setCurrentPage('home');
    setTimeout(() => {
      const heroElement = document.getElementById('hero');
      if (heroElement) {
        heroElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white font-sans overflow-x-hidden relative">
      {/* Ambient background glow elements for Frosted Glass refraction */}
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-[128px] pointer-events-none -z-10" />
      <div className="fixed top-1/3 -right-40 w-[480px] h-[480px] bg-blue-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 -left-40 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed -bottom-40 -right-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-[128px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Subtle glass grid texture */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '36px 36px'
        }}
      />

      {/* Fixed Navigation Header with Active Page Support */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenRfq={handleOpenRfq}
      />

      {/* Main Page Views */}
      <main className="pt-20">
        {currentPage === 'home' && (
          <>
            {/* 1. 3D Hero Section & Bold Typography */}
            <HeroSection
              onOpenRfq={handleOpenRfq}
              activePipeType={activePipeType}
              onChangePipeType={setActivePipeType}
            />

            {/* 2. Floating Stats (Glassmorphism & 3D Tilt) */}
            <StatsSection />

            {/* 3. Real Product Grid with Dark Frosted Glass & Calculator */}
            <ProductGrid
              onSelectProductForRfq={handleOpenRfq}
              onPreviewIn3D={handlePreviewIn3D}
            />

            {/* 4. Infrastructure Split Layout & 3D Particle Grid */}
            <InfrastructureSection />

            {/* 5. Quick RFQ Section */}
            <RfqSection
              selectedProductId={rfqTargetProduct}
              initialQuantity={rfqTargetQuantity}
            />
          </>
        )}

        {currentPage === 'products' && (
          /* Dedicated Products Showcase Page (Prompt 1) */
          <ProductsShowcasePage onOpenRfq={handleOpenRfq} />
        )}

        {currentPage === 'about' && (
          /* Dedicated About Company & Infrastructure Page (Prompt 2) */
          <AboutInfrastructurePage onOpenRfq={handleOpenRfq} />
        )}
      </main>

      {/* Corporate Footer with Real Contact & Location Details */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Quick RFQ Modal Triggered from Any Page */}
      {rfqModalOpen && (
        <RfqSection
          isOpenAsModal
          selectedProductId={rfqTargetProduct}
          initialQuantity={rfqTargetQuantity}
          onCloseModal={() => setRfqModalOpen(false)}
        />
      )}
    </div>
  );
}
