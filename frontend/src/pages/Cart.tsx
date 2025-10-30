import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartItem } from '@/components/CartItem';
import { CartSummary } from '@/components/CartSummary';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

export default function Cart() {
  const { items } = useCart();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-display-lg font-serif mb-8">Shopping Cart</h1>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-display-md font-serif mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Add some items to get started
              </p>
              <Button asChild>
                <Link to="/">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-card border border-border rounded-sm p-6">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-sm p-6 sticky top-24">
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                  <CartSummary />
                  <Button asChild className="w-full mt-6">
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <Button asChild variant="ghost" className="w-full mt-2">
                    <Link to="/">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
