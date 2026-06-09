import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, Order, Review } from '../types';
import { ALL_PRODUCTS } from '../data/products';

interface StoreContextType {
  products: Product[];
  orders: Order[];
  wishlist: string[];
  reviews: Review[];
  addOrder: (order: Omit<Order, 'id' | 'datePlaced' | 'status'>) => void;
  cancelOrder: (id: string) => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  getProductsBySkinType: (type: string) => Product[];
  getProductsByCategory: (cat: string) => Product[];
  getProductById: (id: string) => Product | undefined;
  getReviewsForProduct: (productId: string) => Review[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEY = 'glowNestStore_v2';

interface StoredData {
  orders: Order[];
  wishlist: string[];
  reviews: Review[];
}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Load persisted data on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data: StoredData = JSON.parse(raw);
        if (data.orders) setOrders(data.orders);
        if (data.wishlist) setWishlist(data.wishlist);
        if (data.reviews) setReviews(data.reviews);
      }
    } catch {
      // silently ignore corrupted storage
    }
  }, []);

  // Persist any state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ orders, wishlist, reviews }));
    } catch {
      // storage quota exceeded — silently ignore
    }
  }, [orders, wishlist, reviews]);

  const addOrder = useCallback((orderData: Omit<Order, 'id' | 'datePlaced' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      datePlaced: new Date().toISOString(),
      status: 'confirmed',
    };
    setOrders(prev => [...prev, newOrder]);
  }, []);

  const cancelOrder = useCallback((id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  }, []);

  const isWishlisted = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const addReview = useCallback((reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...reviewData,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
    };
    setReviews(prev => [...prev, newReview]);
  }, []);

  const getProductsBySkinType = useCallback((type: string) => {
    return ALL_PRODUCTS.filter(p => p.skin.some(s => s.toLowerCase().includes(type.toLowerCase())));
  }, []);

  const getProductsByCategory = useCallback((cat: string) => {
    return ALL_PRODUCTS.filter(p => p.category === cat);
  }, []);

  const getProductById = useCallback((id: string) => ALL_PRODUCTS.find(p => p.id === id), []);

  const getReviewsForProduct = useCallback((productId: string) => {
    return reviews.filter(r => r.productId === productId);
  }, [reviews]);

  return (
    <StoreContext.Provider value={{
      products: ALL_PRODUCTS,
      orders,
      wishlist,
      reviews,
      addOrder,
      cancelOrder,
      toggleWishlist,
      isWishlisted,
      addReview,
      getProductsBySkinType,
      getProductsByCategory,
      getProductById,
      getReviewsForProduct,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
