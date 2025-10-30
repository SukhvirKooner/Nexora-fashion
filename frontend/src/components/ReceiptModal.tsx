import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { CartItem } from '@/contexts/CartContext';

interface ReceiptData {
  receiptId: string;
  timestamp: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  email: string;
}

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  receipt: ReceiptData;
}

export const ReceiptModal = ({ isOpen, onClose, receipt }: ReceiptModalProps) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Order Confirmation</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4" id="receipt-content">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Receipt ID</span>
              <span className="font-mono">{receipt.receiptId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Date</span>
              <span>{new Date(receipt.timestamp).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Email</span>
              <span>{receipt.email}</span>
            </div>
          </div>

          <div className="border-t border-b border-border py-4">
            <h3 className="font-medium mb-3">Items Purchased</h3>
            <div className="space-y-3">
              {receipt.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-muted-foreground">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${receipt.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>${receipt.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>
                {receipt.shipping === 0 ? 'Free' : `$${receipt.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between pt-3 border-t border-border">
              <span className="font-medium text-lg">Total</span>
              <span className="font-serif text-xl">${receipt.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handlePrint}
              variant="outline"
              className="flex-1"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print Receipt
            </Button>
            <Button onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
