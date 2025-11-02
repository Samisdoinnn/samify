'use client';

import { useState, useEffect } from 'react';
import { DollarSign, Check } from 'lucide-react';
import { currencies, getCurrency, saveCurrency } from '@/lib/i18n';

export default function CurrencySwitcher() {
  const [currentCurrency, setCurrentCurrency] = useState('USD');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentCurrency(getCurrency());
  }, []);

  const handleCurrencyChange = (currencyCode: string) => {
    setCurrentCurrency(currencyCode);
    saveCurrency(currencyCode);
    setIsOpen(false);
    
    // In a real app, this would update all prices
    window.location.reload();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition"
      >
        <DollarSign className="w-5 h-5" />
        <span className="text-sm font-medium">{currentCurrency}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
            <div className="p-3 border-b border-gray-200">
              <h3 className="font-semibold text-sm text-gray-900">Select Currency</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {Object.entries(currencies).map(([code, currency]) => (
                <button
                  key={code}
                  onClick={() => handleCurrencyChange(code)}
                  className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition ${
                    currentCurrency === code ? 'bg-primary/5' : ''
                  }`}
                >
                  <div className="text-left">
                    <p className="font-medium text-sm flex items-center gap-2">
                      <span className="text-lg">{currency.symbol}</span>
                      {code}
                    </p>
                    <p className="text-xs text-gray-500">{currency.name}</p>
                  </div>
                  {currentCurrency === code && (
                    <Check className="w-5 h-5 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
