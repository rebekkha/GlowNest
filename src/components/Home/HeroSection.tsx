import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Sparkles, Search, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../data/homeData';

const HeroSection: React.FC = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredCats = searchQuery
    ? CATEGORIES.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : CATEGORIES;

  const handleSearchClick = (type: string) => {
    navigate(`/category/${type}`);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants: Variants = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col text-center px-4 overflow-hidden pt-28 pb-32">
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 -z-20"
      >
        <img
          src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=1600&q=80"
          alt="GlowNest Premium Skincare"
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-theme-bg/60 via-theme-bg/70 to-theme-bg" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl w-full flex flex-col items-center z-10 m-auto"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card border-theme-primary/30 mb-8 shadow-[0_0_20px_rgba(var(--color-primary),0.2)]">
          <Sparkles size={16} className="text-theme-primary" />
          <span className="text-sm font-semibold tracking-widest text-theme-primary uppercase">Premium Natural Skincare — Est. 2021</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl mb-6 text-theme-text font-heading font-bold leading-[1.05] tracking-tight">
          Reveal Your<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-text via-theme-primary to-theme-secondary">
            Radiant Glow
          </span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg md:text-xl text-theme-text-light mb-10 max-w-2xl leading-relaxed">
          36 premium formulas crafted from pure, natural ingredients. Curated for every skin type — because flawless skin isn't a luxury, it's a right.
        </motion.p>

        {/* Search Bar */}
        <motion.div variants={itemVariants} className="relative w-full max-w-xl mx-auto group mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-theme-primary/30 to-theme-secondary/30 rounded-2xl blur-xl opacity-70 group-hover:blur-2xl transition-all duration-300" />
          <div className="relative flex items-center bg-theme-bg/80 backdrop-blur-xl border border-theme-text/10 rounded-2xl p-2 transition-all focus-within:border-theme-primary/50">
            <Search className="text-theme-text/40 ml-4 mr-2 shrink-0" size={22} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search for your skin type or product..."
              className="w-full py-3 px-2 bg-transparent text-theme-text placeholder:text-theme-text/40 outline-none text-base"
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
          </div>
          {showSuggestions && (
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-[110%] left-0 w-full glass-card p-2 m-0 text-left z-20 border border-theme-primary/30"
            >
              {filteredCats.map(c => (
                <li
                  key={c.id}
                  onClick={() => handleSearchClick(c.id)}
                  className="px-4 py-3 cursor-pointer rounded-xl hover:bg-theme-text/5 hover:text-theme-primary text-theme-text/90 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-theme-primary/10 flex items-center justify-center">
                      <Sparkles size={14} className="text-theme-primary" />
                    </div>
                    <span className="font-medium">{c.name}</span>
                  </div>
                  <span className="text-xs text-theme-text/40 bg-theme-text/5 px-2 py-0.5 rounded-full">{c.count} products</span>
                </li>
              ))}
            </motion.ul>
          )}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
          <Link to="/scan" className="btn-primary px-8 py-4 flex items-center gap-2 group">
            <Sparkles size={18} />
            Scan My Skin Type
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/category/women" className="px-8 py-4 bg-theme-text/5 border border-theme-text/15 text-theme-text font-semibold rounded-xl hover:bg-theme-text/10 transition-all">
            Explore Collections
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-theme-text/30"
      >
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-px h-8 bg-gradient-to-b from-theme-primary/50 to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
