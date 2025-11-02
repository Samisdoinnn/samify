'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import GSAPMagneticButton from '../gsap/GSAPMagneticButton';

interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  mobileImage?: string;
  backgroundColor: string;
  textColor: string;
}

const banners: BannerSlide[] = [
  {
    id: '1',
    title: 'Summer Collection 2024',
    subtitle: 'New Arrivals',
    description: 'Discover the latest trends in fashion',
    ctaText: 'Shop Now',
    ctaLink: '/shop',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80',
    backgroundColor: 'from-blue-600 to-purple-600',
    textColor: 'text-white'
  },
  {
    id: '2',
    title: 'Up to 50% Off',
    subtitle: 'Seasonal Sale',
    description: 'Limited time offer on selected items',
    ctaText: 'View Deals',
    ctaLink: '/shop?sale=true',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80',
    backgroundColor: 'from-pink-500 to-rose-500',
    textColor: 'text-white'
  },
  {
    id: '3',
    title: 'Premium Quality',
    subtitle: 'Luxury Collection',
    description: 'Elevate your wardrobe with exclusive pieces',
    ctaText: 'Explore',
    ctaLink: '/shop?category=luxury',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80',
    backgroundColor: 'from-gray-900 to-gray-700',
    textColor: 'text-white'
  }
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const slideRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying]);

  // GSAP animation on slide change
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: 'power3.out' 
        }
      );
    }
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const current = banners[currentSlide];

  return (
    <section 
      className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        <Image
          src={current.image}
          alt={current.title}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${current.backgroundColor} opacity-70`}></div>
      </div>

      {/* Content */}
      <div className="relative h-full container-custom flex items-center">
        <div 
          ref={contentRef}
          className={`max-w-2xl ${current.textColor} z-10`}
        >
          <p className="text-sm md:text-base font-semibold uppercase tracking-wider mb-2 opacity-90">
            {current.subtitle}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
            {current.title}
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            {current.description}
          </p>
          <GSAPMagneticButton 
            className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition inline-block"
            strength={0.3}
          >
            <Link href={current.ctaLink}>
              {current.ctaText}
            </Link>
          </GSAPMagneticButton>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Promotional Badge */}
      {currentSlide === 1 && (
        <div className="absolute top-8 right-8 bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg animate-pulse z-20">
          50% OFF
        </div>
      )}
    </section>
  );
}
