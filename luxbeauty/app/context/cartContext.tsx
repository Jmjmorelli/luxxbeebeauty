"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  duration: number; // prob makes sense to just track it from the beginning // in minutes
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: string) => void;
  clearCart: () => void;
  checkCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = sessionStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const updatedCart = [...prev, item];
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      console.log(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const updatedCart = prev.filter((item) => item.id !== id);
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const checkCart = () => {
    console.log(cart);
  }


  const clearCart = () => {
    setCart([]);
    sessionStorage.setItem("cart", JSON.stringify([]));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, checkCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return context;
}