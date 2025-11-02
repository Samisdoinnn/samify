'use client';

import { Shield, Truck, RefreshCw, Lock, Award, Headphones } from 'lucide-react';

interface TrustBadgesProps {
  variant?: 'default' | 'compact' | 'detailed';
  showIcons?: boolean;
}

export default function TrustBadges({ variant = 'default', showIcons = true }: TrustBadgesProps) {
  const badges = [
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% secure transactions',
      color: 'text-green-600'
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over $50',
      color: 'text-blue-600'
    },
    {
      icon: RefreshCw,
      title: 'Easy Returns',
      description: '30-day return policy',
      color: 'text-purple-600'
    },
    {
      icon: Award,
      title: 'Quality Guarantee',
      description: 'Premium products only',
      color: 'text-yellow-600'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Always here to help',
      color: 'text-pink-600'
    },
    {
      icon: Lock,
      title: 'Data Protection',
      description: 'Your privacy matters',
      color: 'text-indigo-600'
    }
  ];

  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-center gap-6 py-4 flex-wrap">
        {badges.slice(0, 3).map((badge, index) => (
          <div key={index} className="flex items-center gap-2">
            {showIcons && <badge.icon className={`w-5 h-5 ${badge.color}`} />}
            <span className="text-sm font-medium text-gray-700">{badge.title}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-8">
        {badges.map((badge, index) => (
          <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-primary transition">
            {showIcons && (
              <div className={`w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3`}>
                <badge.icon className={`w-6 h-6 ${badge.color}`} />
              </div>
            )}
            <h3 className="font-semibold text-gray-900 mb-1">{badge.title}</h3>
            <p className="text-sm text-gray-600">{badge.description}</p>
          </div>
        ))}
      </div>
    );
  }

  // Default variant
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 py-6">
      {badges.map((badge, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          {showIcons && <badge.icon className={`w-8 h-8 ${badge.color} mb-2`} />}
          <span className="text-sm font-medium text-gray-900">{badge.title}</span>
          <span className="text-xs text-gray-500 mt-1">{badge.description}</span>
        </div>
      ))}
    </div>
  );
}
