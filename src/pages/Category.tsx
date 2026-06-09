import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';

const TITLES: Record<string, string> = {
  women: "Women's Skin Solutions",
  men: "Men's Skin Solutions",
  fresh: "Fresh Clear Selection",
  moisturizer: "Moisturizer Collection",
  clay: "Clay Mask Collection",
};

const Category: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const { getProductsBySkinType, addOrder } = useStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({ user: '', phone: '', address: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  
  const typeMap: Record<string, string> = {
    women: "sensitive normal dry oily",
    men: "normal oily",
    fresh: "normal sensitive",
    moisturizer: "dry sensitive",
    clay: "oily normal"
  };

  const skinQuery = type && typeMap[type] ? typeMap[type] : (type || "normal");
  const products = getProductsBySkinType(skinQuery.split(' ')[0]);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProduct && formData.user && formData.phone && formData.address) {
      addOrder({
        productName: selectedProduct.name,
        price: selectedProduct.price,
        user: formData.user,
        phone: formData.phone,
        address: formData.address,
        rating: 0,
        deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toDateString(),
      });
      setShowSuccess(true);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, bounce: 0.4, duration: 0.8 } }
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6"
        >
          <div>
            <Link to="/" className="inline-flex items-center text-theme-primary hover:text-theme-primary transition-colors mb-4 group">
              <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Collections
            </Link>
            <h2 className="text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 font-heading font-bold">
              {type ? TITLES[type] || "Skin Solutions" : "Skin Solutions"}
            </h2>
          </div>
          <div className="h-px md:h-12 w-full md:w-px bg-theme-text/10 hidden md:block"></div>
          <p className="text-theme-text-light max-w-sm text-sm">
            Curated specifically for your skin type. Our premium formulas deliver visible results and lasting radiance.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {products.map(p => (
            <motion.div key={p.id} variants={cardVariants} className="glass-card flex flex-col group relative">
              <div className="absolute inset-0 bg-gradient-to-b from-theme-primary/0 to-theme-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>
              
              <div className="p-4 z-10">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-theme-bg/50 border border-theme-text/5">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute top-4 right-4 bg-theme-bg/80 backdrop-blur-md px-3 py-1 rounded-full border border-theme-text/10 text-theme-primary text-sm font-semibold">
                    ₹{p.price}
                  </div>
                </div>
                
                <h3 className="text-xl text-theme-text font-heading font-bold mb-2 group-hover:text-theme-primary transition-colors">{p.name}</h3>
                <p className="text-theme-text-light text-sm mb-6 line-clamp-2">Premium Selection for optimal hydration and glow.</p>
                
                <div className="bg-theme-bg/40 rounded-xl p-4 mb-6 border border-theme-text/5">
                  <span className="text-theme-text/80 text-xs font-semibold uppercase tracking-wider mb-3 block">Regimen Steps</span>
                  <ul className="space-y-2">
                    {p.steps.slice(0,3).map((step, idx) => (
                      <li key={idx} className="text-theme-text-light text-xs flex items-start">
                        <ChevronRight size={14} className="text-theme-primary mr-1 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 pt-0 mt-auto z-10">
                <button 
                  onClick={() => { setSelectedProduct(p); setShowSuccess(false); }}
                  className="w-full py-3.5 bg-theme-text/5 hover:bg-theme-primary border border-theme-text/10 hover:border-theme-primary text-theme-text font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,92,141,0.4)]"
                >
                  Acquire Now
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Order Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[1000] p-4"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                className="bg-theme-bg border border-theme-text/10 rounded-[30px] p-8 max-w-md w-full shadow-[0_0_50px_rgba(255,92,141,0.15)] relative overflow-hidden"
              >
                {/* Modal Glow */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-theme-primary/20 rounded-full blur-[80px] pointer-events-none"></div>
                
                {!showSuccess ? (
                  <form onSubmit={handleOrderSubmit} className="flex flex-col gap-5 relative z-10">
                    <div className="text-center mb-4">
                      <h3 className="text-2xl text-theme-text font-heading font-bold mb-2">Complete Order</h3>
                      <p className="text-theme-primary">Selected: {selectedProduct.name}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        required
                        className="glass-input w-full p-4"
                        value={formData.user} onChange={e => setFormData({...formData, user: e.target.value})}
                      />
                      <input 
                        type="tel" 
                        placeholder="Phone Number" 
                        required
                        className="glass-input w-full p-4"
                        value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                      <textarea 
                        placeholder="Full Shipping Address" 
                        required rows={3}
                        className="glass-input w-full p-4 resize-none"
                        value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}
                      />
                    </div>
                    
                    <div className="flex gap-4 mt-4">
                      <button type="button" onClick={() => setSelectedProduct(null)} className="flex-1 py-4 text-theme-text-light hover:text-theme-text transition-colors">Cancel</button>
                      <button type="submit" className="flex-1 py-4 btn-primary">Confirm Purchase</button>
                    </div>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-10 relative z-10"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.6, delay: 0.2 }}
                      className="flex justify-center mb-6"
                    >
                      <CheckCircle2 size={80} className="text-theme-primary" />
                    </motion.div>
                    <h3 className="text-3xl text-theme-text font-heading font-bold mb-4">Order Confirmed!</h3>
                    <p className="text-theme-text-light mb-8">Your premium skincare will arrive soon.</p>
                    <button onClick={() => setSelectedProduct(null)} className="w-full py-4 btn-primary">Continue Browsing</button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Category;
