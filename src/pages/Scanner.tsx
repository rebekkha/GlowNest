import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';
import { ScanFace, Loader2, CheckCircle2 } from 'lucide-react';

const SKINTYPES = ['dry', 'oily', 'sensitive', 'normal'];

const Scanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);

  const startScan = () => {
    setIsScanning(true);
    // Simulate 3 seconds of scanning
    setTimeout(() => {
      const randomSkinType = SKINTYPES[Math.floor(Math.random() * SKINTYPES.length)];
      setResult(randomSkinType);
      setIsScanning(false);
      
      // Redirect after showing result briefly
      setTimeout(() => {
        navigate(`/category/${randomSkinType}`);
      }, 2000);
    }, 3000);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-theme-primary/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="max-w-md w-full glass-card p-8 flex flex-col items-center text-center relative overflow-hidden border border-theme-text/10 shadow-[0_0_50px_rgba(255,92,141,0.15)]">
        <h2 className="text-3xl text-theme-text font-heading font-bold mb-2">Glow AI Scanner</h2>
        <p className="text-theme-text-light text-sm mb-8">Let our AI analyze your skin type to recommend the perfect premium routine.</p>

        <div className="relative w-full aspect-[3/4] bg-theme-bg/50 rounded-2xl overflow-hidden mb-8 border border-theme-text/5">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
            className="w-full h-full object-cover"
            mirrored={true}
          />
          
          {/* Scanning Overlay */}
          {isScanning && (
            <>
              <div className="absolute inset-0 bg-theme-primary/10"></div>
              <motion.div 
                initial={{ top: '0%' }}
                animate={{ top: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-1 bg-theme-primary shadow-[0_0_20px_rgba(255,92,141,1)]"
              ></motion.div>
            </>
          )}

          {/* Result Overlay */}
          {result && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-theme-bg/80 backdrop-blur-sm flex flex-col items-center justify-center z-10"
            >
              <CheckCircle2 size={48} className="text-theme-primary mb-4" />
              <h3 className="text-2xl text-theme-text font-heading font-bold mb-2">Analysis Complete</h3>
              <p className="text-theme-primary uppercase tracking-widest text-sm font-semibold mb-2">Skin Type Detected:</p>
              <div className="px-6 py-2 bg-theme-primary/20 border border-theme-primary/50 text-theme-text rounded-full font-bold uppercase">
                {result}
              </div>
            </motion.div>
          )}
        </div>

        {!result && (
          <button 
            onClick={startScan}
            disabled={isScanning}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              isScanning ? 'bg-theme-text/10 text-theme-text-light border border-theme-text/10 cursor-not-allowed' : 'btn-primary'
            }`}
          >
            {isScanning ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Analyzing Skin...
              </>
            ) : (
              <>
                <ScanFace size={20} />
                Start AI Analysis
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Scanner;
