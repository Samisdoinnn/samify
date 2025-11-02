'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';

interface SearchResult {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Popular searches
  const popularSearches = ['Dresses', 'Jeans', 'Shoes', 'Jackets', 'Accessories'];

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 1) {
        performSearch(query);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const performSearch = (searchQuery: string) => {
    const filtered = products
      .filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5)
      .map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category
      }));

    setResults(filtered);
    setIsOpen(true);
  };

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Save to recent searches
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      
      // Navigate to search results
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="search"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
          className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-2xl border border-gray-200 max-h-[500px] overflow-y-auto z-50">
          {/* Search Results */}
          {results.length > 0 && (
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">Products</h3>
              <div className="space-y-2">
                {results.map((result) => (
                  <Link
                    key={result.id}
                    href={`/product/${result.id}`}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={result.image}
                        alt={result.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{result.name}</p>
                      <p className="text-xs text-gray-500">{result.category}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">${result.price.toFixed(2)}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {query.length > 1 && results.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-gray-500">No products found for "{query}"</p>
              <button
                onClick={() => handleSearch(query)}
                className="mt-4 text-primary hover:underline text-sm"
              >
                Search anyway
              </button>
            </div>
          )}

          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">Recent Searches</h3>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(search);
                      handleSearch(search);
                    }}
                    className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 rounded-lg text-left transition"
                  >
                    <Search className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          {!query && (
            <div className="p-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search) => (
                  <button
                    key={search}
                    onClick={() => {
                      setQuery(search);
                      handleSearch(search);
                    }}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
