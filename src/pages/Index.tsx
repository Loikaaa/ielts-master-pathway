
import React, { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  // Apply the noise background texture when component mounts
  useEffect(() => {
    document.body.classList.add('noise-bg');
    
    // Clean up function
    return () => {
      document.body.classList.remove('noise-bg');
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col pt-16"> {/* Added pt-16 to account for fixed navbar */}
      <NavBar />
      <main className="flex-grow">
        <HeroSection />
        <SkillsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
