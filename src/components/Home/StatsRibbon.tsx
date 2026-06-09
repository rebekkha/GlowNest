import React from 'react';
import { motion } from 'framer-motion';
import { STATS } from '../../data/homeData';

const StatsRibbon: React.FC = () => {
  return (
    <section className="relative z-10 px-6 -mt-8 mb-16">
      <div className="max-w-5xl mx-auto">
        <div className="glass-card border border-theme-text/10 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-secondary mb-1">{s.value}</div>
              <div className="text-theme-text-light text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsRibbon;
