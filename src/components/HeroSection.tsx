import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  Layers,
  RotateCw
} from 'lucide-react';
import { Hero3DCanvas } from './Hero3DCanvas';
import { COMPANY_DETAILS } from '../data/products';

interface HeroSectionProps {
  onOpenRfq: (productId?: string) => void;
  activePipeType: 'hdpe' | 'mdpe' | 'drip' | 'plb';
  onChangePipeType: (type: 'hdpe' | 'mdpe' | 'drip' | 'plb') => void;
}

export function HeroSection({
  onOpenRfq,
  activePipeType,
  onChangePipeType
}: HeroSectionProps) {
  const pipeTypeLabels: { id: 'hdpe' | 'mdpe' | 'drip' | 'plb'; label: string; tag: string }[] = [
    { id: 'hdpe', label: 'HDPE Water Pipe', tag: 'IS 4984 / PE-100' },
    { id: 'mdpe', label: 'MDPE Gas Pipe', tag: 'ISO 4437 / Gas' },
    { id: 'drip', label: 'Drip Irrigation Coil', tag: 'Micro-Irrigation' },
    { id: 'plb', label: 'PLB Cable Duct', tag: 'Optical Fiber' }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Ambient Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-indigo-500/15 via-blue-500/15 to-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-12 left-10 w-72 h-72 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Grid Pattern Overlay for High-Tech Industrial Look */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Hero Copy & Call To Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6 text-left relative z-20"
        >
          {/* Top Trust Eyebrow - Frosted Glass Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-xs font-mono font-medium text-slate-200">
              Est. 2012 • Rajkot, Gujarat
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs font-mono text-emerald-300 font-semibold">
              ISO Certified Extrusion
            </span>
          </div>

          {/* Core Requested Hero Typography */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
              Industrial Strength.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-blue-300 to-emerald-300">
                Agricultural Precision.
              </span>
            </h1>
          </div>

          {/* Requested Subheading */}
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl font-normal leading-relaxed">
            Premium HDPE & Drip Irrigation solutions manufactured in Gujarat. Engineered for municipal pipelines, harsh agricultural terrains, and high-speed optical telecom networks.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            {/* Glowing Call-to-action button */}
            <button
              id="hero-request-bulk-quote-btn"
              onClick={() => onOpenRfq()}
              className="relative group px-7 py-4 rounded-2xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 hover:from-blue-500 hover:to-sky-400 active:scale-[0.98] transition-all duration-200 shadow-[0_8px_32px_0_rgba(37,99,235,0.45)] hover:shadow-[0_8px_40px_0_rgba(56,189,248,0.55)] border border-sky-400/30 flex items-center justify-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="relative z-10 flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-100" />
                <span>Request Bulk Quote</span>
              </span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Frosted Secondary Button */}
            <a
              href="#products"
              className="px-6 py-4 rounded-2xl font-semibold text-sm sm:text-base text-slate-100 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.25)]"
            >
              <span>Explore Products & Rates</span>
            </a>
          </div>

          {/* Interactive 3D Model Specimen Selector Bar with Frosted Glass Cards */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-mono text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <RotateCw className="w-3 h-3 text-sky-400 animate-spin" style={{ animationDuration: '8s' }} />
                Interactive 3D Specimen Selector:
              </span>
              <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                Drag to inspect / Hover for parallax
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {pipeTypeLabels.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onChangePipeType(item.id)}
                  className={`px-3 py-2.5 rounded-2xl text-left transition-all backdrop-blur-md border ${
                    activePipeType === item.id
                      ? 'bg-blue-500/20 border-sky-400/60 text-white shadow-[0_8px_24px_0_rgba(56,189,248,0.25)]'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/[0.08] shadow-[0_4px_16px_0_rgba(0,0,0,0.2)]'
                  }`}
                >
                  <div className="text-xs font-bold truncate">{item.label}</div>
                  <div className="text-[10px] font-mono text-slate-400 truncate mt-0.5">{item.tag}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Micro Legal Credentials Banner */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono pt-1">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-slate-200 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Virgin Polymer
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-slate-300 shadow-sm">
              GST: {COMPANY_DETAILS.gstNumber}
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-slate-300 shadow-sm">
              Proprietor: {COMPANY_DETAILS.proprietor}
            </span>
          </div>
        </motion.div>

        {/* Right Column: Interactive 3D Canvas with Frosted Glass Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="lg:col-span-5 h-[420px] sm:h-[500px] lg:h-[600px] relative flex items-center justify-center"
        >
          {/* Canvas Backing Frosted Glass Atmosphere */}
          <div className="absolute inset-0 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] -z-10" />

          {/* Floating Telemetry Badges */}
          <div className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-xl px-3.5 py-1.5 rounded-2xl border border-white/15 text-[11px] font-mono text-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.3)] pointer-events-none">
            <span className="text-sky-300 font-bold">PE-100</span> | DENSITY 0.95 g/cm³
          </div>

          <div className="absolute bottom-4 left-4 z-20 bg-white/10 backdrop-blur-xl px-3.5 py-1.5 rounded-2xl border border-white/15 text-[11px] font-mono text-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.3)] pointer-events-none flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>3D ROTATION ACTIVE</span>
          </div>

          {/* 3D Canvas */}
          <Hero3DCanvas pipeType={activePipeType} />
        </motion.div>
      </div>
    </section>
  );
}
