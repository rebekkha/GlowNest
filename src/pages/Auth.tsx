import React, { useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-theme-primary/20 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-theme-secondary/20 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-card w-full max-w-lg p-10 md:p-14 relative z-10 border border-theme-text/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-theme-text/5 border border-theme-text/10 flex items-center justify-center text-theme-primary shadow-[0_0_20px_rgba(255,92,141,0.2)]">
            <Sparkles size={32} />
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-heading text-center mb-2 text-theme-text font-bold">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-center text-theme-text-light mb-8">
          {isLogin ? 'Sign in to access your personalized glow.' : 'Join GlowNest for premium skincare.'}
        </p>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl text-sm mb-6 text-center"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleAuth} className="flex flex-col gap-5">
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              className="glass-input w-full p-4"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="glass-input w-full p-4"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="w-full py-4 btn-primary mt-4">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-theme-text/10"></div>
          <span className="px-4 text-theme-text-light text-sm uppercase tracking-wider font-semibold">Or</span>
          <div className="flex-1 h-px bg-theme-text/10"></div>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          className="w-full py-4 bg-theme-text/5 border border-theme-text/10 text-theme-text font-medium rounded-xl hover:bg-theme-text/10 transition-all flex items-center justify-center gap-3 group"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Continue with Google
        </button>

        <p className="text-center mt-8 text-theme-text-light text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-theme-primary font-semibold hover:text-theme-text transition-colors"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
