import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Sparkles, AlertCircle, CheckCircle, ChevronRight, RefreshCw, Crosshair } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Scanner: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const simulateScan = () => {
    if (!file) return;
    setIsScanning(true);
    
    // Simulate API call and analysis
    setTimeout(() => {
      setIsScanning(false);
      setResult({
        skinType: 'Combination',
        concerns: ['Uneven Texture', 'Mild Dehydration', 'T-Zone Oiliness'],
        score: 82,
        recommendedCat: 'moisturizer'
      });
    }, 2500);
  };

  const reset = () => {
    setFile(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 flex flex-col relative">
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] bg-theme-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[40%] h-[40%] bg-theme-secondary/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-lg glass-card border border-theme-text/10 p-6 md:p-10 text-center relative overflow-hidden m-auto">
        
        <div className="inline-flex items-center justify-center w-12 h-12 bg-theme-primary/10 text-theme-primary rounded-xl mb-6">
          <Sparkles size={24} />
        </div>
        
        <h1 className="text-3xl font-heading font-bold text-theme-text mb-3">AI Skin Analysis</h1>
        <p className="text-theme-text-light text-sm mb-8">
          Upload a clear, well-lit selfie without makeup. Our clinical AI will analyze your skin type and recommend a personalized routine in seconds.
        </p>

        {!file ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-theme-text/20 hover:border-theme-primary/50 bg-theme-text/5 hover:bg-theme-primary/5 rounded-2xl p-10 cursor-pointer transition-all group flex flex-col items-center justify-center"
          >
            <Camera size={40} className="text-theme-text/30 group-hover:text-theme-primary mb-4 transition-colors" />
            <p className="text-theme-text font-semibold mb-1">Tap to take or upload a photo</p>
            <p className="text-theme-text-light text-xs">JPEG, PNG up to 5MB</p>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFile} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-theme-text/10 shadow-xl">
              <img src={URL.createObjectURL(file)} alt="Selfie" className="w-full h-full object-cover" />
              
              {isScanning && (
                <>
                  <div className="absolute inset-0 bg-theme-primary/20 backdrop-blur-[2px]" />
                  <motion.div 
                    initial={{ top: '-10%' }}
                    animate={{ top: '110%' }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                    className="absolute left-0 right-0 h-1 bg-theme-primary shadow-[0_0_15px_rgba(var(--color-primary),1)]"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-white mix-blend-difference">
                    <Crosshair size={40} className="animate-pulse opacity-50" />
                  </div>
                </>
              )}
            </div>

            <AnimatePresence mode="popLayout">
              {!result && !isScanning && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-3">
                  <button onClick={reset} className="flex-1 py-3 bg-theme-text/5 hover:bg-theme-text/10 text-theme-text font-semibold rounded-xl transition-colors">
                    Retake
                  </button>
                  <button onClick={simulateScan} className="flex-1 py-3 btn-primary rounded-xl font-bold flex items-center justify-center gap-2">
                    <Sparkles size={18} /> Analyze
                  </button>
                </motion.div>
              )}

              {result && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-left bg-theme-text/5 p-6 rounded-2xl border border-theme-text/10">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-theme-text/10">
                    <div>
                      <div className="text-xs text-theme-text-light uppercase tracking-wider font-semibold">Skin Type</div>
                      <div className="text-xl font-bold text-theme-primary">{result.skinType}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-theme-text-light uppercase tracking-wider font-semibold">Health Score</div>
                      <div className="text-xl font-bold text-emerald-500">{result.score}/100</div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-xs text-theme-text-light uppercase tracking-wider font-semibold mb-2">Detected Concerns</div>
                    <div className="flex flex-wrap gap-2">
                      {result.concerns.map((c: string, i: number) => (
                        <span key={i} className="px-2.5 py-1 bg-theme-text/10 text-theme-text text-xs rounded-md font-medium">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate(`/category/${result.recommendedCat}`)}
                    className="w-full py-3 btn-primary rounded-xl font-bold flex items-center justify-center gap-2 group"
                  >
                    View Recommended Routine <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Quick navigation */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {[
            { label: "Women's", path: '/category/women' },
            { label: "Men's", path: '/category/men' },
            { label: 'Fresh Clear', path: '/category/fresh' },
            { label: 'Clay Masks', path: '/category/clay' },
            { label: 'Moisturizers', path: '/category/moisturizer' },
          ].map((cat, i) => (
             <Link key={i} to={cat.path} className={`px-4 py-3 bg-theme-text/5 hover:bg-theme-text/10 rounded-xl text-center text-sm text-theme-text font-semibold transition-colors ${i === 4 ? 'col-span-2' : ''}`}>
                {cat.label}
             </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scanner;
