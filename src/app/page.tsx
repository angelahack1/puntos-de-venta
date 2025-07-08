import ProductList from '@/components/ProductList';
import { getProducts, Producto } from '@/lib/products';
import PageLoadHandler from '@/components/PageLoadHandler';

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
        {error ? (
          <div className="text-red-500 p-4 border border-red-300 rounded">
            {error}
          </div>
        ) : (
          <ProductList initialProducts={products} />
        )}
      </main>
    </PageLoadHandler>
  );
}
