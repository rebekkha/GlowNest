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
  const [isLoading, setIsLoading] = useState(true);
  const [confetti, setConfetti] = useState<{ id: number; left: string; color: string; duration: string }[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initial Confetti Pulse (Pink Theme)
    const colors = ['#FFB6C1', '#E5A9B4', '#FAD4D8', '#FFF0F5'];
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
    <div className="min-h-screen selection:bg-[#E5A9B4]/30 selection:text-white">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0f060d]/95 backdrop-blur-sm"
          >
            <div className="preloader-card glass rounded-[2.5rem] p-10 border border-[#E5A9B4]/25 text-center max-w-sm mx-4">
              <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#E5A9B4]/10 border border-[#E5A9B4]/20 shadow-[0_0_40px_rgba(229,169,180,0.15)]">
                <div className="preloader-ring" />
              </div>
              <h2 className="text-3xl font-display font-bold text-white mb-3">GlowNext Loading</h2>
              <p className="text-muted leading-relaxed mb-6">Preparing your premium skin experience with luxury diagnostics and radiant care.</p>
              <div className="flex items-center justify-center gap-2">
                <span className="preloader-dot delay-0" />
                <span className="preloader-dot delay-100" />
                <span className="preloader-dot delay-200" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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

      {/* Header */}
      <header className="p-8 flex justify-between items-center relative z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#E5A9B4] rounded-xl flex items-center justify-center rotate-45 shadow-2xl shadow-[#E5A9B4]/20">
            <Sparkles className="w-6 h-6 text-[#1A0B13] -rotate-45" />
          </div>
          <h1 className="text-2xl font-display font-bold tracking-tighter text-white">GLOW<span className="text-[#E5A9B4]">NEXT</span></h1>
        </div>

        <nav className="hidden md:flex gap-4 items-center">
          <button onClick={goToOnboarding} className="btn-secondary text-[10px] uppercase tracking-widest">
            Sign In
          </button>
          <button onClick={goToOnboarding} className="btn-premium text-[10px] uppercase tracking-widest">
            Sign Up
          </button>
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
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#E5A9B4]/12 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="relative z-10 text-center">
                  <p className="text-[#E5A9B4] uppercase tracking-[0.4em] text-xs font-semibold mb-4">GlowNext Premium Feature</p>
                  <h2 className="text-6xl font-display font-bold text-white mb-6">GlowNext Skin Scanner</h2>
                  <p className="max-w-3xl mx-auto text-lg text-muted leading-relaxed font-light">
                    Discover the GlowNext premium scan experience on the main page. Explore elite skin diagnostics, curated recommendations, and membership benefits before you begin.
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

              <div className="mt-16 glass rounded-[3rem] p-12 border border-gold">
                <div className="text-center mb-10">
                  <p className="text-[#E5A9B4] uppercase tracking-[0.3em] text-xs font-semibold mb-3">Premium Collections</p>
                  <h3 className="text-4xl font-display font-bold text-white">Collections, Analysis, Boutique, Heritage</h3>
                  <p className="max-w-3xl mx-auto text-muted leading-relaxed mt-4">
                    Explore each premium dimension of GlowNext — curated collections, precision diagnostics, boutique treatments, and heritage rituals that define timeless luxury.
                  </p>
                </div>
                <div className="grid gap-6 lg:grid-cols-4">
                  {[
                    {
                      title: 'Collections',
                      detail: 'Curated sets of luxury skincare essentials, featuring exclusive formulas for glow, repair, and resilience.',
                    },
                    {
                      title: 'Analysis',
                      detail: 'Advanced skin diagnostics powered by AI to reveal hydration, texture, tone, and targeted treatment paths.',
                    },
                    {
                      title: 'Boutique',
                      detail: 'Intimate premium treatments and minimalist rituals crafted for indulgent, results-driven self-care.',
                    },
                    {
                      title: 'Heritage',
                      detail: 'Inspired by timeless beauty rituals and botanical wisdom, reimagined for modern radiance.',
                    },
                  ].map((section) => (
                    <div id={section.title.toLowerCase()} key={section.title} className="rounded-[2rem] p-6 bg-white/5 border border-white/10">
                      <p className="text-[11px] uppercase tracking-[0.35em] text-[#E5A9B4] font-bold mb-3">{section.title}</p>
                      <h4 className="text-2xl font-display font-semibold text-white mb-2">{section.title}</h4>
                      <p className="text-muted leading-relaxed">{section.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-16 glass rounded-[3rem] p-12 border border-gold">
                <div className="text-center mb-10">
                  <p className="text-[#E5A9B4] uppercase tracking-[0.3em] text-xs font-semibold mb-3">Premier Rituals</p>
                  <h3 className="text-4xl font-display font-bold text-white">Elite rituals for skin that radiates</h3>
                  <p className="max-w-3xl mx-auto text-muted leading-relaxed mt-4">
                    Each ritual is curated from botanicals, science, and sensory luxury to deliver a glowing premium experience.
                  </p>
                </div>
                <div className="grid gap-6 lg:grid-cols-3">
                  {[
                    { title: 'Aura Elixir', detail: 'Gold-infused serum for luminous hydration and glow reinforcement.' },
                    { title: 'Midnight Renewal', detail: 'Overnight repair balm that restores barrier strength while you sleep.' },
                    { title: 'Luminous Rescue', detail: 'Brightening treatment to calm, even, and illuminate sensitive skin.' },
                  ].map((ritual) => (
                    <div key={ritual.title} className="rounded-[2rem] p-6 bg-white/5 border border-white/10">
                      <p className="text-[11px] uppercase tracking-[0.35em] text-[#E5A9B4] font-bold mb-3">Premium Ritual</p>
                      <h4 className="text-2xl font-display font-semibold text-white mb-2">{ritual.title}</h4>
                      <p className="text-muted leading-relaxed">{ritual.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-16 glass rounded-[3rem] p-12 border border-gold">
                <div className="text-center mb-10">
                  <p className="text-[#E5A9B4] uppercase tracking-[0.3em] text-xs font-semibold mb-3">GlowNext SEO Content</p>
                  <h3 className="text-4xl font-display font-bold text-white">Premium skincare solutions crafted for search-ready visibility</h3>
                  <p className="max-w-3xl mx-auto text-muted leading-relaxed mt-4">
                    GlowNext is the ultimate premium skincare destination for customers searching for luxury skin diagnostics, curated routines, and elite beauty rituals.
                  </p>
                </div>
                <div className="grid gap-6 lg:grid-cols-3">
                  {[
                    {
                      title: 'Luxury Skin Analysis',
                      detail: 'AI-driven skin scanner for premium skincare recommendations, personalized for every skin type.',
                    },
                    {
                      title: 'Premium Beauty Rituals',
                      detail: 'Elite skincare routines, botanical formulations, and curated treatments that improve radiance and texture.',
                    },
                    {
                      title: 'Exclusive Membership',
                      detail: 'Join GlowNext Premium for early access to luxury products, bespoke consultations, and VIP skincare benefits.',
                    },
                  ].map((content) => (
                    <div key={content.title} className="rounded-[2rem] p-6 bg-white/5 border border-white/10">
                      <p className="text-[11px] uppercase tracking-[0.35em] text-[#E5A9B4] font-bold mb-3">SEO focus</p>
                      <h4 className="text-2xl font-display font-semibold text-white mb-2">{content.title}</h4>
                      <p className="text-muted leading-relaxed">{content.detail}</p>
                    </div>
                  ))}
                </div>
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
                  className="flex items-center gap-2 text-white/50 hover:text-[#E5A9B4] transition-colors text-xs uppercase font-bold tracking-widest"
                >
                  <ArrowLeft className="w-4 h-4" /> Restart Analysis
                </button>
              </div>
              <ProductRecommendations skinType={skinResult} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-20 bg-[#10070f] border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-3">
            <div>
              <h3 className="text-xl font-display font-bold text-white mb-3">GlowNext Premium</h3>
              <p className="text-muted leading-relaxed">
                Premium skin intelligence, curated rituals, and elite diagnostics in one luxurious destination.
              </p>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-[0.3em] text-[#E5A9B4] font-bold mb-3">Explore</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>Signature Scan</li>
                <li>Premium Rituals</li>
                <li>Elite Collections</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-[0.3em] text-[#E5A9B4] font-bold mb-3">Contact</h4>
              <p className="text-white/70 text-sm leading-relaxed">
                support@glownext.com
                <br />
                Crafted for luxurious skin journeys.
              </p>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 text-center text-[11px] uppercase tracking-[0.35em] text-white/40">
            © 2024 GlowNext Premium · Beauty Intelligence for modern skin.
          </div>
        </div>
      </footer>
    </div>
  );
}