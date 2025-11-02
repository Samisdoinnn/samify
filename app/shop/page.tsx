'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { motion } from 'framer-motion';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="container-custom py-12">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Shop All Products</h1>
          <p className="text-gray-600">Discover our complete collection of premium fashion</p>
        </div>
      </ScrollReveal>

      {/* Category Filter */}
      <ScrollReveal delay={0.2}>
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </ScrollReveal>

      {/* Products Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        layout
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
