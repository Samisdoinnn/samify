'use client';

import { useState, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { languages, getLocale, saveLocale } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentLang(getLocale());
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    saveLocale(langCode);
    setIsOpen(false);
    
    // In a real app, this would trigger a full re-render with new translations
    window.location.reload();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition"
      >
        <Globe className="w-5 h-5" />
        <span className="text-sm font-medium">{languages[currentLang].code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
            <div className="p-3 border-b border-gray-200">
              <h3 className="font-semibold text-sm text-gray-900">Select Language</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {Object.values(languages).map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition ${
                    currentLang === lang.code ? 'bg-primary/5' : ''
                  }`}
                >
                  <div className="text-left">
                    <p className="font-medium text-sm">{lang.nativeName}</p>
                    <p className="text-xs text-gray-500">{lang.name}</p>
                  </div>
                  {currentLang === lang.code && (
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
