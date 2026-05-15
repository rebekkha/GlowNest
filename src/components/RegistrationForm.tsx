/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Phone, MapPin, Camera, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';

interface RegistrationFormProps {
  onComplete: (profile: UserProfile) => void;
}

export default function RegistrationForm({ onComplete }: RegistrationFormProps) {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: '',
    phone: '',
    address: '',
    pinCode: '',
    profilePic: null,
  });
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, profilePic: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const [otpError, setOtpError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpSent) {
      setIsOtpSent(true);
      return;
    }
    // Mock OTP verification
    if (otp === '1234') {
      onComplete(profile);
    } else {
      setOtpError(true);
      setTimeout(() => setOtpError(false), 3000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-2xl mx-auto glass p-8 rounded-3xl mt-12 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full -mr-16 -mt-16 blur-2xl" />
      
      <div className="text-center mb-10">
        <h2 className="text-4xl font-display font-bold text-[#D4AF37] mb-2 italic">Welcome to GlowNext Premium</h2>
        <p className="text-muted font-light tracking-wide uppercase text-xs">Unlock Your Elite Radiance</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center mb-8">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-32 h-32 rounded-full border-2 border-dashed border-[#D4AF37]/30 flex items-center justify-center cursor-pointer hover:border-[#D4AF37] transition-colors relative group overflow-hidden bg-white/5"
          >
            {profile.profilePic ? (
              <img src={profile.profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <Camera className="w-8 h-8 text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors" />
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="text-[10px] uppercase font-bold text-[#D4AF37]">Edit Photo</span>
            </div>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            className="hidden" 
            accept="image/*"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-[#D4AF37] ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/50" />
              <input
                required
                type="text"
                placeholder="Enter your name"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-[#D4AF37] outline-none transition-colors"
                value={profile.name}
                onChange={prev => setProfile({ ...profile, name: prev.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-[#D4AF37] ml-1">Age</label>
            <input
              required
              type="number"
              placeholder="Your age"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-[#D4AF37] outline-none transition-colors"
              value={profile.age}
              onChange={prev => setProfile({ ...profile, age: prev.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-[#D4AF37] ml-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/50" />
              <input
                required
                type="tel"
                placeholder="+1 234 567 890"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-[#D4AF37] outline-none transition-colors"
                value={profile.phone}
                onChange={prev => setProfile({ ...profile, phone: prev.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-[#D4AF37] ml-1">Pin Code</label>
            <input
              required
              type="text"
              placeholder="Zip code"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-[#D4AF37] outline-none transition-colors"
              value={profile.pinCode}
              onChange={prev => setProfile({ ...profile, pinCode: prev.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-[#D4AF37] ml-1">Delivery Address</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-4 w-4 h-4 text-[#D4AF37]/50" />
            <textarea
              required
              placeholder="Your street address"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 min-h-[100px] focus:border-[#D4AF37] outline-none transition-colors"
              value={profile.address}
              onChange={prev => setProfile({ ...profile, address: prev.target.value })}
            />
          </div>
        </div>

        <AnimatePresence>
          {isOtpSent && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="space-y-2 overflow-hidden"
            >
              <label className="text-[10px] uppercase font-bold text-[#D4AF37] ml-1">Enter OTP (Sent to mobile)</label>
              <div className="relative">
                <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/50" />
                <input
                  required
                  type="text"
                  placeholder="Demo OTP: 1234"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:border-[#D4AF37] outline-none transition-colors text-center tracking-[1em]"
                  value={otp}
                  onChange={prev => setOtp(prev.target.value)}
                />
              </div>
              <AnimatePresence>
                {otpError && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] text-red-500 font-bold uppercase text-center mt-2"
                  >
                    Invalid OTP. Please use code "1234"
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        <button type="submit" className="btn-premium w-full mt-4 py-4 text-lg">
          {isOtpSent ? 'Verify & Enter Premium' : 'Unlock Premium Access'}
        </button>
      </form>
    </motion.div>
  );
}
