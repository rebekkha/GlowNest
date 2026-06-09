import React from 'react';
import { motion } from 'framer-motion';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-theme-primary/20 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      
      <div className="max-w-4xl mx-auto glass-card p-8 md:p-14 border border-theme-text/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-theme-text mb-6">Terms & Conditions</h1>
          <p className="text-theme-primary mb-12 uppercase tracking-widest text-sm font-semibold">Last Updated: June 2026</p>
          
          <div className="space-y-8 text-theme-text-light leading-relaxed">
            <section>
              <h2 className="text-2xl text-theme-text font-heading font-semibold mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using GlowNest, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
            </section>
            
            <section>
              <h2 className="text-2xl text-theme-text font-heading font-semibold mb-4">2. Product Information</h2>
              <p>We strive to ensure that all information on GlowNest is accurate and up to date. However, we do not warrant that product descriptions, ingredients, or other content is accurate, complete, reliable, current, or error-free. Always check the physical product label before use.</p>
            </section>
            
            <section>
              <h2 className="text-2xl text-theme-text font-heading font-semibold mb-4">3. User Accounts</h2>
              <p>To use certain features of the platform, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information, including your password, and for all activity that occurs under your account.</p>
            </section>

            <section>
              <h2 className="text-2xl text-theme-text font-heading font-semibold mb-4">4. Health Disclaimer</h2>
              <p>The skincare products and advice provided on GlowNest are not intended to diagnose, treat, cure, or prevent any disease. If you have severe skin conditions, please consult a certified dermatologist before using new products.</p>
            </section>

            <section>
              <h2 className="text-2xl text-theme-text font-heading font-semibold mb-4">5. Modifications</h2>
              <p>GlowNest reserves the right to modify these terms from time to time at our sole discretion and without any notice. Changes to our Terms become effective on the date they are posted.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
