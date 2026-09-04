import React from 'react';
import { motion } from 'motion/react';
import {
  Factory,
  ShieldAlert,
  CheckCircle2,
  Cpu,
  Droplets,
  Microscope,
  Zap,
  Building2
} from 'lucide-react';
import { ParticleNetworkCanvas } from './ParticleNetworkCanvas';
import { COMPANY_DETAILS, QUALITY_STANDARDS } from '../data/products';

export function InfrastructureSection() {
  const highlights = [
    {
      title: 'Established in 2012',
      desc: 'Founded over a decade ago under the leadership of Mr. Vivek Apani, expanding from a regional pipe mill into a leading supplier across Gujarat and Western India.'
    },
    {
      title: 'State-of-the-Art Extrusion Plant',
      desc: 'Located at Plot No. 7 & 8 Gokuldham Industrial, near Kuvadva G.I.D.C, Rajkot. Equipped with computerized grooved-feed extruder barrels and gravimetric blenders.'
    },
    {
      title: 'Strict In-House QC Laboratory',
      desc: 'Every production batch undergoes mandatory internal hydrostatic stress tests, MFI verification, and carbon black dispersion checks before dispatch.'
    },
    {
      title: 'Zero Chalk or Recycled Fillers',
      desc: 'Uncompromising policy of utilizing only 100% certified prime virgin PE-100 and PE-80 polymers sourced directly from top petrochemical refineries.'
    }
  ];

  return (
    <section id="infrastructure" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      {/* Split Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Factory History & Strict Quality Control */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-emerald-300 text-xs font-mono tracking-wider uppercase shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <Factory className="w-3.5 h-3.5 text-emerald-300" />
            Manufacturing Facility & Heritage
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Precision Polymer Extrusion Since 2012
          </h2>

          <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
            At our advanced production plant in <span className="text-white font-semibold">Rajkot, Gujarat</span>, Abhay Polyplast combines automated German extrusion engineering with stringent multi-stage quality checks overseen directly by proprietor <span className="text-white font-semibold">{COMPANY_DETAILS.proprietor}</span>.
          </p>

          <div className="space-y-4 pt-2">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all shadow-[0_4px_16px_0_rgba(0,0,0,0.2)]"
              >
                <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-sky-300" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Regulatory Tags */}
          <div className="pt-3 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-200">
            <span className="px-3.5 py-1.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-sm">
              GST: {COMPANY_DETAILS.gstNumber}
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-sm">
              ISO 9001:2015 Compliant
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-sm">
              BIS Standard IS 4984
            </span>
          </div>
        </motion.div>

        {/* Right Column: 3D Abstract Particle Grid Canvas */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-6 relative"
        >
          <div className="relative">
            {/* Glow backing */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/20 via-sky-400/20 to-emerald-400/20 blur-xl opacity-50 pointer-events-none" />

            {/* Interactive 3D Particle Grid Frame */}
            <div className="rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] overflow-hidden">
              <ParticleNetworkCanvas />
            </div>
          </div>

          {/* Micro Caption */}
          <div className="mt-4 flex items-center justify-between text-xs text-slate-300 px-2 font-mono">
            <span className="flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-sky-400" />
              Hydraulic Network Simulation
            </span>
            <span className="text-slate-400">Interactive 3D Mesh</span>
          </div>
        </motion.div>
      </div>

      {/* QC Benchmarks Strip */}
      <div id="specifications" className="mt-20 pt-12 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-300 uppercase tracking-wider mb-2 px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <Microscope className="w-3.5 h-3.5" />
            Quality Control Laboratory Standards
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Exceeding BIS & ISO Mechanical Benchmarks
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUALITY_STANDARDS.map((qc, qIdx) => (
            <div
              key={qIdx}
              className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/25 hover:bg-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] transition-all"
            >
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                {qc.parameter}
              </div>
              <h4 className="text-base font-bold text-white mb-2">{qc.title}</h4>
              <div className="inline-block text-xs font-mono font-bold text-emerald-300 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-400/25 backdrop-blur-sm mb-2">
                {qc.result}
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">{qc.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
