import express from 'express';
import { z } from 'zod';
import { Cart } from '../models/Cart.js';
import { Product } from '../models/Product.js';
import { Order } from '../models/Order.js';
import { randomUUID } from 'crypto';

const router = express.Router();
const userId = process.env.MOCK_USER_ID || 'mock-user-1';

router.post('/', async (req, res, next) => {
  try {
    const schema = z.object({
      cartItems: z.array(z.object({ productId: z.string(), qty: z.number().int().gt(0) })).min(1),
      buyer: z.object({ name: z.string().min(1), email: z.string().email() })
    });
    const { cartItems, buyer } = schema.parse(req.body);

    const dbProducts = await Product.find({ _id: { $in: cartItems.map((c) => c.productId) } }).lean();
    if (dbProducts.length !== cartItems.length) return res.status(400).json({ error: 'Invalid cart or buyer info' });

    const items = cartItems.map((ci) => {
      const prod = dbProducts.find((p) => String(p._id) === ci.productId);
      const price = Number(prod.price);
      return {
        productId: ci.productId,
        name: prod.name,
        price,
        qty: ci.qty,
        lineTotal: price * ci.qty
      };
    });

    const subtotal = round2(items.reduce((s, i) => s + i.lineTotal, 0));
    const tax = round2(subtotal * 0.09);
    const shipping = subtotal > 0 ? 30 : 0;
    const total = round2(subtotal + tax + shipping);
    const timestamp = new Date();
    const receiptId = `r_${randomUUID().replace(/-/g, '').slice(0, 10)}`;

    await Order.create({ userId, buyer, items, subtotal, tax, shipping, total, timestamp });
    await Cart.findOneAndUpdate({ userId }, { items: [], subtotal: 0 });

    return res.json({
      receipt: {
        receiptId,
        items,
        subtotal,
        tax,
        shipping,
        total,
        timestamp: timestamp.toISOString(),
        buyer
      }
    });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ error: 'Invalid cart or buyer info', details: err.errors });
    next(err);
  }
});

function round2(n) {
  return Math.round(n * 100) / 100;
}

export default router;


