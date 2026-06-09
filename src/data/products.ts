import { Product } from '../types';

export const ALL_PRODUCTS: Product[] = [
  { 
      id: "p1", name: "Hunter Face Cream", price: 599, skin: "normal sensitive dry", img: "/womens.png", 
      steps: ["Cleanse thoroughly and pat skin dry.", "Warm a pea-sized amount between fingertips.", "Apply in upward, circular motions to face and neck.", "Use as the final step in your PM routine to lock in moisture."]
  },
  { 
      id: "p2", name: "Hunter Cleanser", price: 799, skin: "sensitive normal oily", img: "/mens.png",
      steps: ["Dampen face with lukewarm water.", "Apply 1-2 pumps of cleanser to wet palms.", "Massage gently into skin for 60 seconds, avoiding eyes.", "Rinse thoroughly and pat dry with a clean towel."]
  },
  { 
      id: "p3", name: "Hunter Moisturizer", price: 899, skin: "dry normal sensitive", img: "/fresh.png",
      steps: ["Apply to slightly damp skin after cleansing.", "Smooth a thin layer evenly across the face and neck.", "Press palms gently into skin to improve absorption.", "Apply twice daily (AM/PM) for a healthy skin barrier."]
  },
  { 
      id: "p4", name: "Premium Face Cream", price: 699, skin: "dry normal oily", img: "/moisturizer.png",
      steps: ["Apply to slightly damp skin after cleansing.", "Smooth a thin layer evenly across the face and neck.", "Press palms gently into skin to improve absorption.", "Apply twice daily (AM/PM) for a healthy skin barrier."]
  },
  { 
      id: "p5", name: "Radiance Serum", price: 1299, skin: "sensitive normal oily", img: "/hero-bg.png",
      steps: ["Apply a dime-sized amount to clean skin.", "Lightly massage in an upward motion to avoid dragging.", "Focus on oilier areas like the T-zone.", "Allow 2 minutes to absorb before applying SPF."]
  },
  { 
      id: "p6", name: "Deep Hydration Mask", price: 499, skin: "dry normal sensitive", img: "/clay.png",
      steps: ["Pat onto targeted areas of clean, dry skin.", "Use fingertips to spread using light pressure.", "Wait for the product to fully absorb naturally.", "Ideal for morning/evening sealing step."]
  }
];
