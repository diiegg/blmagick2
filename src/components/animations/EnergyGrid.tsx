"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useIsLowPerformance } from "@/hooks/useIsMobile";

export function EnergyGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isLowPerf = useIsLowPerformance();
  
  // Create grid dimensions - reduce on mobile/low-performance
  const gridSize = 40;
  const [cols, setCols] = useState(isLowPerf ? 15 : 30);
  const [rows, setRows] = useState(isLowPerf ? 10 : 20);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Setup intersection observer to pause when off-screen
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 }
    );
    
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Set dimensions after component mounts (client-side only)
    if (typeof window !== 'undefined') {
      setCols(Math.ceil(window.innerWidth / gridSize) || 30);
      setRows(Math.ceil(window.innerHeight / gridSize) || 20);
    }
  }, []);

  // Generate grid lines with random data flow pulses
  const [pulses, setPulses] = useState<Array<{
    id: number;
    type: 'horizontal' | 'vertical';
    position: number;
    delay: number;
    duration: number;
    intensity: number;
  }>>([]);

  useEffect(() => {
    // Don't generate pulses if reduced motion is preferred or not in view
    if (prefersReducedMotion || !isInView) {
      setPulses([]);
      return;
    }
    
    // Generate random data flow pulses
    const generatePulses = () => {
      const newPulses = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        type: Math.random() > 0.5 ? 'horizontal' : 'vertical' as 'horizontal' | 'vertical',
        position: Math.floor(Math.random() * (Math.random() > 0.5 ? rows : cols)),
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4, // 3-7 seconds
        intensity: 0.3 + Math.random() * 0.4, // 0.3-0.7 intensity
      }));
      setPulses(newPulses);
    };

    generatePulses();

    // Regenerate pulses periodically
    const interval = setInterval(generatePulses, 8000);
    return () => clearInterval(interval);
  }, [cols, rows, prefersReducedMotion, isInView]);

  // If reduced motion is preferred, render static version
  if (prefersReducedMotion) {
    return <div ref={containerRef} className="absolute inset-0 overflow-hidden opacity-5" />;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Vertical Grid Lines */}
      <div className="absolute inset-0">
        {Array.from({ length: cols }, (_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-[--color-brand] to-transparent"
            style={{
              left: `${(i * gridSize)}px`,
              opacity: 0.1,
            }}
            animate={{
              opacity: [0.05, 0.2, 0.05],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Horizontal Grid Lines */}
      <div className="absolute inset-0">
        {Array.from({ length: rows }, (_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-[--color-accent] to-transparent"
            style={{
              top: `${(i * gridSize)}px`,
              opacity: 0.1,
            }}
            animate={{
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 5 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.05,
            }}
          />
        ))}
      </div>

      {/* Data Flow Pulses */}
      {pulses.map((pulse) => (
        <motion.div
          key={pulse.id}
          className={`absolute ${
            pulse.type === 'horizontal'
              ? 'left-0 w-full h-px bg-gradient-to-r from-transparent via-[--color-brand] to-transparent'
              : 'top-0 h-full w-px bg-gradient-to-b from-transparent via-[--color-accent] to-transparent'
          }`}
          style={{
            [pulse.type === 'horizontal' ? 'top' : 'left']: `${pulse.position * gridSize}px`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            opacity: [0, pulse.intensity, pulse.intensity * 0.5, 0],
            scale: pulse.type === 'horizontal'
              ? [1, 1, 1, 1]
              : [1, 1, 1, 1],
          }}
          transition={{
            duration: pulse.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: pulse.delay,
          }}
        />
      ))}

      {/* Grid Intersection Points - Data Nodes */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }, (_, i) => {
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          return (
            <motion.div
              key={`node-${i}`}
              className="absolute w-1 h-1 rounded-full bg-[--color-brand]"
              style={{
                left: `${x}%`,
                top: `${y}%`,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.3 + Math.random() * 2,
              }}
            />
          );
        })}
      </div>

      {/* Energy Flow Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 rounded-full bg-[--color-accent]"
            style={{
              filter: 'blur(1px)',
            }}
            animate={{
              x: [Math.random() * 1200, Math.random() * 1200],
              y: [Math.random() * 800, Math.random() * 800],
              opacity: [0, 0.6, 0],
              scale: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: i * 1.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}
