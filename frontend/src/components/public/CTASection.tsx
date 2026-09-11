import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, PhoneCall, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

export interface CTASectionProps {
  primaryCtaUrl?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  primaryCtaUrl = '/contact',
}) => {
  const { t } = useLanguage();

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-accent-cyan/30 p-10 sm:p-16 overflow-hidden shadow-2xl shadow-accent-cyan/5">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-cyan/10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-violet/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-xs font-mono text-accent-cyan uppercase mb-6">
              <Cpu className="w-3.5 h-3.5" /> Direct Technical Collaboration
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
              {t.ctaSection.title}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              {t.ctaSection.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link to={primaryCtaUrl}>
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  {t.ctaSection.primaryBtn}
                </Button>
              </Link>
              <a href="tel:+21697887867">
                <Button variant="secondary" size="lg" leftIcon={<PhoneCall className="w-4 h-4" />}>
                  {t.ctaSection.callBtn}
                </Button>
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-6 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-accent-green">
                <ShieldCheck className="w-4 h-4" /> {t.ctaSection.confidential}
              </span>
              <span>&bull;</span>
              <span>Fast 24-Hour Engineering Review</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
