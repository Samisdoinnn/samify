'use client';

import { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/types';
import { products } from '@/data/products';

interface UpsellModalProps {
  trigger?: 'add-to-cart' | 'checkout' | 'exit-intent';
  currentProduct?: Product;
  onClose: () => void;
}

export default function UpsellModal({ trigger = 'add-to-cart', currentProduct, onClose }: UpsellModalProps) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  // Get related/complementary products
  const upsellProducts = currentProduct
    ? products
        .filter(p => 
          p.category === currentProduct.category && 
          p.id !== currentProduct.id &&
          p.price < currentProduct.price * 1.5
        )
        .slice(0, 3)
    : products.slice(0, 3);

  const toggleItem = (productId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedItems(newSelected);
  };

  const totalSavings = upsellProducts
    .filter(p => selectedItems.has(p.id) && p.originalPrice)
    .reduce((sum, p) => sum + (p.originalPrice! - p.price), 0);

  const totalPrice = upsellProducts
    .filter(p => selectedItems.has(p.id))
    .reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Complete Your Look</h2>
            <p className="text-gray-600">Customers who bought this also loved</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Products */}
        <div className="p-6 space-y-4">
          {upsellProducts.map((product) => {
            const isSelected = selectedItems.has(product.id);
            const hasDiscount = product.originalPrice && product.originalPrice > product.price;

            return (
              <div
                key={product.id}
                className={`flex gap-4 p-4 border-2 rounded-xl transition cursor-pointer ${
                  isSelected ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => toggleItem(product.id)}
              >
                <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {hasDiscount && (
                    <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded">
                      SALE
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">{product.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                    {hasDiscount && (
                      <>
                        <span className="text-sm text-gray-400 line-through">
                          ${product.originalPrice!.toFixed(2)}
                        </span>
                        <span className="text-sm text-green-600 font-semibold">
                          Save ${(product.originalPrice! - product.price).toFixed(2)}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition ${
                    isSelected ? 'bg-primary border-primary' : 'border-gray-300'
                  }`}>
                    {isSelected && <Plus className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
          {selectedItems.size > 0 && totalSavings > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <p className="text-green-800 font-semibold text-center">
                🎉 You're saving ${totalSavings.toFixed(2)} with this bundle!
              </p>
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">
              {selectedItems.size} {selectedItems.size === 1 ? 'item' : 'items'} selected
            </span>
            {selectedItems.size > 0 && (
              <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              No Thanks
            </button>
            <button
              onClick={() => {
                // Add selected items to cart
                onClose();
              }}
              disabled={selectedItems.size === 0}
              className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add {selectedItems.size > 0 ? `${selectedItems.size} ` : ''}to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
