'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import GSAPTextReveal from '@/components/gsap/GSAPTextReveal';
import GSAPScrollReveal from '@/components/gsap/GSAPScrollReveal';
import GSAPMagneticButton from '@/components/gsap/GSAPMagneticButton';
import GSAPParallax from '@/components/gsap/GSAPParallax';
import GSAPStaggerGrid from '@/components/gsap/GSAPStaggerGrid';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Home() {
  const featuredProducts = products.filter((p) => p.featured);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate hero background orbs
    if (heroRef.current) {
      const orbs = heroRef.current.querySelectorAll('.orb');
      orbs.forEach((orb, index) => {
        gsap.to(orb, {
          y: '+=50',
          x: '+=30',
          duration: 3 + index,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        });
      });
    }
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-[600px] bg-gradient-to-r from-gray-900 to-gray-700 text-white overflow-hidden"
      >
        <GSAPParallax speed={0.5} className="absolute inset-0 opacity-20">
          <div className="orb absolute top-20 left-10 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
          <div className="orb absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="orb absolute top-1/2 left-1/2 w-48 h-48 bg-purple-500 rounded-full blur-3xl"></div>
        </GSAPParallax>
        
        <div className="container-custom h-full flex items-center relative z-10">
          <div className="max-w-2xl">
            <GSAPTextReveal className="text-5xl md:text-6xl font-bold mb-6">
              Discover Your Style
            </GSAPTextReveal>
            
            <GSAPScrollReveal delay={0.5}>
              <p className="text-xl mb-8 text-gray-300">
                Explore our curated collection of premium fashion. From timeless classics to contemporary trends.
              </p>
            </GSAPScrollReveal>

            <GSAPScrollReveal delay={0.8}>
              <GSAPMagneticButton 
                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-accent hover:text-white transition"
                strength={0.4}
              >
                <Link href="/shop" className="flex items-center gap-2">
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </GSAPMagneticButton>
            </GSAPScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container-custom py-20">
        <GSAPScrollReveal>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-gray-600">Handpicked items just for you</p>
            </div>
            <Link
              href="/shop"
              className="text-accent font-semibold hover:underline flex items-center gap-2"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </GSAPScrollReveal>

        <GSAPStaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.15}>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </GSAPStaggerGrid>
      </section>

      {/* Categories */}
      <section className="bg-secondary py-20">
        <div className="container-custom">
          <GSAPScrollReveal>
            <h2 className="text-3xl font-bold mb-12 text-center">Shop by Category</h2>
          </GSAPScrollReveal>
          
          <GSAPStaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-6" stagger={0.08}>
            {['Shirts', 'Jeans', 'Jackets', 'Shoes', 'Dresses', 'Sweaters', 'Blazers', 'Activewear'].map(
              (category) => (
                <Link
                  key={category}
                  href={`/shop?category=${category}`}
                  className="bg-white p-8 rounded-lg text-center hover:shadow-lg transition group block"
                >
                  <h3 className="font-semibold text-lg group-hover:text-accent transition">
                    {category}
                  </h3>
                </Link>
              )
            )}
          </GSAPStaggerGrid>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom py-20">
        <GSAPScrollReveal>
          <div className="bg-primary text-white rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to get special offers, free giveaways, and exclusive deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full text-primary"
              />
              <GSAPMagneticButton className="bg-accent hover:bg-opacity-90 px-8 py-3 rounded-full font-semibold transition">
                Subscribe
              </GSAPMagneticButton>
            </div>
          </div>
        </GSAPScrollReveal>
      </section>
    </div>
  );
}
