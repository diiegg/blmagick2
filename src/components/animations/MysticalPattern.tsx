"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useIsLowPerformance } from "@/hooks/useIsMobile";

export function MysticalPattern() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isLowPerf = useIsLowPerformance();
  
  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Setup intersection observer
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 }
    );
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Adaptive element counts for performance
  const particleCount = isLowPerf ? 4 : 6;
  const pentagramCount = isLowPerf ? 1 : 2;
  const particleFieldCount = isLowPerf ? 12 : 20;

  // If reduced motion is preferred, render static version
  if (prefersReducedMotion) {
    return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none opacity-5" />;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {/* Floating geometric shapes */}
      {isInView && (
        <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern id="hexPattern" x="0" y="0" width="100" height="87" patternUnits="userSpaceOnUse">
            <motion.path
              d="M 50,5 L 80,25 L 80,65 L 50,85 L 20,65 L 20,25 Z"
              fill="none"
              stroke="var(--color-brand)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexPattern)" />
      </svg>
      )}

      {/* Reduced particle count from 12 to 6 for better performance, 4 on mobile */}
      {isInView && [...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-[--color-accent]"
          style={{
            width: `${Math.random() * 120 + 60}px`,
            height: `${Math.random() * 120 + 60}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.1, 0.3, 0.1],
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Rotating pentagrams - reduced from 3 to 2, 1 on mobile */}
      {isInView && [...Array(pentagramCount)].map((i) => (
        <motion.div
          key={`penta-${i}`}
          className="absolute"
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + i * 15}%`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60 + i * 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <svg width="150" height="150" viewBox="0 0 100 100">
            <motion.polygon
              points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
              fill="none"
              stroke="var(--color-brand)"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
          </svg>
        </motion.div>
      ))}

      {/* Particle field - reduced from 30 to 20, 12 on mobile */}
      {isInView && [...Array(particleFieldCount)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-[--color-accent]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}
