import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Filter,
  Download,
  Send,
  Layers,
  ShieldCheck,
  Tag,
  CheckCircle2,
  FileText,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { ProductExplodedPipe3D } from './ProductExplodedPipe3D';
import { PRODUCTS, COMPANY_DETAILS } from '../data/products';
import { Product, ProductCategory } from '../types';
import { downloadProductSpecPdf } from '../utils/generateSpecPdf';

interface ProductsShowcasePageProps {
  onOpenRfq: (productId: string, quantity?: number) => void;
}

export function ProductsShowcasePage({ onOpenRfq }: ProductsShowcasePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStandard, setSelectedStandard] = useState<string>('All');
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  const categories = [
    { label: 'All Products', value: 'All' },
    { label: 'HDPE Pipes', value: 'HDPE Pipes' },
    { label: 'MDPE Pipes', value: 'MDPE Pipes' },
    { label: 'Drip Irrigation', value: 'Drip Irrigation' },
    { label: 'Cable Ducts', value: 'Cable Ducts' }
  ];

  const standards = ['All', 'IS 4984', 'ISO 4437', 'IS 12786', 'TEC / DOT'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sizes.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStandard =
        selectedStandard === 'All' || p.standard.toLowerCase().includes(selectedStandard.toLowerCase());

      return matchCategory && matchSearch && matchStandard;
    });
  }, [selectedCategory, searchQuery, selectedStandard]);

  const handleDownloadPdf = (product: Product) => {
    downloadProductSpecPdf(product);
    setDownloadSuccessId(product.id);
    setTimeout(() => {
      setDownloadSuccessId(null);
    }, 2500);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSelectedStandard('All');
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-14 relative z-10">
      {/* 1. Page Header & Hero Intro */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-sky-300 text-xs font-mono uppercase tracking-wider shadow-sm">
          <Layers className="w-3.5 h-3.5" />
          Precision Extrusion Catalog • Direct Rajkot Supply
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Industrial Products Showcase
        </h1>
        <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
          High-performance polyethylene conduit, water transport, gas transmission, and agricultural irrigation pipes manufactured in Rajkot to rigorous BIS and ISO benchmarks.
        </p>
      </div>

      {/* 2. 3D Interactive Hero: Exploded Pipe Scene */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            3D Pipe Anatomy & Concentric Cross-Section
          </h2>
          <span className="text-xs text-slate-300 font-mono hidden sm:inline">
            Drag to rotate 360° • Zoom to inspect layer bonding
          </span>
        </div>
        <ProductExplodedPipe3D />
      </section>

      {/* 3. Product Catalog Layout: 2-Column (Sticky Frosted Filter Sidebar + Blueprint Product Grid) */}
      <section className="pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sticky Frosted Glass Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider font-mono">
                  <Filter className="w-4 h-4 text-sky-400" />
                  Catalog Filters
                </div>
                {(selectedCategory !== 'All' || searchQuery !== '' || selectedStandard !== 'All') && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] text-sky-300 hover:text-white flex items-center gap-1 font-mono transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Keyword Search */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
                  Search Pipe Line
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by diameter, application..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-400 focus:border-sky-400/60 focus:bg-white/10 focus:outline-none backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Category Selection Pills */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
                  Product Category
                </label>
                <div className="space-y-1.5">
                  {categories.map(cat => {
                    const count =
                      cat.value === 'All'
                        ? PRODUCTS.length
                        : PRODUCTS.filter(p => p.category === cat.value).length;
                    const active = selectedCategory === cat.value;

                    return (
                      <button
                        key={cat.value}
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all backdrop-blur-sm ${
                          active
                            ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white border border-sky-400/40 shadow-[0_4px_16px_rgba(56,189,248,0.25)]'
                            : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        <span>{cat.label}</span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                            active ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Standard Compliance Filter */}
              <div>
                <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
                  Standard Benchmark
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {standards.map(std => (
                    <button
                      key={std}
                      onClick={() => setSelectedStandard(std)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-mono border transition-all ${
                        selectedStandard === std
                          ? 'bg-sky-500/25 border-sky-400/60 text-white shadow-sm'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {std}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct B2B Order Callout */}
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-300 font-bold font-mono">
                  <ShieldCheck className="w-4 h-4" />
                  <span>GST Credit Invoicing</span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  GSTIN: <span className="font-mono text-white">{COMPANY_DETAILS.gstNumber}</span>. Direct ex-factory truck dispatches from Kuvadva G.I.D.C.
                </p>
                <a
                  href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
                  className="pt-2 text-sky-300 hover:text-white flex items-center gap-1.5 font-semibold text-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{COMPANY_DETAILS.phone}</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Right Column: Framer Motion Animated Blueprint Product Grid */}
          <main className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-300 px-1">
              <span>
                Showing <strong className="text-white">{filteredProducts.length}</strong> polymer lines
              </span>
              <span className="font-mono text-[11px] text-sky-300">
                Tolerances: Class A • Zero Regrind Policy
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 space-y-4">
                <p className="text-slate-300 text-sm">No products matched your active filters.</p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-semibold hover:bg-sky-500/30"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35, delay: idx * 0.06 }}
                      className="group relative rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 p-6 flex flex-col justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] transition-all duration-300 overflow-hidden"
                    >
                      {/* Blueprint subtle background technical grid */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-[0.03] group-hover:opacity-[0.06] transition-opacity"
                        style={{
                          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)`,
                          backgroundSize: '24px 24px'
                        }}
                      />

                      {/* Blueprint Corner Technical Metadata Stamps */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-[10px] text-slate-400">
                        <span className="text-sky-300/90 font-bold tracking-wider">
                          DWG #{product.id.toUpperCase().slice(0, 10)}
                        </span>
                        <span className="text-slate-400">TOL: ±0.05mm</span>
                      </div>

                      {/* Main Card Content */}
                      <div className="py-4 space-y-3 relative z-10">
                        <div className="flex items-start justify-between gap-2">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-white/10 text-sky-200 border border-white/15 backdrop-blur-sm">
                            {product.category}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-400/20 px-2.5 py-1 rounded-full">
                            {product.standard}
                          </span>
                        </div>

                        {/* Title with Gradient Text Hover Effect */}
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-sky-200 group-hover:to-sky-400 transition-all">
                            {product.name}
                          </h3>
                          <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                            {product.tagline}
                          </p>
                        </div>

                        {/* Technical Blueprint Specifications Matrix */}
                        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[11px] font-mono space-y-1.5 text-slate-300">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Size Matrix:</span>
                            <span className="text-white font-sans">{product.sizes}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Pressure Rating:</span>
                            <span className="text-white font-sans">{product.pressureRating}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Polymer Grade:</span>
                            <span className="text-white font-sans">{product.material.split(' ')[0]} Virgin</span>
                          </div>
                        </div>

                        {/* Price & MOQ Block */}
                        <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/10 flex items-baseline justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-mono text-slate-400 block">
                              Base Factory Price
                            </span>
                            <span className="text-xl font-extrabold text-white font-mono tracking-tight">
                              {product.priceFormatted}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] uppercase font-mono text-slate-400 block">
                              Order MOQ
                            </span>
                            <span className="text-xs font-bold text-emerald-300 font-mono">
                              {product.moq}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Action Buttons: Download Specs PDF & Inquire Now Modal Trigger */}
                      <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-2 relative z-10">
                        <button
                          id={`download-spec-${product.id}-btn`}
                          type="button"
                          onClick={() => handleDownloadPdf(product)}
                          className="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-200 hover:text-white text-xs font-semibold backdrop-blur-md flex items-center justify-center gap-1.5 transition-all"
                          title="Download Official Technical Specification Sheet (PDF format)"
                        >
                          {downloadSuccessId === product.id ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-300">Saved!</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5 text-sky-400" />
                              <span>Specs Sheet</span>
                            </>
                          )}
                        </button>

                        <button
                          id={`inquire-now-${product.id}-btn`}
                          type="button"
                          onClick={() => onOpenRfq(product.id, 1000)}
                          className="px-3 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 shadow-[0_4px_16px_rgba(37,99,235,0.35)] border border-sky-400/30 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Inquire Now</span>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </main>
        </div>
      </section>
    </div>
  );
}
