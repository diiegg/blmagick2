"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function MysticalPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {/* Floating geometric shapes */}
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

      {/* Floating circles */}
      {[...Array(12)].map((_, i) => (
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

      {/* Rotating pentagrams */}
      {[0, 1, 2].map((i) => (
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

      {/* Particle field */}
      {[...Array(30)].map((_, i) => (
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
