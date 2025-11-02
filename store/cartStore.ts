import { create } from 'zustand';
import { CartItem, Product } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, size: string, color: string) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addItem: (product, size, color) => {
    set((state) => {
      const existingItem = state.items.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id &&
            item.selectedSize === size &&
            item.selectedColor === color
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { product, quantity: 1, selectedSize: size, selectedColor: color }],
      };
    });
  },

  removeItem: (productId, size, color) => {
    set((state) => ({
      items: state.items.filter(
        (item) =>
          !(item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color)
      ),
    }));
  },

  updateQuantity: (productId, size, color, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId, size, color);
      return;
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor === color
          ? { ...item, quantity }
          : item
      ),
    }));
  },

  clearCart: () => {
    set({ items: [] });
  },

  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));
