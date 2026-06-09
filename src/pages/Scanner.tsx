import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Sparkles, ChevronRight, Crosshair } from 'lucide-react';

const Scanner: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [cameraMode, setCameraMode] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const analyzeScan = () => {
    if (!file) return;
    setIsScanning(true);
    
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey || apiKey === 'your_groq_api_key_here') {
      alert("Please add your VITE_GROQ_API_KEY to the .env file to enable real AI scanning.");
      setIsScanning(false);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result as string;

      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'llama-3.2-11b-vision-preview',
            messages: [
              {
                role: 'user',
                content: [
                  {
                    type: 'text',
                    text: "You are an expert clinical dermatologist AI. Analyze this facial image for skincare. Return ONLY a valid JSON object with no markdown formatting. The JSON must match this structure exactly: { \"skinType\": \"Oily\" | \"Dry\" | \"Combination\" | \"Normal\" | \"Sensitive\", \"concerns\": [\"Concern 1\", \"Concern 2\", \"Concern 3\"], \"score\": number between 1 and 100, \"feedback\": \"A short 2-sentence professional feedback based on the visual analysis\", \"recommendedCat\": \"moisturizer\" | \"fresh\" | \"clay\" | \"men\" | \"women\" }"
                  },
                  {
                    type: 'image_url',
                    image_url: {
                      url: base64Image
                    }
                  }
                ]
              }
            ],
            temperature: 0.2,
            response_format: { type: "json_object" }
          })
        });

        if (!response.ok) {
          throw new Error(`Groq API error: ${response.status}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        
        try {
          const parsedResult = JSON.parse(content);
          setResult(parsedResult);
        } catch (e) {
          console.error("Failed to parse JSON response:", content);
          throw new Error("Invalid response format from AI");
        }
      } catch (error) {
        console.error("Error analyzing image:", error);
        alert("Error analyzing image. Please check your API key and try again.");
      } finally {
        setIsScanning(false);
      }
    };
    
    reader.onerror = () => {
      alert("Error reading file.");
      setIsScanning(false);
    };
  };

  const [stream, setStream] = useState<MediaStream | null>(null);

  React.useEffect(() => {
    if (cameraMode && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [cameraMode, stream]);

  const reset = () => {
    setFile(null);
    setResult(null);
    setCameraMode(false);
  };

  const startCamera = async () => {
    try {
      setCameraMode(true);
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setStream(s);
    } catch (err) {
      console.error("Camera error:", err);
      alert("Unable to access camera. Please check permissions or use Upload File.");
      setCameraMode(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(t => t.stop());
    }
    setCameraMode(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const f = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
            setFile(f);
            stopCamera();
          }
        }, 'image/jpeg', 0.9);
      }
    }
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

        {!file && !cameraMode ? (
          <div className="border-2 border-dashed border-theme-text/20 bg-theme-text/5 rounded-2xl p-8 flex flex-col items-center justify-center">
            <Camera size={40} className="text-theme-text/30 mb-4" />
            <p className="text-theme-text font-semibold mb-6">Take a selfie or upload a photo</p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
              <button 
                onClick={startCamera}
                className="flex-1 btn-primary py-3 rounded-xl cursor-pointer flex items-center justify-center gap-2 group relative overflow-hidden text-sm"
              >
                <Camera size={18} />
                <span>Take Selfie</span>
              </button>
              
              <label className="flex-1 bg-theme-text/10 hover:bg-theme-text/15 text-theme-text py-3 rounded-xl font-semibold cursor-pointer flex items-center justify-center gap-2 transition-colors relative overflow-hidden text-sm">
                <Upload size={18} />
                <span>Upload File</span>
                <input 
                  type="file" 
                  onChange={handleFile}
                  onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
                  accept="image/*" 
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" 
                />
              </label>
            </div>
            <p className="text-theme-text-light text-xs mt-6">JPEG, PNG up to 5MB</p>
          </div>
        ) : cameraMode ? (
          <div className="border border-theme-text/10 bg-theme-bg/50 rounded-2xl p-4 overflow-hidden shadow-xl">
            <div className="relative w-full aspect-[3/4] md:aspect-video rounded-xl overflow-hidden bg-black mb-4">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="absolute inset-0 w-full h-full object-cover mirror" 
                style={{ transform: 'scaleX(-1)' }}
              />
              <div className="absolute inset-0 border-2 border-theme-primary/30 rounded-xl pointer-events-none" />
              <div className="absolute inset-x-0 top-1/3 bottom-1/3 border-y border-white/20 pointer-events-none" />
              <div className="absolute inset-y-0 left-1/3 right-1/3 border-x border-white/20 pointer-events-none" />
              <canvas ref={canvasRef} className="hidden" />
            </div>
            <div className="flex gap-3">
              <button onClick={stopCamera} className="flex-1 py-3 bg-theme-text/5 hover:bg-theme-text/10 text-theme-text font-semibold rounded-xl transition-colors">
                Cancel
              </button>
              <button onClick={capturePhoto} className="flex-1 py-3 btn-primary rounded-xl font-bold flex items-center justify-center gap-2">
                <Camera size={18} /> Snap
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-theme-text/10 shadow-xl">
              {file && <img src={URL.createObjectURL(file)} alt="Selfie" className="w-full h-full object-cover" />}
              
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
                  <button onClick={analyzeScan} className="flex-1 py-3 btn-primary rounded-xl font-bold flex items-center justify-center gap-2">
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

                  {result.feedback && (
                    <div className="mb-6 p-4 bg-theme-primary/10 rounded-xl border border-theme-primary/20">
                      <div className="flex items-start gap-3">
                        <Sparkles className="text-theme-primary shrink-0 mt-0.5" size={18} />
                        <p className="text-sm text-theme-text leading-relaxed">
                          {result.feedback}
                        </p>
                      </div>
                    </div>
                  )}

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
