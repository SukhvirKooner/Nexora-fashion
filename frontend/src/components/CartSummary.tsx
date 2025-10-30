import { useCart } from '@/contexts/CartContext';

export const CartSummary = () => {
  const { subtotal, tax, shipping, total } = useCart();

  return (
    <div className="space-y-3 py-4">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Subtotal</span>
        <span className="font-medium">${subtotal.toFixed(2)}</span>
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Tax</span>
        <span className="font-medium">${tax.toFixed(2)}</span>
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Shipping</span>
        <span className="font-medium">
          {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
        </span>
      </div>
      
      <div className="pt-3 border-t border-border">
        <div className="flex justify-between">
          <span className="font-medium">Total</span>
          <span className="font-serif text-lg">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
