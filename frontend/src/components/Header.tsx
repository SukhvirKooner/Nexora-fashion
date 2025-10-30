import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

export const Header = () => {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-2xl font-serif font-bold tracking-tight">
            NEXORA
          </Link>

          <Link
            to="/cart"
            className="relative p-2 hover:bg-muted rounded-sm transition-colors"
            aria-label={`Shopping cart with ${itemCount} items`}
          >
            <ShoppingBag className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
