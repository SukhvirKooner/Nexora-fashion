Vibe Commerce Mock Cart

Project overview

Basic full-stack shopping cart for screening. Add/remove items, totals, and mock checkout. No real payments. Includes API, UI, DB, and tests.

Tech stack

- Backend: Node.js, Express, MongoDB (Mongoose)
- Frontend: React + Vite, Tailwind CSS
- Testing: Jest + Supertest (API), React Testing Library, Cypress (e2e)
- CI: GitHub Actions

Prerequisites

- Node.js >= 16
- MongoDB (local) or a MongoDB URI

Environment variables

Create a `.env` in `backend/`:

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/vibe_cart
FAKE_STORE_API=https://fakestoreapi.com/products
```

Seed DB

```
cd backend
npm run seed
```

Run backend

```
cd backend
npm run dev
```

Run frontend

```
cd frontend
npm run dev
```

Run tests

API tests:
```
cd backend
npm test
```

Frontend unit tests:
```
cd frontend
npm test
```

Cypress e2e

```
cd frontend
npm run cypress:open
```

API Endpoints

- GET `/api/products`
- POST `/api/cart` { productId, qty }
- GET `/api/cart`
- DELETE `/api/cart/:id`
- POST `/api/checkout` { cartItems, buyer }

Curl examples

```
curl -X GET http://localhost:4000/api/products
curl -X POST http://localhost:4000/api/cart -H 'Content-Type: application/json' -d '{"productId":"<mongoId>","qty":2}'
curl -X GET http://localhost:4000/api/cart
curl -X DELETE http://localhost:4000/api/cart/<cartItemId>
curl -X POST http://localhost:4000/api/checkout -H 'Content-Type: application/json' -d '{"cartItems":[{"productId":"<mongoId>","qty":2}],"buyer":{"name":"Sukhvir","email":"sukh@example.com"}}'
```

Design notes

- Minimalist, Zara-like aesthetic using Tailwind tokens and a small set of CSS modules.


