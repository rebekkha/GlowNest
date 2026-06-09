import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-theme-text/10 bg-theme-bg">
      <div className="absolute inset-0 bg-glass-gradient backdrop-blur-xl pointer-events-none"></div>
      
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-px bg-gradient-to-r from-transparent via-theme-primary to-transparent"></div>
      <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] bg-theme-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-10 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <h2 className="text-3xl font-heading font-bold text-theme-text tracking-tighter">
              Glow<span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-theme-secondary">Nest</span>
            </h2>
            <p className="text-theme-text-light text-sm leading-relaxed">
              Curated premium skincare, formulated with natural ingredients to reveal your ultimate radiant glow. Elevate your daily routine.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-theme-text/5 border border-theme-text/10 flex items-center justify-center text-theme-text/70 hover:text-theme-text hover:bg-theme-primary/20 hover:border-theme-primary/50 transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-theme-text/5 border border-theme-text/10 flex items-center justify-center text-theme-text/70 hover:text-theme-text hover:bg-theme-primary/20 hover:border-theme-primary/50 transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-theme-text/5 border border-theme-text/10 flex items-center justify-center text-theme-text/70 hover:text-theme-text hover:bg-theme-primary/20 hover:border-theme-primary/50 transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-theme-text font-heading font-semibold mb-6 text-lg">Shop By Type</h3>
            <ul className="space-y-4">
              <li><Link to="/category/women" className="text-theme-text-light hover:text-theme-primary transition-colors text-sm">Women's Essentials</Link></li>
              <li><Link to="/category/men" className="text-theme-text-light hover:text-theme-primary transition-colors text-sm">Men's Collection</Link></li>
              <li><Link to="/category/fresh" className="text-theme-text-light hover:text-theme-primary transition-colors text-sm">Fresh Clear</Link></li>
              <li><Link to="/category/moisturizer" className="text-theme-text-light hover:text-theme-primary transition-colors text-sm">Deep Moisturizer</Link></li>
              <li><Link to="/category/clay" className="text-theme-text-light hover:text-theme-primary transition-colors text-sm">Clay Masks</Link></li>
            </ul>
          </div>

          {/* Legal & Help */}
          <div>
            <h3 className="text-theme-text font-heading font-semibold mb-6 text-lg">Help & Legal</h3>
            <ul className="space-y-4">
              <li><Link to="/scan" className="text-theme-text-light hover:text-theme-primary transition-colors text-sm">Glow AI Scanner</Link></li>
              <li><Link to="/orders" className="text-theme-text-light hover:text-theme-primary transition-colors text-sm">Track Order</Link></li>
              <li><Link to="/terms" className="text-theme-text-light hover:text-theme-primary transition-colors text-sm">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-theme-text-light hover:text-theme-primary transition-colors text-sm">Privacy Policy</Link></li>
              <li><a href="#" className="text-theme-text-light hover:text-theme-primary transition-colors text-sm">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-theme-text font-heading font-semibold mb-6 text-lg">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-theme-primary mt-0.5" />
                <span className="text-theme-text-light text-sm">123 Radiance Blvd, Suite 400<br/>New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-theme-primary" />
                <a href="tel:+18004569637" className="text-theme-text-light hover:text-theme-primary transition-colors text-sm">1-800-GLOW-NST</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-theme-primary" />
                <a href="mailto:support@glownest.com" className="text-theme-text-light hover:text-theme-primary transition-colors text-sm">support@glownest.com</a>
              </li>
            </ul>
          </div>
          
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-theme-text/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-theme-text-light/60 text-sm">
            © {new Date().getFullYear()} GlowNest Cosmetics. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-theme-text-light/40 text-xs">Crafted for Radiant Skin</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
