import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Layers,
  ChevronRight,
  Shield,
  Gauge,
  Check,
  Calculator,
  ArrowUpRight,
  Sparkles,
  Info
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface ProductGridProps {
  onSelectProductForRfq: (productId: string, quantity?: number) => void;
  onPreviewIn3D?: (pipeType: 'hdpe' | 'mdpe' | 'drip' | 'plb') => void;
}

export function ProductGrid({ onSelectProductForRfq, onPreviewIn3D }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTabByProduct, setActiveTabByProduct] = useState<Record<string, 'overview' | 'calculator' | 'specs'>>({});
  const [customMetersByProduct, setCustomMetersByProduct] = useState<Record<string, number>>({
    'hdpe-water-pipe': 1000,
    'mdpe-pipe': 1500,
    'drip-irrigation-coil': 2000,
    'hdpe-cable-duct': 1000
  });

  const categories = ['All', 'HDPE Pipes', 'MDPE Pipes', 'Drip Irrigation', 'Cable Ducts'];

  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const getPipeTypeId = (id: string): 'hdpe' | 'mdpe' | 'drip' | 'plb' => {
    if (id === 'mdpe-pipe') return 'mdpe';
    if (id === 'drip-irrigation-coil') return 'drip';
    if (id === 'hdpe-cable-duct') return 'plb';
    return 'hdpe';
  };

  const getAccentGlow = (accent: Product['colorAccent']) => {
    switch (accent) {
      case 'emerald':
        return 'hover:border-emerald-400/50 hover:shadow-[0_12px_36px_rgba(16,185,129,0.2)]';
      case 'amber':
        return 'hover:border-amber-400/50 hover:shadow-[0_12px_36px_rgba(245,158,11,0.2)]';
      case 'cyan':
        return 'hover:border-cyan-400/50 hover:shadow-[0_12px_36px_rgba(6,182,212,0.2)]';
      case 'blue':
      default:
        return 'hover:border-sky-400/50 hover:shadow-[0_12px_36px_rgba(56,189,248,0.2)]';
    }
  };

  const getBadgeColor = (accent: Product['colorAccent']) => {
    switch (accent) {
      case 'emerald':
        return 'bg-emerald-500/15 text-emerald-200 border-emerald-400/30';
      case 'amber':
        return 'bg-amber-500/15 text-amber-200 border-amber-400/30';
      case 'cyan':
        return 'bg-cyan-500/15 text-cyan-200 border-cyan-400/30';
      case 'blue':
      default:
        return 'bg-sky-500/15 text-sky-200 border-sky-400/30';
    }
  };

  return (
    <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-sky-300 text-xs font-mono tracking-wider uppercase mb-4 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <Sparkles className="w-3.5 h-3.5" />
          Extrusion Catalog & Pricing
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Engineered for Extreme Hydraulic & Mechanical Loads
        </h2>
        <p className="mt-4 text-slate-200 text-base sm:text-lg leading-relaxed">
          Manufactured using high-viscosity 100% virgin polymer resins in Rajkot, Gujarat. Built strictly according to Bureau of Indian Standards (BIS) specifications.
        </p>

        {/* Category Pills with Frosted Glass Styling */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 backdrop-blur-md ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-[0_4px_20px_rgba(37,99,235,0.4)] border border-sky-400/30 scale-105'
                  : 'bg-white/5 text-slate-300 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid with Frosted Glass Theme */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProducts.map((product, idx) => {
          const activeTab = activeTabByProduct[product.id] || 'overview';
          const meters = customMetersByProduct[product.id] || 1000;
          const calculatedSubtotal = product.pricePerMeter ? product.pricePerMeter * meters : null;

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`group relative rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 ${getAccentGlow(
                product.colorAccent
              )} shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] transition-all duration-300 flex flex-col justify-between overflow-hidden`}
            >
              {/* Top Card Ambient Gradient Bar */}
              <div
                className="h-1.5 w-full bg-gradient-to-r"
                style={{
                  backgroundImage: `linear-gradient(to right, ${product.stripeColor || '#38bdf8'}, transparent)`
                }}
              />

              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                {/* Header info */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border backdrop-blur-sm ${getBadgeColor(product.colorAccent)}`}>
                        {product.category}
                      </span>
                      {product.badge && (
                        <span className="text-[10px] font-medium text-slate-200 bg-white/10 px-2 py-0.5 rounded border border-white/15 backdrop-blur-sm">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  {/* Pricing Badge */}
                  <div className="text-right shrink-0">
                    <div className="text-xl font-extrabold text-white">
                      {product.priceFormatted}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      MOQ: {product.moq}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* Interactive Sub-Tabs for Card */}
                <div className="flex border-b border-white/10 mb-5 text-xs font-medium text-slate-400">
                  <button
                    onClick={() => setActiveTabByProduct({ ...activeTabByProduct, [product.id]: 'overview' })}
                    className={`pb-2 mr-4 transition-colors ${
                      activeTab === 'overview'
                        ? 'text-sky-300 border-b-2 border-sky-400 font-semibold'
                        : 'hover:text-slate-200'
                    }`}
                  >
                    Core Features
                  </button>
                  <button
                    onClick={() => setActiveTabByProduct({ ...activeTabByProduct, [product.id]: 'specs' })}
                    className={`pb-2 mr-4 transition-colors ${
                      activeTab === 'specs'
                        ? 'text-sky-300 border-b-2 border-sky-400 font-semibold'
                        : 'hover:text-slate-200'
                    }`}
                  >
                    Tech Specifications
                  </button>
                  {product.pricePerMeter && (
                    <button
                      onClick={() => setActiveTabByProduct({ ...activeTabByProduct, [product.id]: 'calculator' })}
                      className={`pb-2 transition-colors flex items-center gap-1 ${
                        activeTab === 'calculator'
                          ? 'text-emerald-300 border-b-2 border-emerald-400 font-semibold'
                          : 'hover:text-slate-200'
                      }`}
                    >
                      <Calculator className="w-3 h-3" />
                      Bulk Estimator
                    </button>
                  )}
                </div>

                {/* Tab 1: Overview Features */}
                {activeTab === 'overview' && (
                  <div className="space-y-2.5 flex-1">
                    {product.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <div className="w-4 h-4 rounded-full bg-sky-500/15 border border-sky-400/30 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-sky-300" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab 2: Technical Specifications - Frosted Box */}
                {activeTab === 'specs' && (
                  <div className="grid grid-cols-2 gap-3 text-xs flex-1 bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                    <div>
                      <span className="text-slate-400 block font-mono text-[10px] uppercase">Standard</span>
                      <span className="font-semibold text-slate-200">{product.standard}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-mono text-[10px] uppercase">Pressure Class</span>
                      <span className="font-semibold text-emerald-300">{product.pressureRating}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-mono text-[10px] uppercase">Sizes Available</span>
                      <span className="font-semibold text-slate-200">{product.sizes}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-mono text-[10px] uppercase">Polymer Grade</span>
                      <span className="font-semibold text-slate-200">{product.material}</span>
                    </div>
                  </div>
                )}

                {/* Tab 3: Bulk Price Estimator - Frosted Box */}
                {activeTab === 'calculator' && product.pricePerMeter && (
                  <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex-1 space-y-3 shadow-inner">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-200 font-medium">Desired Length (Meters):</span>
                      <span className="font-mono font-bold text-white bg-white/10 px-2.5 py-0.5 rounded border border-white/15">
                        {meters.toLocaleString()} m
                      </span>
                    </div>

                    <input
                      type="range"
                      min={1000}
                      max={20000}
                      step={500}
                      value={meters}
                      onChange={(e) => setCustomMetersByProduct({
                        ...customMetersByProduct,
                        [product.id]: Number(e.target.value)
                      })}
                      className="w-full accent-sky-400 bg-white/10 h-2 rounded-lg cursor-pointer"
                    />

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block">
                          ESTIMATED VALUE (EXCL. GST)
                        </span>
                        <span className="text-lg font-extrabold text-emerald-300 font-mono">
                          ₹{calculatedSubtotal?.toLocaleString()}
                        </span>
                      </div>
                      <button
                        onClick={() => onSelectProductForRfq(product.id, meters)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 font-medium flex items-center gap-1 backdrop-blur-sm transition-colors"
                      >
                        Lock Quote <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    id={`rfq-btn-${product.id}`}
                    onClick={() => onSelectProductForRfq(product.id, meters)}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(37,99,235,0.35)] border border-sky-400/30"
                  >
                    <span>Request Bulk Quote</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {onPreviewIn3D && (
                    <button
                      onClick={() => onPreviewIn3D(getPipeTypeId(product.id))}
                      className="w-full sm:w-auto py-3 px-4 rounded-xl text-xs sm:text-sm font-medium text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
                      title="Inspect this tube spec in the 3D viewer"
                    >
                      <Layers className="w-4 h-4 text-sky-400" />
                      <span>Inspect 3D</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
