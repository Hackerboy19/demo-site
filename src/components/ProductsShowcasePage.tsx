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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono uppercase tracking-wider shadow-xs">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          Precision Extrusion Catalog • Direct Rajkot Supply
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Industrial Products Showcase
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          High-performance polyethylene conduit, water transport, gas transmission, and agricultural irrigation pipes manufactured in Rajkot to rigorous BIS and ISO benchmarks.
        </p>
      </div>

      {/* 2. 3D Interactive Hero: Exploded Pipe Scene */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            3D Pipe Anatomy & Concentric Cross-Section
          </h2>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            Drag to rotate 360° • Zoom to inspect layer bonding
          </span>
        </div>
        <ProductExplodedPipe3D />
      </section>

      {/* 3. Product Catalog Layout: 2-Column (Sticky Filter Sidebar + Product Grid) */}
      <section className="pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sticky Filter Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-wider font-mono">
                  <Filter className="w-4 h-4 text-blue-600" />
                  Catalog Filters
                </div>
                {(selectedCategory !== 'All' || searchQuery !== '' || selectedStandard !== 'All') && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] text-blue-600 hover:text-blue-700 flex items-center gap-1 font-mono transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Keyword Search */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Search Pipe Line
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by diameter, application..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Category Selection Pills */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
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
                        className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                          active
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <span>{cat.label}</span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                            active ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
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
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Standard Benchmark
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {standards.map(std => (
                    <button
                      key={std}
                      onClick={() => setSelectedStandard(std)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-mono border transition-all cursor-pointer ${
                        selectedStandard === std
                          ? 'bg-blue-50 border-blue-400 text-blue-700 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {std}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct B2B Order Callout */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-600 font-bold font-mono">
                  <ShieldCheck className="w-4 h-4" />
                  <span>GST Credit Invoicing</span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  GSTIN: <span className="font-mono text-slate-900 font-semibold">{COMPANY_DETAILS.gstNumber}</span>. Direct ex-factory truck dispatches from Kuvadva G.I.D.C.
                </p>
                <a
                  href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
                  className="pt-2 text-blue-600 hover:text-blue-700 flex items-center gap-1.5 font-semibold text-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{COMPANY_DETAILS.phone}</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Right Column: Framer Motion Animated Product Grid */}
          <main className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>
                Showing <strong className="text-slate-900">{filteredProducts.length}</strong> polymer lines
              </span>
              <span className="font-mono text-[11px] text-blue-600">
                Tolerances: Class A • Zero Regrind Policy
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
                <p className="text-slate-600 text-sm">No products matched your active filters.</p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold hover:bg-blue-100 cursor-pointer"
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
                      className="group relative rounded-3xl bg-white border border-slate-200/80 hover:border-slate-300 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                    >
                      {/* Corner Technical Metadata Stamps */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200 font-mono text-[10px] text-slate-400">
                        <span className="text-blue-600 font-bold tracking-wider">
                          DWG #{product.id.toUpperCase().slice(0, 10)}
                        </span>
                        <span className="text-slate-400">TOL: ±0.05mm</span>
                      </div>

                      {/* Main Card Content */}
                      <div className="py-4 space-y-3 relative z-10">
                        <div className="flex items-start justify-between gap-2">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                            {product.category}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold">
                            {product.standard}
                          </span>
                        </div>

                        {/* Title */}
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                            {product.tagline}
                          </p>
                        </div>

                        {/* Technical Specifications Matrix */}
                        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] font-mono space-y-1.5 text-slate-600">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Size Matrix:</span>
                            <span className="text-slate-900 font-sans font-medium">{product.sizes}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Pressure Rating:</span>
                            <span className="text-slate-900 font-sans font-medium">{product.pressureRating}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Polymer Grade:</span>
                            <span className="text-slate-900 font-sans font-medium">{product.material.split(' ')[0]} Virgin</span>
                          </div>
                        </div>

                        {/* Price & MOQ Block */}
                        <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 flex items-baseline justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-mono text-slate-400 block">
                              Base Factory Price
                            </span>
                            <span className="text-xl font-extrabold text-slate-900 font-mono tracking-tight">
                              {product.priceFormatted}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] uppercase font-mono text-slate-400 block">
                              Order MOQ
                            </span>
                            <span className="text-xs font-bold text-emerald-600 font-mono">
                              {product.moq}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-2 relative z-10">
                        <button
                          id={`download-spec-${product.id}-btn`}
                          type="button"
                          onClick={() => handleDownloadPdf(product)}
                          className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          title="Download Official Technical Specification Sheet (PDF format)"
                        >
                          {downloadSuccessId === product.id ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Saved!</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5 text-blue-600" />
                              <span>Specs Sheet</span>
                            </>
                          )}
                        </button>

                        <button
                          id={`inquire-now-${product.id}-btn`}
                          type="button"
                          onClick={() => onOpenRfq(product.id, 1000)}
                          className="px-3 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
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
