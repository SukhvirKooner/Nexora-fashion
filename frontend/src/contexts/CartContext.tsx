import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('vibeCart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from localStorage');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('vibeCart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      
      if (existingItem) {
        toast({
          title: "Cart Updated",
          description: `${product.name} quantity increased`,
        });
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      toast({
        title: "Added to Cart",
        description: `${product.name} added to your cart`,
      });
      return [...currentItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((currentItems) => {
      const item = currentItems.find((i) => i.id === productId);
      if (item) {
        toast({
          title: "Removed from Cart",
          description: `${item.name} removed from your cart`,
        });
      }
      return currentItems.filter((item) => item.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('vibeCart');
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        tax,
        shipping,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
