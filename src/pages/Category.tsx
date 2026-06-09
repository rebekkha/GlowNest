import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Star, Filter, Heart, ArrowRight } from 'lucide-react';

const CATEGORY_META: Record<string, { title: string, desc: string, bg: string }> = {
  women: { title: "Women's Collection", desc: "Luxurious, effective formulations designed for daily radiance and long-term skin health.", bg: "from-rose-500/10 to-pink-500/5" },
  men: { title: "Men's Essentials", desc: "No-nonsense, powerful skincare engineered to tackle oil, sweat, and environmental stress.", bg: "from-blue-500/10 to-cyan-500/5" },
  fresh: { title: "Fresh Clear", desc: "Gentle, purifying products that keep your skin clean, calm, and perfectly balanced.", bg: "from-emerald-500/10 to-teal-500/5" },
  clay: { title: "Purifying Clay Masks", desc: "Deep-cleaning, detoxifying masks that draw out impurities and refine pores.", bg: "from-amber-500/10 to-orange-500/5" },
  moisturizer: { title: "Deep Moisturizers", desc: "Rich, barrier-repairing hydration for plump, supple, and protected skin.", bg: "from-indigo-500/10 to-violet-500/5" },
};

const Category: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const { getProductsByCategory, addOrder, toggleWishlist, isWishlisted } = useStore();
  const [filter, setFilter] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const rawProducts = useMemo(() => getProductsByCategory(type || ''), [type, getProductsByCategory]);
  const products = useMemo(() => {
    if (filter === 'all') return rawProducts;
    return rawProducts.filter(p => p.skin.includes(filter.toLowerCase()));
  }, [rawProducts, filter]);

  const meta = CATEGORY_META[type || ''] || { title: "Collection", desc: "Discover our premium formulations.", bg: "from-theme-primary/10 to-transparent" };

  const handleAddToCart = (product: any) => {
    addOrder({
      productId: product.id,
      productName: product.name,
      price: product.price,
      user: 'Current User', // Mock
      phone: '9876543210',
      address: 'Home Address',
      rating: 0,
      deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    });
    setToastMsg(`Added ${product.name} to bag`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const skinTypes = ['All', 'Dry', 'Oily', 'Sensitive', 'Normal'];

  return (
    <div className="pt-24 min-h-screen px-4 md:px-8 max-w-7xl mx-auto pb-20">
      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 glass-card px-6 py-3 border border-theme-primary/30 text-theme-text font-medium flex items-center gap-3 shadow-[0_10px_40px_rgba(255,92,141,0.2)]"
          >
            <div className="w-8 h-8 rounded-full bg-theme-primary/20 flex items-center justify-center text-theme-primary">
              <ShoppingBag size={16} />
            </div>
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className={`relative w-full rounded-[2rem] overflow-hidden mb-12 p-8 md:p-16 text-center bg-gradient-to-br ${meta.bg} border border-theme-text/5`}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-theme-text via-theme-text to-theme-primary mb-4"
        >
          {meta.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-theme-text-light max-w-2xl mx-auto md:text-lg"
        >
          {meta.desc}
        </motion.p>
      </div>

      {/* Filters & Count */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-2 text-theme-text/60 text-sm font-medium">
          <Filter size={16} />
          <span>Showing {products.length} Products</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {skinTypes.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type.toLowerCase())}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === type.toLowerCase()
                  ? 'bg-theme-primary text-white shadow-[0_0_15px_rgba(255,92,141,0.4)]'
                  : 'bg-theme-text/5 text-theme-text hover:bg-theme-text/10'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <div className="text-center py-20 glass-card">
          <p className="text-theme-text/50 text-lg">No products found for this skin type in this category.</p>
          <button onClick={() => setFilter('all')} className="mt-4 text-theme-primary font-semibold hover:underline">
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, i) => {
            const wishlisted = isWishlisted(product.id);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card group flex flex-col overflow-hidden border border-theme-text/5 hover:border-theme-primary/30 transition-all duration-300"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-theme-bg">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-luminosity opacity-80 group-hover:opacity-100" 
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 bg-gradient-to-r from-theme-primary to-theme-secondary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
                      {product.badge}
                    </span>
                  )}
                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-theme-bg/80 backdrop-blur border border-theme-text/10 flex items-center justify-center text-theme-text hover:text-theme-primary transition-colors z-10 group/btn shadow-lg"
                  >
                    <Heart size={18} className={`${wishlisted ? 'fill-theme-primary text-theme-primary' : ''} group-hover/btn:scale-110 transition-transform`} />
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-transparent to-transparent opacity-60" />
                </div>

                <div className="p-5 flex-1 flex flex-col relative">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-heading font-bold text-lg text-theme-text leading-tight group-hover:text-theme-primary transition-colors pr-2">
                      {product.name}
                    </h3>
                    <span className="font-bold text-theme-text bg-theme-text/5 px-2 py-1 rounded-md text-sm shrink-0">
                      ₹{product.price}
                    </span>
                  </div>

                  <p className="text-theme-text-light text-sm line-clamp-2 mb-4 flex-1">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-1 mb-5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className={j < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-theme-text/20"} />
                    ))}
                    <span className="text-xs text-theme-text-light ml-1">({product.reviewCount})</span>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Link to={`/product/${product.id}`} className="flex-1 py-3 text-center text-sm font-semibold rounded-xl bg-theme-text/5 hover:bg-theme-text/10 text-theme-text transition-colors border border-theme-text/10">
                      Details
                    </Link>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="w-12 h-12 shrink-0 rounded-xl bg-theme-primary hover:bg-theme-secondary text-white flex items-center justify-center transition-colors shadow-[0_0_15px_rgba(255,92,141,0.3)] hover:shadow-[0_0_20px_rgba(255,92,141,0.5)]"
                    >
                      <ShoppingBag size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Category;