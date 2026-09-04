import React, { useState, useEffect } from 'react';
import { Phone, FileText, Menu, X, ShieldCheck, MapPin } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/products';

interface NavbarProps {
  currentPage?: 'home' | 'products' | 'about';
  onNavigate?: (page: 'home' | 'products' | 'about') => void;
  onOpenRfq: (productId?: string) => void;
}

export function Navbar({ currentPage = 'home', onNavigate, onOpenRfq }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePageClick = (page: 'home' | 'products' | 'about', hash?: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setMobileMenuOpen(false);
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navigation-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/60 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] py-3'
          : 'bg-slate-950/30 backdrop-blur-md border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Identity */}
        <button
          onClick={() => handlePageClick('home')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md p-[1px] border border-white/15 shadow-lg shadow-blue-500/10 group-hover:border-white/30 transition-all">
            <div className="w-full h-full bg-slate-950/80 backdrop-blur-sm rounded-[11px] flex items-center justify-center">
              <span className="font-extrabold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-400 to-emerald-300">
                AP
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-sky-300 transition-colors">
                Abhay Polyplast
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-400/20 backdrop-blur-sm">
                Est. 2012
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-sky-400 inline" />
              Rajkot, Gujarat • ISO Certified
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links with Frosted Glass Hover & Active Pills */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs font-semibold">
          <button
            onClick={() => handlePageClick('home')}
            className={`px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
              currentPage === 'home'
                ? 'bg-white/15 text-white border border-white/25 shadow-[0_4px_16px_rgba(56,189,248,0.2)]'
                : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            Home & 3D
          </button>
          <button
            onClick={() => handlePageClick('products')}
            className={`px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              currentPage === 'products'
                ? 'bg-white/15 text-white border border-white/25 shadow-[0_4px_16px_rgba(56,189,248,0.2)]'
                : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <span>Products Showcase</span>
            <span className="px-1.5 py-0.2 rounded-md bg-sky-500/25 text-[10px] font-mono text-sky-300">
              3D Exploded
            </span>
          </button>
          <button
            onClick={() => handlePageClick('about')}
            className={`px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              currentPage === 'about'
                ? 'bg-white/15 text-white border border-white/25 shadow-[0_4px_16px_rgba(56,189,248,0.2)]'
                : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <span>About & Infrastructure</span>
            <span className="px-1.5 py-0.2 rounded-md bg-emerald-500/25 text-[10px] font-mono text-emerald-300">
              3D Globe
            </span>
          </button>
          <button
            onClick={() => handlePageClick('home', '#contact')}
            className="px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 border border-transparent transition-all duration-200 cursor-pointer"
          >
            Plant Location
          </button>
        </nav>

        {/* Call to Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>{COMPANY_DETAILS.phone}</span>
          </a>

          <button
            id="nav-request-bulk-quote-btn"
            onClick={() => onOpenRfq()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 shadow-[0_4px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_4px_28px_rgba(37,99,235,0.5)] border border-sky-400/30 hover:border-sky-300/50 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Request Bulk Quote</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/90 border-b border-white/10 backdrop-blur-2xl px-6 py-5 mt-3 space-y-4 shadow-[0_16px_36px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col space-y-2 text-sm font-semibold text-slate-200">
            <button
              onClick={() => handlePageClick('home')}
              className={`text-left py-2 px-3 rounded-xl transition-colors ${
                currentPage === 'home' ? 'bg-white/10 text-white' : 'hover:text-sky-400'
              }`}
            >
              Home & 3D Pipe Showcase
            </button>
            <button
              onClick={() => handlePageClick('products')}
              className={`text-left py-2 px-3 rounded-xl transition-colors flex items-center justify-between ${
                currentPage === 'products' ? 'bg-white/10 text-white' : 'hover:text-sky-400'
              }`}
            >
              <span>Dedicated Products Showcase</span>
              <span className="text-[10px] font-mono text-sky-300 bg-sky-500/20 px-2 py-0.5 rounded">
                3D Exploded
              </span>
            </button>
            <button
              onClick={() => handlePageClick('about')}
              className={`text-left py-2 px-3 rounded-xl transition-colors flex items-center justify-between ${
                currentPage === 'about' ? 'bg-white/10 text-white' : 'hover:text-sky-400'
              }`}
            >
              <span>About Company & Infrastructure</span>
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded">
                3D Globe
              </span>
            </button>
            <button
              onClick={() => handlePageClick('home', '#contact')}
              className="text-left py-2 px-3 rounded-xl hover:text-sky-400 transition-colors"
            >
              Plant Location & Contact
            </button>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <a
              href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 backdrop-blur-md border border-white/10"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call: {COMPANY_DETAILS.phone}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRfq();
              }}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-center shadow-lg shadow-blue-500/20 border border-sky-400/25 cursor-pointer"
            >
              Request Bulk Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
