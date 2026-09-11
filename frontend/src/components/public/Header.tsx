import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cpu, ArrowRight, ShieldCheck, Phone, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { LanguageSelector } from '../ui/LanguageSelector';
import { useLanguage } from '../../context/LanguageContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.about, path: '/about' },
    { label: t.nav.services, path: '/services' },
    { label: t.nav.projects, path: '/projects' },
    { label: t.nav.contact, path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-black/60 py-3'
          : 'bg-slate-950/40 backdrop-blur-md py-4 sm:py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan via-sky-500 to-accent-violet p-0.5 shadow-lg shadow-accent-cyan/20 group-hover:shadow-accent-cyan/40 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-accent-cyan group-hover:rotate-90 transition-transform duration-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
              R-IOT<span className="text-accent-cyan">SYS</span>
            </span>
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase -mt-1">
              {t.nav.tagline}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/70 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md shadow-inner">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-accent-cyan/20 text-accent-cyan font-semibold border border-accent-cyan/35 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Desktop CTA & Language Switcher */}
        <div className="hidden lg:flex items-center gap-4">
          <LanguageSelector />
          
          <a
            href="tel:+21697887867"
            className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-accent-cyan transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <span>+216 97 887 867</span>
          </a>
          <Link to="/contact">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              {t.nav.startProject}
            </Button>
          </Link>
        </div>

        {/* Mobile Header Right */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSelector />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="text-slate-200 hover:text-white p-2.5 rounded-xl bg-slate-900/90 border border-white/15 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-accent-cyan" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/98 border-b border-white/15 backdrop-blur-3xl px-6 py-6 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          {/* Quick Hub Badge */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent-cyan flex-shrink-0" />
              <span>{t.nav.hubBadge}</span>
            </div>
            <LanguageSelector />
          </div>

          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/35'
                      : 'text-slate-200 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}

            {/* Direct Phone & WhatsApp CTA */}
            <div className="grid grid-cols-2 gap-2 pt-3 mt-1">
              <a
                href="tel:+21697887867"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-white hover:border-accent-cyan"
              >
                <Phone className="w-3.5 h-3.5 text-accent-cyan" />
                <span>{t.nav.callUs}</span>
              </a>
              <a
                href="https://wa.me/21697887867"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-accent-green/20 border border-accent-green/40 text-xs font-mono text-accent-green hover:bg-accent-green/30"
              >
                <span>{t.nav.whatsapp}</span>
              </a>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-3">
              <Link to="/contact" className="w-full">
                <Button variant="primary" className="w-full justify-center py-3 text-base">
                  {t.nav.startProject}
                </Button>
              </Link>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-mono">
                <ShieldCheck className="w-4 h-4 text-accent-green" />
                Turnkey Engineering &bull; In-House Conception
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
