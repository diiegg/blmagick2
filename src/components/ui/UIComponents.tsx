"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/**
 * TypewriterText - Animates text with a typewriter effect
 */
export function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsComplete(true);
      }
    }, delay + 50 + Math.random() * 100);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, delay]);

  return (
    <span className={`${!isComplete ? 'typewriter' : ''}`}>
      {displayText}
    </span>
  );
}

/**
 * MysticalCard - Card component with shimmer effect and reveal animation
 */
export function MysticalCard({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={`mystical-card mystical-hover p-6 rounded-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * FloatingCTA - Animated call-to-action button
 */
export function FloatingCTA({
  children,
  href,
  className = "",
  variant = "primary"
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  variant?: "primary" | "ghost";
}) {
  return (
    <motion.a
      href={href}
      className={`floating-cta btn btn-${variant} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.a>
  );
}

/**
 * MysticalInput - Form input with focus glow effect
 */
export function MysticalInput({
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  id,
  name,
  'aria-label': ariaLabel
}: {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  id?: string;
  name?: string;
  'aria-label'?: string;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`mystical-input relative ${isFocused ? 'focused' : ''}`}>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        aria-label={ariaLabel || placeholder}
        className="w-full px-4 py-3 bg-[--color-surface] border border-[--color-border] rounded-lg text-[--color-text] placeholder-[--color-muted] focus:outline-none focus:border-[--color-brand] transition-all duration-300"
      />
      {isFocused && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-[--color-brand]/20 to-[--color-accent]/20 rounded-lg -z-10 blur-sm"
        />
      )}
    </div>
  );
}

/**
 * MysticalTextarea - Form textarea with focus glow effect
 */
export function MysticalTextarea({
  placeholder,
  value,
  onChange,
  rows = 4,
  required = false,
  id,
  name,
  'aria-label': ariaLabel
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  required?: boolean;
  id?: string;
  name?: string;
  'aria-label'?: string;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`mystical-input relative ${isFocused ? 'focused' : ''}`}>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        rows={rows}
        aria-label={ariaLabel || placeholder}
        className="w-full px-4 py-3 bg-[--color-surface] border border-[--color-border] rounded-lg text-[--color-text] placeholder-[--color-muted] focus:outline-none focus:border-[--color-brand] transition-all duration-300 resize-none"
      />
      {isFocused && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-[--color-brand]/20 to-[--color-accent]/20 rounded-lg -z-10 blur-sm"
        />
      )}
    </div>
  );
}

/**
 * PortalImage - Image with portal reveal animation
 */
export function PortalImage({
  src,
  alt,
  className = "",
  delay = 0
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, borderRadius: "50%" }}
      animate={isInView ? { scale: 1, borderRadius: "0.75rem" } : {}}
      transition={{
        duration: 1.2,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={`mystical-portal overflow-hidden ${className}`}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </motion.div>
  );
}

/**
 * CascadingList - List with staggered reveal animations
 */
export function CascadingList({
  items,
  delay = 0
}: {
  items: string[];
  delay?: number;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <ul ref={ref} className="space-y-3">
      {items.map((item, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: delay + index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="mystical-list-item pl-6 relative"
        >
          <div className="w-2 h-2 rounded-full bg-[--color-accent] absolute left-0 top-2" />
          {item}
        </motion.li>
      ))}
    </ul>
  );
}

/**
 * FloatingQuote - Blockquote with 3D rotation reveal
 */
export function FloatingQuote({
  quote,
  author,
  delay = 0
}: {
  quote: string;
  author: string;
  delay?: number;
}) {
  const ref = useRef<HTMLQuoteElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.blockquote
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateY: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{
        duration: 1,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="mystical-quote p-6 rounded-lg italic text-lg"
    >
      <p className="mb-4">"{quote}"</p>
      <footer className="text-[--color-muted] text-sm">— {author}</footer>
    </motion.blockquote>
  );
}

/**
 * ScrollReveal - Generic wrapper for scroll-triggered animations
 */
export function ScrollReveal({
  children,
  direction = "bottom",
  delay = 0,
  className = ""
}: {
  children: React.ReactNode;
  direction?: "left" | "right" | "top" | "bottom";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const getInitialTransform = () => {
    switch (direction) {
      case "left": return { x: -60, y: 0 };
      case "right": return { x: 60, y: 0 };
      case "top": return { x: 0, y: -60 };
      case "bottom": return { x: 0, y: 60 };
      default: return { x: 0, y: 60 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...getInitialTransform() }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * FloatingSocialIcon - Social media icon with hover animation
 */
export function FloatingSocialIcon({
  href,
  icon,
  label
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.2, y: -5 }}
      whileTap={{ scale: 0.9 }}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-[--color-surface] border border-[--color-border] text-[--color-muted] hover:text-[--color-brand] hover:border-[--color-brand]/60 transition-colors"
    >
      {icon}
    </motion.a>
  );
}

/**
 * SuccessAnimation - Success checkmark animation
 */
export function SuccessAnimation({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="absolute inset-0 flex items-center justify-center bg-[--color-bg]/90 backdrop-blur-sm rounded-lg"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.6, times: [0, 0.6, 1] }}
        className="w-20 h-20 rounded-full bg-[--color-accent] flex items-center justify-center"
      >
        <motion.svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[--color-bg]"
        >
          <motion.path
            d="M5 13l4 4L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}
