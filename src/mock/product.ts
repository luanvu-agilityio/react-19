import { Product } from '@/types';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 199.99,
    description: 'High-quality wireless headphones with noise cancellation',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
    stock: 15,
    rating: 4.8,
    category: 'Audio',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 299.99,
    description: 'Feature-rich smartwatch with health monitoring',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop',
    stock: 8,
    rating: 4.5,
    category: 'Wearables',
  },
  {
    id: '3',
    name: 'Laptop Stand',
    price: 79.99,
    description: 'Ergonomic laptop stand for better posture',
    image:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop',
    stock: 0,
    rating: 4.2,
    category: 'Accessories',
  },

  {
    id: '4',
    name: 'Mechanical Keyboard',
    price: 149.99,
    description: 'RGB mechanical keyboard with Cherry MX switches',
    image:
      'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop',
    stock: 12,
    rating: 4.7,
    category: 'Peripherals',
  },
];
export { mockProducts };
