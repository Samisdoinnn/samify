'use client';

import { useState, useEffect, useRef } from 'react';
import ProductCard from '../ProductCard';
import { Product } from '@/types';
import { Grid, List, Loader } from 'lucide-react';
import GSAPStaggerGrid from '../gsap/GSAPStaggerGrid';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export default function ProductGrid({ products, loading = false }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);

  const PRODUCTS_PER_PAGE = 12;

  // Initial load
  useEffect(() => {
    setDisplayedProducts(products.slice(0, PRODUCTS_PER_PAGE));
    setHasMore(products.length > PRODUCTS_PER_PAGE);
  }, [products]);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, page]);

  const loadMore = () => {
    const nextPage = page + 1;
    const start = page * PRODUCTS_PER_PAGE;
    const end = start + PRODUCTS_PER_PAGE;
    const newProducts = products.slice(start, end);

    if (newProducts.length > 0) {
      setDisplayedProducts((prev) => [...prev, ...newProducts]);
      setPage(nextPage);
      setHasMore(end < products.length);
    } else {
      setHasMore(false);
    }
  };

  if (loading && displayedProducts.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (displayedProducts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-500 mb-4">No products found</p>
        <p className="text-gray-400">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div>
      {/* View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-600">
          Showing {displayedProducts.length} of {products.length} products
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition ${
              viewMode === 'grid'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            aria-label="Grid view"
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition ${
              viewMode === 'list'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            aria-label="List view"
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <GSAPStaggerGrid
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          stagger={0.1}
        >
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </GSAPStaggerGrid>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="flex gap-4 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition"
            >
              <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{product.description}</p>
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <button className="ml-auto bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loading More */}
      {hasMore && (
        <div ref={observerTarget} className="flex justify-center py-8">
          <Loader className="w-6 h-6 animate-spin text-primary" />
        </div>
      )}

      {/* End Message */}
      {!hasMore && displayedProducts.length > 0 && (
        <p className="text-center text-gray-500 py-8">You've reached the end</p>
      )}
    </div>
  );
}
