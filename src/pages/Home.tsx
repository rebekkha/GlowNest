import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import StatsRibbon from '../components/Home/StatsRibbon';
import ScienceOfGlow from '../components/Home/ScienceOfGlow';
import FeaturedProducts from '../components/Home/FeaturedProducts';
import CategoryGrid from '../components/Home/CategoryGrid';
import TestimonialsSection from '../components/Home/TestimonialsSection';
import GuaranteesSection from '../components/Home/GuaranteesSection';
import NewsletterSection from '../components/Home/NewsletterSection';

const Home: React.FC = () => {
  return (
    <div className="pt-24 overflow-x-hidden relative">
      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-theme-primary/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-theme-secondary/20 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[50%] left-[50%] w-[30%] h-[30%] bg-theme-primary/10 rounded-full blur-[100px] animate-blob" style={{ animationDelay: '4s' }} />
      </div>

      <HeroSection />
      <StatsRibbon />
      <ScienceOfGlow />
      <FeaturedProducts />
      <CategoryGrid />
      <TestimonialsSection />
      <GuaranteesSection />
      <NewsletterSection />
    </div>
  );
};

export default Home;
