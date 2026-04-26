export interface ProductSize {
  size: string;
  price: number;
  offerPrice?: number;
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
  tags?: string[];

}

export interface CartItem {
  product: Product;
  selectedSize: ProductSize;
  quantity: number;

  // NEW
  unitPrice: number;       // final price (offer or regular)
  originalPrice?: number;  // optional MRP
}


export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  location?: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'dispatched' | 'delivered' | 'cancelled';
  createdAt: any; // Firestore Timestamp
}

export interface OrderDetails {
  name: string;
  address: string;
  email: string;
  phone: string;
  items: CartItem[];
  totalPrice: number;
}
export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  createdAt: any;
}
