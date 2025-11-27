import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, ProductSize } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  updateSize: (productId: string, oldSize: string, newSize: ProductSize) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('naturaahh-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('naturaahh-cart', JSON.stringify(cart));
  }, [cart]);

  // Add item
  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        cartItem =>
          cartItem.product.id === item.product.id &&
          cartItem.selectedSize.size === item.selectedSize.size
      );

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.product.id === item.product.id &&
          cartItem.selectedSize.size === item.selectedSize.size
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevCart, item];
    });
  };

  // Remove item
  const removeFromCart = (productId: string, size: string) => {
    setCart(prevCart =>
      prevCart.filter(
        item =>
          !(item.product.id === productId && item.selectedSize.size === size)
      )
    );
  };

  // Update quantity
  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId && item.selectedSize.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  // ⭐ NEW — Update size inside cart
  const updateSize = (productId: string, oldSize: string, newSize: ProductSize) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId && item.selectedSize.size === oldSize
          ? { ...item, selectedSize: newSize }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.selectedSize.price * item.quantity, 0);

  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateSize, // <-- added here
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
