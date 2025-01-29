import ProductList from '../components/ProductList';
import CategoryFilter from '../components/CategoryFilter';
import { Suspense } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">商品展示</h1>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-3">
          <Suspense fallback={<LoadingSpinner />}>
            <CategoryFilter />
          </Suspense>
        </div>
        <div className="md:col-span-9">
          <Suspense fallback={<LoadingSpinner />}>
            <ProductList />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

// app/page.tsx  







