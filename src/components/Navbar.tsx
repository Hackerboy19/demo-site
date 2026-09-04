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
          ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-xs py-3'
          : 'bg-white/70 backdrop-blur-md border-b border-slate-200/50 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Identity */}
        <button
          onClick={() => handlePageClick('home')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600 p-[1.5px] shadow-sm group-hover:shadow-md transition-all">
            <div className="w-full h-full bg-white rounded-[9.5px] flex items-center justify-center">
              <span className="font-extrabold text-base tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600">
                AP
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Abhay Polyplast
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Est. 2012
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-blue-600 inline" />
              Rajkot, Gujarat • ISO Certified Plant
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs">
          <button
            onClick={() => handlePageClick('home')}
            className={`px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
              currentPage === 'home'
                ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200/80 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent font-medium'
            }`}
          >
            Home & 3D
          </button>
          <button
            onClick={() => handlePageClick('products')}
            className={`px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              currentPage === 'products'
                ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200/80 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent font-medium'
            }`}
          >
            <span>Products Showcase</span>
            <span className="px-1.5 py-0.2 rounded-md bg-blue-100 text-[10px] font-mono text-blue-700 font-semibold">
              3D Exploded
            </span>
          </button>
          <button
            onClick={() => handlePageClick('about')}
            className={`px-3.5 py-2 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              currentPage === 'about'
                ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200/80 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent font-medium'
            }`}
          >
            <span>About & Infrastructure</span>
            <span className="px-1.5 py-0.2 rounded-md bg-emerald-100 text-[10px] font-mono text-emerald-700 font-semibold">
              3D Globe
            </span>
          </button>
          <button
            onClick={() => handlePageClick('home', '#contact')}
            className="px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent font-medium transition-all duration-200 cursor-pointer"
          >
            Plant Location
          </button>
        </nav>

        {/* Call to Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 shadow-xs transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>{COMPANY_DETAILS.phone}</span>
          </a>

          <button
            id="nav-request-bulk-quote-btn"
            onClick={() => onOpenRfq()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md hover:shadow-blue-500/20 active:scale-95 transition-all duration-200 cursor-pointer"
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
            className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-all cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 border-b border-slate-200 backdrop-blur-2xl px-6 py-5 mt-3 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-2 text-sm font-semibold text-slate-700">
            <button
              onClick={() => handlePageClick('home')}
              className={`text-left py-2.5 px-3.5 rounded-xl transition-colors ${
                currentPage === 'home' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
              }`}
            >
              Home & 3D Pipe Showcase
            </button>
            <button
              onClick={() => handlePageClick('products')}
              className={`text-left py-2.5 px-3.5 rounded-xl transition-colors flex items-center justify-between ${
                currentPage === 'products' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
              }`}
            >
              <span>Dedicated Products Showcase</span>
              <span className="text-[10px] font-mono text-blue-700 bg-blue-100 px-2 py-0.5 rounded font-semibold">
                3D Exploded
              </span>
            </button>
            <button
              onClick={() => handlePageClick('about')}
              className={`text-left py-2.5 px-3.5 rounded-xl transition-colors flex items-center justify-between ${
                currentPage === 'about' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50'
              }`}
            >
              <span>About Company & Infrastructure</span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-semibold">
                3D Globe
              </span>
            </button>
            <button
              onClick={() => handlePageClick('home', '#contact')}
              className="text-left py-2.5 px-3.5 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Plant Location & Contact
            </button>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2.5">
            <a
              href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Call: {COMPANY_DETAILS.phone}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRfq();
              }}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 text-center shadow-md shadow-blue-500/20 cursor-pointer"
            >
              Request Bulk Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
