'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/animations/ScrollReveal';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <motion.div 
        className="container-custom py-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Add some items to get started!</p>
        <Link
          href="/"
          className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
        >
          Continue Shopping
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="container-custom py-12">
      <motion.h1 
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Shopping Cart
      </motion.h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((item, index) => (
            <motion.div
              key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
              className="flex gap-4 bg-white border border-gray-200 rounded-lg p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1 }}
              layout
            >
              <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <Link href={`/product/${item.product.id}`} className="font-semibold hover:text-accent">
                  {item.product.name}
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  Size: {item.selectedSize} | Color: {item.selectedColor}
                </p>
                <p className="text-lg font-bold mt-2">${item.product.price.toFixed(2)}</p>
              </div>

              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() =>
                    removeItem(item.product.id, item.selectedSize, item.selectedColor)
                  }
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product.id,
                        item.selectedSize,
                        item.selectedColor,
                        item.quantity - 1
                      )
                    }
                    className="p-2 hover:bg-gray-100 transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product.id,
                        item.selectedSize,
                        item.selectedColor,
                        item.quantity + 1
                      )
                    }
                    className="p-2 hover:bg-gray-100 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <ScrollReveal>
            <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${(getTotalPrice() * 1.1).toFixed(2)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-primary text-white text-center py-3 rounded-lg font-semibold hover:bg-opacity-90 transition mb-3"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/"
              className="block w-full text-center py-3 text-gray-600 hover:text-primary transition"
            >
              Continue Shopping
            </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
