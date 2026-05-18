/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShoppingBag, Star, Info, Sparkles } from 'lucide-react';
import { SkinType, Product } from '../types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Glow Elixir',
    description: 'A deeply hydrating serum infused with 24k gold flakes and rose essence.',
    benefit: 'Restores natural radiance and elasticity.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400',
    suitableFor: ['Dry', 'Normal'],
  },
  {
    id: '2',
    name: 'Emerald Detox Mask',
    description: 'Bentonite clay and matcha tea extract for deep pore cleansing.',
    benefit: 'Eliminates excess oil and prevents breakouts.',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=400',
    suitableFor: ['Oily', 'Combination'],
  },
  {
    id: '3',
    name: 'HydraBoost Pearl Mist',
    description: 'Cooling mist with pearl extracts and botanical hyaluronic acid.',
    benefit: 'Instant hydration and soothing for sensitive areas.',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=400',
    suitableFor: ['Dry', 'Normal', 'Combination'],
  },
  {
    id: '4',
    name: 'Midnight Repair Balm',
    description: 'Intensive overnight treatment with lavender and organic argan oil.',
    benefit: 'Repairs the skin barrier while you sleep.',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400',
    suitableFor: ['Dry'],
  },
  {
    id: '5',
    name: 'Citrus Brightening Cleanser',
    description: 'Gentle exfoliating wash with vitamin C and orange blossom.',
    benefit: 'Evens skin tone and removes daily environmental toxins.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=400',
    suitableFor: ['Normal', 'Oily', 'Combination'],
  },
];

interface ProductRecommendationsProps {
  skinType: SkinType;
}

export default function ProductRecommendations({ skinType }: ProductRecommendationsProps) {
  const recommendations = MOCK_PRODUCTS.filter(p => p.suitableFor.includes(skinType));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto mt-12 pb-24 px-4"
    >
      <div className="glass p-12 rounded-[3rem] mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E5A9B4]/12 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[#E5A9B4] mb-4">
            <Star className="w-5 h-5 fill-[#E5A9B4]" />
            <span className="uppercase tracking-[0.3em] font-bold text-xs">Premium Curation</span>
          </div>
          <h2 className="text-6xl font-display font-medium text-white italic mb-6">
            Your Skin is <span className="text-[#E5A9B4]">{skinType}</span>
          </h2>
          <p className="max-w-2xl text-lg text-white/70 leading-relaxed font-light">
            Based on our exclusive premium scan, we've handpicked an elite ritual collection to nourish, refine, and illuminate your complexion.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {recommendations.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group glass rounded-3xl overflow-hidden hover:border-[#E5A9B4]/50 transition-all duration-500"
          >
            <div className="relative h-72 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute top-4 left-4">
                <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-[#E5A9B4]" />
                  <span className="text-[10px] uppercase font-bold text-white tracking-widest">{skinType} Care</span>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-[#E5A9B4] transition-colors">{product.name}</h3>
              <p className="text-white/60 text-sm mb-6 leading-relaxed font-light line-clamp-2">{product.description}</p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <Info className="w-4 h-4 text-[#E5A9B4] mt-1 shrink-0" />
                  <p className="text-xs text-white/80">{product.benefit}</p>
                </div>
                
                <button className="btn-premium w-full flex items-center justify-center gap-3">
                  <ShoppingBag className="w-4 h-4" />
                  Add to Premium Edit
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <p className="text-muted font-light italic mb-2 tracking-wide">GlowNext Premium Membership Terms Apply</p>
        <div className="flex justify-center gap-6 text-[10px] uppercase tracking-[0.2em] font-bold text-muted">
          <a href="#" className="hover:text-[#E5A9B4]">Ingredients</a>
          <a href="#" className="hover:text-[#E5A9B4]">Sourcing</a>
          <a href="#" className="hover:text-[#E5A9B4]">Ethics</a>
        </div>
      </div>
    </motion.div>
  );
}