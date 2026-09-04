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
        return 'hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/10';
      case 'amber':
        return 'hover:border-amber-300 hover:shadow-xl hover:shadow-amber-500/10';
      case 'cyan':
        return 'hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-500/10';
      case 'blue':
      default:
        return 'hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10';
    }
  };

  const getBadgeColor = (accent: Product['colorAccent']) => {
    switch (accent) {
      case 'emerald':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'amber':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'cyan':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'blue':
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono tracking-wider uppercase mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          Extrusion Catalog & Pricing
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Engineered for Extreme Hydraulic & Mechanical Loads
        </h2>
        <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
          Manufactured using high-viscosity 100% virgin polymer resins in Rajkot, Gujarat. Built strictly according to Bureau of Indian Standards (BIS) specifications.
        </p>

        {/* Category Pills with Clean Minimalist Styling */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid with Clean White Theme */}
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
              className={`group relative rounded-3xl bg-white border border-slate-200/80 hover:-translate-y-1 ${getAccentGlow(
                product.colorAccent
              )} shadow-sm transition-all duration-300 flex flex-col justify-between overflow-hidden`}
            >
              {/* Top Card Accent Line */}
              <div
                className="h-1.5 w-full"
                style={{
                  backgroundColor: product.stripeColor || '#2563eb'
                }}
              />

              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                {/* Header info */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border font-semibold ${getBadgeColor(product.colorAccent)}`}>
                        {product.category}
                      </span>
                      {product.badge && (
                        <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  {/* Pricing Badge */}
                  <div className="text-right shrink-0">
                    <div className="text-xl font-extrabold text-slate-900">
                      {product.priceFormatted}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500">
                      MOQ: {product.moq}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* Interactive Sub-Tabs for Card */}
                <div className="flex border-b border-slate-200 mb-5 text-xs font-medium text-slate-500">
                  <button
                    onClick={() => setActiveTabByProduct({ ...activeTabByProduct, [product.id]: 'overview' })}
                    className={`pb-2 mr-4 transition-colors cursor-pointer ${
                      activeTab === 'overview'
                        ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                        : 'hover:text-slate-900'
                    }`}
                  >
                    Core Features
                  </button>
                  <button
                    onClick={() => setActiveTabByProduct({ ...activeTabByProduct, [product.id]: 'specs' })}
                    className={`pb-2 mr-4 transition-colors cursor-pointer ${
                      activeTab === 'specs'
                        ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
                        : 'hover:text-slate-900'
                    }`}
                  >
                    Tech Specifications
                  </button>
                  {product.pricePerMeter && (
                    <button
                      onClick={() => setActiveTabByProduct({ ...activeTabByProduct, [product.id]: 'calculator' })}
                      className={`pb-2 transition-colors flex items-center gap-1 cursor-pointer ${
                        activeTab === 'calculator'
                          ? 'text-emerald-600 border-b-2 border-emerald-600 font-semibold'
                          : 'hover:text-slate-900'
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
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                        <div className="w-4 h-4 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-blue-600" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab 2: Technical Specifications - Clean Light Box */}
                {activeTab === 'specs' && (
                  <div className="grid grid-cols-2 gap-3 text-xs flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                    <div>
                      <span className="text-slate-500 block font-mono text-[10px] uppercase">Standard</span>
                      <span className="font-semibold text-slate-800">{product.standard}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block font-mono text-[10px] uppercase">Pressure Class</span>
                      <span className="font-semibold text-emerald-600">{product.pressureRating}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block font-mono text-[10px] uppercase">Sizes Available</span>
                      <span className="font-semibold text-slate-800">{product.sizes}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block font-mono text-[10px] uppercase">Polymer Grade</span>
                      <span className="font-semibold text-slate-800">{product.material}</span>
                    </div>
                  </div>
                )}

                {/* Tab 3: Bulk Price Estimator - Clean Light Box */}
                {activeTab === 'calculator' && product.pricePerMeter && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex-1 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-700 font-medium">Desired Length (Meters):</span>
                      <span className="font-mono font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded border border-slate-200 shadow-xs">
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
                      className="w-full accent-blue-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
                    />

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-slate-500 block">
                          ESTIMATED VALUE (EXCL. GST)
                        </span>
                        <span className="text-lg font-extrabold text-emerald-600 font-mono">
                          ₹{calculatedSubtotal?.toLocaleString()}
                        </span>
                      </div>
                      <button
                        onClick={() => onSelectProductForRfq(product.id, meters)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        Lock Quote <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-8 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    id={`rfq-btn-${product.id}`}
                    onClick={() => onSelectProductForRfq(product.id, meters)}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:shadow-blue-500/20 cursor-pointer"
                  >
                    <span>Request Bulk Quote</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {onPreviewIn3D && (
                    <button
                      onClick={() => onPreviewIn3D(getPipeTypeId(product.id))}
                      className="w-full sm:w-auto py-3 px-4 rounded-xl text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                      title="Inspect this tube spec in the 3D viewer"
                    >
                      <Layers className="w-4 h-4 text-blue-600" />
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
