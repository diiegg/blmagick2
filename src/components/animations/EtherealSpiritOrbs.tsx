"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function EtherealSpiritOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
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

  // Reduce orb count from 8 to 5 for better performance
  const [orbs] = useState(() =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10, // 10-90% to avoid edges
      y: Math.random() * 80 + 10,
      size: Math.random() * 80 + 40, // 40-120px randomized sizes
      intensity: Math.random() * 0.4 + 0.2, // 0.2-0.6 opacity for better visibility
      speed: Math.random() * 2 + 1, // 1-3x speed multiplier
      phase: Math.random() * Math.PI * 2, // Random starting phase for movement
    }))
  );

  // If reduced motion is preferred, don't render orbs
  if (prefersReducedMotion) {
    return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" />;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {isInView && orbs.map((orb) => (
        <SpiritOrb key={orb.id} {...orb} />
      ))}
    </div>
  );
}

/* ---------- Individual Spirit Orb ---------- */
function SpiritOrb({
  id,
  x: initialX,
  y: initialY,
  size,
  intensity,
  speed,
  phase
}: {
  id: number;
  x: number;
  y: number;
  size: number;
  intensity: number;
  speed: number;
  phase: number;
}) {
  const [isMerging, setIsMerging] = useState(false);
  const [mergeCycle, setMergeCycle] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [currentPosition, setCurrentPosition] = useState({ x: initialX, y: initialY });
  const [targetPosition, setTargetPosition] = useState({ x: initialX, y: initialY });

  // Some orbs have slow breathing aura (30% chance)
  const hasSlowBreathing = id % 3 === 0 || id === 7;

  useEffect(() => {
    // Random merge/split cycles (30% chance every 8-12 seconds)
    const mergeInterval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance
        setIsMerging(true);
        setTimeout(() => {
          setIsMerging(false);
          setMergeCycle(prev => prev + 1);
        }, 3000); // 3 second merge duration
      }
    }, 8000 + Math.random() * 4000); // Every 8-12 seconds

    // Random disappearing/reappearing cycles (like they're alive)
    const disappearInterval = setInterval(() => {
      if (Math.random() < 0.25) { // 25% chance to disappear
        setIsVisible(false);
        setTimeout(() => {
          setIsVisible(true);
          // Change position when reappearing
          setCurrentPosition({
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
          });
        }, 2000 + Math.random() * 3000); // Disappear for 2-5 seconds
      }
    }, 10000 + Math.random() * 8000); // Every 10-18 seconds

    // Random movement cycles - like they're exploring
    const movementInterval = setInterval(() => {
      if (isVisible && Math.random() < 0.4) { // 40% chance to move
        setTargetPosition({
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
        });
      }
    }, 6000 + Math.random() * 6000); // Every 6-12 seconds

    return () => {
      clearInterval(mergeInterval);
      clearInterval(disappearInterval);
      clearInterval(movementInterval);
    };
  }, [isVisible, id]);

  // Gradual position movement
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setCurrentPosition(prev => ({
        x: prev.x + (targetPosition.x - prev.x) * 0.02, // Slow gradual movement
        y: prev.y + (targetPosition.y - prev.y) * 0.02,
      }));
    }, 100);

    return () => clearInterval(moveInterval);
  }, [targetPosition]);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${currentPosition.x}%`,
        top: `${currentPosition.y}%`,
        width: `${size}px`,
        height: `${size}px`,
      }}
      animate={{
        // Gentle floating with sine/cosine wave patterns
        x: [0, Math.sin(phase + id * 0.5) * 30, Math.sin(phase + id * 0.5 + Math.PI) * 20, 0],
        y: [0, Math.cos(phase + id * 0.3) * 25, Math.cos(phase + id * 0.3 + Math.PI) * 30, 0],
        // Smooth scale animations (0.6x to 1x scale)
        scale: isMerging
          ? [1, 0.3, 1.5, 1] // Dramatic merge transformations
          : [0.6, 1, 0.8, 1], // Gentle breathing motion
        // Alive disappearing/appearing effect
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 8 / speed, // Different speeds for each orb
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay: id * 0.7, // Randomized timing to prevent synchronization
        opacity: {
          duration: isVisible ? 1.5 : 2, // Faster appear, slower disappear
          ease: "easeInOut",
        },
      }}
    >
      {/* Breathing Aura - Expands beyond the orb (with slow breathing variant) */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle,
            transparent 40%,
            var(--color-accent) 70%,
            var(--color-brand) 85%,
            transparent 100%
          )`,
          filter: 'blur(16px)',
          transform: 'scale(2)', // Expands beyond the orb
        }}
        animate={{
          opacity: [0, intensity * 0.3, intensity * 0.6, 0],
          scale: hasSlowBreathing
            ? [1.5, 3, 2.5, 1.5] // Slow, deep breathing for some orbs
            : [1.5, 2.5, 2, 1.5], // Normal breathing
        }}
        transition={{
          duration: hasSlowBreathing ? 8 / speed : 5 / speed, // Slower breathing for some
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: id * 0.4,
        }}
      />

      {/* Outer Glow Ring - Multi-layered for depth */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle,
            transparent 20%,
            var(--color-brand) 45%,
            var(--color-accent) 65%,
            transparent 85%
          )`,
          filter: 'blur(8px)',
        }}
        animate={{
          opacity: [intensity * 0.4, intensity * 0.9, intensity * 0.4],
          scale: [0.8, 1.3, 0.8], // Expanding and contracting rings
        }}
        transition={{
          duration: 4 / speed,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: id * 0.2,
        }}
      />

      {/* Inner Pulsing Core - Different intensities */}
      <motion.div
        className="absolute inset-2 rounded-full"
        style={{
          background: `radial-gradient(circle,
            var(--color-accent) 0%,
            var(--color-brand) 35%,
            rgba(110, 142, 248, 0.3) 60%,
            transparent 80%
          )`,
          filter: 'blur(3px)',
        }}
        animate={{
          opacity: isMerging
            ? [intensity * 0.5, intensity * 0.1, intensity * 1.2, intensity * 0.8] // Dramatic merge intensity
            : [intensity * 0.3, intensity * 1, intensity * 0.5, intensity * 0.8], // Breathing with different intensities
          scale: isMerging
            ? [1, 0.1, 2.2, 1] // Dramatic transformations during merge
            : [0.6, 1, 0.7, 1], // Gentle pulsing core
        }}
        transition={{
          duration: 3 / speed,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: id * 0.15,
        }}
      />

      {/* Inner Energy Core - Varying opacity */}
      <motion.div
        className="absolute inset-3 rounded-full"
        style={{
          background: `radial-gradient(circle,
            var(--color-accent) 0%,
            rgba(91, 227, 193, 0.8) 40%,
            transparent 70%
          )`,
          filter: 'blur(1px)',
        }}
        animate={{
          opacity: [intensity * 0.6, intensity * 1.2, intensity * 0.4],
          scale: [0.4, 0.9, 0.6],
        }}
        transition={{
          duration: 2 / speed,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: id * 0.1,
        }}
      />

      {/* Spirit Trail Effect - Rotating color gradients */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from ${id * 45}deg,
            transparent,
            var(--color-brand),
            var(--color-accent),
            transparent,
            rgba(110, 142, 248, 0.3),
            transparent
          )`,
          filter: 'blur(6px)',
        }}
        animate={{
          rotate: 360,
          opacity: isMerging
            ? [0, intensity * 0.8, intensity * 1.2, 0] // Enhanced trails during merge
            : [0, intensity * 0.4, intensity * 0.6, 0],
        }}
        transition={{
          rotate: {
            duration: 12 / speed, // Slower rotation for more mystical effect
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          },
          opacity: {
            duration: 4 / speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: id * 0.5,
          },
        }}
      />

      {/* Additional Trail Layer - For enhanced mystical effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from ${-id * 60}deg,
            rgba(91, 227, 193, 0.2),
            transparent,
            var(--color-accent),
            transparent,
            var(--color-brand),
            transparent
          )`,
          filter: 'blur(4px)',
        }}
        animate={{
          rotate: -360,
          opacity: [0, intensity * 0.3, 0],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          rotate: {
            duration: 15 / speed, // Counter-rotation for complex trails
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          },
          opacity: {
            duration: 6 / speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: id * 0.6,
          },
          scale: {
            duration: 5 / speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: id * 0.3,
          },
        }}
      />

      {/* Alive Energy Pulse - Random bursts of energy */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle,
            var(--color-accent) 0%,
            transparent 50%
          )`,
          filter: 'blur(2px)',
        }}
        animate={{
          opacity: [0, 0, 0, intensity * 1.5, 0], // Random energy bursts
          scale: [0.5, 0.5, 0.5, 2, 0.5],
        }}
        transition={{
          duration: 8 / speed,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeOut",
          delay: id * 1.2 + Math.random() * 3, // Random timing for alive effect
        }}
      />
    </motion.div>
  );
}
