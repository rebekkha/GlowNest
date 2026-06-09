import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { Search, Sparkles, Droplets, Leaf } from 'lucide-react';

const CATEGORIES = [
  { id: 'women', name: "Women's Essentials", img: "/womens.png", desc: "Tailored formulations for women's daily skincare needs." },
  { id: 'men', name: "Men's Collection", img: "/mens.png", desc: "Strong, effective skincare designed specifically for men." },
  { id: 'fresh', name: "Fresh Clear", img: "/fresh.png", desc: "Rose water and aloe vera for gentle daily cleansing." },
  { id: 'moisturizer', name: "Deep Moisturizer", img: "/moisturizer.png", desc: "All-day hydration powered by natural oils and vitamin E." },
  { id: 'clay', name: "Purifying Clay Mask", img: "/clay.png", desc: "Deep pore cleansing with green clay and tea tree extracts." },
];

const Home: React.FC = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = (type: string) => {
    navigate(`/category/${type}`);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <div className="pt-24">
      {/* Background Animated Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-theme-primary/20 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-theme-secondary/20 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 -z-20"
        >
          <img 
            src="/hero-bg.png" 
            alt="GlowNest Premium Skincare Dark Aesthetic" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-theme-bg/40 via-theme-bg/80 to-theme-bg" aria-hidden="true"></div>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl w-full flex flex-col items-center z-10"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-theme-primary/30 mb-8 shadow-[0_0_15px_rgba(255,92,141,0.2)]">
            <Sparkles size={16} className="text-theme-primary" />
            <span className="text-sm font-medium tracking-wide text-theme-primary uppercase">Premium Natural Skincare</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl mb-6 text-theme-text font-heading font-bold leading-tight">
            Reveal Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-theme-primary to-theme-secondary">
              Radiant Glow
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-theme-text-light mb-12 max-w-2xl">
            Discover our curated collection of premium facial products. Formulated with pure, natural ingredients to deliver a healthy, vibrant glow for every skin type.
          </motion.p>
          
          <motion.div variants={itemVariants} className="relative w-full max-w-xl mx-auto group">
            <div className="absolute inset-0 bg-gradient-to-r from-theme-primary/30 to-theme-secondary/30 rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl group-focus-within:blur-2xl opacity-70"></div>
            <div className="relative flex items-center bg-theme-bg/80 backdrop-blur-xl border border-theme-text/10 rounded-2xl p-2 transition-all duration-300 focus-within:border-theme-primary/50">
              <Search className="text-theme-text/40 ml-4 mr-2" size={24} />
              <input 
                type="text" 
                id="search-products"
                aria-label="Search for products"
                placeholder="Find your perfect product..." 
                className="w-full py-3 px-2 bg-transparent text-theme-text placeholder:text-theme-text/40 outline-none text-lg"
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
                {CATEGORIES.map(c => (
                  <li 
                    key={c.id}
                    onClick={() => handleSearchClick(c.id)}
                    className="px-6 py-3 cursor-pointer transition-colors hover:bg-theme-text/5 rounded-xl font-medium text-theme-text/90 hover:text-theme-primary flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-theme-text/10 flex items-center justify-center">
                      <Sparkles size={14} className="text-theme-primary" />
                    </div>
                    {c.name}
                  </li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative -mt-20 z-20 px-6 max-w-6xl mx-auto">
        <div className="glass-card p-8 md:p-12 text-center border-t border-theme-text/20">
          <h2 className="text-2xl font-heading text-theme-text mb-4">The Science of Glow</h2>
          <p className="max-w-3xl mx-auto mb-10 text-lg text-theme-text-light">
            Our products are carefully categorized for <strong>each skin type</strong>. Made from fresh, natural ingredients to clear damage and provide an instant glow.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Leaf, title: "100% Natural", desc: "Pure ingredients sourced from nature" },
              { icon: Sparkles, title: "Instant Glow", desc: "Visible results from the first use" },
              { icon: Droplets, title: "Deep Hydration", desc: "Moisture that lasts all day long" }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-theme-text/5 border border-theme-text/5 rounded-2xl p-6 flex flex-col items-center hover:bg-theme-text/10 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-theme-primary/20 flex items-center justify-center mb-4 text-theme-primary shadow-[0_0_15px_rgba(255,92,141,0.2)]">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-theme-text font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-theme-text-light text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-32 px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-theme-text font-heading font-bold mb-4">Explore Collections</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-theme-primary to-theme-secondary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {CATEGORIES.map((cat, i) => (
            <motion.div 
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link to={`/category/${cat.id}`} aria-label={`Explore ${cat.name} collection`} className="relative rounded-[30px] overflow-hidden group aspect-[4/5] block border border-theme-text/10 shadow-2xl">
                <img src={cat.img} alt={`${cat.name} Collection`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" aria-hidden="true"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="w-12 h-1 bg-theme-primary mb-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 shadow-[0_0_10px_rgba(255,92,141,0.8)]"></div>
                  <h3 className="text-3xl mb-2 text-theme-text font-heading font-bold">{cat.name}</h3>
                  <p className="text-theme-text-light text-sm line-clamp-2">{cat.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
