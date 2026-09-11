import React from 'react';
import { Hero } from '../../components/public/Hero';
import { Capabilities } from '../../components/public/Capabilities';
import { EngineeringProcess } from '../../components/public/EngineeringProcess';
import { FeaturedProjects } from '../../components/public/FeaturedProjects';
import { TechStack } from '../../components/public/TechStack';
import { WhyUs } from '../../components/public/WhyUs';
import { CTASection } from '../../components/public/CTASection';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Capabilities */}
      <Capabilities />

      {/* 3. 10-Stage Engineering Process */}
      <EngineeringProcess />

      {/* 4. Featured Projects */}
      <FeaturedProjects />

      {/* 5. Technology Architecture */}
      <TechStack />

      {/* 6. Why R-IoTSys */}
      <WhyUs />

      {/* 7. Final Call to Action */}
      <CTASection />
    </div>
  );
};
