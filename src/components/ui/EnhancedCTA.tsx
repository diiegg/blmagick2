"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

/**
 * Enhanced CTA Component with A/B testing support and analytics tracking
 * Uses modern design patterns and accessibility features
 */

interface CTAProps {
  variant?: "primary" | "secondary" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: "arrow" | "sparkles" | "none";
  fullWidth?: boolean;
  analyticsId?: string;
  testVariant?: "A" | "B"; // For A/B testing
  className?: string;
}

export function EnhancedCTA({
  variant = "primary",
  size = "md",
  children,
  onClick,
  href,
  disabled = false,
  loading = false,
  icon = "arrow",
  fullWidth = false,
  analyticsId,
  testVariant = "A",
  className,
}: CTAProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    // Analytics tracking
    if (analyticsId && typeof window !== "undefined") {
      // Track CTA click with variant info
      (window as any).dataLayer?.push({
        event: "cta_click",
        cta_id: analyticsId,
        cta_variant: testVariant,
        cta_text: typeof children === "string" ? children : "",
      });
    }

    onClick?.();
  };

  const variants = {
    primary: "bg-[--color-brand] hover:bg-[--color-brand-hover] text-white shadow-lg shadow-[--color-brand]/20",
    secondary: "bg-[--color-surface] hover:bg-[--color-border] text-[--color-text] border border-[--color-border]",
    ghost: "bg-transparent hover:bg-[--color-surface] text-[--color-brand]",
    gradient: "bg-gradient-to-r from-[--color-brand] to-[--color-accent] hover:shadow-xl hover:shadow-[--color-brand]/30 text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  };

  const iconComponents = {
    arrow: <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />,
    sparkles: <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />,
    none: null,
  };

  const baseClass = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-lg font-medium",
    "transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-brand] focus-visible:ring-offset-2 focus-visible:ring-offset-[--color-bg]",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
    "overflow-hidden isolate",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className
  );

  const content = (
    <>
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          initial={{ width: 0, height: 0, x: ripple.x, y: ripple.y }}
          animate={{
            width: 400,
            height: 400,
            x: ripple.x - 200,
            y: ripple.y - 200,
            opacity: [1, 0],
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Loading spinner */}
      {loading && (
        <motion.div
          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Content */}
      <span className="relative z-10">{children}</span>

      {/* Icon */}
      {!loading && icon !== "none" && (
        <span className="relative z-10">{iconComponents[icon]}</span>
      )}

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
        whileHover={{ translateX: "200%" }}
        transition={{ duration: 0.6 }}
      />
    </>
  );

  if (href && !disabled) {
    return (
      <motion.a
        href={href}
        className={baseClass}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        data-analytics-id={analyticsId}
        data-test-variant={testVariant}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      className={baseClass}
      onClick={handleClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      data-analytics-id={analyticsId}
      data-test-variant={testVariant}
    >
      {content}
    </motion.button>
  );
}

/**
 * CTA Group - for multiple CTAs with consistent spacing
 */
export function CTAGroup({
  children,
  layout = "horizontal",
  align = "center",
  className,
}: {
  children: React.ReactNode;
  layout?: "horizontal" | "vertical";
  align?: "start" | "center" | "end";
  className?: string;
}) {
  const alignClass = {
    start: "justify-start items-start",
    center: "justify-center items-center",
    end: "justify-end items-end",
  };

  return (
    <div
      className={cn(
        "flex gap-4",
        layout === "vertical" ? "flex-col" : "flex-row flex-wrap",
        alignClass[align],
        className
      )}
    >
      {children}
    </div>
  );
}
