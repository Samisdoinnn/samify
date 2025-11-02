'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { products } from '@/data/products';
import GSAPStaggerGrid from '../gsap/GSAPStaggerGrid';
import GSAPTiltCard from '../gsap/GSAPTiltCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RecommendationsProps {
  type: 'viewed' | 'bought-together' | 'personalized' | 'trending' | 'similar';
  productId?: string;
  category?: string;
  limit?: number;
  title?: string;
}

export default function RecommendationsEngine({
  type,
  productId,
  category,
  limit = 8,
  title
}: RecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
  }, [type, productId, category]);

  const loadRecommendations = () => {
    setIsLoading(true);
    
    let filtered: Product[] = [];

    switch (type) {
      case 'viewed':
        // Recently viewed products (from localStorage or session)
        const viewedIds = getRecentlyViewed();
        filtered = products.filter(p => viewedIds.includes(p.id)).slice(0, limit);
        break;

      case 'bought-together':
        // Products frequently bought together
        if (productId) {
          const currentProduct = products.find(p => p.id === productId);
          if (currentProduct) {
            filtered = products
              .filter(p => 
                p.category === currentProduct.category && 
                p.id !== productId &&
                Math.abs(p.price - currentProduct.price) < 50
              )
              .slice(0, limit);
          }
        }
        break;

      case 'similar':
        // Similar products based on category and price
        if (productId) {
          const currentProduct = products.find(p => p.id === productId);
          if (currentProduct) {
            filtered = products
              .filter(p => 
                p.category === currentProduct.category && 
                p.id !== productId
              )
              .sort((a, b) => 
                Math.abs(a.price - currentProduct.price) - 
                Math.abs(b.price - currentProduct.price)
              )
              .slice(0, limit);
          }
        }
        break;

      case 'personalized':
        // Personalized recommendations based on user behavior
        const userPreferences = getUserPreferences();
        filtered = products
          .filter(p => 
            !category || p.category === category
          )
          .sort((a, b) => {
            // Simple scoring based on category preference
            const scoreA = userPreferences[a.category] || 0;
            const scoreB = userPreferences[b.category] || 0;
            return scoreB - scoreA;
          })
          .slice(0, limit);
        break;

      case 'trending':
        // Trending products (featured or with discounts)
        filtered = products
          .filter(p => p.featured || (p.originalPrice && p.originalPrice > p.price))
          .slice(0, limit);
        break;

      default:
        filtered = products.slice(0, limit);
    }

    // Fallback if no recommendations found
    if (filtered.length === 0) {
      filtered = products.slice(0, limit);
    }

    setRecommendations(filtered);
    setIsLoading(false);
  };

  const getRecentlyViewed = (): string[] => {
    if (typeof window === 'undefined') return [];
    const viewed = localStorage.getItem('recentlyViewed');
    return viewed ? JSON.parse(viewed) : [];
  };

  const getUserPreferences = (): Record<string, number> => {
    if (typeof window === 'undefined') return {};
    const prefs = localStorage.getItem('userPreferences');
    return prefs ? JSON.parse(prefs) : {};
  };

  const getTitle = () => {
    if (title) return title;
    
    switch (type) {
      case 'viewed':
        return 'Recently Viewed';
      case 'bought-together':
        return 'Frequently Bought Together';
      case 'similar':
        return 'Similar Products';
      case 'personalized':
        return 'Recommended For You';
      case 'trending':
        return 'Trending Now';
      default:
        return 'You May Also Like';
    }
  };

  const itemsPerView = 4;
  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < recommendations.length - itemsPerView;

  const scrollLeft = () => {
    setCurrentIndex(Math.max(0, currentIndex - itemsPerView));
  };

  const scrollRight = () => {
    setCurrentIndex(Math.min(recommendations.length - itemsPerView, currentIndex + itemsPerView));
  };

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">{getTitle()}</h2>
        
        {/* Navigation Arrows (Desktop) */}
        {recommendations.length > itemsPerView && (
          <div className="hidden md:flex gap-2">
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={`p-2 rounded-full border-2 transition ${
                canScrollLeft
                  ? 'border-primary text-primary hover:bg-primary hover:text-white'
                  : 'border-gray-300 text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={`p-2 rounded-full border-2 transition ${
                canScrollRight
                  ? 'border-primary text-primary hover:bg-primary hover:text-white'
                  : 'border-gray-300 text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Products Grid/Carousel */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out gap-6"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
          }}
        >
          {recommendations.map((product) => {
            const hasDiscount = product.originalPrice && product.originalPrice > product.price;
            const discountPercentage = hasDiscount
              ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
              : 0;

            return (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
                <GSAPTiltCard className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 mb-3">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                  {hasDiscount && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{discountPercentage}%
                    </div>
                  )}
                  {product.featured && (
                    <div className="absolute top-3 left-3 bg-primary text-white px-2 py-1 rounded-full text-xs font-bold">
                      Featured
                    </div>
                  )}
                </GSAPTiltCard>
                
                <div>
                  <h3 className="font-semibold text-sm group-hover:text-primary transition line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-primary font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                    {hasDiscount && (
                      <span className="text-xs text-gray-400 line-through">
                        ${product.originalPrice!.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Dots Indicator */}
      {recommendations.length > itemsPerView && (
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {Array.from({ length: Math.ceil(recommendations.length / itemsPerView) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsPerView)}
              className={`w-2 h-2 rounded-full transition ${
                Math.floor(currentIndex / itemsPerView) === index
                  ? 'bg-primary w-6'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}

      {/* View All Link */}
      {category && (
        <div className="text-center mt-8">
          <Link
            href={`/shop?category=${category}`}
            className="inline-block text-primary font-semibold hover:underline"
          >
            View All in {category} →
          </Link>
        </div>
      )}
    </section>
  );
}

// Helper function to track product views
export function trackProductView(productId: string) {
  if (typeof window === 'undefined') return;
  
  const viewed = localStorage.getItem('recentlyViewed');
  const viewedIds: string[] = viewed ? JSON.parse(viewed) : [];
  
  // Add to beginning, remove duplicates, keep last 20
  const updated = [productId, ...viewedIds.filter(id => id !== productId)].slice(0, 20);
  localStorage.setItem('recentlyViewed', JSON.stringify(updated));
}

// Helper function to track user preferences
export function trackUserPreference(category: string) {
  if (typeof window === 'undefined') return;
  
  const prefs = localStorage.getItem('userPreferences');
  const preferences: Record<string, number> = prefs ? JSON.parse(prefs) : {};
  
  preferences[category] = (preferences[category] || 0) + 1;
  localStorage.setItem('userPreferences', JSON.stringify(preferences));
}
