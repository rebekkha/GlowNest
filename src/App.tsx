/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import RegistrationForm from './components/RegistrationForm';
import SkinScanner from './components/SkinScanner';
import ProductRecommendations from './components/ProductRecommendations';
import { UserProfile, SkinType } from './types';

type Step = 'home' | 'onboarding' | 'scanner' | 'results';

export default function App() {
  const [step, setStep] = useState<Step>('home');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [skinResult, setSkinResult] = useState<SkinType | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [confetti, setConfetti] = useState<{ id: number; left: string; color: string; duration: string }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initial Confetti Pulse
    const colors = ['#FFB6C1', '#6B0617', '#D4AF37', '#FFE4E1'];
    const newConfetti = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: `${Math.random() * 2 + 2}s`
    }));
    setConfetti(newConfetti);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleRegistrationComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setStep('scanner');
    localStorage.setItem('glowNext_profile', JSON.stringify(profile));
  };

  const handleScannerResults = (type: SkinType) => {
    setSkinResult(type);
    setStep('results');
  };

  const goToScanner = () => setStep('scanner');
  const goToOnboarding = () => setStep('onboarding');

  const resetFlow = () => {
    setStep('scanner');
    setSkinResult(null);
  };

  return (
    <div className="min-h-screen selection:bg-[#D4AF37]/30 selection:text-white">
      {/* Confetti */}
      <AnimatePresence>
        {confetti.map((c) => (
          <div
            key={c.id}
            className="confetti"
            style={{
              left: c.left,
              backgroundColor: c.color,
              animationDuration: c.duration,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Welcome Popup */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md px-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-[2.5rem] text-center max-w-lg border-2 border-[#D4AF37]/30 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#D4AF37]/8 pointer-events-none" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">👑 Welcome to GlowNext Premium 👑</h2>
              <p className="text-gray-600 font-light mb-8 italic">Your premium skincare concierge awaits. Unlock curated rituals, exclusive diagnostics, and elite botanical treatments.</p>
              <button 
                onClick={() => setShowWelcome(false)}
                className="btn-premium px-12 py-4 text-xl shadow-lg shadow-[#D4AF37]/20\"
              >
                Unlock Premium
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="p-8 flex justify-between items-center relative z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center rotate-45 shadow-2xl shadow-[#D4AF37]/20">
            <Sparkles className="w-6 h-6 text-[#6B0617] -rotate-45" />
          </div>
          <h1 className="text-2xl font-display font-bold tracking-tighter text-white">GLOW<span className="text-[#D4AF37]">NEXT</span></h1>
        </div>

        <nav className="hidden md:flex gap-12 items-center">
          {['Collections', 'Analysis', 'Boutique', 'Heritage'].map((item) => (
            <a key={item} href="#" className="text-[10px] uppercase font-black tracking-widest text-white/40 hover:text-[#D4AF37] transition-colors">
              {item}
            </a>
          ))}
          {userProfile && (
            <div className="flex items-center gap-3 bg-white/5 pl-2 pr-4 py-1.5 rounded-full border border-white/10">
              <div className="w-6 h-6 rounded-full overflow-hidden border border-[#D4AF37]/30">
                {userProfile.profilePic ? (
                  <img src={userProfile.profilePic} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#6B0617]" />
                )}
              </div>
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase">{userProfile.name.split(' ')[0]}</span>
            </div>
          )}
        </nav>
      </header>

      <main className="container mx-auto px-4 pt-4 pb-20">
        <AnimatePresence mode="wait">
          {step === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass hero-card p-12 rounded-[3rem] mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/12 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="relative z-10 text-center">
                  <p className="text-[#D4AF37] uppercase tracking-[0.4em] text-xs font-semibold mb-4">GlowNext Premium Feature</p>
                  <h2 className="text-6xl font-display font-bold text-white mb-6">GlowNext Skin Scanner</h2>
                  <p className="max-w-3xl mx-auto text-lg text-muted leading-relaxed font-light">
                    Discover the GlowNext scanner as a premium feature on the main page. Explore exclusive skin analysis, curated recommendations, and membership benefits before you scan.
                  </p>
                  <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                    <button onClick={goToScanner} className="btn-premium">Start Premium Scan</button>
                    <button onClick={goToOnboarding} className="btn-secondary">Join Premium</button>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {[
                  { title: 'Premium Scan Access', description: 'The GlowNext scanner is one of many flagship features available from the home page.' },
                  { title: 'Elite Skin Reports', description: 'Receive tailored insights and product selections for your unique complexion.' },
                  { title: 'Bespoke Rituals', description: 'Unlock treatments and recommendations designed for your skin type.' },
                  { title: 'Membership Perks', description: 'Enjoy exclusive premium benefits, offers, and curated collections.' },
                ].map((feature) => (
                  <div key={feature.title} className="glass rounded-[2rem] p-8 border border-gold">
                    <h3 className="text-2xl font-display font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-muted leading-relaxed font-light">{feature.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'onboarding' && (
            <motion.div
              key="onboarding"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
            >
              <RegistrationForm onComplete={handleRegistrationComplete} />
            </motion.div>
          )}

          {step === 'scanner' && (
            <motion.div
              key="scanner"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
            >
              <SkinScanner onResults={handleScannerResults} />
            </motion.div>
          )}

          {step === 'results' && skinResult && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center mb-6">
                <button 
                  onClick={resetFlow}
                  className="flex items-center gap-2 text-white/50 hover:text-[#D4AF37] transition-colors text-xs uppercase font-bold tracking-widest"
                >
                  <ArrowLeft className="w-4 h-4" /> Restart Analysis
                </button>
              </div>
              <ProductRecommendations skinType={skinResult} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Decorative Footer Element */}
      <footer className="fixed bottom-0 left-0 w-full p-8 pointer-events-none z-10">
        <div className="flex justify-between items-end opacity-20">
          <div className="text-[8px] font-mono tracking-widest uppercase text-white/40">
            EST. 2024 / REFINEMENT SYSTEM v1.0.4
          </div>
          <div className="text-[8px] font-mono tracking-widest uppercase text-white/40">
            GLOWNEXT® BIOTECH INDUSTRIES
          </div>
        </div>
      </footer>
    </div>
  );
}

