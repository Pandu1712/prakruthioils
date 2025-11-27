export interface ProductSize {
  size: string;
  price: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  sizes: ProductSize[];
  benefits: string[];
  specifications: string[];
  howToUse: string;
}

export interface CartItem {
  product: Product;
  selectedSize: ProductSize;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface OrderDetails {
  name: string;
  address: string;
  email: string;
  phone: string;
  items: CartItem[];
  totalPrice: number;
}
