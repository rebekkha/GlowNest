import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';

const FeaturedProducts: React.FC = () => {
  const { products } = useStore();
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="px-6 py-16 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-theme-text mb-2">Bestsellers</h2>
          <p className="text-theme-text-light text-sm">The crowd favourites. Tried, loved, and reordered.</p>
        </div>
        <Link to="/category/women" className="hidden md:flex items-center gap-2 text-theme-primary font-semibold hover:text-theme-text transition-colors group">
          View all
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="glass-card overflow-hidden group border border-theme-text/5 hover:border-theme-primary/20 transition-all"
          >
            <div className="relative aspect-square overflow-hidden bg-theme-text/5">
              <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 mix-blend-luminosity opacity-80 group-hover:opacity-100" />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-gradient-to-r from-theme-primary to-theme-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  {product.badge}
                </span>
              )}
              <div className="absolute top-3 right-3 bg-theme-bg/80 backdrop-blur px-2 py-1 rounded-full text-theme-primary text-sm font-bold border border-theme-text/10">
                ₹{product.price}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-theme-text font-heading font-bold text-base mb-1 line-clamp-1 group-hover:text-theme-primary transition-colors">{product.name}</h3>
              <p className="text-theme-text-light text-xs mb-3 line-clamp-2">{product.description}</p>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} className={j < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-theme-text/20"} />
                  ))}
                </div>
                <span className="text-theme-text-light text-xs">({product.reviewCount.toLocaleString()})</span>
              </div>
              <Link
                to={`/category/${product.category}`}
                className="mt-3 w-full py-2.5 block text-center text-sm font-semibold bg-theme-text/5 hover:bg-theme-primary border border-theme-text/10 hover:border-theme-primary text-theme-text rounded-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(var(--color-primary),0.3)]"
              >
                View Product
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
