import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">FASHION</h3>
            <p className="text-gray-400 text-sm">
              Premium clothing and accessories for the modern lifestyle.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/shop" className="hover:text-white transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?category=new" className="hover:text-white transition">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/shop?category=sale" className="hover:text-white transition">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Fashion Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
