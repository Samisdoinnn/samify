'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import GSAPTiltCard from './gsap/GSAPTiltCard';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <GSAPTiltCard className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[3/4]" maxTilt={12}>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {hasDiscount && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{discountPercentage}%
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
      </GSAPTiltCard>
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-900 group-hover:text-accent transition">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1">{product.category}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice!.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
