/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, RefreshCw, Zap } from 'lucide-react';
import { SkinType } from '../types';

interface SkinScannerProps {
  onResults: (type: SkinType) => void;
}

export default function SkinScanner({ onResults }: SkinScannerProps) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      setIsCapturing(true);
    }
  }, [webcamRef]);

  const handleAnalyze = async () => {
    setIsScanning(true);
    // Mock analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const types: SkinType[] = ['Oily', 'Dry', 'Normal', 'Combination'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    onResults(randomType);
    setIsScanning(false);
  };

  const reset = () => {
    setCapturedImage(null);
    setIsCapturing(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto mt-12 px-4"
    >
      <div className="text-center mb-12">
        <h2 className="text-5xl font-display font-medium text-white italic mb-4">Premium Skin Signature</h2>
        <p className="text-[#D4AF37] tracking-[0.2em] uppercase text-xs font-semibold">Our flagship premium AI reveals your elite complexion</p>
      </div>

      <div className="relative aspect-video rounded-3xl overflow-hidden glass border-2 border-[#D4AF37]/20 shadow-2xl shadow-[#D4AF37]/20 max-w-2xl mx-auto">
        {!capturedImage ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-full object-cover"
            videoConstraints={{ facingMode: 'user' }}
          />
        ) : (
          <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
        )}

        <AnimatePresence>
          {isScanning && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 pointer-events-none"
            >
              <div className="scan-line" />
              <div className="absolute inset-0 bg-[#D4AF37]/10 backdrop-blur-[2px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="w-12 h-12 text-[#D4AF37] fill-[#D4AF37]/30" />
                    </motion.div>
                  </div>
                  <p className="text-[#D4AF37] font-display italic text-2xl tracking-wider">Analyzing Premium Signature...</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-10 gap-6">
        {!isCapturing ? (
          <button onClick={capture} className="btn-premium flex items-center gap-3 scale-110">
            <Camera className="w-5 h-5" />
            Capture Portrait
          </button>
        ) : (
          <div className="flex gap-4">
            <button onClick={reset} disabled={isScanning} className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/5 transition-colors flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> Retake
            </button>
            <button onClick={handleAnalyze} disabled={isScanning} className="btn-premium flex items-center gap-3">
              <Zap className="w-5 h-5" />
              Analyze Skin Signature
            </button>
          </div>
        )}
      </div>

      <div className="mt-16 grid grid-cols-4 gap-8">
        {['VIP Analysis', 'Royal Care', 'Pure Precision', 'Eco-Luxury'].map((feature, i) => (
          <div key={i} className="text-center">
            <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-2">{feature}</p>
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
