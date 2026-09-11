export type Language = 'en' | 'fr' | 'es';

export interface TranslationDictionary {
  nav: {
    home: string;
    about: string;
    services: string;
    projects: string;
    contact: string;
    startProject: string;
    callUs: string;
    whatsapp: string;
    hubBadge: string;
    tagline: string;
  };
  hero: {
    badge: string;
    title1: string;
    titleHighlight: string;
    title2: string;
    subtitle: string;
    startCta: string;
    exploreCta: string;
    fullStack: string;
    fullStackSub: string;
    rtosMetric: string;
    rtosSub: string;
    inHouse: string;
    inHouseSub: string;
    labTestbed: string;
    kinematicsBadge: string;
    liveBadge: string;
    heroCardTitle: string;
    heroCardSubtitle: string;
    repeatability: string;
    protocol: string;
    firmware: string;
    tunisiaHub: string;
  };
  capabilities: {
    badge: string;
    title: string;
    subtitle: string;
    techStack: string;
    activeModule: string;
    deliverablesTitle: string;
    requestRfq: string;
    viewAll: string;
    allServices: string;
    filterAll: string;
    tabs: {
      robotics: string;
      iot: string;
      pcb: string;
      embedded: string;
      vision: string;
      smartAgri: string;
    };
  };
  servicesData: {
    robotics: {
      title: string;
      desc: string;
      deliverables: string[];
    };
    iot: {
      title: string;
      desc: string;
      deliverables: string[];
    };
    pcb: {
      title: string;
      desc: string;
      deliverables: string[];
    };
    embedded: {
      title: string;
      desc: string;
      deliverables: string[];
    };
    vision: {
      title: string;
      desc: string;
      deliverables: string[];
    };
    smartAgri: {
      title: string;
      desc: string;
      deliverables: string[];
    };
  };
  process: {
    badge: string;
    title: string;
    subtitle: string;
    steps: {
      step: string;
      title: string;
      desc: string;
    }[];
  };
  whyUs: {
    badge: string;
    title: string;
    subtitle: string;
    items: {
      title: string;
      desc: string;
    }[];
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    challengeLabel: string;
    solutionLabel: string;
    resultsLabel: string;
    techStackLabel: string;
    viewCaseStudy: string;
    allCategories: string;
  };
  about: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    philosophyTitle: string;
    philosophyDesc1: string;
    philosophyDesc2: string;
    labTitle: string;
    labDesc: string;
    statsTitle: string;
  };
  contact: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    serviceLabel: string;
    servicePlaceholder: string;
    budgetLabel: string;
    budgetPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    sending: string;
    successMessage: string;
    ndaBadge: string;
    ndaDesc: string;
    facilityTitle: string;
    hoursTitle: string;
    hoursValue: string;
    mapsLink: string;
  };
  ctaSection: {
    title: string;
    subtitle: string;
    primaryBtn: string;
    callBtn: string;
    confidential: string;
  };
  footer: {
    desc: string;
    capabilitiesTitle: string;
    companyTitle: string;
    hubTitle: string;
    rightsReserved: string;
    adminPortal: string;
    secureSystems: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      projects: 'Projects',
      contact: 'Contact',
      startProject: 'Start a Project',
      callUs: 'Call Us',
      whatsapp: 'WhatsApp',
      hubBadge: 'Alain Savary Tunis - Tunisia',
      tagline: 'Engineering Hub',
    },
    hero: {
      badge: 'ROBOTICS • IOT • EMBEDDED • AUTOMATION',
      title1: 'Engineering the',
      titleHighlight: 'Connected Machines',
      title2: 'of Tomorrow.',
      subtitle: 'From intelligent sensors to autonomous machines, R-IoTSys designs, builds, and deploys complete robotic and connected systems — from concept to reality.',
      startCta: 'Start a Project',
      exploreCta: 'Explore Services',
      fullStack: 'Full-Stack',
      fullStackSub: 'Hardware to Cloud',
      rtosMetric: '< 1ms',
      rtosSub: 'Deterministic RTOS',
      inHouse: '100%',
      inHouseSub: 'In-House Conception',
      labTestbed: 'R-IOTSYS // LAB TESTBED',
      kinematicsBadge: '6-AXIS KINEMATICS',
      liveBadge: 'LIVE',
      heroCardTitle: 'PROJECT TITAN 6-DOF',
      heroCardSubtitle: 'High-Precision Micro-Electronics SMT Placement Cell',
      repeatability: 'REPEATABILITY',
      protocol: 'PROTOCOL',
      firmware: 'FIRMWARE',
      tunisiaHub: 'Tunisia R&D Center',
    },
    capabilities: {
      badge: 'End-to-End Capabilities Showcase',
      title: 'Engineering Across the Entire Stack',
      subtitle: 'We do not outsource hardware or firmware. Our engineering team designs the mechanical frame, routes the PCB, writes the real-time firmware, and builds the cloud intelligence.',
      techStack: 'Hardware Tech Stack',
      activeModule: 'Active Module',
      deliverablesTitle: 'Core Engineering Deliverables:',
      requestRfq: 'Request Technical RFQ',
      viewAll: 'View All Services',
      allServices: 'All Capabilities',
      filterAll: 'ALL',
      tabs: {
        robotics: 'Robotics & AMRs',
        iot: 'IoT Telemetry',
        pcb: 'PCB & Hardware',
        embedded: 'Firmware & RTOS',
        vision: 'Edge AI / Vision',
        smartAgri: 'Autonomous Systems',
      },
    },
    servicesData: {
      robotics: {
        title: 'Robotics Engineering & Autonomous Systems',
        desc: 'Complete mechanical kinematics, trajectory planning, motor drive electronics, and autonomous mobile robot (AMR) navigation stacks.',
        deliverables: [
          'Custom 6-DOF robotic arms & end-effectors',
          'LiDAR SLAM autonomous mobile robots (AMR/AGV)',
          'CANopen & EtherCAT distributed joint controllers',
          'Field-Oriented Control (FOC) BLDC motor drives',
        ],
      },
      iot: {
        title: 'Industrial IoT & Connected Hardware',
        desc: 'Rugged DIN-rail edge gateways, ultra-low-power telemetry sensor nodes, and real-time cloud data pipelines for harsh industrial assets.',
        deliverables: [
          'DIN-rail industrial edge gateways with 4G/LTE',
          'Long-range LoRaWAN & NB-IoT telemetry nodes',
          'Industrial Modbus RTU/TCP & RS485 fieldbus bridges',
          'Secure OTA (Over-The-Air) firmware update infrastructure',
        ],
      },
      pcb: {
        title: 'Custom Multilayer PCB & Electronics Design',
        desc: 'From high-speed HDI schematic layout to in-house surface-mount assembly, signal integrity validation, and pre-compliance EMC/EMI testing.',
        deliverables: [
          'High-speed multilayer impedance-controlled PCBs',
          'Battery Management Systems (BMS) & power electronics',
          'Precision analog front-ends & low-noise sensor conditioning',
          'Design for Manufacturing (DFM) & quick-turn SMT assembly',
        ],
      },
      embedded: {
        title: 'Real-Time Embedded Firmware & RTOS',
        desc: 'Deterministic bare-metal C/C++, FreeRTOS, Zephyr, Board Support Packages (BSP), and custom Yocto Linux distributions.',
        deliverables: [
          'Hard real-time deterministic control loops (< 1ms)',
          'Bare-metal C/C++20 & FreeRTOS/Zephyr kernels',
          'Cryptographic bootloaders & hardware root of trust',
          'Automated Hardware-in-the-Loop (HIL) regression testbeds',
        ],
      },
      vision: {
        title: 'Edge Computer Vision & Automated Inspection',
        desc: 'High-speed automated optical inspection (AOI) vision tunnels detecting micro-defects at production line speeds with low-latency AI inference.',
        deliverables: [
          'High-speed inline surface defect detection (AOI)',
          'Custom YOLOv10 & TensorRT edge AI model quantization',
          'Industrial telecentric optics & strobe LED illumination',
          'Direct PLC fieldbus triggering for pneumatic auto-rejection',
        ],
      },
      smartAgri: {
        title: 'Smart AgriTech & Environmental Telemetry',
        desc: 'Solar-powered agricultural telemetry sensor networks, automated irrigation valve controllers, and autonomous scouting rovers.',
        deliverables: [
          'Multi-depth soil moisture & microclimate stations',
          'Solar energy harvesting with MPPT battery charging',
          'Autonomous agricultural scouting rovers with NDVI sensors',
          'Remote wireless valve actuation via LoRa 868MHz',
        ],
      },
    },
    process: {
      badge: 'End-to-End Methodology',
      title: 'How We Turn Concepts Into Deployed Systems',
      subtitle: 'Our structured 10-stage engineering lifecycle guarantees technical risk reduction, predictable milestones, and reliable industrial execution.',
      steps: [
        { step: '01', title: 'Idea & Requirements', desc: 'Deconstruct technical specs, performance constraints, and operational targets.' },
        { step: '02', title: 'System Architecture', desc: 'Partition hardware, firmware, communications, and power budgets.' },
        { step: '03', title: 'Electronics & Schematics', desc: 'Component selection, schematic design, signal integrity, and BOM optimization.' },
        { step: '04', title: 'Mechanical Design', desc: '3D CAD modeling, IP-rated enclosures, FEA structural stress, and thermal simulation.' },
        { step: '05', title: 'Rapid Prototype (PoC)', desc: 'Fast-turn PCB fabrication, in-house SMT assembly, and mechanical 3D printing.' },
        { step: '06', title: 'Firmware & RTOS', desc: 'Bare-metal drivers, FreeRTOS/Zephyr kernels, motor control loops, and security.' },
        { step: '07', title: 'Software & Cloud APIs', desc: 'Edge processing, MQTT telemetry pipelines, and supervisory dashboards.' },
        { step: '08', title: 'System Integration', desc: 'Bringing mechanical, electrical, and firmware subsystems together into a unified unit.' },
        { step: '09', title: 'Testing & Validation', desc: 'Environmental chambers, EMI pre-compliance, stress testing, and HIL validation.' },
        { step: '10', title: 'Deployment & Scale', desc: 'Production tooling transfer, QA test jigs, and continuous field maintenance.' },
      ],
    },
    whyUs: {
      badge: 'Why Choose R-IoTSys',
      title: 'Engineering Rigor Meets Local Agility',
      subtitle: 'We combine deep engineering multidisciplinary expertise under one roof, eliminating finger-pointing between hardware and software vendors.',
      items: [
        { title: '100% In-House Multidisciplinary Team', desc: 'Mechanical engineers, PCB designers, embedded firmware developers, and cloud architects working side-by-side.' },
        { title: 'Local Agility + International Standards', desc: 'Based at Alain Savary in Tunis, Tunisia with the agility to support North African operations and international clients with European standard compliance.' },
        { title: 'Rapid Prototyping Laboratory', desc: 'In-house SMT assembly benches, rapid additive prototyping, precision CNC machining, and high-frequency RF instrumentation.' },
        { title: 'Strict IP Confidentiality (NDA)', desc: 'Complete ownership of schematics, PCB source files, firmware repositories, and mechanical CAD models transferred to you.' },
      ],
    },
    projects: {
      badge: 'Engineering Portfolio',
      title: 'Featured Case Studies & Deployed Systems',
      subtitle: 'Explore real-world industrial machines, custom IoT hardware, and robotics systems designed, constructed, and deployed by R-IoTSys.',
      challengeLabel: 'The Engineering Challenge',
      solutionLabel: 'The R-IoTSys Solution',
      resultsLabel: 'Measured Impact & Results',
      techStackLabel: 'Technologies Used',
      viewCaseStudy: 'View Case Study',
      allCategories: 'ALL',
    },
    about: {
      badge: 'About R-IoTSys',
      title: 'Engineering the Connected',
      titleHighlight: 'Industrial Future',
      subtitle: 'R-IoTSys is a specialized engineering hub dedicated to the conception, design, construction, firmware, and deployment of custom robotics and IoT systems.',
      philosophyTitle: 'Our Engineering Philosophy',
      philosophyDesc1: 'We believe true innovation in connected hardware requires seamless integration across physical mechanics, precision electronics, deterministic firmware, and scalable cloud platforms.',
      philosophyDesc2: 'By maintaining 100% in-house capabilities, we eliminate the friction, delays, and miscommunications that occur when mechanical, electrical, and software domains are outsourced to disconnected vendors.',
      labTitle: 'Equipped for Rapid Hardware Iterations',
      labDesc: 'Located at Alain Savary in Tunis, Tunisia, our facilities combine electronics laboratory benches, rapid additive prototyping, precision CNC tooling, and high-frequency RF test instrumentation.',
      statsTitle: 'Engineered for Performance',
    },
    contact: {
      badge: 'Direct Engineering Collaboration',
      title: 'Start Your',
      titleHighlight: 'Engineering Project',
      subtitle: 'Have a machine to build, an embedded board to design, or an industrial automation system to deploy? Connect directly with our engineering team.',
      formTitle: 'Request for Technical Proposal (RFQ)',
      formSubtitle: 'Fill in your requirements below. All project specifications are treated under strict confidentiality.',
      nameLabel: 'Full Name / Technical Contact *',
      namePlaceholder: 'Dr. John Doe',
      emailLabel: 'Professional Email Address *',
      emailPlaceholder: 'john.doe@company.com',
      phoneLabel: 'Phone / WhatsApp Number',
      phonePlaceholder: '+216 97 887 867',
      companyLabel: 'Company / Organization Name',
      companyPlaceholder: 'Advanced Automation Ltd.',
      serviceLabel: 'Primary Engineering Discipline *',
      servicePlaceholder: 'Select required service',
      budgetLabel: 'Estimated Project Budget / Timeline',
      budgetPlaceholder: 'Select budget range',
      messageLabel: 'Project Overview & Technical Specifications *',
      messagePlaceholder: 'Describe your functional requirements, operating environment, target quantities, and desired milestones...',
      submitButton: 'Submit Technical Request (RFQ)',
      sending: 'Submitting Specification...',
      successMessage: 'Thank you! Your technical inquiry has been submitted. An R-IoTSys systems engineer will contact you within 24 hours.',
      ndaBadge: 'Non-Disclosure Agreement (NDA)',
      ndaDesc: 'We execute mutual NDAs prior to in-depth technical exchanges to protect proprietary intellectual property, CAD schematics, and trade secrets.',
      facilityTitle: 'Engineering Facility',
      hoursTitle: 'Operating Hours',
      hoursValue: 'Mon – Fri: 08:30 – 18:00 (GMT+1)',
      mapsLink: 'Open in Google Maps',
    },
    ctaSection: {
      title: 'Ready to Bring Your Hardware Innovation to Life?',
      subtitle: 'Connect with our engineering team to review technical feasibility, discuss architecture, or schedule an initial laboratory consultation.',
      primaryBtn: 'Start an Engineering RFQ',
      callBtn: 'Call +216 97 887 867',
      confidential: 'Strict NDA & Confidentiality Guaranteed',
    },
    footer: {
      desc: 'Engineering the connected machines of tomorrow. We conceive, design, build, program, and deploy custom robotics, IoT hardware, and industrial automation systems.',
      capabilitiesTitle: 'Capabilities',
      companyTitle: 'Company',
      hubTitle: 'Engineering Hub',
      rightsReserved: 'All rights reserved.',
      adminPortal: 'Admin Portal',
      secureSystems: 'Secure Industrial Systems',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      services: 'Services',
      projects: 'Projets',
      contact: 'Contact',
      startProject: 'Lancer un Projet',
      callUs: 'Appelez-nous',
      whatsapp: 'WhatsApp',
      hubBadge: 'Alain Savary Tunis - Tunisie',
      tagline: 'Pôle d’Ingénierie',
    },
    hero: {
      badge: 'ROBOTIQUE • IOT • SYSTÈMES EMBARQUÉS • AUTOMATISATION',
      title1: 'L’Ingénierie des',
      titleHighlight: 'Machines Connectées',
      title2: 'de Demain.',
      subtitle: 'Des capteurs intelligents aux machines autonomes, R-IoTSys conçoit, fabrique et déploie des systèmes robotiques et connectés complets — du concept à la réalité industrielle.',
      startCta: 'Lancer un Projet',
      exploreCta: 'Découvrir nos Services',
      fullStack: 'Full-Stack',
      fullStackSub: 'Du Hardware au Cloud',
      rtosMetric: '< 1ms',
      rtosSub: 'RTOS Déterministe',
      inHouse: '100%',
      inHouseSub: 'Conception Interne',
      labTestbed: 'R-IOTSYS // BANC DE TEST LABO',
      kinematicsBadge: 'CINÉMATIQUE 6 AXES',
      liveBadge: 'EN DIRECT',
      heroCardTitle: 'PROJET TITAN 6 AXES',
      heroCardSubtitle: 'Cellule Robotique de Précision pour Micro-Électronique CMS',
      repeatability: 'RÉPÉTABILITÉ',
      protocol: 'PROTOCOLE',
      firmware: 'FIRMWARE',
      tunisiaHub: 'Centre R&D Tunisie',
    },
    capabilities: {
      badge: 'Vitrine de nos Capacités d’Ingénierie',
      title: 'Ingénierie sur l’Ensemble de la Chaîne',
      subtitle: 'Nous ne sous-traitons ni le matériel ni le firmware. Nos ingénieurs conçoivent la mécanique, routent le PCB, programment le firmware temps réel et développent l’intelligence cloud.',
      techStack: 'Stack Technique Matérielle',
      activeModule: 'Module Actif',
      deliverablesTitle: 'Livrables Clés d’Ingénierie :',
      requestRfq: 'Demander un Devis Technique (RFQ)',
      viewAll: 'Voir Tous les Services',
      allServices: 'Toutes les Capacités',
      filterAll: 'TOUS',
      tabs: {
        robotics: 'Robotique & AMRs',
        iot: 'Télémétrie IoT',
        pcb: 'PCB & Électronique',
        embedded: 'Firmware & RTOS',
        vision: 'Vision IA & Edge',
        smartAgri: 'Systèmes Autonomes',
      },
    },
    servicesData: {
      robotics: {
        title: 'Ingénierie Robotique & Systèmes Autonomes',
        desc: 'Modélisation cinématique, asservissement de mouvement, électronique de commande moteur et robots mobiles autonomes (AMR / AGV).',
        deliverables: [
          'Bras robotiques articulés 6 axes & préhenseurs sur mesure',
          'Robots mobiles autonomes (AMR / AGV) avec navigation LiDAR SLAM',
          'Contrôleurs d’axes distribués sur bus CANopen & EtherCAT',
          'Variateurs moteurs brushless FOC (Field-Oriented Control)',
        ],
      },
      iot: {
        title: 'Systèmes IoT Industriels & Passerelles Edge',
        desc: 'Passerelles industrielles sur rail DIN, capteurs autonomes ultra-basse consommation et pipelines de données temps réel pour environnements sévères.',
        deliverables: [
          'Passerelles edge sur rail DIN avec connectivité 4G/LTE',
          'Nœuds de télémétrie longue portée LoRaWAN & NB-IoT',
          'Passerelles de bus de terrain industriels Modbus RTU/TCP & RS485',
          'Infrastructure sécurisée de mise à jour à distance OTA (Over-The-Air)',
        ],
      },
      pcb: {
        title: 'Conception Électronique & PCB Multicouches',
        desc: 'De la capture de schémas HDI au placement/routage, assemblage CMS en atelier, validation d’intégrité du signal et pré-qualification CEM/EMI.',
        deliverables: [
          'Routage de PCB multicouches haute fréquence à impédance contrôlée',
          'Systèmes de gestion de batterie (BMS) & électronique de puissance',
          'Étages d’acquisition analogique haute précision et conditionnement capteurs',
          'Conception pour la fabricabilité (DFM) & prototypage rapide CMS',
        ],
      },
      embedded: {
        title: 'Firmware Embarqué Temps Réel & RTOS',
        desc: 'Programmation déterministe C/C++ bare-metal, noyaux FreeRTOS et Zephyr, packages de support de carte (BSP) et distributions Linux Embarqué Yocto.',
        deliverables: [
          'Boucles de contrôle temps réel déterministes (< 1ms)',
          'Noyaux FreeRTOS / Zephyr et pilotes matériels de bas niveau',
          'Bootloaders cryptographiques sécurisés & racine de confiance matérielle',
          'Bancs de tests automatisés Hardware-in-the-Loop (HIL)',
        ],
      },
      vision: {
        title: 'Vision par Ordinateur & Contrôle Optique par IA',
        desc: 'Tunnels d’inspection optique automatisée (AOI) détectant les micro-défauts à cadence industrielle grâce à l’inférence neuronale accélérée sur processeurs Edge.',
        deliverables: [
          'Détection automatique de défauts de surface en ligne de production (AOI)',
          'Optimisation et quantification de modèles IA TensorRT & YOLOv10',
          'Optiques télécentriques industrielles & éclairage stroboscopique LED',
          'Déclenchement instantané d’éjection pneumatique via automate PLC',
        ],
      },
      smartAgri: {
        title: 'AgriTech Intelligente & Télémétrie Environnementale',
        desc: 'Réseaux de capteurs agricoles alimentés par énergie solaire, contrôleurs automatisés d’électrovannes et rovers autonomes de cartographie parcellaire.',
        deliverables: [
          'Stations agrométéorologiques & sondes d’humidité du sol multi-profondeurs',
          'Récupération d’énergie solaire avec régulateur de charge MPPT',
          'Rovers autonomes de reconnaissance agricole (GreenBot) avec capteurs NDVI',
          'Pilotage à distance d’irrigation par radiofréquence LoRa 868MHz',
        ],
      },
    },
    process: {
      badge: 'Méthodologie Complète',
      title: 'Comment Nous Transformons vos Idées en Systèmes Déployés',
      subtitle: 'Notre cycle d’ingénierie en 10 étapes garantit une réduction des risques techniques, des jalons prévisibles et une exécution industrielle fiable.',
      steps: [
        { step: '01', title: 'Idée & Spécifications', desc: 'Analyse approfondie des exigences fonctionnelles, contraintes thermiques et opérationnelles.' },
        { step: '02', title: 'Architecture Système', desc: 'Partitionnement matériel, firmware, protocoles de communication et bilan de puissance.' },
        { step: '03', title: 'Électronique & Schémas', desc: 'Sélection des composants, schématique, simulation d’intégrité et optimisation du BOM.' },
        { step: '04', title: 'Conception Mécanique', desc: 'Modélisation 3D CAO, boîtiers étanches IP67/68, calculs de contraintes FEA et thermique.' },
        { step: '05', title: 'Prototype Rapide (PoC)', desc: 'Fabrication express de PCB, assemblage CMS en laboratoire et impression 3D technique.' },
        { step: '06', title: 'Firmware & RTOS', desc: 'Pilotes bas niveau, noyaux FreeRTOS/Zephyr, asservissement moteur et cryptographie.' },
        { step: '07', title: 'Logiciel & Cloud APIs', desc: 'Traitement Edge, pipelines de télémétrie MQTT et tableaux de bord de supervision.' },
        { step: '08', title: 'Intégration Globale', desc: 'Assemblage complet des sous-systèmes mécaniques, électroniques et logiciels.' },
        { step: '09', title: 'Tests & Validation', desc: 'Essais en chambre climatique, pré-conformité CEM, tests d’endurance et validation HIL.' },
        { step: '10', title: 'Déploiement & Série', desc: 'Transfert en production série, bancs de test de fin de ligne et maintenance opérationnelle.' },
      ],
    },
    whyUs: {
      badge: 'Pourquoi Choisir R-IoTSys',
      title: 'Rigueur de l’Ingénierie & Agilité Locale',
      subtitle: 'Nous regroupons toutes les disciplines d’ingénierie sous un même toit, éliminant tout conflit entre prestataires matériels et logiciels.',
      items: [
        { title: 'Équipe Multidisciplinaire 100% Interne', desc: 'Ingénieurs en mécanique, concepteurs PCB, développeurs firmware temps réel et architectes cloud collaborant ensemble.' },
        { title: 'Agilité Locale + Standards Internationaux', desc: 'Basés à Alain Savary à Tunis, Tunisie avec l’agilité pour accompagner l’Afrique du Nord et les clients internationaux aux normes européennes.' },
        { title: 'Laboratoire de Prototypage de Pointe', desc: 'Bancs d’assemblage CMS internes, prototypage additif, usinage CNC et instrumentation de mesure RF haute fréquence.' },
        { title: 'Confidentialité Totale de votre IP (NDA)', desc: 'Transfert intégral des droits sur les schémas, fichiers sources PCB, dépôts de firmware et modèles CAO 3D.' },
      ],
    },
    projects: {
      badge: 'Portfolio d’Ingénierie',
      title: 'Études de Cas & Systèmes Déployés',
      subtitle: 'Découvrez nos réalisations concrètes en machines industrielles, matériels IoT sur mesure et robotique autonome conçus et déployés par R-IoTSys.',
      challengeLabel: 'Le Défi d’Ingénierie',
      solutionLabel: 'La Solution R-IoTSys',
      resultsLabel: 'Impact Mesuré & Résultats',
      techStackLabel: 'Technologies Utilisées',
      viewCaseStudy: 'Voir l’Étude de Cas',
      allCategories: 'TOUS',
    },
    about: {
      badge: 'À Propos de R-IoTSys',
      title: 'Bâtir le Futur des',
      titleHighlight: 'Machines Industrielles',
      subtitle: 'R-IoTSys est un pôle d’ingénierie d’excellence dédié à la conception, la fabrication, la programmation et le déploiement de systèmes robotiques et IoT sur mesure.',
      philosophyTitle: 'Notre Philosophie d’Ingénierie',
      philosophyDesc1: 'Nous sommes convaincus que l’innovation technologique exige une parfaite symbiose entre la mécanique physique, l’électronique de précision, le firmware déterministe et les plateformes cloud évolutives.',
      philosophyDesc2: 'En maintenant 100% des compétences en interne, nous supprimons les frictions et retards causés par la dispersion entre sous-traitants mécanique, électronique et logiciel.',
      labTitle: 'Équipé pour des Itérations Rapides',
      labDesc: 'Situés à Alain Savary à Tunis, Tunisie, nos locaux combinent bancs de laboratoire électronique, prototypage rapide, usinage CNC de précision et bancs de test radiofréquence.',
      statsTitle: 'Conçu pour la Performance',
    },
    contact: {
      badge: 'Collaboration Directe avec nos Ingénieurs',
      title: 'Démarrez Votre',
      titleHighlight: 'Projet d’Ingénierie',
      subtitle: 'Vous avez une machine à concevoir, une carte électronique à router ou un système d’automatisation industrielle à déployer ? Échangez directement avec nos ingénieurs.',
      formTitle: 'Demande de Proposition Technique (RFQ)',
      formSubtitle: 'Décrivez votre besoin ci-dessous. Toutes les spécifications techniques sont traitées sous stricte confidentialité.',
      nameLabel: 'Nom & Prénom / Contact Technique *',
      namePlaceholder: 'Jean Dupont',
      emailLabel: 'Adresse Email Professionnelle *',
      emailPlaceholder: 'jean.dupont@entreprise.com',
      phoneLabel: 'Numéro de Téléphone / WhatsApp',
      phonePlaceholder: '+216 97 887 867',
      companyLabel: 'Nom de l’Entreprise / Organisation',
      companyPlaceholder: 'Industrie Automation SA',
      serviceLabel: 'Discipline d’Ingénierie Principale *',
      servicePlaceholder: 'Sélectionnez le service requis',
      budgetLabel: 'Budget Estimé / Calendrier Souhaité',
      budgetPlaceholder: 'Sélectionnez une tranche budgétaire',
      messageLabel: 'Présentation du Projet & Spécifications Techniques *',
      messagePlaceholder: 'Décrivez vos exigences fonctionnelles, environnement d’exploitation, cadences et délais souhaités...',
      submitButton: 'Envoyer la Demande Technique (RFQ)',
      sending: 'Transmission de votre demande...',
      successMessage: 'Merci ! Votre demande technique a bien été transmise. Un ingénieur système de R-IoTSys vous contactera sous 24 heures.',
      ndaBadge: 'Accord de Non-Divulgation (NDA)',
      ndaDesc: 'Nous signons systématiquement des accords de confidentialité (NDA) préalables afin de protéger votre propriété intellectuelle, schémas CAO et secrets de fabrication.',
      facilityTitle: 'Centre d’Ingénierie & Laboratoire',
      hoursTitle: 'Horaires d’Ouverture',
      hoursValue: 'Lun – Ven : 08h30 – 18h00 (GMT+1)',
      mapsLink: 'Ouvrir sur Google Maps',
    },
    ctaSection: {
      title: 'Prêt à Donner Vie à Votre Innovation Matérielle ?',
      subtitle: 'Prenez contact avec notre équipe pour évaluer la faisabilité technique, concevoir l’architecture ou planifier une visite de notre laboratoire.',
      primaryBtn: 'Déposer une Demande (RFQ)',
      callBtn: 'Appeler le +216 97 887 867',
      confidential: 'Confidentialité & NDA Garantis',
    },
    footer: {
      desc: 'L’ingénierie des machines connectées de demain. Nous concevons, fabriquons, programmons et déployons des systèmes robotiques, électroniques et IoT industriels sur mesure.',
      capabilitiesTitle: 'Capacités',
      companyTitle: 'Entreprise',
      hubTitle: 'Pôle d’Ingénierie',
      rightsReserved: 'Tous droits réservés.',
      adminPortal: 'Portail Administration',
      secureSystems: 'Systèmes Industriels Sécurisés',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Nosotros',
      services: 'Servicios',
      projects: 'Proyectos',
      contact: 'Contacto',
      startProject: 'Iniciar Proyecto',
      callUs: 'Llámenos',
      whatsapp: 'WhatsApp',
      hubBadge: 'Alain Savary Túnez - Túnez',
      tagline: 'Centro de Ingeniería',
    },
    hero: {
      badge: 'ROBÓTICA • IOT • SISTEMAS EMBEBIDOS • AUTOMATIZACIÓN',
      title1: 'La Ingeniería de las',
      titleHighlight: 'Máquinas Conectadas',
      title2: 'del Mañana.',
      subtitle: 'Desde sensores inteligentes hasta máquinas autónomas, R-IoTSys diseña, fabrica y despliega sistemas robóticos y conectados completos — desde el concepto hasta la realidad industrial.',
      startCta: 'Iniciar Proyecto',
      exploreCta: 'Explorar Servicios',
      fullStack: 'Full-Stack',
      fullStackSub: 'Del Hardware a la Nube',
      rtosMetric: '< 1ms',
      rtosSub: 'RTOS Determinista',
      inHouse: '100%',
      inHouseSub: 'Diseño Propio en Laboratorio',
      labTestbed: 'R-IOTSYS // BANCO DE PRUEBAS',
      kinematicsBadge: 'CINEMÁTICA DE 6 EJES',
      liveBadge: 'EN VIVO',
      heroCardTitle: 'PROYECTO TITAN 6-DOF',
      heroCardSubtitle: 'Célula Robótica de Alta Precisión para Microelectrónica SMT',
      repeatability: 'REPETIBILIDAD',
      protocol: 'PROTOCOLO',
      firmware: 'FIRMWARE',
      tunisiaHub: 'Centro I+D Túnez',
    },
    capabilities: {
      badge: 'Muestra Integral de Capacidades',
      title: 'Ingeniería en Toda la Pila Tecnológica',
      subtitle: 'No subcontratamos hardware ni firmware. Nuestro equipo de ingeniería diseña la mecánica, rutea la PCB, programa el firmware en tiempo real y desarrolla la inteligencia en la nube.',
      techStack: 'Stack Tecnológico de Hardware',
      activeModule: 'Módulo Activo',
      deliverablesTitle: 'Entregables Clave de Ingeniería:',
      requestRfq: 'Solicitar Cotización Técnica (RFQ)',
      viewAll: 'Ver Todos los Servicios',
      allServices: 'Todas las Capacidades',
      filterAll: 'TODOS',
      tabs: {
        robotics: 'Robótica y AMRs',
        iot: 'Telemetría IoT',
        pcb: 'PCB y Electrónica',
        embedded: 'Firmware y RTOS',
        vision: 'Visión IA y Edge',
        smartAgri: 'Sistemas Autónomos',
      },
    },
    servicesData: {
      robotics: {
        title: 'Ingeniería Robótica y Sistemas Autónomos',
        desc: 'Modelado cinemático y dinámico, arquitectura de software ROS2, controladores de motores brushless a medida y plataformas AMR para instalaciones industriales.',
        deliverables: [
          'Brazos robóticos articulados de 6 ejes y efectores finales a medida',
          'Robots móviles autónomos (AMR / AGV) con navegación LiDAR SLAM',
          'Redes de control de movimiento sobre buses EtherCAT y CANopen',
          'Integración de seguridad industrial certificable ISO 13849 PL-d y SIL-2',
        ],
      },
      iot: {
        title: 'Sistemas IoT Industriales y Pasarelas Edge',
        desc: 'Pasarelas robustas para carril DIN, nodos de sensores de telemetría de ultra bajo consumo y canales de datos en la nube en tiempo real.',
        deliverables: [
          'Pasarelas industriales para carril DIN con 4G LTE y conectividad de campo',
          'Nodos de telemetría de largo alcance LoRaWAN y NB-IoT',
          'Puentes de buses de campo industriales Modbus RTU/TCP y RS485',
          'Infraestructura de actualización remota de firmware segura (OTA)',
        ],
      },
      pcb: {
        title: 'Diseño Electrónico y PCB Multicapa Personalizada',
        desc: 'Desde la captura esquemática HDI de alta velocidad hasta el ensamblaje superficial SMT en laboratorio, validación de integridad de señal y pruebas de pre-conformidad CEM/EMI.',
        deliverables: [
          'Ruteo de PCB multicapa de alta velocidad con impedancia controlada',
          'Sistemas de gestión de baterías (BMS) y electrónica de potencia',
          'Etapas analógicas de alta precisión y acondicionamiento de sensores',
          'Diseño para fabricación (DFM) y prototipado rápido SMT',
        ],
      },
      embedded: {
        title: 'Firmware Embebido en Tiempo Real y RTOS',
        desc: 'Programación C/C++ bare-metal determinista, núcleos FreeRTOS y Zephyr, paquetes de soporte de placa (BSP) y distribuciones Linux Embebido Yocto.',
        deliverables: [
          'Bucles de control deterministas en tiempo real estricto (< 1ms)',
          'Núcleos FreeRTOS / Zephyr y controladores de bajo nivel',
          'Cargadores de arranque criptográficos y raíz de confianza en hardware',
          'Bancos de pruebas automatizados Hardware-in-the-Loop (HIL)',
        ],
      },
      vision: {
        title: 'Visión por Computadora e Inspección Óptica con IA',
        desc: 'Túneles de inspección óptica automatizada (AOI) que detectan microdefectos a velocidad de línea de producción con inferencia neuronal TensorRT de baja latencia.',
        deliverables: [
          'Detección automática de defectos superficiales en línea de producción (AOI)',
          'Optimización y cuantización de modelos IA TensorRT y YOLOv10',
          'Ópticas telecéntricas industriales e iluminación estroboscópica LED',
          'Activación instantánea de expulsión neumática mediante PLC',
        ],
      },
      smartAgri: {
        title: 'AgriTech Inteligente y Telemetría Ambiental',
        desc: 'Redes de sensores agrícolas solares, controladores automatizados de válvulas de riego y rovers agrícolas autónomos de diagnóstico con NDVI.',
        deliverables: [
          'Estaciones agroclimáticas y sensores de humedad de suelo multinivel',
          'Captación de energía solar con regulador de carga MPPT eficiente',
          'Rovers agrícolas autónomos de exploración con sensores NDVI',
          'Control inalámbrico de electroválvulas mediante radiofrecuencia LoRa 868MHz',
        ],
      },
    },
    process: {
      badge: 'Metodología Integral',
      title: 'Cómo Convertimos Conceptos en Sistemas Desplegados',
      subtitle: 'Nuestro ciclo de vida de ingeniería en 10 etapas garantiza la mitigación de riesgos técnicos, hitos predecibles y una ejecución industrial impecable.',
      steps: [
        { step: '01', title: 'Idea y Requerimientos', desc: 'Análisis minucioso de especificaciones funcionales, restricciones térmicas y operativas.' },
        { step: '02', title: 'Arquitectura del Sistema', desc: 'Particionamiento de hardware, firmware, buses de comunicación y balance de potencia.' },
        { step: '03', title: 'Electrónica y Esquemas', desc: 'Selección de componentes, diseño esquemático, integridad de señal y optimización del BOM.' },
        { step: '04', title: 'Diseño Mecánico', desc: 'Modelado 3D CAD, carcasas con protección IP67/68, análisis de esfuerzo FEA y simulación térmica.' },
        { step: '05', title: 'Prototipo Rápido (PoC)', desc: 'Fabricación exprés de PCB, ensamblaje SMT en laboratorio e impresión 3D técnica.' },
        { step: '06', title: 'Firmware y RTOS', desc: 'Drivers de bajo nivel, núcleos FreeRTOS/Zephyr, lazos de control de motores y criptografía.' },
        { step: '07', title: 'Software y APIs en la Nube', desc: 'Procesamiento Edge, canales de telemetría MQTT y cuadros de mando de supervisión.' },
        { step: '08', title: 'Integración del Sistema', desc: 'Ensamblaje integral de subsistemas mecánicos, electrónicos y de firmware.' },
        { step: '09', title: 'Pruebas y Validación', desc: 'Cámaras climáticas, pre-conformidad EMI/EMC, pruebas de estrés y validación HIL.' },
        { step: '10', title: 'Despliegue y Escalamiento', desc: 'Transferencia a producción en serie, bancos de prueba de fin de línea y soporte continuo.' },
      ],
    },
    whyUs: {
      badge: 'Por Qué Elegir R-IoTSys',
      title: 'Rigor de Ingeniería y Agilidad Local',
      subtitle: 'Unificamos todas las disciplinas técnicas bajo un mismo techo, eliminando los conflictos entre proveedores de hardware y de software.',
      items: [
        { title: 'Equipo Multidisciplinario 100% Interno', desc: 'Ingenieros mecánicos, diseñadores de PCB, desarrolladores de firmware embebido y arquitectos cloud trabajando codo a codo.' },
        { title: 'Agilidad Local + Estándares Internacionales', desc: 'Ubicados en Alain Savary en Túnez con la capacidad de servir al norte de África y clientes globales bajo normas europeas.' },
        { title: 'Laboratorio de Prototipado Avanzado', desc: 'Bancos propios de ensamblaje SMT, prototipado aditivo, mecanizado CNC e instrumentación de medición RF de alta frecuencia.' },
        { title: 'Confidencialidad Absoluta de su IP (NDA)', desc: 'Transferencia total de derechos sobre esquemas, fuentes de PCB, repositorios de firmware y modelos CAD 3D.' },
      ],
    },
    projects: {
      badge: 'Portafolio de Ingeniería',
      title: 'Casos de Estudio y Sistemas Desplegados',
      subtitle: 'Explore máquinas industriales reales, hardware IoT personalizado y sistemas robóticos diseñados, fabricados y desplegados por R-IoTSys.',
      challengeLabel: 'El Desafío de Ingeniería',
      solutionLabel: 'La Solución de R-IoTSys',
      resultsLabel: 'Impacto Medido y Resultados',
      techStackLabel: 'Tecnologías Utilizadas',
      viewCaseStudy: 'Ver Caso de Estudio',
      allCategories: 'TODOS',
    },
    about: {
      badge: 'Acerca de R-IoTSys',
      title: 'Construyendo el Futuro de las',
      titleHighlight: 'Máquinas Industriales',
      subtitle: 'R-IoTSys es un centro especializado de ingeniería enfocado en la concepción, diseño, fabricación, firmware y despliegue de sistemas robóticos y de IoT personalizados.',
      philosophyTitle: 'Nuestra Filosofía de Ingeniería',
      philosophyDesc1: 'Creemos que la verdadera innovación en hardware conectado requiere una integración fluida entre mecánica física, electrónica de precisión, firmware determinista y plataformas en la nube escalables.',
      philosophyDesc2: 'Al mantener el 100% de las capacidades internamente, eliminamos las demoras y malentendidos que surgen cuando la mecánica, la electrónica y el software se dispersan entre diferentes proveedores.',
      labTitle: 'Equipados para Iteraciones Rápidas de Hardware',
      labDesc: 'Ubicados en Alain Savary en Túnez, nuestras instalaciones combinan bancos de laboratorio electrónico, prototipado rápido aditivo, mecanizado CNC de precisión e instrumental de prueba RF.',
      statsTitle: 'Diseñado para el Máximo Rendimiento',
    },
    contact: {
      badge: 'Colaboración Directa de Ingeniería',
      title: 'Comience su',
      titleHighlight: 'Proyecto de Ingeniería',
      subtitle: '¿Tiene una máquina por construir, una tarjeta electrónica por diseñar o un sistema de automatización industrial por desplegar? Conéctese directamente con nuestros ingenieros.',
      formTitle: 'Solicitud de Propuesta Técnica (RFQ)',
      formSubtitle: 'Complete sus requerimientos a continuación. Todas las especificaciones se gestionan bajo estricto acuerdo de confidencialidad.',
      nameLabel: 'Nombre Completo / Contacto Técnico *',
      namePlaceholder: 'Dr. Carlos Mendoza',
      emailLabel: 'Correo Electrónico Profesional *',
      emailPlaceholder: 'carlos.mendoza@empresa.com',
      phoneLabel: 'Número de Teléfono / WhatsApp',
      phonePlaceholder: '+216 97 887 867',
      companyLabel: 'Empresa / Organización',
      companyPlaceholder: 'Automatización Avanzada S.A.',
      serviceLabel: 'Disciplina de Ingeniería Principal *',
      servicePlaceholder: 'Seleccione el servicio requerido',
      budgetLabel: 'Presupuesto Estimado / Plazos',
      budgetPlaceholder: 'Seleccione un rango presupuestario',
      messageLabel: 'Descripción del Proyecto y Requerimientos Técnicos *',
      messagePlaceholder: 'Describa los requisitos funcionales, entorno operativo, volúmenes de producción y plazos esperados...',
      submitButton: 'Enviar Solicitud Técnica (RFQ)',
      sending: 'Enviando especificaciones...',
      successMessage: '¡Gracias! Su solicitud técnica ha sido recibida. Un ingeniero de sistemas de R-IoTSys se pondrá en contacto en menos de 24 horas.',
      ndaBadge: 'Acuerdo de Confidencialidad (NDA)',
      ndaDesc: 'Firmamos acuerdos de confidencialidad (NDA) antes de intercambios técnicos profundos para salvaguardar su propiedad intelectual, planos y secretos comerciales.',
      facilityTitle: 'Centro de Ingeniería y Laboratorio',
      hoursTitle: 'Horarios de Atención',
      hoursValue: 'Lun – Vie: 08:30 – 18:00 (GMT+1)',
      mapsLink: 'Abrir en Google Maps',
    },
    ctaSection: {
      title: '¿Listo para Dar Vida a su Innovación en Hardware?',
      subtitle: 'Hable con nuestro equipo de ingeniería para revisar la viabilidad técnica, estructurar la arquitectura o agendar una consulta en nuestro laboratorio.',
      primaryBtn: 'Iniciar una Cotización (RFQ)',
      callBtn: 'Llamar al +216 97 887 867',
      confidential: 'Confidencialidad y NDA Garantizados',
    },
    footer: {
      desc: 'Ingeniería para las máquinas conectadas del mañana. Concebimos, diseñamos, fabricamos, programamos y desplegamos sistemas de robótica, hardware IoT y automatización industrial a medida.',
      capabilitiesTitle: 'Capacidades',
      companyTitle: 'Empresa',
      hubTitle: 'Centro de Ingeniería',
      rightsReserved: 'Todos los derechos reservados.',
      adminPortal: 'Portal de Administración',
      secureSystems: 'Sistemas Industriales Seguros',
    },
  },
};
