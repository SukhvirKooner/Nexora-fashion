import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartSummary } from '@/components/CartSummary';
import { ReceiptModal } from '@/components/ReceiptModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart, subtotal, tax, shipping, total } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Please add items to your cart before checking out",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const receipt = {
        receiptId: `VB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        items: [...items],
        subtotal,
        tax,
        shipping,
        total,
        email: formData.email,
      };

      setReceiptData(receipt);
      setShowReceipt(true);
      clearCart();

      toast({
        title: "Order Successful",
        description: "Your order has been placed successfully",
      });
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReceiptClose = () => {
    setShowReceipt(false);
    navigate('/');
  };

  if (items.length === 0 && !showReceipt) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-display-lg font-serif mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-sm p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1.5"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-sm text-destructive mt-1.5">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1.5"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-sm text-destructive mt-1.5">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </Button>
              </form>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-sm p-6 sticky top-24">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                <CartSummary />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {receiptData && (
        <ReceiptModal
          isOpen={showReceipt}
          onClose={handleReceiptClose}
          receipt={receiptData}
        />
      )}
    </div>
  );
}
