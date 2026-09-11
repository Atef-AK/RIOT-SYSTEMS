import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, ChevronRight, ShieldCheck, Phone, MapPin, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

export interface HeroProps {
  primaryCtaUrl?: string;
  secondaryCtaUrl?: string;
}

export const Hero: React.FC<HeroProps> = ({
  primaryCtaUrl = '/contact',
  secondaryCtaUrl = '/services',
}) => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[94vh] flex items-center justify-center pt-24 sm:pt-28 pb-16 overflow-hidden bg-tech-grid">
      {/* Dynamic Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[500px] bg-gradient-to-tr from-accent-cyan/20 via-sky-500/15 to-accent-violet/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent-green/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Engineering Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/95 border border-accent-cyan/40 text-xs font-mono text-accent-cyan shadow-lg shadow-accent-cyan/10 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-green animate-pulse" />
              <span className="font-semibold tracking-wide">{t.hero.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-5">
              {t.hero.title1} <br />
              <span className="bg-gradient-to-r from-accent-cyan via-sky-300 to-accent-violet bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>{' '}
              {t.hero.title2}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed mb-8">
              {t.hero.subtitle}
            </p>

            {/* CTAs & Direct Callout */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-8">
              <Link to={primaryCtaUrl} className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full justify-center shadow-lg shadow-accent-cyan/25" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  {t.hero.startCta}
                </Button>
              </Link>
              <Link to={secondaryCtaUrl} className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full justify-center" rightIcon={<ChevronRight className="w-4 h-4" />}>
                  {t.hero.exploreCta}
                </Button>
              </Link>
            </div>

            {/* Location & Direct Contact Line */}
            <div className="flex flex-wrap items-center gap-4 py-3 px-4 rounded-xl bg-slate-900/80 border border-white/10 text-xs font-mono text-slate-300 w-full max-w-xl">
              <div className="flex items-center gap-1.5 text-accent-cyan">
                <MapPin className="w-4 h-4" />
                <span>Alain Savary Tunis - Tunisia</span>
              </div>
              <span className="text-slate-600 hidden sm:inline">&bull;</span>
              <a href="tel:+21697887867" className="flex items-center gap-1.5 text-slate-200 hover:text-accent-cyan transition-colors ml-auto sm:ml-0 font-bold">
                <Phone className="w-3.5 h-3.5 text-accent-green" />
                <span>+216 97 887 867</span>
              </a>
            </div>

            {/* Key Metric Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 w-full max-w-xl mt-4">
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold font-mono text-white">{t.hero.fullStack}</span>
                <span className="text-[11px] text-slate-400 mt-0.5">{t.hero.fullStackSub}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold font-mono text-accent-cyan">{t.hero.rtosMetric}</span>
                <span className="text-[11px] text-slate-400 mt-0.5">{t.hero.rtosSub}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold font-mono text-accent-green">{t.hero.inHouse}</span>
                <span className="text-[11px] text-slate-400 mt-0.5">{t.hero.inHouseSub}</span>
              </div>
            </div>
          </div>

          {/* Right Visual Column: High-Tech Industrial Robotics HUD Showcase */}
          <div className="lg:col-span-6 relative mt-6 lg:mt-0">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer HUD Container */}
              <div className="relative z-20 rounded-3xl bg-slate-900/90 border border-white/20 p-3 sm:p-4 shadow-2xl backdrop-blur-2xl overflow-hidden group">
                {/* Top Telemetry Header */}
                <div className="flex items-center justify-between pb-3 px-2 border-b border-white/10 mb-3 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-green animate-pulse" />
                    <span className="text-slate-300 font-bold">{t.hero.labTestbed}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30">
                      {t.hero.kinematicsBadge}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      {t.hero.liveBadge}
                    </span>
                  </div>
                </div>

                {/* Main Hero Photo Container with Laser Line Animation */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-950 border border-white/10">
                  <img
                    src="/images/hero_robotics.jpg"
                    alt="R-IoTSys Robotics Engineering in High-Tech Laboratory"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  {/* Subtle Dark Vignette & Tech Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/30 pointer-events-none" />

                  {/* Laser Scanning Line Animation */}
                  <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-cyan to-transparent shadow-[0_0_15px_#06b6d4] animate-laser pointer-events-none opacity-80" />

                  {/* On-Image Real-Time Telemetry HUD Overlay */}
                  <div className="absolute top-3 left-3 p-2 rounded-lg bg-slate-950/80 border border-white/15 backdrop-blur-md font-mono text-[10px] text-slate-300 space-y-1">
                    <div className="flex items-center gap-1 text-accent-cyan font-bold">
                      <Cpu className="w-3 h-3" /> STM32H7 CORE: 480MHz
                    </div>
                    <div className="text-slate-400">ENCODER: 19-BIT ABSOLUTE</div>
                  </div>

                  <div className="absolute top-3 right-3 p-2 rounded-lg bg-slate-950/80 border border-white/15 backdrop-blur-md font-mono text-[10px] text-accent-green font-bold flex items-center gap-1.5">
                    <Zap className="w-3 h-3" /> FOC MOTOR LOOP: 20kHz
                  </div>

                  {/* Bottom Image Overlay Caption */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/85 border border-white/15 backdrop-blur-md flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white font-mono flex items-center gap-2">
                        <span>{t.hero.heroCardTitle}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-accent-cyan/20 text-accent-cyan">VERIFIED</span>
                      </div>
                      <div className="text-[11px] text-slate-400">{t.hero.heroCardSubtitle}</div>
                    </div>
                    <Link to="/projects">
                      <span className="p-2 rounded-lg bg-accent-cyan/20 text-accent-cyan hover:bg-accent-cyan hover:text-slate-950 transition-colors inline-flex items-center">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Bottom Spec Strip */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-2 text-[11px] font-mono text-center">
                  <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">{t.hero.repeatability}</span>
                    <span className="text-accent-cyan font-bold">&plusmn; 0.02 mm</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">{t.hero.protocol}</span>
                    <span className="text-purple-400 font-bold">EtherCAT / CAN</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">{t.hero.firmware}</span>
                    <span className="text-accent-green font-bold">FreeRTOS + ROS2</span>
                  </div>
                </div>
              </div>

              {/* Floating Shield Badge Top-Right */}
              <div className="absolute -top-4 -right-4 z-30 p-3 rounded-2xl bg-slate-900 border border-accent-cyan/40 shadow-xl backdrop-blur-xl hidden sm:flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-accent-cyan/20 flex items-center justify-center text-accent-cyan">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-white">{t.hero.tunisiaHub}</div>
                  <div className="text-[10px] font-mono text-accent-cyan">Alain Savary, Tunis</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
