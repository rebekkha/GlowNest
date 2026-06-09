import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../../data/homeData';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-theme-text mb-3">What Our Customers Say</h2>
        <p className="text-theme-text-light max-w-lg mx-auto text-sm">Real reviews from real people. No filters.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-6 border border-theme-text/5 hover:border-theme-primary/20 transition-all flex flex-col"
          >
            <div className="flex gap-0.5 mb-4">
              {[...Array(t.rating)].map((_, j) => (
                <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-theme-text-light text-sm leading-relaxed flex-1 mb-5 italic">"{t.text}"</p>
            <div className="flex items-center gap-3 pt-4 border-t border-theme-text/10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-theme-primary to-theme-secondary flex items-center justify-center text-white font-bold text-sm shrink-0">
                {t.avatar}
              </div>
              <div>
                <div className="text-theme-text font-semibold text-sm">{t.name}</div>
                <div className="text-theme-text-light text-xs">{t.location} · {t.product}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
