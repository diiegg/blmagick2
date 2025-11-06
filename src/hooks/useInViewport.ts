import { useEffect, useState, RefObject } from 'react';

/**
 * Hook to detect if an element is in viewport
 * Used to pause animations when components are off-screen
 */
export function useInViewport(
  ref: RefObject<HTMLElement>,
  options: IntersectionObserverInit = {}
): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        ...options,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isInView;
}
