import { ShieldCheck, Truck, RotateCcw, HeartHandshake } from 'lucide-react';

export const CATEGORIES = [
  { id: 'women', name: "Women's Essentials", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80", desc: "Tailored formulations for women's daily skincare needs.", count: 6 },
  { id: 'men', name: "Men's Collection", img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&q=80", desc: "Strong, effective skincare designed specifically for men.", count: 6 },
  { id: 'fresh', name: "Fresh Clear", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80", desc: "Rose water and aloe vera for gentle daily cleansing.", count: 6 },
  { id: 'moisturizer', name: "Deep Moisturizer", img: "https://images.unsplash.com/photo-1601049541271-7ef17a7e1b27?w=800&q=80", desc: "All-day hydration powered by natural oils and vitamin E.", count: 6 },
  { id: 'clay', name: "Purifying Clay Mask", img: "https://images.unsplash.com/photo-1583241475880-083f84372725?w=800&q=80", desc: "Deep pore cleansing with green clay and tea tree extracts.", count: 6 },
];

export const TESTIMONIALS = [
  { name: "Priya Nair", location: "Mumbai", rating: 5, text: "The Rose Velvet Serum completely transformed my skin in 2 weeks. I get compliments every single day now. Worth every rupee!", product: "Rose Velvet Serum", avatar: "PN" },
  { name: "Rahul Sharma", location: "Delhi", rating: 5, text: "Finally a brand that makes skincare for men that actually works. The Charcoal Wash cleared my pores within days. My skin hasn't felt this clean in years.", product: "Obsidian Charcoal Wash", avatar: "RS" },
  { name: "Anjali Mehta", location: "Bangalore", rating: 5, text: "The Ceramide Barrier Repair cream saved my eczema-prone skin. I was skeptical but it's now my non-negotiable everyday essential.", product: "Ceramide Barrier Repair", avatar: "AM" },
  { name: "Dev Kapoor", location: "Pune", rating: 5, text: "Used the Turmeric Glow Mask every week for a month. My old acne scars are visibly lighter and my skin tone is so much more even.", product: "Turmeric Glow Mask", avatar: "DK" },
  { name: "Sneha Reddy", location: "Hyderabad", rating: 5, text: "The Hydra-Boost Sleeping Pack is magic. I apply it before bed and wake up with skin that looks like I slept 10 hours even on 5!", product: "Hydra-Boost Sleeping Pack", avatar: "SR" },
  { name: "Vikram Iyer", location: "Chennai", rating: 5, text: "The AI scanner actually recommended the right product for my skin type. Very impressed by the whole experience, quick delivery too!", product: "AI Skin Scanner", avatar: "VI" },
];

export const STATS = [
  { value: "2.4M+", label: "Happy Customers" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "36+", label: "Premium Products" },
  { value: "100%", label: "Natural Ingredients" },
];

export const GUARANTEES = [
  { icon: ShieldCheck, title: "100% Authentic", desc: "Every product is genuine and dermatologist-tested" },
  { icon: Truck, title: "Free Delivery", desc: "Complimentary shipping on all orders above ₹799" },
  { icon: RotateCcw, title: "Easy Returns", desc: "Hassle-free 30-day return policy on all items" },
  { icon: HeartHandshake, title: "Skin Promise", desc: "Not satisfied? Full refund, no questions asked" },
];
