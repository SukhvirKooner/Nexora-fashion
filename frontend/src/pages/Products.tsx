import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Product } from '@/contexts/CartContext';
import SidebarFilter from '@/components/SidebarFilter';
import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';
import product4 from '@/assets/product-4.jpg';
import product5 from '@/assets/product-5.jpg';
import product6 from '@/assets/product-6.jpg';
import product7 from '@/assets/product-7.jpg';
import product8 from '@/assets/product-8.jpg';
import product9 from '@/assets/product-9.jpg';
import product10 from '@/assets/product-10.jpg';
import product11 from '@/assets/product-11.jpg';
import product12 from '@/assets/product-12.jpg';
import product13 from '@/assets/product-13.jpg';
import product14 from '@/assets/product-14.jpg';
import product15 from '@/assets/product-15.jpg';
import product16 from '@/assets/product-16.jpg';
import product17 from '@/assets/product-17.jpg';
import product18 from '@/assets/product-18.jpg';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Classic Wool Coat',
    price: 189.99,
    image: product1,
    description: 'Premium wool blend coat with minimalist design',
  },
  {
    id: '2',
    name: 'Tailored Blazer',
    price: 149.99,
    image: product2,
    description: 'Structured blazer in neutral tone',
  },
  {
    id: '3',
    name: 'Cotton Shirt',
    price: 59.99,
    image: product3,
    description: 'Crisp cotton shirt with clean lines',
  },
  {
    id: '4',
    name: 'Slim Fit Trousers',
    price: 89.99,
    image: product4,
    description: 'Modern tailored trousers',
  },
  {
    id: '5',
    name: 'Cashmere Sweater',
    price: 129.99,
    image: product5,
    description: 'Soft cashmere knit sweater',
  },
  {
    id: '6',
    name: 'Leather Ankle Boots',
    price: 199.99,
    image: product6,
    description: 'Italian leather ankle boots',
  },
  {
    id: '7',
    name: 'Silk Blouse',
    price: 79.99,
    image: product7,
    description: 'Flowing silk blouse in neutral shade',
  },
  {
    id: '8',
    name: 'Structured Handbag',
    price: 249.99,
    image: product8,
    description: 'Minimalist leather handbag',
  },
  {
    id: '9',
    name: 'Trench Coat',
    price: 229.99,
    image: product9,
    description: 'Classic beige trench coat',
  },
  {
    id: '10',
    name: 'White Sneakers',
    price: 119.99,
    image: product10,
    description: 'Clean minimalist sneakers',
  },
  {
    id: '11',
    name: 'Leather Belt',
    price: 49.99,
    image: product11,
    description: 'Premium black leather belt',
  },
  {
    id: '12',
    name: 'Denim Jacket',
    price: 139.99,
    image: product12,
    description: 'Classic navy denim jacket',
  },
  {
    id: '13',
    name: 'Knit Scarf',
    price: 44.99,
    image: product13,
    description: 'Soft grey knit scarf',
  },
  {
    id: '14',
    name: 'Cotton T-Shirt',
    price: 29.99,
    image: product14,
    description: 'Essential white cotton tee',
  },
  {
    id: '15',
    name: 'Wide-Leg Trousers',
    price: 99.99,
    image: product15,
    description: 'Modern black wide-leg trousers',
  },
  {
    id: '16',
    name: 'Suede Loafers',
    price: 179.99,
    image: product16,
    description: 'Premium brown suede loafers',
  },
  {
    id: '17',
    name: 'Knit Cardigan',
    price: 109.99,
    image: product17,
    description: 'Cream knit button cardigan',
  },
  {
    id: '18',
    name: 'Designer Sunglasses',
    price: 159.99,
    image: product18,
    description: 'Black frame designer sunglasses',
  },
];

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setProducts(MOCK_PRODUCTS);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((cat) => cat !== category)
        : [...prevSelected, category]
    );
  };

  const filteredProducts = selectedCategories.length > 0
    ? products.filter((product) =>
        selectedCategories.some((category) =>
          product.description.toLowerCase().includes(category.toLowerCase())
        )
      )
    : products;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <div className="lg:w-64 lg:border-r">
          <SidebarFilter selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange} />
        </div>
        <main className="flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="space-y-3 animate-pulse">
                    <div className="aspect-[3/4] bg-muted rounded" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
