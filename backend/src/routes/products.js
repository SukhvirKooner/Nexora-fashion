import express from 'express';
import NodeCache from 'node-cache';
import { Product } from '../models/Product.js';

const router = express.Router();
const cache = new NodeCache({ stdTTL: 300 });

router.get('/', async (req, res, next) => {
  try {
    const { source } = req.query;
    const localProducts = await Product.find({}).lean();

    if (source !== 'fakestore') {
      return res.json({ products: localProducts.map(mapProductDoc) });
    }

    const cached = cache.get('fakestore');
    let merged = localProducts.map(mapProductDoc);
    if (cached) {
      merged = mergeFake(localProducts, cached);
      return res.json({ products: merged });
    }
    const apiUrl = process.env.FAKE_STORE_API;
    if (!apiUrl) return res.json({ products: merged });

    const resp = await fetch(apiUrl);
    const data = await resp.json();
    const top3 = Array.isArray(data) ? data.slice(0, 3) : [];
    cache.set('fakestore', top3);
    merged = mergeFake(localProducts, top3);
    res.json({ products: merged });
  } catch (err) {
    next(err);
  }
});

function mapProductDoc(p) {
  return {
    id: String(p._id),
    name: p.name,
    price: p.price,
    image: p.image,
    description: p.description,
    inventory: p.inventory
  };
}

function mergeFake(localProducts, fakeItems) {
  const mapped = fakeItems.map((f) => ({
    id: `f_${f.id}`,
    name: f.title || f.name,
    price: Number(f.price) || 0,
    image: f.image || '',
    description: f.description || '',
    inventory: 100
  }));
  return [...localProducts.map(mapProductDoc), ...mapped];
}

export default router;


