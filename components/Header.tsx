'use client';

import Link from 'next/link';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useCartStore } from '@/store/cartStore';
import { gsap } from 'gsap';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate header on mount
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' }
      );
    }
  }, []);

  useEffect(() => {
    // Animate mobile menu
    if (mobileMenuRef.current) {
      if (mobileMenuOpen) {
        gsap.fromTo(
          mobileMenuRef.current,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in'
        });
      }
    }
  }, [mobileMenuOpen]);

  return (
    <header 
      ref={headerRef}
      className="sticky top-0 z-50 bg-white border-b border-gray-200"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            FASHION
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-accent transition">
              Home
            </Link>
            <Link href="/shop" className="text-sm font-medium hover:text-accent transition">
              Shop
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-accent transition">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-accent transition">
              Contact
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <User className="w-5 h-5" />
            </button>
            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full transition relative">
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav 
            ref={mobileMenuRef}
            className="md:hidden py-4 border-t border-gray-200 overflow-hidden"
            style={{ height: 0, opacity: 0 }}
          >
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-sm font-medium hover:text-accent transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-sm font-medium hover:text-accent transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium hover:text-accent transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium hover:text-accent transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
