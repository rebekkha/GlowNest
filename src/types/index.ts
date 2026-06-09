export interface Product {
  id: string;
  name: string;
  price: number;
  skin: string;
  img: string;
  steps: string[];
}

export interface Order {
  id: string;
  productName: string;
  price: number;
  user: string;
  phone: string;
  address: string;
  rating: number;
  deliveryDate: string;
  datePlaced: string;
}
