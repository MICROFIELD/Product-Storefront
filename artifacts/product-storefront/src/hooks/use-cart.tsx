import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { products, type Product } from '@/data/products';

export type CartLine = {
  productId: string;
  quantity: number;
  variant?: string;
};

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number, variant?: string) => void;
  updateQuantity: (productId: string, quantity: number, variant?: string) => void;
  removeItem: (productId: string, variant?: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'morrow-supply-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as CartLine[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const addItem = useCallback((product: Product, quantity = 1, variant?: string) => {
    setLines((current) => {
      const index = current.findIndex((line) => line.productId === product.id && line.variant === variant);
      if (index === -1) return [...current, { productId: product.id, quantity, variant }];
      return current.map((line, lineIndex) =>
        lineIndex === index ? { ...line, quantity: line.quantity + quantity } : line,
      );
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number, variant?: string) => {
    setLines((current) =>
      quantity < 1
        ? current.filter((line) => !(line.productId === productId && line.variant === variant))
        : current.map((line) =>
            line.productId === productId && line.variant === variant ? { ...line, quantity } : line,
          ),
    );
  }, []);

  const removeItem = useCallback((productId: string, variant?: string) => {
    setLines((current) => current.filter((line) => !(line.productId === productId && line.variant === variant)));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);
  const itemCount = useMemo(() => lines.reduce((sum, line) => sum + line.quantity, 0), [lines]);
  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + (line.quantity * (productsById.get(line.productId)?.price ?? 0)), 0),
    [lines],
  );

  return (
    <CartContext.Provider value={{ lines, itemCount, subtotal, addItem, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

const productsById = new Map<string, Product>(products.map((product) => [product.id, product]));

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}