"use client";

import { useEffect } from 'react';
import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';
import { sendToAnalytics, initPerformanceObserver, useTimeOnPage, useScrollDepth } from '@/lib/analytics';

/**
 * WebVitals - Monitors and reports Core Web Vitals
 * Automatically tracks CLS, FCP, LCP, TTFB, and INP
 * Note: FID has been deprecated in favor of INP (Interaction to Next Paint)
 */
export function WebVitals() {
  useEffect(() => {
    // Track Core Web Vitals
    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
    onINP(sendToAnalytics); // INP replaces FID as the standard interaction metric

    // Initialize performance observers
    initPerformanceObserver();

    // Track time on page
    const timeOnPageCleanup = useTimeOnPage();

    // Track scroll depth
    const scrollDepthCleanup = useScrollDepth();

    // Cleanup function
    return () => {
      if (timeOnPageCleanup) timeOnPageCleanup();
      if (scrollDepthCleanup) scrollDepthCleanup();
    };
  }, []);

  return null; // This component doesn't render anything
}
