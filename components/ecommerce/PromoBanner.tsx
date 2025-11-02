'use client';

import { useState } from 'react';
import { X, Tag, TrendingUp, Gift } from 'lucide-react';
import Link from 'next/link';
import CountdownTimer from './CountdownTimer';

interface PromoBannerProps {
  type?: 'flash-sale' | 'free-shipping' | 'discount' | 'announcement';
  dismissible?: boolean;
}

export default function PromoBanner({ type = 'flash-sale', dismissible = true }: PromoBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const bannerContent = {
    'flash-sale': {
      icon: <TrendingUp className="w-5 h-5" />,
      text: 'Flash Sale! Up to 50% OFF',
      bgColor: 'bg-gradient-to-r from-red-600 to-pink-600',
      showTimer: true,
      link: '/shop?sale=true'
    },
    'free-shipping': {
      icon: <Gift className="w-5 h-5" />,
      text: 'Free Shipping on Orders Over $50',
      bgColor: 'bg-gradient-to-r from-blue-600 to-cyan-600',
      showTimer: false,
      link: '/shop'
    },
    'discount': {
      icon: <Tag className="w-5 h-5" />,
      text: 'Use code SAVE20 for 20% OFF your first order',
      bgColor: 'bg-gradient-to-r from-purple-600 to-indigo-600',
      showTimer: false,
      link: '/shop'
    },
    'announcement': {
      icon: <TrendingUp className="w-5 h-5" />,
      text: 'New Collection Just Dropped! Shop Now',
      bgColor: 'bg-gradient-to-r from-gray-900 to-gray-700',
      showTimer: false,
      link: '/shop?new=true'
    }
  };

  const content = bannerContent[type];
  const saleEndDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

  return (
    <div className={`${content.bgColor} text-white py-3 px-4 relative`}>
      <div className="container-custom">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {content.icon}
          <span className="font-semibold">{content.text}</span>
          
          {content.showTimer && (
            <CountdownTimer 
              endDate={saleEndDate} 
              showLabels={false}
              size="sm"
            />
          )}
          
          <Link
            href={content.link}
            className="bg-white text-gray-900 px-4 py-1 rounded-full text-sm font-bold hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {dismissible && (
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-white/20 p-1 rounded-full transition"
          aria-label="Close banner"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
