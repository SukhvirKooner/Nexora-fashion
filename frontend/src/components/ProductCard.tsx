import { Product, useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <article className="group relative overflow-hidden">
      <div className="aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:-translate-y-1.5"
          loading="lazy"
        />
      </div>
      
      <div className="mt-4 space-y-2">
        <h3 className="font-sans text-base font-medium tracking-tight">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          ${product.price.toFixed(2)}
        </p>
        
        <Button
          onClick={() => addToCart(product)}
          variant="outline"
          className="w-full mt-3 transition-all hover:bg-primary hover:text-primary-foreground"
        >
          Add to Cart
        </Button>
      </div>
    </article>
  );
};
