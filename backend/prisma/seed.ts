import { PrismaClient, Role, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting R-IoTSys database seed...');

  // 1. Create Default Super Admin from Environment Variables
  const adminEmail = process.env.INITIAL_ADMIN_EMAIL || 'admin@example.com';
  const rawAdminPassword = process.env.INITIAL_ADMIN_PASSWORD || 'ChangeMeImmediately123!';
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });

  const passwordHash = await bcrypt.hash(rawAdminPassword, 12);

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'R-IoTSys Chief Engineer',
        passwordHash,
        role: Role.SUPER_ADMIN,
        status: UserStatus.ACTIVE,
      },
    });
    console.log(`✅ Super Admin user created: ${adminEmail}`);
  } else {
    await prisma.user.update({
      where: { email: adminEmail },
      data: { passwordHash, status: UserStatus.ACTIVE, role: Role.SUPER_ADMIN },
    });
    console.log(`✅ Super Admin user updated: ${adminEmail}`);
  }

  // 2. Site Settings
  const settings = [
    { key: 'site_name', value: 'R-IoTSys', category: 'GENERAL' },
    { key: 'site_tagline', value: 'Robotics, IoT & Industrial Engineering Systems', category: 'GENERAL' },
    { key: 'site_description', value: 'Conception, engineering, electronics, firmware and deployment of custom robotics, smart devices and industrial IoT infrastructure.', category: 'SEO' },
    { key: 'contact_email', value: 'contact@r-iotsys.tn', category: 'CONTACT' },
    { key: 'contact_phone', value: '+216 97 887 867', category: 'CONTACT' },
    { key: 'contact_address', value: 'Alain Savary Tunis - Tunisia', category: 'CONTACT' },
    { key: 'working_hours', value: 'Monday – Friday: 08:30 – 18:00 (GMT+1)', category: 'CONTACT' },
    { key: 'maps_url', value: 'https://maps.google.com/?q=Alain+Savary+Tunis+Tunisia', category: 'CONTACT' },
    { key: 'social_linkedin', value: 'https://www.linkedin.com/company/r-iotsys', category: 'SOCIAL' },
    { key: 'social_github', value: 'https://github.com/r-iotsys', category: 'SOCIAL' },
    { key: 'social_facebook', value: 'https://facebook.com/riotsys', category: 'SOCIAL' },
    { key: 'social_youtube', value: 'https://youtube.com/@r-iotsys', category: 'SOCIAL' },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, category: s.category },
      create: s,
    });
  }
  console.log('✅ Site settings seeded.');

  // 3. Navigation Items
  const navItems = [
    { label: 'Home', url: '/', order: 1, isVisible: true },
    { label: 'About', url: '/about', order: 2, isVisible: true },
    { label: 'Services', url: '/services', order: 3, isVisible: true },
    { label: 'Projects', url: '/projects', order: 4, isVisible: true },
    { label: 'Contact', url: '/contact', order: 5, isVisible: true },
  ];

  await prisma.navigationItem.deleteMany({});
  for (const nav of navItems) {
    await prisma.navigationItem.create({ data: nav });
  }
  console.log('✅ Navigation items seeded.');

  // 4. Services
  const servicesData = [
    {
      title: 'Robotics Engineering',
      slug: 'robotics-engineering',
      icon: 'Bot',
      category: 'Robotics',
      shortDesc: 'Design, kinematic modeling, custom actuators, motion control, and integration of industrial robotic systems and mobile robots.',
      fullDesc: 'We build complete robotics solutions from ground up. Whether you require autonomous mobile robots (AMRs), custom 6-DOF articulated arms, automated guided vehicles (AGVs), or high-precision motion stages, our team handles mechanical kinematics, motor control loops, trajectory planning, and safety integration for harsh industrial environments.',
      coverImage: '/images/service_robotics.jpg',
      features: JSON.stringify([
        'Kinematic & Dynamic Modeling',
        'Custom Motor Drives & BLDC Control',
        'ROS / ROS2 Architecture & Navigation',
        'Autonomous Mobile Robots (AMR / AGV)',
        'Industrial Robot Cell Integration',
        'Safety SIL / PL-d Rated Compliant Architecture'
      ]),
      technologies: JSON.stringify(['ROS2', 'C++', 'CANopen', 'EtherCAT', 'STM32', 'NVIDIA Jetson', 'SolidWorks']),
      order: 1,
      isPublished: true,
    },
    {
      title: 'IoT Systems & Connected Hardware',
      slug: 'iot-engineering',
      icon: 'Wifi',
      category: 'IoT',
      shortDesc: 'End-to-end industrial IoT architecture: smart sensor nodes, edge gateways, secure wireless telemetry, and real-time cloud data pipelines.',
      fullDesc: 'We architect and build enterprise IoT ecosystems engineered for high availability and low power. From battery-operated remote environmental monitors to high-throughput factory floor telemetry, we engineer hardware, select optimal RF protocols (LoRaWAN, Cellular, BLE Mesh), implement edge computing, and build robust cloud APIs.',
      coverImage: '/images/service_iot.jpg',
      features: JSON.stringify([
        'Ultra-Low-Power Sensor Nodes',
        'Industrial Edge Gateways (Modbus, CAN, RS485)',
        'LoRaWAN, 4G/5G, NB-IoT Telemetry',
        'OTA (Over-The-Air) Firmware Updates',
        'End-to-End Cryptographic Security',
        'Time-Series Data Ingestion & Dashboards'
      ]),
      technologies: JSON.stringify(['LoRaWAN', 'MQTT', 'ESP32', 'Modbus', 'TimescaleDB', 'Docker', 'React']),
      order: 2,
      isPublished: true,
    },
    {
      title: 'Embedded Systems & Firmware',
      slug: 'embedded-systems',
      icon: 'Cpu',
      category: 'Embedded',
      shortDesc: 'Hard real-time embedded firmware, RTOS, bare-metal MCU programming, driver development, and embedded Linux BSPs.',
      fullDesc: 'Firmware is the brain of your hardware. We develop robust, deterministically tested firmware in modern C/C++ and Embedded Rust. Our engineers specialize in ARM Cortex-M/R/A, RISC-V, FreeRTOS, Zephyr, and customized Yocto Linux distributions, ensuring absolute reliability in mission-critical applications.',
      coverImage: '/images/service_pcb.jpg',
      features: JSON.stringify([
        'Bare-Metal & RTOS (FreeRTOS, Zephyr)',
        'Custom Board Support Packages (BSP)',
        'Low-Level Hardware Drivers (SPI, I2C, UART, DMA)',
        'Embedded Linux & Yocto Custom Builds',
        'Cryptographic Bootloaders & Secure Enclaves',
        'Automated Hardware-in-the-Loop (HIL) Testing'
      ]),
      technologies: JSON.stringify(['C/C++20', 'FreeRTOS', 'Zephyr', 'ARM Cortex', 'Embedded Linux', 'CMake']),
      order: 3,
      isPublished: true,
    },
    {
      title: 'Industrial Automation & SCADA',
      slug: 'industrial-automation',
      icon: 'Factory',
      category: 'Automation',
      shortDesc: 'PLC programming, SCADA development, machine monitoring, distributed telemetry, and legacy factory modernization.',
      fullDesc: 'Modernize manufacturing lines and industrial facilities with reliable automation. We bridge standard industrial equipment (Siemens, Schneider, Beckhoff) with custom modern IoT data collection, automated vision inspection, and digital twin monitoring systems.',
      coverImage: '/images/service_iot.jpg',
      features: JSON.stringify([
        'PLC Programming (IEC 61131-3)',
        'Industrial SCADA & HMI Design',
        'Fieldbus Integration (Modbus, Profinet, EtherNet/IP)',
        'Predictive Maintenance & OEE Tracking',
        'Edge Computing for Production Lines',
        'Electrical Cabinet Design & Assembly'
      ]),
      technologies: JSON.stringify(['PLC', 'SCADA', 'Modbus TCP', 'OPC-UA', 'Profinet', 'Grafana']),
      order: 4,
      isPublished: true,
    },
    {
      title: 'Custom Electronics & PCB Design',
      slug: 'electronics-pcb-design',
      icon: 'CircuitBoard',
      category: 'Electronics',
      shortDesc: 'Multilayer high-speed PCB design, power electronics, analog front-ends, EMI/EMC compliance, and rapid prototyping.',
      fullDesc: 'From schematic capture to production-ready multilayer Gerber files. We design rigid, flex, and rigid-flex PCBs with rigorous signal integrity, thermal dissipation, and EMI/EMC design rules. We manage component sourcing, surface-mount assembly, and hardware verification.',
      coverImage: '/images/service_pcb.jpg',
      features: JSON.stringify([
        'High-Speed Multilayer PCB Layout',
        'Power Supply & Battery Management (BMS)',
        'Precision Analog & Sensor Conditioning',
        'Design for Manufacturing (DFM) & Assembly (DFA)',
        'Pre-compliance EMC/EMI Testing',
        'Quick-Turn In-House SMT Assembly'
      ]),
      technologies: JSON.stringify(['Altium Designer', 'KiCad', 'SMT', 'BMS', 'Impedance Control']),
      order: 5,
      isPublished: true,
    },
    {
      title: 'AI & Edge Computer Vision',
      slug: 'ai-computer-vision',
      icon: 'Eye',
      category: 'AI',
      shortDesc: 'Embedded AI models on edge hardware (NVIDIA Jetson, Hailo) for automated visual inspection, defect detection, and object tracking.',
      fullDesc: 'Deploy intelligence directly at the edge where latency and privacy matter. We train, optimize (TensorRT, ONNX), and deploy deep learning models for automated industrial optical inspection, thermal anomaly detection, gesture/pose estimation, and autonomous robotics navigation.',
      coverImage: '/images/service_vision.jpg',
      features: JSON.stringify([
        'High-Speed Optical Defect Detection',
        'Custom Object Detection & Segmentation',
        'Thermal & Multi-Spectral Imaging',
        'Model Quantization & TensorRT Edge Acceleration',
        'Edge AI Deployment on NVIDIA Jetson & RK3588',
        'Industrial Lighting & Optics Selection'
      ]),
      technologies: JSON.stringify(['PyTorch', 'TensorRT', 'OpenCV', 'YOLOv10', 'NVIDIA Jetson', 'Python']),
      order: 6,
      isPublished: true,
    },
    {
      title: 'Mechanical & Electromechanical Design',
      slug: 'mechanical-design',
      icon: 'Cog',
      category: 'Mechanical',
      shortDesc: 'Parametric 3D CAD design, custom IP67/IP68 enclosures, structural simulation, CNC machining, and additive manufacturing.',
      fullDesc: 'Engineering the physical hardware that houses, protects, and actuates your electronics. We design custom aluminum, sheet metal, and injection-molded housings optimized for rugged industrial and outdoor conditions. We conduct finite element analysis (FEA) and thermal simulations.',
      coverImage: '/images/service_robotics.jpg',
      features: JSON.stringify([
        '3D CAD Modeling & Kinematic Assemblies',
        'IP67 / IP68 Ingress Protection Enclosures',
        'FEA Structural & Thermal Simulation',
        'Rapid CNC Prototyping & 3D Printing',
        'Sheet Metal & Die-Cast Tooling Prep',
        'Gearbox & Linkage Mechanism Design'
      ]),
      technologies: JSON.stringify(['SolidWorks', 'Fusion 360', 'ANSYS', 'CNC', 'Additive Manufacturing']),
      order: 7,
      isPublished: true,
    },
    {
      title: 'Full Prototyping & R&D',
      slug: 'prototyping-rd',
      icon: 'Rocket',
      category: 'R&D',
      shortDesc: 'De-risk technical innovations with rapid functional PoCs, hardware iteration cycles, and path-to-scale manufacturing readiness.',
      fullDesc: 'Transform ambitious concepts into tangible, tested hardware. We take novel ideas through rigorous feasibility analysis, quick-turn proof of concept builds, comprehensive laboratory testing, and seamless transfer to pilot production.',
      coverImage: '/images/hero_robotics.jpg',
      features: JSON.stringify([
        'Technical Feasibility & Architecture Audits',
        'Stage-Gate Rapid Prototyping',
        'Environmental & Stress Testing',
        'Pilot Run Batch Production',
        'Regulatory Compliance Roadmap (CE/FCC)',
        'Complete Technical Documentation'
      ]),
      technologies: JSON.stringify(['Prototyping', 'HIL Testing', 'Oscilloscopes', 'Design Validation']),
      order: 8,
      isPublished: true,
    },
  ];

  await prisma.service.deleteMany({});
  for (const s of servicesData) {
    await prisma.service.create({ data: s });
  }
  console.log('✅ Services seeded.');

  // 5. Featured Projects (Case Studies)
  const projectsData = [
    {
      title: 'Autonomous Mobile Robot (AMR) for Industrial Logistics',
      slug: 'autonomous-mobile-robot-amr',
      category: 'Robotics',
      summary: 'Custom autonomous mobile robot platform with 300kg payload capacity, LiDAR SLAM navigation, and smart fleet coordination.',
      challenge: 'The client needed an autonomous indoor transport solution capable of navigating narrow factory aisles with dynamic human traffic, without requiring floor magnetic tape or costly facility restructuring.',
      solution: 'R-IoTSys engineered the complete AMR platform from chassis to cloud: custom differential drive base, dual safety LiDAR integration, ROS2 navigation stack on NVIDIA Jetson, industrial battery management with auto-docking, and a supervisory web fleet management interface.',
      results: 'Successfully deployed across 2 production lines, reducing manual material handling time by 42% and achieving zero collision safety incidents across 3,000+ operating hours.',
      clientName: 'Industrial Manufacturing Partner',
      clientIndustry: 'Logistics & Smart Factory',
      year: '2026',
      coverImage: '/images/service_robotics.jpg',
      gallery: JSON.stringify([
        '/images/service_robotics.jpg',
        '/images/hero_robotics.jpg'
      ]),
      technologies: JSON.stringify(['ROS2', 'NVIDIA Jetson', 'LiDAR SLAM', 'STM32', 'CAN Bus', 'React']),
      featured: true,
      published: true,
      order: 1,
    },
    {
      title: 'Smart Precision Agriculture IoT & Robotics (GreenBot Core)',
      slug: 'smart-agriculture-greenbot',
      category: 'Agriculture',
      summary: 'Solar-powered agricultural telemetry nodes, automated valve controllers, and robotic soil inspection units with LoRaWAN connectivity.',
      challenge: 'Large-scale arid agriculture operations needed precise multi-depth soil moisture tracking, localized microclimate analysis, and automated drip irrigation control over vast areas without cellular or grid power.',
      solution: 'Developed custom ultra-low-power IP67 sensor nodes with custom solar harvesting circuitry, 15km LoRaWAN radio links, and an autonomous robotic scouting rover equipped with multispectral NDVI sensors.',
      results: 'Water consumption decreased by 34% while crop yield increased by 18% through automated data-driven irrigation cycles.',
      clientName: 'AgriTech Initiative',
      clientIndustry: 'Smart Agriculture',
      year: '2025',
      coverImage: '/images/service_smart_systems.jpg',
      gallery: JSON.stringify([
        '/images/service_smart_systems.jpg',
        '/images/service_iot.jpg'
      ]),
      technologies: JSON.stringify(['LoRaWAN', 'ESP32', 'Solar Energy Harvesting', 'NDVI Sensors', 'Node.js', 'TimescaleDB']),
      featured: true,
      published: true,
      order: 2,
    },
    {
      title: 'High-Speed Edge Computer Vision Defect Inspection',
      slug: 'edge-vision-defect-inspection',
      category: 'AI',
      summary: 'Sub-millisecond optical inspection system identifying micro-fractures and assembly defects at 60 parts per second.',
      challenge: 'High-speed assembly line required 100% inline quality verification of precision mechanical components with defect tolerances under 0.1mm.',
      solution: 'Designed an integrated vision tunnel with high-framerate global shutter cameras, custom strobe LED lighting, and an accelerated YOLO deep learning inference model running on an embedded edge AI accelerator.',
      results: 'Eliminated manual inspection bottlenecks, achieved 99.8% defect detection accuracy, and integrated pneumatic auto-rejection mechanisms directly into the PLC loop.',
      clientName: 'Automotive Component Manufacturer',
      clientIndustry: 'Precision Manufacturing',
      year: '2025',
      coverImage: '/images/service_vision.jpg',
      gallery: JSON.stringify([
        '/images/service_vision.jpg'
      ]),
      technologies: JSON.stringify(['TensorRT', 'OpenCV', 'PyTorch', 'NVIDIA Jetson', 'Modbus TCP', 'Python']),
      featured: true,
      published: true,
      order: 3,
    },
    {
      title: 'Industrial Telemetry & Predictive Maintenance Gateway',
      slug: 'industrial-predictive-maintenance-gateway',
      category: 'Industrial',
      summary: 'Ruggedized DIN-rail IoT gateway collecting vibration, thermal, and electrical telemetry to predict machine failures.',
      challenge: 'Continuous monitoring of heavy rotary equipment in remote pumping stations with poor connectivity and extreme ambient temperatures.',
      solution: 'Engineered a custom ARM-based DIN-rail gateway with tri-axial high-frequency vibration sampling, onboard FFT feature extraction, 4G LTE fallback, and local anomaly detection algorithms.',
      results: 'Detected 4 critical bearing failures before catastrophic breakdown occurred, preventing an estimated €180,000 in downtime and repair costs.',
      clientName: 'Energy & Utilities Operator',
      clientIndustry: 'Industrial Equipment & Energy',
      year: '2026',
      coverImage: '/images/service_iot.jpg',
      gallery: JSON.stringify([
        '/images/service_iot.jpg'
      ]),
      technologies: JSON.stringify(['STM32H7', 'FreeRTOS', '4G LTE', 'Edge Vibration FFT', 'MQTT', 'Grafana']),
      featured: true,
      published: true,
      order: 4,
    },
    {
      title: 'Custom 6-DOF Robotic Arm Joint Controller System',
      slug: 'custom-6dof-robotic-arm-controller',
      category: 'Robotics',
      summary: 'Modular brushless motor drive controller with dual absolute magnetic encoders and EtherCAT communication.',
      challenge: 'Requirement for compact, high-torque robotic joints with decentralized motor drives fitting inside the robotic arm link geometry.',
      solution: 'Engineered a circular 45mm diameter PCB featuring field-oriented control (FOC), 19-bit optical/magnetic feedback, and low-latency EtherCAT slave synchronization.',
      results: 'Delivered smooth sub-millimeter positional repeatability with full thermal and torque limit safety protections.',
      clientName: 'Robotics R&D Lab',
      clientIndustry: 'Robotics & Automation',
      year: '2025',
      coverImage: '/images/service_pcb.jpg',
      gallery: JSON.stringify([
        '/images/service_pcb.jpg'
      ]),
      technologies: JSON.stringify(['FOC Control', 'EtherCAT', 'Altium Designer', 'C++', 'STM32G4', 'SolidWorks']),
      featured: false,
      published: true,
      order: 5,
    },
    {
      title: 'Microgrid & Remote Solar Telemetry System',
      slug: 'microgrid-solar-telemetry',
      category: 'IoT',
      summary: 'Bi-directional telemetry and remote control platform for commercial solar arrays and battery energy storage.',
      challenge: 'Centralized telemetry aggregation across decentralized renewable installations with fluctuating cellular coverage.',
      solution: 'Custom Modbus-to-MQTT telemetry collectors with local store-and-forward caching, automated inverter power throttling, and cloud analytics.',
      results: '100% data continuity achieved with automatic failover and proactive inverter health diagnostics.',
      clientName: 'Clean Energy Provider',
      clientIndustry: 'Renewable Energy',
      year: '2026',
      coverImage: '/images/service_smart_systems.jpg',
      gallery: JSON.stringify([
        '/images/service_smart_systems.jpg'
      ]),
      technologies: JSON.stringify(['Modbus', 'MQTT', 'ESP32', 'React', 'Node.js', 'PostgreSQL']),
      featured: false,
      published: true,
      order: 6,
    },
  ];

  await prisma.project.deleteMany({});
  for (const p of projectsData) {
    await prisma.project.create({ data: p });
  }
  console.log('✅ Projects seeded.');

  // 6. Technologies
  const techList = [
    { name: 'STM32 MCUs', category: 'HARDWARE', isFeatured: true, order: 1 },
    { name: 'ESP32 IoT SoC', category: 'HARDWARE', isFeatured: true, order: 2 },
    { name: 'NVIDIA Jetson Orin', category: 'HARDWARE', isFeatured: true, order: 3 },
    { name: 'Raspberry Pi Compute 4', category: 'HARDWARE', isFeatured: true, order: 4 },
    { name: 'Industrial PLCs', category: 'HARDWARE', isFeatured: true, order: 5 },
    { name: 'BLDC Motor Drivers', category: 'HARDWARE', isFeatured: true, order: 6 },
    { name: 'LoRaWAN', category: 'COMMUNICATION', isFeatured: true, order: 7 },
    { name: 'Modbus RTU / TCP', category: 'COMMUNICATION', isFeatured: true, order: 8 },
    { name: 'CAN Bus / CANopen', category: 'COMMUNICATION', isFeatured: true, order: 9 },
    { name: 'RS485 / Industrial Fieldbus', category: 'COMMUNICATION', isFeatured: true, order: 10 },
    { name: 'MQTT / WebSockets', category: 'COMMUNICATION', isFeatured: true, order: 11 },
    { name: '4G LTE / 5G / NB-IoT', category: 'COMMUNICATION', isFeatured: true, order: 12 },
    { name: 'Modern C / C++20', category: 'SOFTWARE', isFeatured: true, order: 13 },
    { name: 'FreeRTOS & Zephyr', category: 'SOFTWARE', isFeatured: true, order: 14 },
    { name: 'Embedded Linux & Yocto', category: 'SOFTWARE', isFeatured: true, order: 15 },
    { name: 'ROS2 Robotics Stack', category: 'SOFTWARE', isFeatured: true, order: 16 },
    { name: 'Node.js & TypeScript', category: 'SOFTWARE', isFeatured: true, order: 17 },
    { name: 'React & Tailwind', category: 'SOFTWARE', isFeatured: true, order: 18 },
    { name: 'Edge AI / TensorRT', category: 'AI', isFeatured: true, order: 19 },
    { name: 'OpenCV & Computer Vision', category: 'AI', isFeatured: true, order: 20 },
    { name: 'YOLO Real-time Detection', category: 'AI', isFeatured: true, order: 21 },
    { name: 'Predictive Anomaly Models', category: 'AI', isFeatured: true, order: 22 },
  ];

  await prisma.technology.deleteMany({});
  for (const t of techList) {
    await prisma.technology.create({ data: t });
  }
  console.log('✅ Technologies seeded.');

  // 7. Pages & Homepage Sections
  const homePage = await prisma.page.upsert({
    where: { slug: 'home' },
    update: { title: 'Home', metaTitle: 'R-IoTSys | Robotics, IoT & Industrial Engineering Systems', metaDesc: 'Turn ambitious hardware ideas into working industrial systems. End-to-end robotics, IoT, embedded systems and automation.' },
    create: { slug: 'home', title: 'Home', metaTitle: 'R-IoTSys | Robotics, IoT & Industrial Engineering Systems', metaDesc: 'Turn ambitious hardware ideas into working industrial systems. End-to-end robotics, IoT, embedded systems and automation.' },
  });

  const aboutPage = await prisma.page.upsert({
    where: { slug: 'about' },
    update: { title: 'About R-IoTSys', metaTitle: 'About Us | R-IoTSys Engineering', metaDesc: 'Learn about our engineering philosophy, methodology, and end-to-end hardware-software capabilities.' },
    create: { slug: 'about', title: 'About R-IoTSys', metaTitle: 'About Us | R-IoTSys Engineering', metaDesc: 'Learn about our engineering philosophy, methodology, and end-to-end hardware-software capabilities.' },
  });

  // Homepage Sections
  await prisma.section.deleteMany({ where: { pageId: homePage.id } });
  const homeSections = [
    {
      pageId: homePage.id,
      sectionType: 'Hero',
      title: 'Engineering the Connected Machines of Tomorrow.',
      subtitle: 'From intelligent sensors to autonomous machines, R-IoTSys designs, builds, and deploys complete robotic and connected systems — from concept to reality.',
      content: JSON.stringify({
        primaryCtaText: 'Start a Project',
        primaryCtaUrl: '/contact',
        secondaryCtaText: 'Explore Our Work',
        secondaryCtaUrl: '/projects',
        badge: 'ENGINEERING & CUSTOM HARDWARE',
      }),
      order: 1,
      isEnabled: true,
    },
    {
      pageId: homePage.id,
      sectionType: 'Capabilities',
      title: 'Engineering Across the Entire Stack',
      subtitle: 'We bridge physical mechanics, custom electronics, real-time firmware, and cloud intelligence.',
      content: JSON.stringify({}),
      order: 2,
      isEnabled: true,
    },
    {
      pageId: homePage.id,
      sectionType: 'Process',
      title: 'The 8-Stage Engineering Process',
      subtitle: 'A disciplined stage-gate methodology that eliminates hardware risk and accelerates time-to-market.',
      content: JSON.stringify({}),
      order: 3,
      isEnabled: true,
    },
    {
      pageId: homePage.id,
      sectionType: 'Projects',
      title: 'Engineered Systems & Case Studies',
      subtitle: 'A selection of custom industrial, robotics, and connected systems engineered for real-world reliability.',
      content: JSON.stringify({}),
      order: 4,
      isEnabled: true,
    },
    {
      pageId: homePage.id,
      sectionType: 'Technologies',
      title: 'Our Technology Ecosystem',
      subtitle: 'Proven hardware platforms, fieldbus protocols, real-time operating systems, and edge AI accelerators.',
      content: JSON.stringify({}),
      order: 5,
      isEnabled: true,
    },
    {
      pageId: homePage.id,
      sectionType: 'WhyUs',
      title: 'Why Engineering Leaders Partner With R-IoTSys',
      subtitle: 'We are not a web development agency. We are true full-stack hardware, robotics, and software engineers.',
      content: JSON.stringify({}),
      order: 6,
      isEnabled: true,
    },
    {
      pageId: homePage.id,
      sectionType: 'CTA',
      title: 'Have a Machine, Device or System in Mind?',
      subtitle: "Let's turn your idea into a high-performance working system. Talk directly with our engineering team.",
      content: JSON.stringify({
        primaryCtaText: 'Discuss Your Project',
        primaryCtaUrl: '/contact',
      }),
      order: 7,
      isEnabled: true,
    },
  ];

  for (const s of homeSections) {
    await prisma.section.create({ data: s });
  }
  console.log('✅ Homepage sections seeded.');

  console.log('🎉 R-IoTSys Database Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
