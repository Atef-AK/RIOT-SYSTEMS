import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Cpu, Layers, Sparkles, Terminal, Activity, ShieldCheck, Wrench, Rocket } from 'lucide-react';
import { Card } from '../ui/Card';
import { useLanguage } from '../../context/LanguageContext';

export const EngineeringProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useLanguage();

  const stepIcons = [
    <Sparkles className="w-5 h-5 text-accent-cyan" />,
    <Layers className="w-5 h-5 text-sky-400" />,
    <Cpu className="w-5 h-5 text-purple-400" />,
    <Wrench className="w-5 h-5 text-amber-400" />,
    <Terminal className="w-5 h-5 text-accent-green" />,
    <Activity className="w-5 h-5 text-cyan-400" />,
    <ShieldCheck className="w-5 h-5 text-rose-400" />,
    <Rocket className="w-5 h-5 text-purple-300" />,
    <ShieldCheck className="w-5 h-5 text-amber-400" />,
    <Rocket className="w-5 h-5 text-accent-green" />,
  ];

  const steps = t.process.steps;
  const currentStep = steps[activeStep] || steps[0];

  return (
    <section className="py-24 bg-slate-900/40 relative border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-green/10 border border-accent-green/30 text-xs font-mono text-accent-green uppercase mb-4">
            {t.process.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            {t.process.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            {t.process.subtitle}
          </p>
        </div>

        {/* Step Navigation Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 mb-10">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStep(idx)}
                className={`flex flex-col items-center p-3 rounded-xl border transition-all text-center ${
                  isActive
                    ? 'bg-accent-cyan/15 border-accent-cyan shadow-lg shadow-accent-cyan/10 text-white'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span className="font-mono text-xs font-bold text-accent-cyan mb-1">{step.step}</span>
                <span className="text-xs font-semibold leading-tight">{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Card */}
        <Card className="p-8 sm:p-10 bg-slate-950 border-slate-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 flex flex-col items-start">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                  {stepIcons[activeStep % stepIcons.length]}
                </div>
                <div>
                  <span className="font-mono text-xs text-accent-cyan uppercase tracking-widest font-bold">
                    Stage {currentStep.step}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    {currentStep.title}
                  </h3>
                </div>
              </div>

              <p className="text-base text-slate-300 leading-relaxed mb-6">
                {currentStep.desc}
              </p>

              <div className="w-full pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-200 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-accent-green flex-shrink-0" />
                  <span>Quality Assured Milestone Delivery</span>
                </div>
              </div>
            </div>

            {/* Quick Next Stage Button */}
            <div className="lg:col-span-4 flex flex-col justify-center items-center p-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl text-center">
              <span className="text-xs font-mono text-slate-400 mb-2">Stage-Gate Lifecycle</span>
              <div className="text-sm font-bold text-white mb-4">
                {activeStep < steps.length - 1 ? `Next: Stage ${steps[activeStep + 1].step} (${steps[activeStep + 1].title})` : 'Final Stage: Production Scale'}
              </div>
              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                className="w-full py-2.5 px-4 rounded-xl bg-accent-cyan/10 hover:bg-accent-cyan/20 border border-accent-cyan/30 text-accent-cyan text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <span>{activeStep < steps.length - 1 ? 'Advance to Next Stage' : 'Loop Back to Stage 01'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
