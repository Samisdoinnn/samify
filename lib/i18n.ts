// Internationalization utilities

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  currency: string;
  locale: string;
  rtl?: boolean;
}

export const languages: Record<string, Language> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    currency: 'USD',
    locale: 'en-US'
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    currency: 'EUR',
    locale: 'es-ES'
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    currency: 'EUR',
    locale: 'fr-FR'
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    currency: 'EUR',
    locale: 'de-DE'
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    currency: 'JPY',
    locale: 'ja-JP'
  },
  zh: {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    currency: 'CNY',
    locale: 'zh-CN'
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    currency: 'AED',
    locale: 'ar-SA',
    rtl: true
  }
};

export const currencies = {
  USD: { symbol: '$', name: 'US Dollar', rate: 1 },
  EUR: { symbol: '€', name: 'Euro', rate: 0.92 },
  GBP: { symbol: '£', name: 'British Pound', rate: 0.79 },
  JPY: { symbol: '¥', name: 'Japanese Yen', rate: 149.50 },
  CNY: { symbol: '¥', name: 'Chinese Yuan', rate: 7.24 },
  AED: { symbol: 'د.إ', name: 'UAE Dirham', rate: 3.67 }
};

// Format price with currency
export const formatPrice = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  } catch (error) {
    return `${currencies[currency as keyof typeof currencies]?.symbol || '$'}${amount.toFixed(2)}`;
  }
};

// Convert currency
export const convertCurrency = (
  amount: number,
  fromCurrency: string = 'USD',
  toCurrency: string = 'USD'
): number => {
  if (fromCurrency === toCurrency) return amount;

  const fromRate = currencies[fromCurrency as keyof typeof currencies]?.rate || 1;
  const toRate = currencies[toCurrency as keyof typeof currencies]?.rate || 1;

  return (amount / fromRate) * toRate;
};

// Format date
export const formatDate = (
  date: Date,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };

  return new Intl.DateTimeFormat(locale, defaultOptions).format(date);
};

// Format number
export const formatNumber = (
  number: number,
  locale: string = 'en-US',
  options: Intl.NumberFormatOptions = {}
): string => {
  return new Intl.NumberFormat(locale, options).format(number);
};

// Get browser language
export const getBrowserLanguage = (): string => {
  if (typeof window === 'undefined') return 'en';
  
  const browserLang = navigator.language.split('-')[0];
  return Object.keys(languages).includes(browserLang) ? browserLang : 'en';
};

// Translation keys (simplified - in production, use i18next or similar)
export const translations: Record<string, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'product.addToCart': 'Add to Cart',
    'product.outOfStock': 'Out of Stock',
    'product.inStock': 'In Stock',
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.checkout': 'Checkout',
    'cart.subtotal': 'Subtotal',
    'search.placeholder': 'Search products...',
    'filter.category': 'Category',
    'filter.price': 'Price',
    'filter.size': 'Size',
    'filter.color': 'Color'
  },
  es: {
    'nav.home': 'Inicio',
    'nav.shop': 'Tienda',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',
    'product.addToCart': 'Añadir al Carrito',
    'product.outOfStock': 'Agotado',
    'product.inStock': 'En Stock',
    'cart.title': 'Carrito de Compras',
    'cart.empty': 'Tu carrito está vacío',
    'cart.checkout': 'Pagar',
    'cart.subtotal': 'Subtotal',
    'search.placeholder': 'Buscar productos...',
    'filter.category': 'Categoría',
    'filter.price': 'Precio',
    'filter.size': 'Talla',
    'filter.color': 'Color'
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.shop': 'Boutique',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'product.addToCart': 'Ajouter au Panier',
    'product.outOfStock': 'Rupture de Stock',
    'product.inStock': 'En Stock',
    'cart.title': 'Panier',
    'cart.empty': 'Votre panier est vide',
    'cart.checkout': 'Commander',
    'cart.subtotal': 'Sous-total',
    'search.placeholder': 'Rechercher des produits...',
    'filter.category': 'Catégorie',
    'filter.price': 'Prix',
    'filter.size': 'Taille',
    'filter.color': 'Couleur'
  }
};

// Get translation
export const t = (key: string, lang: string = 'en'): string => {
  return translations[lang]?.[key] || translations['en']?.[key] || key;
};

// Locale storage
export const saveLocale = (locale: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('locale', locale);
  }
};

export const getLocale = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('locale') || getBrowserLanguage();
  }
  return 'en';
};

export const saveCurrency = (currency: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('currency', currency);
  }
};

export const getCurrency = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('currency') || 'USD';
  }
  return 'USD';
};
