import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ShieldCheck, Target, Compass, Award, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useLanguage } from '../../context/LanguageContext';

export const AboutPage: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="pt-28 pb-20 bg-tech-grid">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-xs font-mono text-accent-cyan uppercase mb-6">
          <Cpu className="w-3.5 h-3.5" /> {t.about.badge}
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
          {t.about.title} <br />
          <span className="bg-gradient-to-r from-accent-cyan via-sky-300 to-accent-violet bg-clip-text text-transparent">
            {t.about.titleHighlight}
          </span>
        </h1>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {t.about.subtitle}
        </p>
      </section>

      {/* Mission & Vision Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8 sm:p-10 bg-slate-900/80 border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                {language === 'fr' ? 'Notre Mission d’Ingénierie' : 'Our Engineering Mission'}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {t.about.philosophyDesc1}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-800 font-mono text-xs text-accent-cyan">
              // ZERO_COMPROMISE_RELIABILITY
            </div>
          </Card>

          <Card className="p-8 sm:p-10 bg-slate-900/80 border-slate-800 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-accent-violet/15 border border-accent-violet/30 flex items-center justify-center text-purple-300 mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                {language === 'fr' ? 'Notre Vision à Long Terme' : 'Our Long-Term Vision'}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {t.about.philosophyDesc2}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-800 font-mono text-xs text-purple-400">
              // GLOBAL_STANDARDS_LOCAL_EXECUTION
            </div>
          </Card>
        </div>
      </section>

      {/* Engineering Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {t.about.philosophyTitle}
          </h2>
          <p className="text-slate-400">
            {language === 'fr'
              ? 'Comment nous prenons des décisions d’architecture qui résistent à des années de fonctionnement continu.'
              : 'How we make architectural decisions that withstand years of continuous operation.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card hoverEffect className="p-8 bg-slate-950/90 border-slate-800">
            <div className="font-mono text-xs text-accent-cyan mb-3">PRINCIPLE_01</div>
            <h3 className="text-xl font-bold text-white mb-3">
              {language === 'fr' ? 'Logiciel Conscient du Hardware' : 'Hardware-Aware Software'}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {language === 'fr'
                ? 'Nous concevons les firmwares et logiciels avec une compréhension intime du silicium, de la gestion de cache, des bus et des canaux DMA.'
                : 'We write firmware and software with intimate awareness of silicon architecture, memory caching, bus contention, and DMA transfers.'}
            </p>
          </Card>

          <Card hoverEffect className="p-8 bg-slate-950/90 border-slate-800">
            <div className="font-mono text-xs text-accent-green mb-3">PRINCIPLE_02</div>
            <h3 className="text-xl font-bold text-white mb-3">
              {language === 'fr' ? 'Conception pour le Réel & Défaillances' : 'Design for Reality & Failure'}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {language === 'fr'
                ? 'Surtensions, pertes de signal, dérive thermique. Nous intégrons des watchdogs, des tampons de persistance et des protections thermiques sur chaque circuit.'
                : 'Power lines surge, radios disconnect, sensors drift. We build watchdog failovers, store-and-forward buffers, and thermal protections into every circuit.'}
            </p>
          </Card>

          <Card hoverEffect className="p-8 bg-slate-950/90 border-slate-800">
            <div className="font-mono text-xs text-amber-400 mb-3">PRINCIPLE_03</div>
            <h3 className="text-xl font-bold text-white mb-3">
              {language === 'fr' ? 'Standards Ouverts & IP Intégrale' : 'Open Standards & Clean IP'}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {language === 'fr'
                ? 'Nous refusons l’enfermement propriétaire. Nos systèmes reposent sur des bus de terrain ouverts (CAN, Modbus), des noyaux RTOS éprouvés et des API standard.'
                : 'We avoid proprietary vendor lock-in. Our systems leverage standard fieldbuses (CAN, Modbus), open RTOS frameworks, and standard interfaces.'}
            </p>
          </Card>
        </div>
      </section>

      {/* R&D Labs & Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <Card className="p-8 sm:p-12 bg-slate-900 border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-xs font-mono text-accent-cyan uppercase mb-4">
                {language === 'fr' ? 'Infrastructure Interne' : 'In-House Infrastructure'}
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-6">
                {t.about.labTitle}
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                {t.about.labDesc}
              </p>
              <div className="space-y-3 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent-green" />
                  <span>{language === 'fr' ? 'Oscilloscopes numériques & analyseurs logiques (1 GHz)' : 'Digital Storage Oscilloscopes & Logic Analyzers (1 GHz)'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent-green" />
                  <span>{language === 'fr' ? 'Station d’assemblage de composants CMS et four à refusion' : 'SMT Pick-and-Place & Reflow Soldering Station'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent-green" />
                  <span>{language === 'fr' ? 'Imagerie thermique & analyseurs de spectre (pré-qualification CEM)' : 'Thermal Imaging & Spectrum Analyzers (EMI/EMC Pre-testing)'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent-green" />
                  <span>{language === 'fr' ? 'Impression 3D SLA/FDM technique & usinage CNC' : '3D SLA/FDM Printing & CNC Enclosure Machining'}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
                alt="R-IoTSys Laboratory"
                className="rounded-2xl border border-white/10 shadow-2xl object-cover h-80 sm:h-96 w-full"
              />
            </div>
          </div>
        </Card>
      </section>

      {/* CTA Bottom */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            {language === 'fr' ? 'Collaborez Avec Notre Équipe d’Ingénieurs' : 'Partner With Our Engineering Team'}
          </h3>
          <p className="text-slate-400 max-w-xl mx-auto mb-8 text-sm sm:text-base">
            {language === 'fr'
              ? 'Que vous ayez besoin d’un prototype rapide ou d’une industrialisation à grande échelle, nous sommes prêts à construire.'
              : 'Whether you need a proof-of-concept prototype or a full-scale industrial deployment, we are ready to build.'}
          </p>
          <Link to="/contact">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
              {language === 'fr' ? 'Démarrer un Échange' : 'Start a Conversation'}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
