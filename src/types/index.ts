export interface Product {
  id: string;
  name: string;
  price: number;
  skin: string[];
  img: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  category: string;
  description: string;
  ingredients: string[];
  steps: string[];
  volume: string;
  benefits: string[];
}

export interface Order {
  id: string;
  productId?: string;
  productName: string;
  price: number;
  user: string;
  phone: string;
  address: string;
  rating: number;
  deliveryDate: string;
  datePlaced: string;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
}

export interface Review {
  id: string;
  productId: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}