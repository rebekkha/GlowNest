import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { Package, Clock, CheckCircle2, Truck, XCircle, Search, ChevronRight, X } from 'lucide-react';

const Orders: React.FC = () => {
  const { orders, cancelOrder } = useStore();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [cancelId, setCancelId] = useState<string | null>(null);

  const filteredOrders = orders.filter(o => {
    const matchesFilter = filter === 'all' || o.status === filter;
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) || 
                          o.productName.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  }).sort((a, b) => new Date(b.datePlaced).getTime() - new Date(a.datePlaced).getTime());

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'confirmed': return { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', label: 'Confirmed' };
      case 'processing': return { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', label: 'Processing' };
      case 'shipped': return { icon: Truck, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20', label: 'Shipped' };
      case 'delivered': return { icon: Package, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20', label: 'Delivered' };
      default: return { icon: Package, color: 'text-theme-text-light', bg: 'bg-theme-text/5', border: 'border-theme-text/10', label: status };
    }
  };

  return (
    <div className="pt-24 min-h-screen px-4 md:px-8 max-w-6xl mx-auto pb-20">
      
      {/* Header */}
      <div className="relative w-full rounded-[2rem] overflow-hidden mb-10 p-8 md:p-12 bg-gradient-to-br from-theme-primary/10 to-theme-secondary/5 border border-theme-text/5 text-center">
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-theme-text via-theme-text to-theme-primary mb-3">
          Your Orders
        </h1>
        <p className="text-theme-text-light max-w-xl mx-auto">Track, manage, and review your GlowNest purchases.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {['all', 'confirmed', 'processing', 'shipped', 'delivered'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                filter === f 
                  ? 'bg-theme-primary text-white shadow-[0_0_15px_rgba(255,92,141,0.3)]' 
                  : 'bg-theme-text/5 text-theme-text hover:bg-theme-text/10'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text/40" />
          <input 
            type="text" 
            placeholder="Search by ID or product..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-theme-text/5 border border-theme-text/10 rounded-xl text-sm focus:border-theme-primary/50 outline-none text-theme-text"
          />
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center py-20 glass-card border border-theme-text/5"
        >
          <div className="w-20 h-20 bg-theme-text/5 rounded-full flex items-center justify-center mx-auto mb-6 text-theme-text/30">
            <Package size={32} />
          </div>
          <h3 className="text-xl font-heading font-bold text-theme-text mb-2">No orders found</h3>
          <p className="text-theme-text-light mb-6 text-sm max-w-md mx-auto">
            {search || filter !== 'all' 
              ? "We couldn't find any orders matching your current filters." 
              : "You haven't placed any orders yet. Start your skincare journey today!"}
          </p>
          <Link to="/category/women" className="btn-primary px-8 py-3 inline-flex items-center gap-2">
            Start Shopping <ChevronRight size={16} />
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredOrders.map(order => {
              const conf = getStatusConfig(order.status);
              const ConfIcon = conf.icon;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={order.id}
                  className="glass-card p-5 md:p-6 border border-theme-text/5 flex flex-col md:flex-row gap-6 md:items-center relative group"
                >
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between md:justify-start gap-4 mb-3">
                      <span className="font-mono text-xs font-bold text-theme-text/50 bg-theme-text/5 px-2.5 py-1 rounded-md">
                        {order.id}
                      </span>
                      <span className="text-xs text-theme-text-light">
                        {new Date(order.datePlaced).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="text-lg font-heading font-bold text-theme-text mb-1">{order.productName}</h3>
                    <div className="text-theme-primary font-bold">₹{order.price}</div>
                  </div>

                  {/* Status & Delivery */}
                  <div className="flex-1 flex flex-col md:items-end gap-3">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${conf.bg} ${conf.border} ${conf.color} text-sm font-semibold`}>
                      <ConfIcon size={16} />
                      {conf.label}
                    </div>
                    {order.status !== 'delivered' && (
                      <div className="text-xs text-theme-text-light flex items-center gap-1.5">
                        <Truck size={14} className="text-theme-text/40" />
                        Est. Delivery: <span className="text-theme-text font-medium">{new Date(order.deliveryDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="md:ml-4 flex gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-theme-text/5">
                    {order.productId && (
                      <Link to={`/product/${order.productId}`} className="flex-1 md:flex-none px-4 py-2.5 bg-theme-text/5 hover:bg-theme-text/10 text-theme-text text-sm font-semibold rounded-xl text-center transition-colors">
                        Buy Again
                      </Link>
                    )}
                    {(order.status === 'confirmed' || order.status === 'processing') && (
                      <button 
                        onClick={() => setCancelId(order.id)}
                        className="flex-1 md:flex-none px-4 py-2.5 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white text-sm font-semibold rounded-xl text-center transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Cancel Modal */}
      <AnimatePresence>
        {cancelId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setCancelId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card relative z-10 w-full max-w-md p-8 border border-theme-text/10 shadow-2xl"
            >
              <button onClick={() => setCancelId(null)} className="absolute top-4 right-4 text-theme-text/40 hover:text-theme-text">
                <X size={20} />
              </button>
              
              <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-6 mx-auto">
                <XCircle size={32} />
              </div>
              
              <h3 className="text-2xl font-heading font-bold text-theme-text text-center mb-3">Cancel Order?</h3>
              <p className="text-theme-text-light text-center mb-8 text-sm">
                Are you sure you want to cancel order <span className="font-mono text-theme-text font-bold">{cancelId}</span>? This action cannot be undone.
              </p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setCancelId(null)}
                  className="flex-1 py-3 bg-theme-text/5 hover:bg-theme-text/10 text-theme-text font-semibold rounded-xl transition-colors"
                >
                  Keep Order
                </button>
                <button 
                  onClick={() => {
                    cancelOrder(cancelId);
                    setCancelId(null);
                  }}
                  className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-red-500/30"
                >
                  Yes, Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Orders;
