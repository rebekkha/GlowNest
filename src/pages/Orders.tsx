import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { motion, Variants } from 'framer-motion';
import { Package, Star, Calendar, MapPin, Phone, User, ArrowLeft } from 'lucide-react';

const Orders: React.FC = () => {
  const { orders } = useStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-theme-primary/20 rounded-full blur-[150px] pointer-events-none z-[-1]"></div>
      
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 font-heading font-bold mb-2">
              Royal Order Ledger
            </h2>
            <p className="text-theme-text-light text-sm">Your premium selections, curated and ready.</p>
          </div>
          
          <Link to="/" className="hidden md:flex items-center gap-2 text-theme-primary hover:text-theme-text transition-colors border border-theme-text/10 px-5 py-2.5 rounded-full hover:bg-theme-text/5">
            <ArrowLeft size={16} />
            Back to Gallery
          </Link>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {orders.length === 0 ? (
            <motion.div variants={itemVariants} className="glass-card p-16 text-center border border-theme-text/10 flex flex-col items-center justify-center">
              <Package size={64} className="text-theme-text/20 mb-6" />
              <h3 className="text-2xl text-theme-text font-heading font-semibold mb-2">No Imperial Records Found</h3>
              <p className="text-theme-text-light mb-8 max-w-sm mx-auto">You haven't acquired any premium skincare yet. Discover your glow today.</p>
              <Link to="/" className="btn-primary py-3 px-8 inline-block">
                Explore Collections
              </Link>
            </motion.div>
          ) : (
            [...orders].reverse().map(o => (
              <motion.div 
                key={o.id} 
                variants={itemVariants}
                className="glass-card p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden group"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-theme-primary to-theme-secondary"></div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-2xl text-theme-text font-heading font-bold">{o.productName}</h4>
                    <span className="px-3 py-1 bg-theme-primary/20 border border-theme-primary/50 text-theme-primary text-xs rounded-full uppercase tracking-widest font-semibold flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-primary animate-pulse"></div>
                      Confirmed
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 text-sm">
                    <div className="flex items-center gap-2 text-theme-text-light">
                      <User size={14} className="text-theme-primary" />
                      <span className="text-theme-text/80">{o.user}</span>
                    </div>
                    <div className="flex items-center gap-2 text-theme-text-light">
                      <Phone size={14} className="text-theme-primary" />
                      <span className="text-theme-text/80">{o.phone}</span>
                    </div>
                    <div className="flex items-start gap-2 text-theme-text-light md:col-span-2 mt-1">
                      <MapPin size={14} className="text-theme-primary shrink-0 mt-1" />
                      <span className="text-theme-text/80">{o.address}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t border-theme-text/10 md:border-t-0 mt-2 md:mt-0 gap-4">
                  <div className="flex text-yellow-400 gap-1 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <div className="flex items-center gap-2 text-sm bg-theme-text/5 border border-theme-text/10 px-4 py-2 rounded-xl">
                    <Calendar size={14} className="text-theme-primary" />
                    <span className="text-theme-text-light">Expected: <span className="text-theme-text font-medium">{o.deliveryDate}</span></span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {orders.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center md:hidden"
          >
            <Link to="/" className="inline-block px-10 py-4 border border-theme-text/20 text-theme-text rounded-full font-bold shadow-md hover:bg-theme-text/5 transition-colors">
              Return to Gallery
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Orders;
