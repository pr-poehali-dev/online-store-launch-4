import { useState, useCallback } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

let cartItems: CartItem[] = [];
let listeners: (() => void)[] = [];

const notify = () => listeners.forEach((l) => l());

export const cartStore = {
  getItems: () => cartItems,
  subscribe: (fn: () => void) => {
    listeners.push(fn);
    return () => { listeners = listeners.filter((l) => l !== fn); };
  },
  add: (product: Product) => {
    const existing = cartItems.find((i) => i.product.id === product.id);
    if (existing) {
      cartItems = cartItems.map((i) =>
        i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      cartItems = [...cartItems, { product, quantity: 1 }];
    }
    notify();
  },
  remove: (id: number) => {
    cartItems = cartItems.filter((i) => i.product.id !== id);
    notify();
  },
  updateQty: (id: number, quantity: number) => {
    if (quantity <= 0) {
      cartItems = cartItems.filter((i) => i.product.id !== id);
    } else {
      cartItems = cartItems.map((i) =>
        i.product.id === id ? { ...i, quantity } : i
      );
    }
    notify();
  },
  clear: () => { cartItems = []; notify(); },
  total: () => cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0),
  count: () => cartItems.reduce((s, i) => s + i.quantity, 0),
};

export function useCart() {
  const [, forceUpdate] = useState(0);
  useCallback(() => {
    return cartStore.subscribe(() => forceUpdate((n) => n + 1));
  }, []);

  useState(() => {
    const unsub = cartStore.subscribe(() => forceUpdate((n) => n + 1));
    return unsub;
  });

  return {
    items: cartStore.getItems(),
    add: cartStore.add,
    remove: cartStore.remove,
    updateQty: cartStore.updateQty,
    clear: cartStore.clear,
    total: cartStore.total(),
    count: cartStore.count(),
  };
}
