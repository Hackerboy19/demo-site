import React from 'react';
import { motion } from 'motion/react';
import { Globe, Navigation, ShieldCheck, Truck, ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import { Globe3DCanvas } from './Globe3DCanvas';
import { COMPANY_DETAILS } from '../data/products';

export function ExportFootprintSection() {
  const domesticRegions = [
    { name: 'Gujarat', hubs: 'Rajkot (HQ), Ahmedabad, Surat, Vadodara', tag: 'Direct Mill Dispatches' },
    { name: 'Rajasthan', hubs: 'Jaipur, Jodhpur, Kota Agri Corridors', tag: 'Micro-Irrigation & Water' },
    { name: 'Maharashtra', hubs: 'Mumbai Port, Pune, Nashik, Nagpur', tag: 'Municipal & Industrial' }
  ];

  const globalRegions = [
    { name: 'Middle East', hubs: 'Dubai (UAE), Riyadh (KSA), Muscat (Oman)', tag: 'Infrastructure & Gas' },
    { name: 'Africa', hubs: 'Nairobi (Kenya), Lagos (Nigeria), Cairo (Egypt)', tag: 'Agri Water Schemes' }
  ];

  return (
    <section id="export-footprint" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono tracking-wider uppercase mb-4 shadow-xs">
          <Globe className="w-3.5 h-3.5 text-blue-600" />
          Domestic & Global Supply Network
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Export Footprint & Logistics Corridors
        </h2>
        <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
          From our ISO-certified extrusion plant in Rajkot, Gujarat, Abhay Polyplast supplies critical water, gas, and telecom pipeline networks across prime domestic states and emerging overseas markets.
        </p>
      </div>

      {/* Main 3D Globe + Corridor Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Interactive 3D Globe Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-8"
        >
          <Globe3DCanvas />
        </motion.div>

        {/* Right: Regional Breakdown Cards */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-4 space-y-4"
        >
          {/* Domestic Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">Domestic Corridors</h3>
              </div>
              <span className="text-[10px] font-mono text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-semibold">
                Pan-India
              </span>
            </div>
            <div className="space-y-3">
              {domesticRegions.map((region, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-0.5">
                    <span>{region.name}</span>
                    <span className="text-[10px] font-mono font-medium text-blue-600">{region.tag}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 leading-snug">{region.hubs}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Global Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">International Exports</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
                Global
              </span>
            </div>
            <div className="space-y-3">
              {globalRegions.map((region, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-0.5">
                    <span>{region.name}</span>
                    <span className="text-[10px] font-mono font-medium text-emerald-600">{region.tag}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 leading-snug">{region.hubs}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Logistics Badge */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center gap-3 text-xs text-slate-700 font-medium shadow-xs">
            <Truck className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <span className="font-bold text-blue-900 block">Express Highway Dispatch</span>
              Direct freight access via Kuvadva G.I.D.C & Mundra/Kandla seaports.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
