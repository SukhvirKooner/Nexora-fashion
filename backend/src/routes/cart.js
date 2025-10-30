import express from 'express';
import { z } from 'zod';
import { Cart } from '../models/Cart.js';
import { Product } from '../models/Product.js';

const router = express.Router();
const userId = process.env.MOCK_USER_ID || 'mock-user-1';

router.post('/', async (req, res, next) => {
  try {
    const schema = z.object({ productId: z.string(), qty: z.number().int().gt(0) });
    const { productId, qty } = schema.parse(req.body);

    const product = await Product.findById(productId);
    if (!product) return res.status(400).json({ error: 'Invalid payload or product not found' });

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = await Cart.create({ userId, items: [], subtotal: 0 });

    const existing = cart.items.find((i) => String(i.productId) === String(product._id));
    if (existing) {
      existing.qty = qty;
    existing.lineTotal = Number(product.price) * qty;
    } else {
      cart.items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        qty,
        lineTotal: Number(product.price) * qty
      });
    }

    cart.subtotal = cart.items.reduce((sum, i) => sum + i.lineTotal, 0);
    await cart.save();

    const added = cart.items.find((i) => String(i.productId) === String(product._id));
    res.status(201).json({
      cartItem: {
        id: String(added._id),
        productId: String(added.productId),
        name: added.name,
        price: added.price,
        qty: added.qty,
        lineTotal: added.lineTotal
      }
    });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ error: 'Invalid payload', details: err.errors });
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId });
    const items = cart?.items || [];
    const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
    const tax = round2(subtotal * 0.09);
    const shipping = subtotal > 0 ? 30 : 0;
    const total = round2(subtotal + tax + shipping);
    res.json({
      cartItems: items.map((i) => ({
        id: String(i._id),
        productId: String(i.productId),
        name: i.name,
        price: i.price,
        qty: i.qty,
        lineTotal: i.lineTotal
      })),
      subtotal: round2(subtotal),
      tax,
      shipping,
      total
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart item not found' });
    const before = cart.items.length;
    cart.items = cart.items.filter((i) => String(i._id) !== String(id));
    if (cart.items.length === before) return res.status(404).json({ error: 'Cart item not found' });
    cart.subtotal = cart.items.reduce((s, i) => s + i.lineTotal, 0);
    await cart.save();
    res.json({ success: true, removedId: id });
  } catch (err) {
    next(err);
  }
});

function round2(n) {
  return Math.round(n * 100) / 100;
}

export default router;


