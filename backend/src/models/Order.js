import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String },
    buyer: {
      name: { type: String, required: true },
      email: { type: String, required: true }
    },
    items: { type: Array, default: [] },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    shipping: { type: Number, required: true },
    total: { type: Number, required: true },
    timestamp: { type: Date, required: true }
  },
  { timestamps: true }
);

export const Order = mongoose.model('Order', orderSchema);


