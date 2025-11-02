'use client';

import { useState } from 'react';
import { Truck, MapPin, Calendar } from 'lucide-react';

interface ShippingEstimatorProps {
  productPrice: number;
  freeShippingThreshold?: number;
}

export default function ShippingEstimator({ 
  productPrice, 
  freeShippingThreshold = 50 
}: ShippingEstimatorProps) {
  const [zipCode, setZipCode] = useState('');
  const [estimatedDays, setEstimatedDays] = useState<number | null>(null);
  const [shippingCost, setShippingCost] = useState<number | null>(null);

  const isFreeShipping = productPrice >= freeShippingThreshold;
  const amountToFreeShipping = freeShippingThreshold - productPrice;

  const calculateShipping = () => {
    // Simulate shipping calculation
    if (zipCode.length >= 5) {
      setEstimatedDays(Math.floor(Math.random() * 3) + 3); // 3-5 days
      setShippingCost(isFreeShipping ? 0 : 5.99);
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <Truck className="w-5 h-5" />
        Shipping Information
      </h3>

      {/* Free Shipping Progress */}
      {!isFreeShipping && amountToFreeShipping > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 mb-2">
            Add <span className="font-bold">${amountToFreeShipping.toFixed(2)}</span> more for FREE shipping!
          </p>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(productPrice / freeShippingThreshold) * 100}%` }}
            />
          </div>
        </div>
      )}

      {isFreeShipping && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 font-semibold flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Congratulations! You qualify for FREE shipping
          </p>
        </div>
      )}

      {/* Zip Code Estimator */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Estimate delivery time
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Enter ZIP code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              maxLength={10}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button
            onClick={calculateShipping}
            disabled={zipCode.length < 5}
            className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Calculate
          </button>
        </div>
      </div>

      {/* Estimated Delivery */}
      {estimatedDays !== null && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Standard Shipping</span>
            <span className="font-semibold">
              {shippingCost === 0 ? 'FREE' : `$${shippingCost!.toFixed(2)}`}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-gray-700">
              Estimated delivery: <span className="font-semibold">{estimatedDays} business days</span>
            </span>
          </div>
          <div className="pt-3 border-t border-gray-200 text-xs text-gray-500">
            * Delivery times may vary based on location and availability
          </div>
        </div>
      )}

      {/* Shipping Options */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between py-2">
          <span className="text-gray-600">📦 Standard (5-7 days)</span>
          <span className="font-semibold">{isFreeShipping ? 'FREE' : '$5.99'}</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-gray-600">⚡ Express (2-3 days)</span>
          <span className="font-semibold">$12.99</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-gray-600">🚀 Overnight (1 day)</span>
          <span className="font-semibold">$24.99</span>
        </div>
      </div>
    </div>
  );
}
