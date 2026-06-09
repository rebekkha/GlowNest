import React from 'react';
import { motion } from 'framer-motion';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-theme-secondary/20 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      
      <div className="max-w-4xl mx-auto glass-card p-8 md:p-14 border border-theme-text/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-theme-text mb-6">Privacy Policy</h1>
          <p className="text-theme-primary mb-12 uppercase tracking-widest text-sm font-semibold">Last Updated: June 2026</p>
          
          <div className="space-y-8 text-theme-text-light leading-relaxed">
            <section>
              <h2 className="text-2xl text-theme-text font-heading font-semibold mb-4">1. Information We Collect</h2>
              <p>When you visit GlowNest, we may collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support.</p>
            </section>
            
            <section>
              <h2 className="text-2xl text-theme-text font-heading font-semibold mb-4">2. AI Skin Scanner Data</h2>
              <p>If you choose to use our Glow AI Scanner, please note that all camera processing is done locally on your device. We do not store, save, or transmit your facial images to our servers. Your privacy and security are our highest priority.</p>
            </section>
            
            <section>
              <h2 className="text-2xl text-theme-text font-heading font-semibold mb-4">3. How We Use Your Data</h2>
              <p>We use your personal information to provide our services to you, which includes: offering products for sale, processing payments, shipping and fulfillment of your order, and keeping you up to date on new products, services, and offers.</p>
            </section>

            <section>
              <h2 className="text-2xl text-theme-text font-heading font-semibold mb-4">4. Sharing Personal Information</h2>
              <p>We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you. For example, we use Firebase for authentication and database management.</p>
            </section>

            <section>
              <h2 className="text-2xl text-theme-text font-heading font-semibold mb-4">5. Contact Us</h2>
              <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at privacy@glownest.com.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
