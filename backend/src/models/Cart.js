import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    lineTotal: { type: Number, required: true }
  },
  { _id: true }
);

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String },
    items: { type: [cartItemSchema], default: [] },
    subtotal: { type: Number, default: 0 }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export const Cart = mongoose.model('Cart', cartSchema);


