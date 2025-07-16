'use client';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Producto } from '@/lib/products';

interface ProductListProps {
  initialProducts: Producto[];
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState<Producto[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/products', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      setProducts(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to refresh products');
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(fetchProducts, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Product Catalog</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchProducts}
            disabled={loading}
            className="fixed bottom-4 right-4 p-3 rounded-full bg-gray-800 text-white shadow-lg dark:bg-gray-200 dark:text-gray-800"
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
          <span className="text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
        </div>
      </div>
      
      {error && (
        <div className="text-red-500 p-4 border border-red-300 rounded mb-4">
          {error}
        </div>
      )}
      
      {products.length === 0 ? (
        <div className="text-gray-500 p-4">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((producto, index) => (
            <ProductCard key={`${producto.qr}-${index}`} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
} 