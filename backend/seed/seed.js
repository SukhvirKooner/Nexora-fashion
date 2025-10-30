import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from '../src/server/db.js';
import { Product } from '../src/models/Product.js';

const sampleProducts = [
  { name: "Fjallraven Backpack", price: 109.95, image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png", description: "Perfect everyday backpack fits 15-inch laptop.", inventory: 50 },
  { name: "Slim Fit T-Shirt", price: 22.3, image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png", description: "Lightweight and breathable casual shirt.", inventory: 80 },
  { name: "Cotton Jacket", price: 55.99, image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png", description: "Durable outdoor jacket for all seasons.", inventory: 40 },
  { name: "Casual Slim Fit Shirt", price: 15.99, image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png", description: "Comfortable slim-fit casual shirt.", inventory: 70 },
  { name: "Naga Chain Bracelet", price: 695.0, image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png", description: "Gold and silver dragon chain bracelet.", inventory: 15 },
  { name: "Gold Petite Micropave", price: 168.0, image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png", description: "Elegant micropave gold jewelry piece.", inventory: 25 },
  { name: "Princess Ring", price: 9.99, image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png", description: "White gold plated engagement ring.", inventory: 100 },
  { name: "Rose Gold Earrings", price: 10.99, image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png", description: "Rose gold stainless steel earrings.", inventory: 120 },
  { name: "WD 2TB External Drive", price: 64.0, image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png", description: "Portable 2TB USB 3.0 hard drive.", inventory: 35 },
  { name: "SanDisk 1TB SSD", price: 109.0, image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png", description: "Fast internal SATA III SSD.", inventory: 60 },
  { name: "Silicon Power 256GB SSD", price: 109.0, image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_t.png", description: "High-speed 256GB 3D NAND SSD.", inventory: 50 },
  { name: "WD 4TB Gaming Drive", price: 114.0, image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png", description: "External 4TB drive for PlayStation 4.", inventory: 45 },
  { name: "Acer 21.5-inch Monitor", price: 599.0, image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png", description: "Full HD IPS ultra-thin display.", inventory: 20 },
  { name: "Samsung 49-inch Curved Monitor", price: 999.99, image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_t.png", description: "Super ultrawide QLED gaming monitor.", inventory: 10 },
  { name: "3-in-1 Snowboard Jacket", price: 56.99, image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png", description: "Women's waterproof 3-in-1 winter jacket.", inventory: 40 },
  { name: "Faux Leather Biker Jacket", price: 29.95, image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png", description: "Hooded moto-style leather jacket.", inventory: 30 },
  { name: "Women's Rain Jacket", price: 39.99, image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png", description: "Striped hooded waterproof raincoat.", inventory: 60 },
  { name: "Boat Neck Top", price: 9.85, image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_t.png", description: "Soft short sleeve boat neck tee.", inventory: 90 },
  { name: "Moisture-Wick Tee", price: 7.95, image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_t.png", description: "Lightweight breathable V-neck tee.", inventory: 110 },
  { name: "Casual Cotton T-Shirt", price: 12.99, image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png", description: "Soft cotton V-neck casual tee.", inventory: 75 }
]
;

async function run() {
  await connectDB();
  await Product.deleteMany({});
  await Product.insertMany(sampleProducts);
  // eslint-disable-next-line no-console
  console.log('Seeded products:', sampleProducts.length);
  process.exit(0);
}

run().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});


