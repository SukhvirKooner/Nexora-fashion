import { Minus, Plus, X } from 'lucide-react';
import { CartItem as CartItemType, useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 py-4 border-b border-border">
      <div className="w-20 h-24 flex-shrink-0 overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between">
          <h3 className="font-medium text-sm">{item.name}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 -mt-1"
            onClick={() => removeFromCart(item.id)}
            aria-label={`Remove ${item.name} from cart`}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-1">
          ${item.price.toFixed(2)}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2 border border-border rounded-sm">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-sm w-8 text-center">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <p className="font-medium text-sm">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
