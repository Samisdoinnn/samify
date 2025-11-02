// Analytics tracking utilities

export interface AnalyticsEvent {
  event: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

// Google Analytics 4
export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
  
  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, params);
  }
};

// E-commerce specific events
export const analytics = {
  // Page views
  pageView: (path: string, title: string) => {
    trackEvent('page_view', {
      page_path: path,
      page_title: title
    });
  },

  // Product events
  viewProduct: (productId: string, productName: string, price: number, category: string) => {
    trackEvent('view_item', {
      currency: 'USD',
      value: price,
      items: [{
        item_id: productId,
        item_name: productName,
        item_category: category,
        price: price
      }]
    });
  },

  addToCart: (productId: string, productName: string, price: number, quantity: number = 1) => {
    trackEvent('add_to_cart', {
      currency: 'USD',
      value: price * quantity,
      items: [{
        item_id: productId,
        item_name: productName,
        price: price,
        quantity: quantity
      }]
    });
  },

  removeFromCart: (productId: string, productName: string, price: number, quantity: number = 1) => {
    trackEvent('remove_from_cart', {
      currency: 'USD',
      value: price * quantity,
      items: [{
        item_id: productId,
        item_name: productName,
        price: price,
        quantity: quantity
      }]
    });
  },

  // Checkout events
  beginCheckout: (value: number, items: any[]) => {
    trackEvent('begin_checkout', {
      currency: 'USD',
      value: value,
      items: items
    });
  },

  addShippingInfo: (shippingTier: string) => {
    trackEvent('add_shipping_info', {
      shipping_tier: shippingTier
    });
  },

  addPaymentInfo: (paymentType: string) => {
    trackEvent('add_payment_info', {
      payment_type: paymentType
    });
  },

  purchase: (transactionId: string, value: number, items: any[], shipping: number = 0, tax: number = 0) => {
    trackEvent('purchase', {
      transaction_id: transactionId,
      currency: 'USD',
      value: value,
      shipping: shipping,
      tax: tax,
      items: items
    });
  },

  // Search
  search: (searchTerm: string) => {
    trackEvent('search', {
      search_term: searchTerm
    });
  },

  // Wishlist
  addToWishlist: (productId: string, productName: string, price: number) => {
    trackEvent('add_to_wishlist', {
      currency: 'USD',
      value: price,
      items: [{
        item_id: productId,
        item_name: productName,
        price: price
      }]
    });
  },

  // User actions
  signup: (method: string) => {
    trackEvent('sign_up', {
      method: method
    });
  },

  login: (method: string) => {
    trackEvent('login', {
      method: method
    });
  },

  // Custom events
  shareProduct: (productId: string, method: string) => {
    trackEvent('share', {
      content_type: 'product',
      item_id: productId,
      method: method
    });
  },

  filterProducts: (filterType: string, filterValue: string) => {
    trackEvent('filter_products', {
      filter_type: filterType,
      filter_value: filterValue
    });
  },

  sortProducts: (sortBy: string) => {
    trackEvent('sort_products', {
      sort_by: sortBy
    });
  }
};

// User identification
export const identifyUser = (userId: string, traits: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('set', 'user_properties', {
      user_id: userId,
      ...traits
    });
  }
};

// Set user properties
export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('set', 'user_properties', properties);
  }
};
