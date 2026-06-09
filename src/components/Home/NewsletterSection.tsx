import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section className="py-16 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card border border-theme-primary/20 p-10 md:p-14 relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-theme-primary/10 rounded-full blur-[80px] pointer-events-none" />
          <Sparkles size={32} className="text-theme-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-theme-text mb-3">Get Exclusive GlowNest Tips</h2>
          <p className="text-theme-text-light mb-8 text-sm">Subscribe for skincare rituals, early access to new launches, and members-only discounts.</p>
          {subscribed ? (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-theme-primary/20 flex items-center justify-center">
                <Sparkles size={24} className="text-theme-primary" />
              </div>
              <p className="text-theme-primary font-semibold">You're on the list! Welcome to GlowNest. ✨</p>
            </motion.div>
          ) : (
            <form
              onSubmit={e => { e.preventDefault(); if (email.includes('@')) setSubscribed(true); }}
              className="flex gap-3 flex-col sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 glass-input p-4 text-sm"
              />
              <button type="submit" className="btn-primary px-6 py-4 shrink-0 flex items-center gap-2">
                Subscribe <ArrowRight size={16} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
