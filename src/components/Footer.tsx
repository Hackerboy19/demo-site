import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ExternalLink,
  Award,
  Factory,
  ArrowUp
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/products';

interface FooterProps {
  onNavigate?: (page: 'home' | 'products' | 'about') => void;
}

export function Footer({ onNavigate }: FooterProps = {}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: 'home' | 'products' | 'about') => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="relative z-10 pt-16 pb-12 bg-white/5 backdrop-blur-md border-t border-white/10 shadow-[0_-8px_32px_0_rgba(0,0,0,0.36)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Company Profile & Heritage */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 via-sky-500 to-emerald-500 p-[1px] shadow-[0_4px_16px_rgba(56,189,248,0.25)]">
                <div className="w-full h-full bg-slate-950/80 backdrop-blur-md rounded-[15px] flex items-center justify-center">
                  <span className="font-extrabold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-emerald-200">
                    AP
                  </span>
                </div>
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">
                  Abhay Polyplast
                </span>
                <span className="block text-[11px] font-mono text-emerald-300">
                  Established 2012 • Rajkot
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Pioneering high-density polyethylene extrusion technology for municipal potable water infrastructure, agricultural drip networks, and telecom optical fiber ducts across Gujarat and India.
            </p>

            {/* Proprietor & Legal Details Card */}
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-xs space-y-1.5 font-mono shadow-sm">
              <div className="flex justify-between items-center text-slate-300">
                <span>Proprietor:</span>
                <span className="text-white font-semibold">{COMPANY_DETAILS.proprietor}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>GSTIN:</span>
                <span className="text-emerald-300 font-bold">{COMPANY_DETAILS.gstNumber}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Quality Benchmark:</span>
                <span className="text-slate-200">IS 4984 / ISO 9001:2015</span>
              </div>
            </div>
          </div>

          {/* Col 2: Plant Location & Factory Address */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider font-mono">
              <Factory className="w-4 h-4 text-sky-400" />
              Extrusion Plant & Warehouse
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
                <address className="not-italic leading-relaxed">
                  <strong className="text-white block font-semibold">Abhay Polyplast Works</strong>
                  Plot No. 7 & 8, Gokuldham Industrial Area,<br />
                  Near Kuvadva G.I.D.C,<br />
                  Rajkot, Gujarat - 360023, India.
                </address>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <a
                    href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
                    className="hover:text-white transition-colors block font-semibold text-slate-100"
                  >
                    {COMPANY_DETAILS.phone} (Sales & Inquiries)
                  </a>
                  <a
                    href={`tel:${COMPANY_DETAILS.secondaryPhone.replace(/\s+/g, '')}`}
                    className="hover:text-white transition-colors text-slate-400 text-xs"
                  >
                    {COMPANY_DETAILS.secondaryPhone} (Factory Dispatch)
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-sky-300 shrink-0" />
                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_DETAILS.email}
                </a>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-300">
                <Clock className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{COMPANY_DETAILS.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Links & Regional Connectivity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              Product Lines & Dedicated Pages
            </div>

            <div className="flex flex-wrap gap-2 pb-1">
              <button
                type="button"
                onClick={() => handleNav('products')}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs text-sky-300 hover:text-white font-medium transition-colors cursor-pointer"
              >
                Products Showcase →
              </button>
              <button
                type="button"
                onClick={() => handleNav('about')}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs text-emerald-300 hover:text-white font-medium transition-colors cursor-pointer"
              >
                About & Infrastructure →
              </button>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('products')}
                  className="flex items-center gap-2 hover:text-sky-300 transition-colors text-left cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                  <span>HDPE Water Supply Pressure Pipes (IS 4984)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('products')}
                  className="flex items-center gap-2 hover:text-amber-300 transition-colors text-left cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span>MDPE Gas & Potable Distribution Pipes (ISO 4437)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('products')}
                  className="flex items-center gap-2 hover:text-emerald-300 transition-colors text-left cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>Drip Irrigation Micro-Emitter Black Coils (IS 12786)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('products')}
                  className="flex items-center gap-2 hover:text-cyan-300 transition-colors text-left cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span>PLB Optical Fiber Telecommunication Ducts</span>
                </button>
              </li>
            </ul>

            <div className="p-3.5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-[11px] text-slate-300 space-y-1 shadow-sm">
              <span className="font-semibold text-slate-100 block">
                Direct Dispatch Logistics:
              </span>
              <span>
                Daily container and dedicated truck dispatches from Kuvadva G.I.D.C to all districts of Gujarat (Ahmedabad, Surat, Vadodara, Jamnagar, Bhavnagar, Bhuj) and pan-India project sites.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-center sm:text-left">
            <span>
              © 2012 - {new Date().getFullYear()} Abhay Polyplast. All rights reserved.
            </span>
            <span>•</span>
            <span>Proprietor: Mr. Vivek Apani</span>
            <span>•</span>
            <span className="font-mono">GST: 24AAXFA0572A1ZQ</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-400">
              Manufactured with pride in Rajkot, Gujarat
            </span>
            <button
              onClick={scrollToTop}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-200 hover:text-white transition-all backdrop-blur-sm flex items-center gap-1.5 text-xs shadow-sm"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
