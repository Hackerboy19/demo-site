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
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono tracking-wider uppercase shadow-xs">
            <Factory className="w-3.5 h-3.5 text-emerald-600" />
            Manufacturing Facility & Heritage
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Precision Polymer Extrusion Since 2012
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            At our advanced production plant in <span className="text-slate-900 font-semibold">Rajkot, Gujarat</span>, Abhay Polyplast combines automated German extrusion engineering with stringent multi-stage quality checks overseen directly by proprietor <span className="text-slate-900 font-semibold">{COMPANY_DETAILS.proprietor}</span>.
          </p>

          <div className="space-y-4 pt-2">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all shadow-xs"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Regulatory Tags */}
          <div className="pt-3 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-700">
            <span className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs">
              GST: {COMPANY_DETAILS.gstNumber}
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs">
              ISO 9001:2015 Compliant
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs">
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
            {/* Interactive 3D Particle Grid Frame */}
            <div className="rounded-3xl bg-white border border-slate-200/80 shadow-md overflow-hidden">
              <ParticleNetworkCanvas />
            </div>
          </div>

          {/* Micro Caption */}
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500 px-2 font-mono">
            <span className="flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-blue-600" />
              Hydraulic Network Simulation
            </span>
            <span className="text-slate-400">Interactive 3D Mesh</span>
          </div>
        </motion.div>
      </div>

      {/* QC Benchmarks Strip */}
      <div id="specifications" className="mt-20 pt-12 border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-700 uppercase tracking-wider mb-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
            <Microscope className="w-3.5 h-3.5 text-blue-600" />
            Quality Control Laboratory Standards
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Exceeding BIS & ISO Mechanical Benchmarks
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUALITY_STANDARDS.map((qc, qIdx) => (
            <div
              key={qIdx}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-md shadow-xs transition-all"
            >
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                {qc.parameter}
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">{qc.title}</h4>
              <div className="inline-block text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mb-2">
                {qc.result}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{qc.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
