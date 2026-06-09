import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, ScanFace } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const { orders } = useStore();
  const location = useLocation();

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass-header rounded-full px-6 py-3 flex justify-between items-center"
      >
        <Link to="/" className="text-decoration-none group">
          <h1 className="text-2xl font-bold text-theme-text m-0 tracking-tighter">
            Glow<span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-secondary group-hover:from-primary-light group-hover:to-theme-primary transition-all duration-500">Nest</span>
          </h1>
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <Link to="/scan">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className={`w-10 h-10 sm:w-11 sm:h-11 border rounded-full flex items-center justify-center transition-all relative ${location.pathname === '/scan' ? 'bg-theme-primary/20 border-theme-primary text-theme-primary shadow-[0_0_15px_rgba(255,92,141,0.5)]' : 'bg-theme-text/5 border-theme-text/10 text-theme-text/80 hover:text-theme-text hover:bg-theme-text/10 hover:shadow-[0_0_15px_rgba(255,92,141,0.5)] hover:border-theme-primary/50'}`}
              title="AI Skin Scanner"
            >
              <ScanFace size={20} />
            </motion.div>
          </Link>

          <Link to="/login">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className={`w-10 h-10 sm:w-11 sm:h-11 border rounded-full flex items-center justify-center transition-all relative ${location.pathname === '/login' ? 'bg-theme-primary/20 border-theme-primary text-theme-primary shadow-[0_0_15px_rgba(255,92,141,0.5)]' : 'bg-theme-text/5 border-theme-text/10 text-theme-text/80 hover:text-theme-text hover:bg-theme-text/10 hover:shadow-[0_0_15px_rgba(255,92,141,0.5)] hover:border-theme-primary/50'}`}
              title="Login / Profile"
            >
              <User size={20} />
            </motion.div>
          </Link>

          <Link to="/orders">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-10 h-10 sm:w-11 sm:h-11 border rounded-full flex items-center justify-center transition-all relative ${location.pathname === '/orders' ? 'bg-theme-primary/20 border-theme-primary text-theme-primary shadow-[0_0_15px_rgba(255,92,141,0.5)]' : 'bg-theme-text/5 border-theme-text/10 text-theme-text/80 hover:text-theme-text hover:bg-theme-text/10 hover:shadow-[0_0_15px_rgba(255,92,141,0.5)] hover:border-theme-primary/50'}`}
              title="View Orders"
            >
              <ShoppingBag size={20} />
              {orders.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-gradient-to-r from-theme-primary to-theme-secondary text-theme-text text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(255,92,141,0.8)] border border-theme-bg"
                >
                  {orders.length}
                </motion.span>
              )}
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
