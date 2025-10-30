import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../src/server/app.js';
import { Product } from '../src/models/Product.js';

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  process.env.MONGO_URI = uri;
  await mongoose.connect(uri);
  await Product.insertMany([
    { name: 'Test Tee', price: 100, inventory: 10 },
    { name: 'Test Cap', price: 50, inventory: 5 }
  ]);
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongod) await mongod.stop();
});

describe('API', () => {
  test('GET /api/products returns products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.products)).toBe(true);
    expect(res.body.products.length).toBeGreaterThan(0);
  });

  test('POST /api/cart adds item', async () => {
    const products = await Product.find({});
    const p = products[0];
    const res = await request(app).post('/api/cart').send({ productId: String(p._id), qty: 2 });
    expect(res.status).toBe(201);
    expect(res.body.cartItem.qty).toBe(2);
  });

  test('GET /api/cart returns totals', async () => {
    const res = await request(app).get('/api/cart');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('subtotal');
    expect(res.body).toHaveProperty('total');
  });

  test('DELETE /api/cart/:id removes item', async () => {
    const cart = await request(app).get('/api/cart');
    const id = cart.body.cartItems[0].id;
    const del = await request(app).delete(`/api/cart/${id}`);
    expect(del.status).toBe(200);
    const after = await request(app).get('/api/cart');
    expect(after.body.cartItems.find((i) => i.id === id)).toBeFalsy();
  });

  test('POST /api/checkout returns receipt with timestamp', async () => {
    const products = await Product.find({});
    const p = products[0];
    await request(app).post('/api/cart').send({ productId: String(p._id), qty: 1 });
    const res = await request(app)
      .post('/api/checkout')
      .send({ cartItems: [{ productId: String(p._id), qty: 1 }], buyer: { name: 'A', email: 'a@a.com' } });
    expect(res.status).toBe(200);
    expect(res.body.receipt).toBeDefined();
    expect(res.body.receipt.timestamp).toMatch(/Z$/);
  });
});


