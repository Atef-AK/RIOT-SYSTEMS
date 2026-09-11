import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Wifi, Cpu, Factory, CircuitBoard, Eye, ArrowRight, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

export const Capabilities: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { t } = useLanguage();

  const showcaseServices = [
    {
      id: 'robotics',
      title: t.servicesData.robotics.title,
      tag: t.capabilities.tabs.robotics,
      badgeVariant: 'cyan' as const,
      icon: <Bot className="w-5 h-5 text-accent-cyan" />,
      image: '/images/service_robotics.jpg',
      shortDesc: t.servicesData.robotics.desc,
      deliverables: t.servicesData.robotics.deliverables,
      techSpecs: 'ROS2 • STM32G4/H7 • NVIDIA Jetson • EtherCAT • SolidWorks',
      slug: 'robotics-engineering',
    },
    {
      id: 'iot',
      title: t.servicesData.iot.title,
      tag: t.capabilities.tabs.iot,
      badgeVariant: 'blue' as const,
      icon: <Wifi className="w-5 h-5 text-sky-400" />,
      image: '/images/service_iot.jpg',
      shortDesc: t.servicesData.iot.desc,
      deliverables: t.servicesData.iot.deliverables,
      techSpecs: 'LoRaWAN • Modbus • MQTT • TimescaleDB • IP67 Enclosures',
      slug: 'iot-engineering',
    },
    {
      id: 'electronics',
      title: t.servicesData.pcb.title,
      tag: t.capabilities.tabs.pcb,
      badgeVariant: 'amber' as const,
      icon: <CircuitBoard className="w-5 h-5 text-amber-400" />,
      image: '/images/service_pcb.jpg',
      shortDesc: t.servicesData.pcb.desc,
      deliverables: t.servicesData.pcb.deliverables,
      techSpecs: 'Altium Designer • ARM Cortex-M7 • FreeRTOS • DFM / DFA',
      slug: 'electronics-pcb-design',
    },
    {
      id: 'vision',
      title: t.servicesData.vision.title,
      tag: t.capabilities.tabs.vision,
      badgeVariant: 'rose' as const,
      icon: <Eye className="w-5 h-5 text-rose-400" />,
      image: '/images/service_vision.jpg',
      shortDesc: t.servicesData.vision.desc,
      deliverables: t.servicesData.vision.deliverables,
      techSpecs: 'TensorRT • OpenCV • YOLOv10 • NVIDIA Jetson • Industrial AOI',
      slug: 'ai-computer-vision',
    },
    {
      id: 'smart-systems',
      title: t.servicesData.smartAgri.title,
      tag: t.capabilities.tabs.smartAgri,
      badgeVariant: 'green' as const,
      icon: <Layers className="w-5 h-5 text-accent-green" />,
      image: '/images/service_smart_systems.jpg',
      shortDesc: t.servicesData.smartAgri.desc,
      deliverables: t.servicesData.smartAgri.deliverables,
      techSpecs: 'LoRa 868MHz • Solar MPPT • ESP32-S3 • Multispectral NDVI',
      slug: 'smart-agriculture-greenbot',
    },
  ];

  const current = showcaseServices[activeTab];

  return (
    <section className="py-24 bg-slate-950/70 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-violet/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-xs font-mono text-accent-cyan uppercase mb-4">
            <Cpu className="w-3.5 h-3.5" /> {t.capabilities.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            {t.capabilities.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            {t.capabilities.subtitle}
          </p>
        </div>

        {/* Interactive Domain Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 p-1.5 bg-slate-900/90 border border-white/10 rounded-2xl max-w-5xl mx-auto backdrop-blur-xl">
          {showcaseServices.map((service, index) => (
            <button
              key={service.id}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === index
                  ? 'bg-accent-cyan text-slate-950 font-bold shadow-lg shadow-accent-cyan/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              {service.icon}
              <span>{service.tag}</span>
            </button>
          ))}
        </div>

        {/* Featured Showcase Display Card */}
        <div className="rounded-3xl bg-slate-900/90 border border-white/15 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-2xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Image Preview with HUD overlay */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-950 border border-white/15 shadow-2xl group">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />
                
                {/* On-Image Spec Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/85 border border-white/15 backdrop-blur-md flex items-center justify-between">
                  <div className="font-mono text-xs text-slate-300">
                    <span className="text-[10px] text-accent-cyan block uppercase">{t.capabilities.techStack}</span>
                    <span className="font-semibold text-white">{current.techSpecs}</span>
                  </div>
                  <Badge variant={current.badgeVariant} size="sm">
                    {t.capabilities.activeModule}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Text & Deliverables Description */}
            <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center">
                    {current.icon}
                  </div>
                  <div>
                    <Badge variant={current.badgeVariant} size="sm">
                      {current.tag}
                    </Badge>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                      {current.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                  {current.shortDesc}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-2.5 mb-8">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-400">
                    {t.capabilities.deliverablesTitle}
                  </h4>
                  {current.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-accent-green flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-slate-800">
                <Link to="/contact">
                  <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    {t.capabilities.requestRfq}
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="md" rightIcon={<ChevronRight className="w-4 h-4" />}>
                    {t.capabilities.viewAll}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Grid of All Disciplines */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { name: t.capabilities.tabs.robotics, icon: <Bot className="w-4 h-4 text-accent-cyan" />, route: '/services' },
            { name: t.capabilities.tabs.iot, icon: <Wifi className="w-4 h-4 text-sky-400" />, route: '/services' },
            { name: t.capabilities.tabs.pcb, icon: <CircuitBoard className="w-4 h-4 text-amber-400" />, route: '/services' },
            { name: t.capabilities.tabs.embedded, icon: <Cpu className="w-4 h-4 text-purple-400" />, route: '/services' },
            { name: t.capabilities.tabs.vision, icon: <Eye className="w-4 h-4 text-rose-400" />, route: '/services' },
            { name: t.capabilities.tabs.smartAgri, icon: <Factory className="w-4 h-4 text-accent-green" />, route: '/services' },
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.route}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 hover:border-accent-cyan/40 hover:bg-slate-900 transition-all flex flex-col items-center text-center gap-2 group"
            >
              <div className="p-2 rounded-lg bg-slate-800/80 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <span className="text-xs font-semibold text-slate-300 group-hover:text-accent-cyan transition-colors">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
