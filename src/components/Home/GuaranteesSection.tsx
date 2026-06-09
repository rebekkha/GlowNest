import React from 'react';
import { motion } from 'framer-motion';
import { GUARANTEES } from '../../data/homeData';

const GuaranteesSection: React.FC = () => {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <div className="glass-card border border-theme-text/10 p-8 md:p-12">
        <h2 className="text-2xl font-heading font-bold text-theme-text text-center mb-10">The GlowNest Promise</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {GUARANTEES.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-theme-primary/10 border border-theme-primary/20 flex items-center justify-center text-theme-primary shadow-[0_0_15px_rgba(var(--color-primary),0.15)]">
                <g.icon size={24} />
              </div>
              <div>
                <h3 className="text-theme-text font-semibold mb-1">{g.title}</h3>
                <p className="text-theme-text-light text-xs">{g.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuaranteesSection;
