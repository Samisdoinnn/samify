'use client';

import { Package, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface StockIndicatorProps {
  quantity: number;
  lowStockThreshold?: number;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function StockIndicator({ 
  quantity, 
  lowStockThreshold = 5,
  showIcon = true,
  size = 'md'
}: StockIndicatorProps) {
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  if (quantity === 0) {
    return (
      <div className={`flex items-center gap-2 text-red-600 font-semibold ${sizeClasses[size]}`}>
        {showIcon && <AlertCircle className={iconSizes[size]} />}
        <span>Out of Stock</span>
      </div>
    );
  }

  if (quantity <= lowStockThreshold) {
    return (
      <div className={`flex items-center gap-2 text-orange-600 font-semibold ${sizeClasses[size]}`}>
        {showIcon && <Clock className={iconSizes[size]} />}
        <span>Only {quantity} left in stock!</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 text-green-600 font-semibold ${sizeClasses[size]}`}>
      {showIcon && <CheckCircle className={iconSizes[size]} />}
      <span>In Stock</span>
    </div>
  );
}
