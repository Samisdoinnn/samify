'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, X, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { gsap } from 'gsap';

export default function MiniCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, getTotalPrice, getTotalItems } = useCartStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const totalItems = getTotalItems();

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Animate dropdown
  useEffect(() => {
    if (dropdownRef.current && isOpen) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition"
        aria-label="Shopping cart"
      >
        <ShoppingBag className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {totalItems}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="font-bold text-lg">Shopping Cart ({totalItems})</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          {items.length === 0 ? (
            <div className="p-8 text-center">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Link
                href="/shop"
                onClick={() => setIsOpen(false)}
                className="inline-block bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="max-h-96 overflow-y-auto p-4 space-y-4">
                {items.slice(0, 5).map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex gap-3"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.product.id}`}
                        onClick={() => setIsOpen(false)}
                        className="font-medium text-sm hover:text-primary transition line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.selectedSize} / {item.selectedColor}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-semibold">
                          ${item.product.price.toFixed(2)} × {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            removeItem(item.product.id, item.selectedSize, item.selectedColor)
                          }
                          className="text-gray-400 hover:text-red-500 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {items.length > 5 && (
                  <p className="text-sm text-gray-500 text-center">
                    +{items.length - 5} more items
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 space-y-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Subtotal:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-gray-100 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
                >
                  Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
