import React from 'react';
import { Mail, Phone, MapPin, Clock, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { ContactForm } from '../../components/public/ContactForm';
import { useLanguage } from '../../context/LanguageContext';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-28 pb-20 bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-xs font-mono text-accent-cyan uppercase mb-6">
            <Cpu className="w-3.5 h-3.5" /> {t.contact.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            {t.contact.title} <br />
            <span className="bg-gradient-to-r from-accent-cyan via-sky-300 to-accent-violet bg-clip-text text-transparent">
              {t.contact.titleHighlight}
            </span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            {t.contact.subtitle}
          </p>
        </section>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <Card className="p-8 sm:p-10 bg-slate-900/90 border-slate-800 backdrop-blur-xl">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{t.contact.formTitle}</h3>
                <p className="text-xs text-slate-400">
                  {t.contact.formSubtitle}
                </p>
              </div>
              <ContactForm />
            </Card>
          </div>

          {/* Right Column: Contact info & Facilities */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact Details Card */}
            <Card className="p-8 bg-slate-900/80 border-slate-800">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 font-mono">
                <span>[HQ_COORDINATES]</span>
              </h3>

              <div className="space-y-6 text-sm text-slate-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center text-accent-cyan flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-1">{t.contact.facilityTitle}</h4>
                    <p className="text-slate-200">Alain Savary Tunis - Tunisia</p>
                    <a
                      href="https://maps.google.com/?q=Alain+Savary+Tunis+Tunisia"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-accent-cyan hover:underline mt-1 font-mono"
                    >
                      {t.contact.mapsLink} <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-1">Email Inquiries</h4>
                    <a href="mailto:contact@r-iotsys.tn" className="text-slate-200 hover:text-accent-cyan transition-colors">
                      contact@r-iotsys.tn
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-1">Phone & WhatsApp</h4>
                    <div className="flex items-center gap-3">
                      <a href="tel:+21697887867" className="text-slate-200 font-mono hover:text-accent-cyan transition-colors font-bold text-base">
                        +216 97 887 867
                      </a>
                      <a
                        href="https://wa.me/21697887867"
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-0.5 rounded bg-accent-green/20 text-accent-green text-xs font-mono border border-accent-green/40 hover:bg-accent-green/30"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-green/10 border border-accent-green/30 flex items-center justify-center text-accent-green flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-1">{t.contact.hoursTitle}</h4>
                    <p className="text-slate-200">{t.contact.hoursValue}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quality & NDA Assurance */}
            <Card className="p-6 bg-slate-950 border-slate-800 text-xs font-mono space-y-3">
              <div className="flex items-center gap-2 text-accent-green font-bold uppercase">
                <ShieldCheck className="w-4 h-4" /> {t.contact.ndaBadge}
              </div>
              <p className="text-slate-400 leading-relaxed font-sans text-xs">
                {t.contact.ndaDesc}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
