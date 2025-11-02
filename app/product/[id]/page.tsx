'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ShoppingCart, Heart, ArrowLeft } from 'lucide-react';
import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';

export default function ProductPage() {
  const params = useParams();
  const product = products.find((p) => p.id === params.id);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/" className="text-accent hover:underline">
          Return to home
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }
    addItem(product, selectedSize, selectedColor);
    alert('Added to cart!');
  };

  return (
    <div className="container-custom py-12">
      <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-8">
        <ArrowLeft className="w-4 h-4" />
        Back to Shop
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 mb-4">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-accent' : ''
                }`}
              >
                <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.category}</p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-gray-700 mb-8">{product.description}</p>

          {/* Size Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3">Size</label>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-2 border rounded-lg font-medium transition ${
                    selectedSize === size
                      ? 'border-accent bg-accent text-white'
                      : 'border-gray-300 hover:border-accent'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold mb-3">Color</label>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-6 py-2 border rounded-lg font-medium transition ${
                    selectedColor === color
                      ? 'border-accent bg-accent text-white'
                      : 'border-gray-300 hover:border-accent'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 bg-primary text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button className="px-6 py-4 border border-gray-300 rounded-lg hover:border-accent transition">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Product Details */}
          <div className="mt-12 border-t pt-8">
            <h3 className="font-semibold mb-4">Product Details</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Premium quality materials</li>
              <li>• Comfortable fit</li>
              <li>• Easy care instructions</li>
              <li>• Free shipping on orders over $100</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
