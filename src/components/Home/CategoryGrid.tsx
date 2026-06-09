import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/homeData';

const CategoryGrid: React.FC = () => {
  return (
    <section className="py-16 px-6">
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-theme-text mb-4">Explore Collections</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-theme-primary to-theme-secondary mx-auto rounded-full mb-4" />
        <p className="text-theme-text-light max-w-lg mx-auto">Five distinct collections, each expertly formulated for a specific skin need. Find yours.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
          >
            <Link to={`/category/${cat.id}`} className="relative rounded-[28px] overflow-hidden group aspect-[4/5] block border border-theme-text/10 shadow-2xl">
              <img src={cat.img} alt={cat.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" />
              <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute top-4 right-4 bg-theme-bg/70 backdrop-blur text-theme-text text-xs font-semibold px-3 py-1.5 rounded-full border border-theme-text/10">
                {cat.count} Products
              </div>
              <div className="absolute bottom-0 left-0 w-full p-7 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-10 h-0.5 bg-theme-primary mb-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 shadow-[0_0_10px_rgba(var(--color-primary),0.8)]" />
                <h3 className="text-2xl font-heading font-bold text-theme-text mb-2">{cat.name}</h3>
                <p className="text-theme-text-light text-sm line-clamp-2 mb-4">{cat.desc}</p>
                <span className="text-theme-primary text-sm font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  Shop Now <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
