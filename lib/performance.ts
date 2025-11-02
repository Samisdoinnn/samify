// Performance monitoring utilities

export interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
}

// Report Web Vitals
export const reportWebVitals = (metric: any) => {
  const { name, value, id } = metric;

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`⚡ ${name}:`, value, 'ms');
  }

  // Send to analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', name, {
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      event_category: 'Web Vitals',
      event_label: id,
      non_interaction: true
    });
  }
};

// Performance observer for custom metrics
export class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};

  constructor() {
    if (typeof window !== 'undefined') {
      this.observePerformance();
    }
  }

  private observePerformance() {
    // Observe LCP
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Observe FID
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            this.metrics.fid = entry.processingStart - entry.startTime;
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Observe CLS
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          this.metrics.cls = clsValue;
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.error('Performance Observer error:', e);
      }
    }
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  // Measure custom timing
  measureTiming(name: string, startMark: string, endMark: string) {
    if (typeof window !== 'undefined' && window.performance) {
      try {
        window.performance.measure(name, startMark, endMark);
        const measure = window.performance.getEntriesByName(name)[0];
        return measure.duration;
      } catch (e) {
        console.error('Performance measure error:', e);
        return null;
      }
    }
    return null;
  }

  // Mark a performance point
  mark(name: string) {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(name);
    }
  }

  // Clear marks
  clearMarks(name?: string) {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.clearMarks(name);
    }
  }
}

// Image loading performance
export const trackImageLoad = (imageSrc: string, loadTime: number) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`🖼️ Image loaded: ${imageSrc} in ${loadTime}ms`);
  }

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'image_load', {
      event_category: 'Performance',
      event_label: imageSrc,
      value: Math.round(loadTime)
    });
  }
};

// API call performance
export const trackAPICall = (endpoint: string, duration: number, status: number) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`🌐 API call: ${endpoint} - ${duration}ms (${status})`);
  }

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'api_call', {
      event_category: 'Performance',
      event_label: endpoint,
      value: Math.round(duration),
      status: status
    });
  }
};

// Page load performance
export const getPageLoadMetrics = () => {
  if (typeof window === 'undefined' || !window.performance) {
    return null;
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  
  if (!navigation) return null;

  return {
    dns: navigation.domainLookupEnd - navigation.domainLookupStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    request: navigation.responseStart - navigation.requestStart,
    response: navigation.responseEnd - navigation.responseStart,
    dom: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    load: navigation.loadEventEnd - navigation.loadEventStart,
    total: navigation.loadEventEnd - navigation.fetchStart
  };
};

// Memory usage (if available)
export const getMemoryUsage = () => {
  if (typeof window !== 'undefined' && (performance as any).memory) {
    const memory = (performance as any).memory;
    return {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
      usedPercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
    };
  }
  return null;
};

// Export singleton instance
export const performanceMonitor = new PerformanceMonitor();
