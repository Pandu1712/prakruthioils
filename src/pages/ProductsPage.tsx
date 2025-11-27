import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { products, categories } from '../data/products';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface ProductsPageProps {
  categoryId: string;
  onBack: () => void;
  onViewDetails: (product: Product) => void;
}

export default function ProductsPage({ categoryId, onBack, onViewDetails }: ProductsPageProps) {
  const [selectedCategory] = useState(categoryId);
  const category = categories.find(c => c.id === categoryId);
  const categoryProducts = products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-50 to-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-lime-600 hover:text-lime-700 font-semibold mb-8 group transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Categories
        </button>

        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {category?.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {category?.description}
          </p>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} onViewDetails={onViewDetails} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No products available in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
