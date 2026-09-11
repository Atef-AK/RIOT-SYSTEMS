import React from 'react';
import { Cpu, ShieldCheck, Zap, Scale, HeartHandshake, Wrench } from 'lucide-react';
import { Card } from '../ui/Card';
import { useLanguage } from '../../context/LanguageContext';

export const WhyUs: React.FC = () => {
  const { t } = useLanguage();

  const icons = [
    <Cpu className="w-6 h-6 text-accent-cyan" />,
    <HeartHandshake className="w-6 h-6 text-sky-400" />,
    <Zap className="w-6 h-6 text-amber-400" />,
    <ShieldCheck className="w-6 h-6 text-accent-green" />,
  ];

  return (
    <section className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-green/10 border border-accent-green/30 text-xs font-mono text-accent-green uppercase mb-4">
            {t.whyUs.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            {t.whyUs.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            {t.whyUs.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.whyUs.items.map((item, idx) => (
            <Card key={idx} hoverEffect className="p-7 bg-slate-900/70 border-slate-800 flex flex-col justify-start">
              <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center mb-6">
                {icons[idx % icons.length]}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
