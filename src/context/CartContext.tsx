import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, ProductSize } from "../types";

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

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("naturaahh-cart");
    return saved ? JSON.parse(saved) : [];
  });

  /* ---------------- SAVE TO LOCAL STORAGE ---------------- */
  useEffect(() => {
    localStorage.setItem("naturaahh-cart", JSON.stringify(cart));
  }, [cart]);

  /* ---------------- ADD TO CART ---------------- */
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (c) =>
          c.product.id === item.product.id &&
          c.selectedSize.size === item.selectedSize.size
      );

      if (existing) {
        return prevCart.map((c) =>
          c.product.id === item.product.id &&
          c.selectedSize.size === item.selectedSize.size
            ? { ...c, quantity: c.quantity + item.quantity }
            : c
        );
      }

      return [
        ...prevCart,
        {
          ...item,
          unitPrice: item.selectedSize.offerPrice ?? item.selectedSize.price,
          originalPrice: item.selectedSize.price,
        },
      ];
    });
  };

  /* ---------------- REMOVE ITEM ---------------- */
  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.selectedSize.size === size)
      )
    );
  };

  /* ---------------- UPDATE QUANTITY ---------------- */
  const updateQuantity = (
    productId: string,
    size: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        item.selectedSize.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  /* ---------------- UPDATE SIZE (FIXED) ---------------- */
  const updateSize = (
    productId: string,
    oldSize: string,
    newSize: ProductSize
  ) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedSize.size === oldSize
          ? {
              ...item,
              selectedSize: newSize,
              unitPrice: newSize.offerPrice ?? newSize.price,
              originalPrice: newSize.price,
            }
          : item
      )
    );
  };

  /* ---------------- TOTAL PRICE ---------------- */
  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.unitPrice * item.quantity, 0);

  /* ---------------- TOTAL ITEMS ---------------- */
  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateSize,
        clearCart: () => setCart([]),
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
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
