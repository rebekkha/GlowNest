import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Sparkles, Droplets } from 'lucide-react';

const ScienceOfGlow: React.FC = () => {
  return (
    <section className="px-6 py-16 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-theme-text mb-4">The Science of GlowNest</h2>
        <p className="text-theme-text-light max-w-2xl mx-auto">
          Every GlowNest formula undergoes rigorous testing with dermatologists and is manufactured in ISO-certified labs — because your skin deserves nothing less.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Leaf, title: "100% Natural", desc: "Pure, sustainably sourced ingredients — no parabens, sulfates, or synthetic fragrances. Ever.", accent: "from-green-400 to-emerald-500" },
          { icon: Sparkles, title: "Clinically Tested", desc: "Every formula is dermatologist-tested and proven effective in independent clinical trials.", accent: "from-theme-primary to-theme-secondary" },
          { icon: Droplets, title: "24-Hour Hydration", desc: "Advanced moisture-locking technology keeps your skin nourished and plump all day long.", accent: "from-blue-400 to-cyan-500" },
        ].map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ y: -6 }}
            className="glass-card p-8 flex flex-col items-center text-center border border-theme-text/5 hover:border-theme-primary/20 transition-colors"
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.accent} flex items-center justify-center mb-5 shadow-lg`}>
              <f.icon size={26} className="text-white" />
            </div>
            <h3 className="text-theme-text font-heading font-bold text-xl mb-3">{f.title}</h3>
            <p className="text-theme-text-light text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ScienceOfGlow;
