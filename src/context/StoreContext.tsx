import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order } from '../types';
import { ALL_PRODUCTS } from '../data/products';

interface StoreContextType {
  products: Product[];
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'datePlaced'>) => void;
  getProductsBySkinType: (type: string) => Product[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('glowStore');
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage when orders change
  useEffect(() => {
    localStorage.setItem('glowStore', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData: Omit<Order, 'id' | 'datePlaced'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Math.random().toString(36).substr(2, 9),
      datePlaced: new Date().toISOString(),
    };
    setOrders(prev => [...prev, newOrder]);
  };

  const getProductsBySkinType = (type: string) => {
    return ALL_PRODUCTS.filter(p => p.skin.includes(type.toLowerCase()));
  };

  return (
    <StoreContext.Provider value={{ products: ALL_PRODUCTS, orders, addOrder, getProductsBySkinType }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
