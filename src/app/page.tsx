import ProductCard from '@/components/ProductCard';
import { getProducts, Producto } from '@/lib/products';
import PageLoadHandler from '@/components/PageLoadHandler';

export default async function Home() {
  let products: Producto[] = [];
  let error: string | null = null;

  try {
    products = await getProducts();
  } catch (err) {
    console.error('Error fetching products:', err);
    error = 'Failed to load products. Please check your database connection.';
  }

  return (
    <PageLoadHandler>
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Product Catalog</h1>
        
        {error ? (
          <div className="text-red-500 p-4 border border-red-300 rounded">
            {error}
          </div>
        ) : products.length === 0 ? (
          <div className="text-gray-500 p-4">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((producto, index) => (
              <ProductCard key={`${producto.qr}-${index}`} producto={producto} />
            ))}
          </div>
        )}
      </main>
    </PageLoadHandler>
  );
}
