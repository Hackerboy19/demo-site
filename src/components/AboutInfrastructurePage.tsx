import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Factory,
  ShieldCheck,
  CheckCircle2,
  Users,
  MapPin,
  Clock,
  Sparkles,
  Phone,
  ArrowRight,
  FileCheck,
  Layers,
  Award,
  Cpu,
  Truck,
  Flame,
  Check
} from 'lucide-react';
import { Globe3DCanvas } from './Globe3DCanvas';
import { COMPANY_DETAILS, QUALITY_STANDARDS } from '../data/products';

interface AboutInfrastructurePageProps {
  onOpenRfq: (productId?: string) => void;
}

export function AboutInfrastructurePage({ onOpenRfq }: AboutInfrastructurePageProps) {
  const [activeTilt, setActiveTilt] = useState<number | null>(null);

  const manufacturingSteps = [
    {
      stepNumber: '01',
      title: 'Virgin Raw Material Sourcing',
      highlight: '100% Virgin Resins • Zero Regrind',
      description:
        'We source prime-grade certified PE-100 and PE-80 polymer granules directly from premier petrochemical producers. We enforce a strict zero-recycled/reprocessed filler policy to guarantee uncompromised long-term hydrostatic strength.',
      specs: [
        'High molecular weight polyethylene (HDPE & MDPE)',
        'Incoming batch Melt Flow Index (MFI) verification',
        '2.5% pre-compounded UV-grade carbon black masterbatch'
      ],
      icon: Layers,
      accent: 'from-blue-500 to-sky-400'
    },
    {
      stepNumber: '02',
      title: 'State-of-the-Art Extrusion',
      highlight: 'Helical Grooved Feed & Ultrasonic Gauging',
      description:
        'High-torque automated extrusion lines featuring vacuum calibration cooling tanks, continuous internal lubrication co-extrusion, and online ultrasonic wall thickness measuring rings ensuring precise SDR adherence.',
      specs: [
        'Gravimetric throughput and weight per meter control',
        'Multiple stage high-vacuum sizing for circular accuracy',
        'Laser-etched continuous meterage, batch & IS standard marking'
      ],
      icon: Cpu,
      accent: 'from-sky-500 to-cyan-400'
    },
    {
      stepNumber: '03',
      title: 'Rigorous Quality Testing',
      highlight: 'In-House Quality Control Testing Laboratory',
      description:
        'Every production lot undergoes rigorous mechanical, thermal, and hydraulic validation adhering to Bureau of Indian Standards (BIS) IS 4984:2016 and ISO 4437 specifications before dispatch approval.',
      specs: [
        '100h / 165h continuous hydrostatic internal pressure testing',
        'Carbon black dispersion test (Grade ≤ 3)',
        'Tensile elongation at break test exceeding 350%'
      ],
      icon: ShieldCheck,
      accent: 'from-emerald-500 to-teal-400'
    },
    {
      stepNumber: '04',
      title: 'Pan-India Dispatch',
      highlight: 'Daily Direct Dispatches from Kuvadva G.I.D.C',
      description:
        'Strategically positioned in Rajkot’s premier industrial zone with immediate connectivity to national highway corridors. Automated coil winding reels and secure straight-length bundling ensure zero damage in transit.',
      specs: [
        'Daily dedicated container & open-body truck freight',
        'Full GST invoice, e-Way bill & MTC test certificate issued',
        'Prompt delivery across Gujarat, Maharashtra, Rajasthan & all states'
      ],
      icon: Truck,
      accent: 'from-amber-500 to-emerald-400'
    }
  ];

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20 relative z-10">
      {/* 1. 3D Globe / Location Hero Section & Company Legacy Overlay */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Legacy Title & Narrative */}
          <div className="lg:col-span-6 space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono uppercase tracking-wider shadow-xs"
            >
              <Factory className="w-3.5 h-3.5 text-blue-600" />
              Rajkot Manufacturing Plant • Est. 2012
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]"
            >
              Abhay Polyplast – Engineered for India’s Future.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono">
                <span className="text-emerald-600 font-bold">Established in 2012</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-800 font-semibold">
                  Proprietor: <span className="text-blue-600">{COMPANY_DETAILS.proprietor}</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600">GST: {COMPANY_DETAILS.gstNumber}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                Founded with a mission to deliver zero-defect polymer extrusion pipes for water security, agricultural prosperity, and digital optical fiber connectivity across India. Over a decade of engineering trust from the heart of Saurashtra’s industrial hub.
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-mono shadow-xs">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>IS 4984 / ISO 9001:2015</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-mono shadow-xs">
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span>100% Virgin PE-100</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-mono shadow-xs">
                <Check className="w-3.5 h-3.5 text-amber-600" />
                <span>Kuvadva G.I.D.C Facility</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Globe pinpointing Rajkot, Gujarat */}
          <div className="lg:col-span-6">
            <Globe3DCanvas />
          </div>
        </div>
      </section>

      {/* 2. Infrastructure Stats Grid: Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">
            B2B Transparency & Certified Capabilities
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Manufacturing Infrastructure at a Glance
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Backed by heavy industrial extrusion machinery, accredited raw material contracts, and registered enterprise credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: GST & Legal Trust */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-md space-y-4 relative overflow-hidden group transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[11px] font-mono text-blue-600 font-bold uppercase tracking-wider block">
                Enterprise GSTIN Registration
              </span>
              <div className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight mt-1">
                24AAXFA0572A1ZQ
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Fully compliant commercial registration under the GST framework of Gujarat. All industrial consignments include 100% input tax credit (ITC) tax invoices and verified e-Way bills.
            </p>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Proprietor: Mr. Vivek Apani</span>
              <span className="text-emerald-600 font-bold">Active Status</span>
            </div>
          </motion.div>

          {/* Card 2: Skilled Staff & Operations */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-md space-y-4 relative overflow-hidden group transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-xs">
              <Users className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[11px] font-mono text-emerald-600 font-bold uppercase tracking-wider block">
                Technical Workforce
              </span>
              <div className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight mt-1">
                15+ Skilled Staff
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Extrusion machine operators, QA lab metallurgists, tooling technicians, and logistics dispatchers working round-the-clock shifts to maintain zero tolerance tolerances and delivery deadlines.
            </p>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Plant Uptime: 24/7</span>
              <span className="text-blue-600 font-bold">Zero Accidents</span>
            </div>
          </motion.div>

          {/* Card 3: Factory Address & Works */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-md space-y-4 relative overflow-hidden group transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
              <MapPin className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[11px] font-mono text-amber-600 font-bold uppercase tracking-wider block">
                Works & Extrusion Plant
              </span>
              <div className="text-lg font-bold text-slate-900 font-sans mt-1">
                Plot No. 7 & 8 Gokuldham Industrial
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Located near Kuvadva G.I.D.C, Rajkot, Gujarat - 360023. Spacious factory floor housing heavy-duty extruders, cooling troughs, high-bay coiled storage, and on-site testing water baths.
            </p>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>National Highway Access</span>
              <span className="text-amber-600 font-bold">Direct Truck Loading</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Manufacturing Process: Vertical Timeline (Scroll Animation) */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">
            Engineering Precision Cycle
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Our 4-Stage Manufacturing Protocol
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            From molecular granule inspection to final hydrostatic certification, discover how Abhay Polyplast maintains 100% pipe reliability.
          </p>
        </div>

        <div className="relative">
          {/* Vertical central subtle line on desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-slate-200 pointer-events-none" />

          <div className="space-y-10 sm:space-y-14">
            {manufacturingSteps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const StepIcon = step.icon;

              return (
                <motion.div
                  key={step.stepNumber}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full lg:w-1/2">
                    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-blue-600 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
                          Step {step.stepNumber}
                        </span>
                        <span className="text-xs font-mono text-emerald-600 font-semibold">
                          {step.highlight}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                        {step.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {step.description}
                      </p>

                      <div className="pt-3 border-t border-slate-200 space-y-1.5">
                        {step.specs.map((spec, sIdx) => (
                          <div
                            key={sIdx}
                            className="flex items-start gap-2 text-xs text-slate-600 font-mono"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Central Node Badge */}
                  <div className="relative z-10 shrink-0 w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-md">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                      <StepIcon className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>

                  {/* Empty Spacer Column for Desktop Alternate Layout */}
                  <div className="hidden lg:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Quality Assurance Banner & Contact Sales Head */}
      <section className="relative rounded-3xl bg-gradient-to-r from-blue-50/80 via-white to-emerald-50/80 border border-slate-200/90 p-8 sm:p-12 shadow-md overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono uppercase tracking-wider">
            <Award className="w-4 h-4 text-emerald-600" />
            ISO 9001:2015 Registered • IS 4984 Benchmark
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Ethical Manufacturing & Unconditional Quality Assurance
          </h2>

          <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            At Abhay Polyplast, every meter of pipe carries the reputation of our founder Mr. Vivek Apani and the dedicated Rajkot workforce. We provide official Manufacturer Test Certificates (MTC), laser traceability, and full technical documentation with every truckload.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Design Life</span>
              <span className="text-base font-bold text-slate-900 font-mono">50+ Years</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Melt Index</span>
              <span className="text-base font-bold text-blue-600 font-mono">0.2 - 0.4 g</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Carbon Black</span>
              <span className="text-base font-bold text-emerald-600 font-mono">2.5% ± 0.5%</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Rejection Rate</span>
              <span className="text-base font-bold text-slate-900 font-mono">0.00% Defect</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              id="contact-sales-head-rfq-btn"
              onClick={() => onOpenRfq()}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Contact our Sales Head</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/919825045892?text=Hello%20Abhay%20Polyplast,%20I%20would%20like%20to%20speak%20with%20your%20Sales%20Head%20regarding%20bulk%20pipe%20orders.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl font-semibold text-xs text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
