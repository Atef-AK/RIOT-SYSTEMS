import React, { useState } from 'react';
import { Cpu, Radio, Code2, Eye, Server } from 'lucide-react';
import { Card } from '../ui/Card';

export const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'HARDWARE' | 'COMMUNICATION' | 'SOFTWARE' | 'AI'>('HARDWARE');

  const categories = [
    { id: 'HARDWARE' as const, label: 'Microcontrollers & Hardware', icon: <Cpu className="w-4 h-4" /> },
    { id: 'COMMUNICATION' as const, label: 'Protocols & Wireless', icon: <Radio className="w-4 h-4" /> },
    { id: 'SOFTWARE' as const, label: 'Firmware & Software', icon: <Code2 className="w-4 h-4" /> },
    { id: 'AI' as const, label: 'Edge AI & Computer Vision', icon: <Eye className="w-4 h-4" /> },
  ];

  const techItems = {
    HARDWARE: [
      { name: 'STM32 MCUs', desc: 'ARM Cortex-M0+/M4/M7/H7 high-performance microcontrollers for real-time control.' },
      { name: 'ESP32 IoT SoC', desc: 'Dual-core Wi-Fi & Bluetooth microcontroller with cryptographic hardware acceleration.' },
      { name: 'NVIDIA Jetson Orin', desc: 'High-throughput edge AI processors for real-time vision inspection and robotics SLAM.' },
      { name: 'Raspberry Pi Compute 4', desc: 'Modular Linux compute module for edge gateways and industrial automation.' },
      { name: 'Industrial PLCs', desc: 'Siemens S7, Schneider, Beckhoff controllers integrated via standard fieldbus.' },
      { name: 'Custom BLDC Inverters', desc: 'Field-oriented control (FOC) high-efficiency motor controllers and drivers.' },
    ],
    COMMUNICATION: [
      { name: 'LoRaWAN', desc: 'Long-range ultra-low-power radio protocol for outdoor & agricultural sensor nodes.' },
      { name: 'Modbus RTU / TCP', desc: 'Robust industrial communication standard across RS485 and Ethernet networks.' },
      { name: 'CAN Bus & CANopen', desc: 'Fault-tolerant multi-master vehicle and robotic joint communication network.' },
      { name: 'MQTT & WebSockets', desc: 'Low-overhead telemetry streaming for real-time SCADA and cloud dashboards.' },
      { name: '4G LTE / 5G / NB-IoT', desc: 'Cellular wireless connectivity with fallback store-and-forward caching.' },
      { name: 'EtherCAT & Profinet', desc: 'Deterministic sub-millisecond industrial Ethernet motion synchronization.' },
    ],
    SOFTWARE: [
      { name: 'Modern C & C++20', desc: 'High-performance, memory-safe embedded firmware and low-level drivers.' },
      { name: 'FreeRTOS & Zephyr RTOS', desc: 'Deterministic multi-tasking real-time operating systems with thread isolation.' },
      { name: 'Embedded Linux & Yocto', desc: 'Tailored Linux distributions with real-time PREEMPT_RT kernel patches.' },
      { name: 'ROS / ROS2', desc: 'Robot Operating System framework for navigation, kinematics, and simulation.' },
      { name: 'TypeScript & Node.js', desc: 'Scalable cloud telemetry microservices, APIs, and device management backends.' },
      { name: 'React & Tailwind CSS', desc: 'Ultra-fast operator HMIs, mission control portals, and telemetry visualization.' },
    ],
    AI: [
      { name: 'TensorRT Acceleration', desc: 'Hardware-optimized deep learning inference maximizing FPS on NVIDIA silicon.' },
      { name: 'OpenCV & Vision Tools', desc: 'Classical image processing, filtering, contour detection, and optical calibration.' },
      { name: 'YOLOv10 Deep Learning', desc: 'Real-time object detection, segmentation, and automated defect localization.' },
      { name: 'Thermal Anomaly Models', desc: 'Predictive thermal pattern recognition for early bearing and motor fault alerts.' },
      { name: 'Edge Impulse', desc: 'TinyML on MCUs for acoustic vibration analysis and keyword spotting.' },
      { name: 'PyTorch Model Training', desc: 'Custom synthetic dataset generation, training pipelines, and quantization.' },
    ],
  };

  return (
    <section className="py-24 bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-violet/15 border border-accent-violet/30 text-xs font-mono text-purple-300 uppercase mb-4">
            Industrial-Grade Ecosystem
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Our Technology Architecture
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            We build with battle-tested industrial components and open-source standards to ensure long-term availability, security, and scalability.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-accent-cyan text-slate-950 font-bold shadow-lg shadow-accent-cyan/20 border border-accent-cyan'
                    : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techItems[activeCategory].map((item, idx) => (
            <Card key={idx} hoverEffect className="p-6 bg-slate-950/80 border-slate-800/90">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-accent-cyan">TECH_0{idx + 1}</span>
                <span className="w-2 h-2 rounded-full bg-accent-green" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.name}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
