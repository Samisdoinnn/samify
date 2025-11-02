'use client';

import { useState } from 'react';
import { X, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  rating: number;
  inStock: boolean;
}

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

const CATEGORIES = ['Shirts', 'Jeans', 'Dresses', 'Shoes', 'Accessories', 'Jackets', 'Sweaters', 'Activewear'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COLORS = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Red', hex: '#EF4444' },
  { name: 'Blue', hex: '#3B82F6' },
  { name: 'Green', hex: '#10B981' },
  { name: 'Yellow', hex: '#F59E0B' },
  { name: 'Purple', hex: '#8B5CF6' },
  { name: 'Pink', hex: '#EC4899' },
];

export default function FilterPanel({ onFilterChange, onClose, isMobile = false }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 500],
    sizes: [],
    colors: [],
    rating: 0,
    inStock: false,
  });

  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    size: true,
    color: true,
    rating: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleArrayFilter = (key: 'categories' | 'sizes' | 'colors', value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    updateFilter(key, updated);
  };

  const clearAllFilters = () => {
    const cleared: FilterState = {
      categories: [],
      priceRange: [0, 500],
      sizes: [],
      colors: [],
      rating: 0,
      inStock: false,
    };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  const activeFilterCount = 
    filters.categories.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.rating > 0 ? 1 : 0) +
    (filters.inStock ? 1 : 0);

  const FilterSection = ({ title, isExpanded, onToggle, children }: any) => (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isExpanded && <div className="mt-4">{children}</div>}
    </div>
  );

  return (
    <div className={`bg-white ${isMobile ? 'h-full' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" />
          <h2 className="text-lg font-bold">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-primary hover:underline"
            >
              Clear all
            </button>
          )}
          {isMobile && onClose && (
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className={`${isMobile ? 'overflow-y-auto h-[calc(100%-140px)]' : ''} p-4`}>
        {/* Categories */}
        <FilterSection
          title="Category"
          isExpanded={expandedSections.category}
          onToggle={() => toggleSection('category')}
        >
          <div className="space-y-2">
            {CATEGORIES.map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => toggleArrayFilter('categories', category)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection
          title="Price Range"
          isExpanded={expandedSections.price}
          onToggle={() => toggleSection('price')}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) =>
                  updateFilter('priceRange', [Number(e.target.value), filters.priceRange[1]])
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Min"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  updateFilter('priceRange', [filters.priceRange[0], Number(e.target.value)])
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Max"
              />
            </div>
            <input
              type="range"
              min="0"
              max="500"
              value={filters.priceRange[1]}
              onChange={(e) =>
                updateFilter('priceRange', [filters.priceRange[0], Number(e.target.value)])
              }
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </FilterSection>

        {/* Sizes */}
        <FilterSection
          title="Size"
          isExpanded={expandedSections.size}
          onToggle={() => toggleSection('size')}
        >
          <div className="flex flex-wrap gap-2">
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => toggleArrayFilter('sizes', size)}
                className={`px-4 py-2 border rounded-lg text-sm font-medium transition ${
                  filters.sizes.includes(size)
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 text-gray-700 hover:border-primary'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Colors */}
        <FilterSection
          title="Color"
          isExpanded={expandedSections.color}
          onToggle={() => toggleSection('color')}
        >
          <div className="flex flex-wrap gap-3">
            {COLORS.map((color) => (
              <button
                key={color.name}
                onClick={() => toggleArrayFilter('colors', color.name)}
                className={`relative w-10 h-10 rounded-full border-2 transition ${
                  filters.colors.includes(color.name)
                    ? 'border-primary scale-110'
                    : 'border-gray-300 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {filters.colors.includes(color.name) && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection
          title="Rating"
          isExpanded={expandedSections.rating}
          onToggle={() => toggleSection('rating')}
        >
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => updateFilter('rating', filters.rating === rating ? 0 : rating)}
                className={`flex items-center gap-2 w-full p-2 rounded-lg transition ${
                  filters.rating === rating ? 'bg-primary/10' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-700">& Up</span>
              </button>
            ))}
          </div>
        </FilterSection>

        {/* In Stock */}
        <div className="py-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => updateFilter('inStock', e.target.checked)}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="text-sm font-medium text-gray-700">In Stock Only</span>
          </label>
        </div>
      </div>

      {/* Mobile Apply Button */}
      {isMobile && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
}
