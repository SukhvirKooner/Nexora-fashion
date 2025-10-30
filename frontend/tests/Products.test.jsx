import { render, screen } from '@testing-library/react';
import React from 'react';
import Products from '../src/pages/Products.jsx';

vi.mock('../src/api/client.js', () => ({
  api: { getProducts: () => Promise.resolve({ products: [{ id: 'p1', name: 'Mock', price: 100 }] }) }
}));

test('renders product card', async () => {
  render(<Products />);
  expect(await screen.findByText('Mock')).toBeInTheDocument();
});


