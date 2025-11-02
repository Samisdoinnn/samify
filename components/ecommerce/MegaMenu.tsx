'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

interface SubCategory {
  name: string;
  href: string;
}

interface Category {
  name: string;
  href: string;
  subcategories?: SubCategory[];
  featured?: {
    title: string;
    image: string;
    href: string;
  };
}

const categories: Category[] = [
  {
    name: 'Women',
    href: '/shop/women',
    subcategories: [
      { name: 'Dresses', href: '/shop/women/dresses' },
      { name: 'Tops & Blouses', href: '/shop/women/tops' },
      { name: 'Pants & Jeans', href: '/shop/women/pants' },
      { name: 'Skirts', href: '/shop/women/skirts' },
      { name: 'Outerwear', href: '/shop/women/outerwear' },
      { name: 'Activewear', href: '/shop/women/activewear' },
    ],
    featured: {
      title: 'New Summer Collection',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80',
      href: '/shop/women/new'
    }
  },
  {
    name: 'Men',
    href: '/shop/men',
    subcategories: [
      { name: 'Shirts', href: '/shop/men/shirts' },
      { name: 'T-Shirts & Polos', href: '/shop/men/tshirts' },
      { name: 'Pants & Jeans', href: '/shop/men/pants' },
      { name: 'Suits & Blazers', href: '/shop/men/suits' },
      { name: 'Outerwear', href: '/shop/men/outerwear' },
      { name: 'Activewear', href: '/shop/men/activewear' },
    ],
    featured: {
      title: 'Business Casual',
      image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400&q=80',
      href: '/shop/men/business'
    }
  },
  {
    name: 'Accessories',
    href: '/shop/accessories',
    subcategories: [
      { name: 'Bags & Wallets', href: '/shop/accessories/bags' },
      { name: 'Jewelry', href: '/shop/accessories/jewelry' },
      { name: 'Watches', href: '/shop/accessories/watches' },
      { name: 'Sunglasses', href: '/shop/accessories/sunglasses' },
      { name: 'Belts', href: '/shop/accessories/belts' },
      { name: 'Scarves', href: '/shop/accessories/scarves' },
    ],
    featured: {
      title: 'Designer Bags',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
      href: '/shop/accessories/bags/designer'
    }
  },
  {
    name: 'Shoes',
    href: '/shop/shoes',
    subcategories: [
      { name: 'Sneakers', href: '/shop/shoes/sneakers' },
      { name: 'Boots', href: '/shop/shoes/boots' },
      { name: 'Heels', href: '/shop/shoes/heels' },
      { name: 'Flats', href: '/shop/shoes/flats' },
      { name: 'Sandals', href: '/shop/shoes/sandals' },
      { name: 'Athletic', href: '/shop/shoes/athletic' },
    ],
    featured: {
      title: 'Running Shoes',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
      href: '/shop/shoes/running'
    }
  }
];

export default function MegaMenu() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <nav className="hidden lg:block border-b border-gray-200 bg-white">
      <div className="container-custom">
        <ul className="flex items-center space-x-8">
          {categories.map((category) => (
            <li
              key={category.name}
              className="relative group"
              onMouseEnter={() => setActiveCategory(category.name)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <Link
                href={category.href}
                className="flex items-center gap-1 py-4 text-sm font-medium text-gray-700 hover:text-primary transition"
              >
                {category.name}
                <ChevronDown className="w-4 h-4" />
              </Link>

              {/* Mega Menu Dropdown */}
              {activeCategory === category.name && category.subcategories && (
                <div className="absolute left-0 top-full w-screen max-w-4xl bg-white shadow-2xl border-t-2 border-primary z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-8">
                    <div className="grid grid-cols-4 gap-8">
                      {/* Subcategories */}
                      <div className="col-span-3">
                        <h3 className="font-bold text-lg mb-4 text-gray-900">
                          Shop {category.name}
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                          {category.subcategories.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="text-sm text-gray-600 hover:text-primary transition py-2"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                        
                        {/* Quick Links */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <div className="flex gap-4">
                            <Link href={`${category.href}/new`} className="text-sm font-semibold text-primary hover:underline">
                              New Arrivals
                            </Link>
                            <Link href={`${category.href}/sale`} className="text-sm font-semibold text-red-600 hover:underline">
                              Sale Items
                            </Link>
                            <Link href={`${category.href}/trending`} className="text-sm font-semibold text-gray-700 hover:underline">
                              Trending Now
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Featured Item */}
                      {category.featured && (
                        <div className="col-span-1">
                          <Link href={category.featured.href} className="block group">
                            <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
                              <Image
                                src={category.featured.image}
                                alt={category.featured.title}
                                fill
                                className="object-cover group-hover:scale-105 transition duration-300"
                              />
                            </div>
                            <h4 className="font-semibold text-sm text-gray-900 group-hover:text-primary transition">
                              {category.featured.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">Shop Now →</p>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}

          {/* Sale Link */}
          <li>
            <Link
              href="/shop/sale"
              className="py-4 text-sm font-bold text-red-600 hover:text-red-700 transition"
            >
              Sale
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
