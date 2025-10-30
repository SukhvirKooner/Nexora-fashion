import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import productsRouter from '../routes/products.js';
import cartRouter from '../routes/cart.js';
import checkoutRouter from '../routes/checkout.js';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/checkout', checkoutRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
  console.error(err);
});

export default app;


