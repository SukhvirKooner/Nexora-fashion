import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import app from './server/app.js';
import { connectDB } from './server/db.js';

const port = process.env.PORT || 4000;
const server = http.createServer(app);

await connectDB().catch((e) => {
  console.error('DB connection failed', e);
  process.exit(1);
});

server.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});


