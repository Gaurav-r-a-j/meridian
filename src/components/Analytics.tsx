import React, { useEffect } from 'react';

// Google Analytics 4 Component
export const Analytics: React.FC = () => {
  useEffect(() => {
    // Only load in production
    if (import.meta.env.PROD && import.meta.env.VITE_GA_ID) {
      // Google Analytics 4
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_ID}`;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${import.meta.env.VITE_GA_ID}', {
          page_path: window.location.pathname,
        });
      `;
      document.head.appendChild(script2);

      return () => {
        // Cleanup
        document.head.removeChild(script1);
        document.head.removeChild(script2);
      };
    }
  }, []);

  return null;
};

// Performance monitoring
export const trackPerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const domReady = perfData.domContentLoadedEventEnd - perfData.navigationStart;
        
        // Log to console in development
        if (import.meta.env.DEV) {
          console.log('Performance Metrics:', {
            pageLoadTime: `${pageLoadTime}ms`,
            domReady: `${domReady}ms`,
          });
        }

        // Send to analytics if available
        if (window.gtag) {
          window.gtag('event', 'page_load_time', {
            value: pageLoadTime,
            event_category: 'Performance',
          });
        }
      }, 0);
    });
  }
};

// Track page views
export const trackPageView = (path: string) => {
  if (window.gtag && import.meta.env.PROD) {
    window.gtag('config', import.meta.env.VITE_GA_ID, {
      page_path: path,
    });
  }
};

// Declare gtag on window
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

