import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Mail, Phone, MapPin, ArrowUpRight, Github, Linkedin, Youtube, Shield } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 border-t border-white/10 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-accent-cyan/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-violet p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-accent-cyan" />
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                R-IOT<span className="text-accent-cyan">SYS</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {t.footer.desc}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com/company/r-iotsys"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-accent-cyan hover:border-accent-cyan/50 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/r-iotsys"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-accent-cyan hover:border-accent-cyan/50 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@r-iotsys"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-accent-cyan hover:border-accent-cyan/50 transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links: Services */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-slate-200">
              {t.footer.capabilitiesTitle}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/services" className="hover:text-accent-cyan transition-colors">
                  {t.capabilities.tabs.robotics}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-accent-cyan transition-colors">
                  {t.capabilities.tabs.iot}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-accent-cyan transition-colors">
                  {t.capabilities.tabs.embedded}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-accent-cyan transition-colors">
                  {t.capabilities.tabs.pcb}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-accent-cyan transition-colors">
                  {t.capabilities.tabs.vision}
                </Link>
              </li>
            </ul>
          </div>

          {/* Links: Company */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-slate-200">
              {t.footer.companyTitle}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/about" className="hover:text-accent-cyan transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-accent-cyan transition-colors">
                  {t.nav.projects}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent-cyan transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
              <li>
                <a href="https://academy.r-iotsys.tn" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-accent-cyan transition-colors">
                  Academy Portal <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://greenbot.r-iotsys.tn" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-accent-cyan transition-colors">
                  GreenBot AgriTech <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-slate-200">
              {t.footer.hubTitle}
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent-cyan flex-shrink-0 mt-0.5" />
                <span>Alain Savary Tunis - Tunisia</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent-cyan flex-shrink-0" />
                <a href="mailto:contact@r-iotsys.tn" className="hover:text-white transition-colors">
                  contact@r-iotsys.tn
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent-cyan flex-shrink-0" />
                <a href="tel:+21697887867" className="hover:text-white transition-colors font-mono">
                  +216 97 887 867
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>&copy; {new Date().getFullYear()} R-IoTSys (r-iotsys.tn). {t.footer.rightsReserved}</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-accent-cyan" /> {t.footer.secureSystems}
            </span>
            <Link to="/admin" className="hover:text-slate-300 transition-colors">
              {t.footer.adminPortal}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
