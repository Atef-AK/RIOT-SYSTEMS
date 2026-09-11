import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Wifi, Cpu, Factory, CircuitBoard, Eye, Cog, Rocket, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Phone } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Service } from '../../types';
import { api } from '../../services/apiClient';
import { useLanguage } from '../../context/LanguageContext';

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const { t, language } = useLanguage();

  const fallbackServices: Partial<Service>[] = language === 'fr' ? [
    {
      id: '1',
      title: 'Ingénierie Robotique & Robots Mobiles Autonomes',
      slug: 'robotics-engineering',
      icon: 'Bot',
      category: 'Robotics',
      shortDesc: 'Modélisation cinématique et dynamique, architecture logicielle ROS2, variateurs de moteurs brushless sur mesure et plateformes AMR pour sites industriels.',
      coverImage: '/images/service_robotics.jpg',
      features: JSON.stringify([
        'Bras robotiques articulés 6 axes & actionneurs à fort couple',
        'Robots mobiles autonomes (AMR / AGV) avec navigation LiDAR SLAM',
        'Réseaux de contrôle de mouvement sur bus de terrain EtherCAT & CANopen',
        'Intégration de sécurité certifiable ISO 13849 PL-d & SIL-2',
      ]),
      technologies: JSON.stringify(['ROS2', 'STM32G4', 'NVIDIA Jetson', 'EtherCAT', 'SolidWorks']),
    },
    {
      id: '2',
      title: 'Systèmes IoT Industriels & Passerelles Edge',
      slug: 'iot-engineering',
      icon: 'Wifi',
      category: 'IoT',
      shortDesc: 'Passerelles d’acquisition sur rail DIN durcies, nœuds de capteurs autonomes ultra-basse consommation et pipelines de télémétrie cloud temps réel.',
      coverImage: '/images/service_iot.jpg',
      features: JSON.stringify([
        'Passerelles industrielles rail DIN (Modbus, CAN, RS485)',
        'Télémétrie sans fil longue portée (LoRaWAN, 4G LTE, NB-IoT)',
        'Mise à jour sécurisée du firmware à distance (OTA cryptographique)',
        'Tableaux de bord de télémétrie en séries temporelles haute disponibilité',
      ]),
      technologies: JSON.stringify(['LoRaWAN', 'Modbus', 'MQTT', 'ESP32-S3', 'TimescaleDB']),
    },
    {
      id: '3',
      title: 'Conception Électronique & PCB Multicouches sur Mesure',
      slug: 'electronics-pcb-design',
      icon: 'CircuitBoard',
      category: 'Electronics',
      shortDesc: 'De la schématique HDI haute vitesse à l’assemblage CMS en atelier, la validation d’intégrité du signal et les pré-tests de conformité CEM/EMI.',
      coverImage: '/images/service_pcb.jpg',
      features: JSON.stringify([
        'Routage de PCB multicouches haute fréquence à impédance contrôlée',
        'Systèmes de gestion de batterie (BMS) & électronique de puissance',
        'Étages analogiques haute précision & conditionnement capteurs',
        'Conception pour la fabricabilité (DFM) & prototypage rapide CMS',
      ]),
      technologies: JSON.stringify(['Altium Designer', 'ARM Cortex-M7', 'BMS', 'SMT Assembly']),
    },
    {
      id: '4',
      title: 'Firmware Embarqué Temps Réel & RTOS Déterministe',
      slug: 'embedded-systems',
      icon: 'Cpu',
      category: 'Embedded',
      shortDesc: 'Programmation C/C++ bare-metal déterministe, noyaux FreeRTOS/Zephyr, packages de support de carte (BSP) et distributions Linux Yocto sur mesure.',
      coverImage: '/images/service_pcb.jpg',
      features: JSON.stringify([
        'Boucles de contrôle déterministes temps réel strict (< 1ms)',
        'Noyaux temps réel FreeRTOS / Zephyr et pilotes C/C++ bas niveau',
        'Bootloaders cryptographiques et racine de confiance matérielle',
        'Bancs de tests automatisés Hardware-in-the-Loop (HIL)',
      ]),
      technologies: JSON.stringify(['FreeRTOS', 'Zephyr', 'STM32', 'CMake', 'Embedded Linux']),
    },
    {
      id: '5',
      title: 'Vision par Ordinateur & Contrôle Optique par IA Edge',
      slug: 'ai-computer-vision',
      icon: 'Eye',
      category: 'AI',
      shortDesc: 'Systèmes d’inspection optique automatisée (AOI) détectant les micro-défauts à cadence industrielle avec inférence neuronale TensorRT à faible latence.',
      coverImage: '/images/service_vision.jpg',
      features: JSON.stringify([
        'Détection automatique de défauts de surface en ligne de production (AOI)',
        'Quantification et optimisation de modèles IA YOLOv10 & TensorRT',
        'Optiques télécentriques industrielles & éclairage stroboscopique LED',
        'Déclenchement instantané d’éjection pneumatique via automate PLC',
      ]),
      technologies: JSON.stringify(['TensorRT', 'OpenCV', 'PyTorch', 'NVIDIA Jetson', 'YOLOv10']),
    },
    {
      id: '6',
      title: 'AgriTech Intelligente & Télémétrie Environnementale',
      slug: 'smart-agriculture-greenbot',
      icon: 'Factory',
      category: 'Automation',
      shortDesc: 'Réseaux de capteurs agro-environnementaux solaires, contrôle automatisé d’irrigation et rovers agricoles autonomes de diagnostic parcellaire.',
      coverImage: '/images/service_smart_systems.jpg',
      features: JSON.stringify([
        'Mesure d’humidité du sol multi-profondeurs & météo locale',
        'Récupération d’énergie solaire avec régulateur MPPT haute efficacité',
        'Rovers autonomes de reconnaissance agricole avec capteurs NDVI',
        'Pilotage à distance d’électrovannes par liaison radio LoRa 868MHz',
      ]),
      technologies: JSON.stringify(['LoRaWAN', 'Solar MPPT', 'ESP32', 'NDVI', 'Node.js']),
    },
  ] : language === 'es' ? [
    {
      id: '1',
      title: 'Ingeniería Robótica y Robots Móviles Autónomos',
      slug: 'robotics-engineering',
      icon: 'Bot',
      category: 'Robotics',
      shortDesc: 'Modelado cinemático y dinámico, arquitectura de software ROS2, controladores de motores brushless a medida y plataformas AMR para instalaciones industriales.',
      coverImage: '/images/service_robotics.jpg',
      features: JSON.stringify([
        'Brazos robóticos articulados de 6 ejes y actuadores de alto par',
        'Robots móviles autónomos (AMR / AGV) con navegación LiDAR SLAM',
        'Redes de control de movimiento sobre buses EtherCAT y CANopen',
        'Integración de seguridad industrial certificable ISO 13849 PL-d y SIL-2',
      ]),
      technologies: JSON.stringify(['ROS2', 'STM32G4', 'NVIDIA Jetson', 'EtherCAT', 'SolidWorks']),
    },
    {
      id: '2',
      title: 'Sistemas IoT Industriales y Pasarelas Edge',
      slug: 'iot-engineering',
      icon: 'Wifi',
      category: 'IoT',
      shortDesc: 'Pasarelas robustas para carril DIN, nodos de sensores de telemetría de ultra bajo consumo y canales de datos en la nube en tiempo real.',
      coverImage: '/images/service_iot.jpg',
      features: JSON.stringify([
        'Pasarelas industriales para carril DIN (Modbus, CAN, RS485)',
        'Telemetría inalámbrica de largo alcance (LoRaWAN, 4G LTE, NB-IoT)',
        'Pila de actualización remota de firmware criptográfica (OTA)',
        'Cuadros de mando de telemetría de series temporales de alta disponibilidad',
      ]),
      technologies: JSON.stringify(['LoRaWAN', 'Modbus', 'MQTT', 'ESP32-S3', 'TimescaleDB']),
    },
    {
      id: '3',
      title: 'Diseño Electrónico y PCB Multicapa Personalizada',
      slug: 'electronics-pcb-design',
      icon: 'CircuitBoard',
      category: 'Electronics',
      shortDesc: 'Desde la captura esquemática HDI de alta velocidad hasta el ensamblaje superficial SMT en laboratorio, validación de integridad de señal y pruebas de pre-conformidad CEM/EMI.',
      coverImage: '/images/service_pcb.jpg',
      features: JSON.stringify([
        'Ruteo de PCB multicapa de alta velocidad con impedancia controlada',
        'Sistemas de gestión de baterías (BMS) y electrónica de potencia',
        'Etapas analógicas de alta precisión y acondicionamiento de sensores',
        'Diseño para fabricación (DFM) y prototipado rápido SMT',
      ]),
      technologies: JSON.stringify(['Altium Designer', 'ARM Cortex-M7', 'BMS', 'SMT Assembly']),
    },
    {
      id: '4',
      title: 'Firmware Embebido en Tiempo Real y RTOS',
      slug: 'embedded-systems',
      icon: 'Cpu',
      category: 'Embedded',
      shortDesc: 'Programación C/C++ bare-metal determinista, núcleos FreeRTOS/Zephyr, paquetes de soporte de placa (BSP) y distribuciones Linux Embebido Yocto.',
      coverImage: '/images/service_pcb.jpg',
      features: JSON.stringify([
        'Bucles de control deterministas en tiempo real estricto (< 1ms)',
        'Núcleos en tiempo real FreeRTOS / Zephyr y controladores de bajo nivel',
        'Cargadores de arranque criptográficos y raíz de confianza en hardware',
        'Bancos de pruebas automatizados Hardware-in-the-Loop (HIL)',
      ]),
      technologies: JSON.stringify(['FreeRTOS', 'Zephyr', 'STM32', 'CMake', 'Embedded Linux']),
    },
    {
      id: '5',
      title: 'Visión por Computadora e Inspección Óptica con IA',
      slug: 'ai-computer-vision',
      icon: 'Eye',
      category: 'AI',
      shortDesc: 'Túneles de inspección óptica automatizada (AOI) que detectan microdefectos a velocidad de línea de producción con inferencia neuronal TensorRT de baja latencia.',
      coverImage: '/images/service_vision.jpg',
      features: JSON.stringify([
        'Detección automática de defectos superficiales en línea de producción (AOI)',
        'Optimización y cuantización de modelos IA YOLOv10 y TensorRT',
        'Ópticas telecéntricas industriales e iluminación estroboscópica LED',
        'Activación instantánea de expulsión neumática mediante PLC',
      ]),
      technologies: JSON.stringify(['TensorRT', 'OpenCV', 'PyTorch', 'NVIDIA Jetson', 'YOLOv10']),
    },
    {
      id: '6',
      title: 'AgriTech Inteligente y Telemetría Ambiental',
      slug: 'smart-agriculture-greenbot',
      icon: 'Factory',
      category: 'Automation',
      shortDesc: 'Redes de sensores agrícolas solares, controladores automatizados de válvulas de riego y rovers agrícolas autónomos de diagnóstico con NDVI.',
      coverImage: '/images/service_smart_systems.jpg',
      features: JSON.stringify([
        'Monitoreo de humedad de suelo multinivel y microclima local',
        'Captación de energía solar con regulador de carga MPPT eficiente',
        'Rovers agrícolas autónomos de exploración con sensores NDVI',
        'Control inalámbrico de electroválvulas mediante radiofrecuencia LoRa 868MHz',
      ]),
      technologies: JSON.stringify(['LoRaWAN', 'Solar MPPT', 'ESP32', 'NDVI', 'Node.js']),
    },
  ] : [
    {
      id: '1',
      title: 'Robotics Engineering & Autonomous Mobile Robots',
      slug: 'robotics-engineering',
      icon: 'Bot',
      category: 'Robotics',
      shortDesc: 'Kinematic & dynamic modeling, ROS2 software architecture, custom BLDC motor drives, and autonomous mobile robot (AMR) platforms for industrial facilities.',
      coverImage: '/images/service_robotics.jpg',
      features: JSON.stringify([
        'Custom 6-DOF robotic arms & high-torque actuators',
        'Autonomous mobile robots (AMR / AGV) with LiDAR SLAM',
        'EtherCAT & CANopen distributed fieldbus motion networks',
        'ISO 13849 PL-d & SIL-2 safety compliant integration',
      ]),
      technologies: JSON.stringify(['ROS2', 'STM32G4', 'NVIDIA Jetson', 'EtherCAT', 'SolidWorks']),
    },
    {
      id: '2',
      title: 'Industrial IoT Systems & Edge Gateways',
      slug: 'iot-engineering',
      icon: 'Wifi',
      category: 'IoT',
      shortDesc: 'Rugged DIN-rail edge gateways, ultra-low-power telemetry sensor nodes, and real-time cloud data pipelines engineered for harsh operating environments.',
      coverImage: '/images/service_iot.jpg',
      features: JSON.stringify([
        'DIN-rail industrial edge gateways (Modbus, CAN, RS485)',
        'Long-range wireless telemetry (LoRaWAN, 4G LTE, NB-IoT)',
        'Cryptographic Over-The-Air (OTA) firmware update stack',
        'High-availability time-series telemetry dashboards',
      ]),
      technologies: JSON.stringify(['LoRaWAN', 'Modbus', 'MQTT', 'ESP32-S3', 'TimescaleDB']),
    },
    {
      id: '3',
      title: 'Custom Multilayer PCB & Electronics Design',
      slug: 'electronics-pcb-design',
      icon: 'CircuitBoard',
      category: 'Electronics',
      shortDesc: 'From high-speed HDI schematic capture to in-house surface-mount assembly, signal integrity validation, and pre-compliance EMC/EMI testing.',
      coverImage: '/images/service_pcb.jpg',
      features: JSON.stringify([
        'High-speed multilayer impedance-controlled PCB layouts',
        'Battery Management Systems (BMS) & power electronics',
        'Precision analog front-ends & low-noise sensor conditioning',
        'Design for Manufacturing (DFM) & quick-turn SMT assembly',
      ]),
      technologies: JSON.stringify(['Altium Designer', 'ARM Cortex-M7', 'BMS', 'SMT Assembly']),
    },
    {
      id: '4',
      title: 'Real-Time Embedded Firmware & RTOS',
      slug: 'embedded-systems',
      icon: 'Cpu',
      category: 'Embedded',
      shortDesc: 'Deterministic bare-metal C/C++, FreeRTOS, Zephyr, Board Support Packages (BSP), and custom Yocto Linux distributions for mission-critical hardware.',
      coverImage: '/images/service_pcb.jpg',
      features: JSON.stringify([
        'Hard real-time deterministic control loops (< 1ms)',
        'Bare-metal C/C++20 & FreeRTOS/Zephyr kernels',
        'Cryptographic bootloaders & hardware root of trust',
        'Automated Hardware-in-the-Loop (HIL) regression testbeds',
      ]),
      technologies: JSON.stringify(['FreeRTOS', 'Zephyr', 'STM32', 'CMake', 'Embedded Linux']),
    },
    {
      id: '5',
      title: 'AI & Industrial Edge Computer Vision',
      slug: 'ai-computer-vision',
      icon: 'Eye',
      category: 'AI',
      shortDesc: 'Automated optical inspection (AOI) vision systems detecting sub-millimeter defects at assembly line speeds with low-latency TensorRT neural inference.',
      coverImage: '/images/service_vision.jpg',
      features: JSON.stringify([
        'High-speed inline surface defect detection (AOI)',
        'Custom YOLOv10 & TensorRT edge AI model quantization',
        'Industrial telecentric optics & strobe LED illumination',
        'Direct PLC fieldbus triggering for pneumatic auto-rejection',
      ]),
      technologies: JSON.stringify(['TensorRT', 'OpenCV', 'PyTorch', 'NVIDIA Jetson', 'YOLOv10']),
    },
    {
      id: '6',
      title: 'Smart AgriTech & Environmental Telemetry',
      slug: 'smart-agriculture-greenbot',
      icon: 'Factory',
      category: 'Automation',
      shortDesc: 'Solar-powered agricultural telemetry sensor networks, automated irrigation valve controllers, and autonomous scouting rovers (GreenBot).',
      coverImage: '/images/service_smart_systems.jpg',
      features: JSON.stringify([
        'Multi-depth soil moisture & localized microclimate logging',
        'Solar energy harvesting with MPPT battery charging',
        'Autonomous agricultural scouting rovers with NDVI sensors',
        'Remote wireless valve actuation via LoRa 868MHz',
      ]),
      technologies: JSON.stringify(['LoRaWAN', 'Solar MPPT', 'ESP32', 'NDVI', 'Node.js']),
    },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get<Service[]>('/services');
        if (res.data && res.data.length > 0 && language === 'en') {
          setServices(res.data);
        } else {
          setServices(fallbackServices as Service[]);
        }
      } catch (err) {
        console.warn('Using default services:', err);
        setServices(fallbackServices as Service[]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [language]);

  const categories = language === 'fr'
    ? ['TOUS', 'Robotics', 'IoT', 'Electronics', 'Embedded', 'AI', 'Automation']
    : language === 'es'
    ? ['TODOS', 'Robotics', 'IoT', 'Electronics', 'Embedded', 'AI', 'Automation']
    : ['ALL', 'Robotics', 'IoT', 'Electronics', 'Embedded', 'AI', 'Automation'];

  const displayedServices = services.length > 0 ? services : (fallbackServices as Service[]);

  const filteredServices = displayedServices.filter((s) => {
    if (selectedCategory === 'ALL' || selectedCategory === 'TOUS' || selectedCategory === 'TODOS') return true;
    return s.category?.toLowerCase() === selectedCategory.toLowerCase();
  });

  const getServiceIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case 'bot':
        return <Bot className="w-6 h-6 text-accent-cyan" />;
      case 'wifi':
        return <Wifi className="w-6 h-6 text-sky-400" />;
      case 'cpu':
        return <Cpu className="w-6 h-6 text-purple-400" />;
      case 'factory':
        return <Factory className="w-6 h-6 text-accent-green" />;
      case 'circuitboard':
        return <CircuitBoard className="w-6 h-6 text-amber-400" />;
      case 'eye':
        return <Eye className="w-6 h-6 text-rose-400" />;
      case 'cog':
        return <Cog className="w-6 h-6 text-cyan-400" />;
      default:
        return <Rocket className="w-6 h-6 text-purple-300" />;
    }
  };

  return (
    <div className="pt-28 pb-20 bg-tech-grid">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-xs font-mono text-accent-cyan uppercase mb-6">
          <Cpu className="w-3.5 h-3.5" /> {t.capabilities.badge}
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
          {t.capabilities.title} <br />
          <span className="bg-gradient-to-r from-accent-cyan via-sky-300 to-accent-violet bg-clip-text text-transparent">
            {language === 'fr' ? 'Vitrine de nos Services d’Ingénierie' : 'Technical Services Showcase'}
          </span>
        </h1>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {t.capabilities.subtitle}
        </p>

        {/* Quick Contact Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-accent-cyan">
            <ShieldCheck className="w-4 h-4" /> {language === 'fr' ? 'Processus Conformes aux Normes Industrielles' : 'ISO Compliant Processes'}
          </span>
          <span>&bull;</span>
          <span className="text-slate-300">Hub: Alain Savary Tunis - Tunisia</span>
          <span>&bull;</span>
          <a href="tel:+21697887867" className="text-white hover:text-accent-cyan font-bold flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-accent-green" /> +216 97 887 867
          </a>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-900/90 border border-white/10 rounded-2xl max-w-4xl mx-auto backdrop-blur-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all ${
                selectedCategory === cat || (cat === 'TOUS' && selectedCategory === 'ALL')
                  ? 'bg-accent-cyan text-slate-950 font-bold shadow-md shadow-accent-cyan/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Services Showcase Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredServices.map((service) => {
            const features =
              typeof service.features === 'string'
                ? JSON.parse(service.features)
                : service.features || [];
            const techList =
              typeof service.technologies === 'string'
                ? JSON.parse(service.technologies)
                : service.technologies || [];

            const imageSrc = service.coverImage || '/images/hero_robotics.jpg';

            return (
              <Card
                key={service.id || service.slug}
                hoverEffect
                className="overflow-hidden bg-slate-900/90 border-slate-800 flex flex-col justify-between group"
              >
                {/* Visual Image Header */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 border-b border-slate-800">
                  <img
                    src={imageSrc}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Icon & Category Overlay */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-slate-950/85 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
                      {getServiceIcon(service.icon)}
                    </div>
                  </div>

                  <div className="absolute top-4 right-4">
                    <Badge variant="cyan" size="sm">
                      {service.category}
                    </Badge>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                      {service.shortDesc}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-2.5 mb-6">
                      <h4 className="text-xs font-mono font-bold uppercase text-slate-400">
                        {t.capabilities.deliverablesTitle}
                      </h4>
                      {Array.isArray(features) &&
                        features.slice(0, 4).map((feat: string, fIdx: number) => (
                          <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-accent-green flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Tech stack tags & CTA */}
                  <div className="pt-6 border-t border-slate-800/90 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {Array.isArray(techList) &&
                        techList.map((t: string, tIdx: number) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-md bg-slate-950 text-[11px] font-mono text-slate-300 border border-slate-800"
                          >
                            {t}
                          </span>
                        ))}
                    </div>
                    <Link to="/contact">
                      <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        {t.capabilities.requestRfq}
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
};
