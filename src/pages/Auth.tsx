import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth delay
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-theme-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-theme-secondary/20 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card p-8 md:p-10 border border-theme-primary/20 shadow-2xl relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-theme-primary/20 to-transparent rounded-bl-full pointer-events-none" />

          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-theme-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-theme-primary">
              <Sparkles size={24} />
            </div>
            <h1 className="text-3xl font-heading font-bold text-theme-text mb-2">
              {isLogin ? 'Welcome Back' : 'Join GlowNest'}
            </h1>
            <p className="text-theme-text-light text-sm">
              {isLogin ? 'Enter your details to access your premium skincare journey.' : 'Create an account to track orders and save your favorites.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1"
                >
                  <label className="text-xs font-semibold text-theme-text-light ml-1">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text/40 group-focus-within:text-theme-primary transition-colors" size={18} />
                    <input 
                      type="text" 
                      required={!isLogin}
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="Jane Doe"
                      className="w-full pl-11 pr-4 py-3.5 bg-theme-text/5 border border-theme-text/10 rounded-xl outline-none focus:border-theme-primary/50 focus:bg-theme-bg transition-all text-sm text-theme-text"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-theme-text-light ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text/40 group-focus-within:text-theme-primary transition-colors" size={18} />
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  placeholder="jane@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-theme-text/5 border border-theme-text/10 rounded-xl outline-none focus:border-theme-primary/50 focus:bg-theme-bg transition-all text-sm text-theme-text"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-semibold text-theme-text-light">Password</label>
                {isLogin && <a href="#" className="text-xs text-theme-primary font-medium hover:underline">Forgot?</a>}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text/40 group-focus-within:text-theme-primary transition-colors" size={18} />
                <input 
                  type="password" 
                  required
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 bg-theme-text/5 border border-theme-text/10 rounded-xl outline-none focus:border-theme-primary/50 focus:bg-theme-bg transition-all text-sm text-theme-text"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 mt-6 btn-primary rounded-xl font-bold flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-theme-text/10 text-center">
            <p className="text-sm text-theme-text-light">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-theme-primary font-bold hover:underline"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
