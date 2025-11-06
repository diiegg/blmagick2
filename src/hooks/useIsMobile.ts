import { useState, useEffect } from 'react';

/**
 * Hook to detect if the user is on a mobile device
 * Uses both viewport width and user agent detection
 * @returns boolean indicating if device is mobile
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check viewport width
    const checkMobile = () => {
      const width = window.innerWidth;
      const isMobileWidth = width < 768; // Tailwind md breakpoint
      
      // Check user agent for mobile devices
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      
      setIsMobile(isMobileWidth || isMobileUA);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

/**
 * Hook to detect if device has limited performance
 * Combines mobile detection with low-end device heuristics
 */
export function useIsLowPerformance(): boolean {
  const [isLowPerf, setIsLowPerf] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Check for performance hints
    const checkPerformance = () => {
      // Check navigator.hardwareConcurrency (CPU cores)
      const cores = navigator.hardwareConcurrency || 2;
      const isLowCore = cores <= 4;

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Check for save-data preference
      const saveData = (navigator as any).connection?.saveData || false;

      setIsLowPerf(isMobile && (isLowCore || prefersReducedMotion || saveData));
    };

    checkPerformance();
  }, [isMobile]);

  return isLowPerf;
}
