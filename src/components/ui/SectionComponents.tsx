"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * SigilDivider - Animated section divider with mystical line effects
 * 
 * Features:
 * - Animated gradient lines with reveal effect
 * - Pulsing glow and shimmer animations
 * - Two variants: default and primary (thicker lines)
 */
export function SigilDivider({ variant = "default" }: { variant?: "default" | "primary" }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px -15% 0px", amount: 0.45 });
  const isPrimary = variant === "primary";

  const lineGradient =
    "linear-gradient(90deg, rgba(0,0,0,0) 0%, var(--color-brand) 18%, var(--color-accent) 50%, rgba(0,0,0,0) 82%)";

  return (
    <div ref={ref} aria-hidden className="relative z-10 mx-auto h-20 max-w-6xl px-6">
      <div className="absolute inset-x-6 top-1/2 -translate-y-1/2">
        <div
          className={`mx-auto ${isPrimary ? "h-[3px]" : "h-[2px]"} w-full rounded-full`}
          style={{ background: lineGradient, filter: "blur(0.8px)", opacity: 0.22 }}
        />

        <motion.div
          initial={{ scaleX: 0, opacity: 0.75 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0.75 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ transformOrigin: "50% 50%" }}
          className="relative mx-auto mt-[-2px] h-[2px] w-full overflow-visible rounded-full"
        >
          <div className="h-full w-full rounded-full" style={{ background: lineGradient, filter: "blur(1.2px)" }} />
        </motion.div>

        <motion.div
          aria-hidden
          initial={{ opacity: 0.12 }}
          animate={{ opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className={`pointer-events-none mx-auto mt-[3px] ${isPrimary ? "h-[2px]" : "h-[1px]"} w-3/4 rounded-full blur-[4px]`}
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0) 0%, color-mix(in srgb, var(--color-accent) 40%, transparent) 25%, color-mix(in srgb, var(--color-brand) 40%, transparent) 75%, rgba(0,0,0,0) 100%)",
          }}
        />

        <div className="pointer-events-none relative mx-auto mt-[-3px] h-[3px] w-full overflow-hidden">
          <motion.div
            aria-hidden
            initial={{ x: "-33%", opacity: 0.12 }}
            animate={{ x: ["-33%", "33%"], opacity: [0.12, 0.18, 0.12] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute top-0 h-full w-[266%] rounded-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 100%)",
              filter: "blur(2px)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * SectionIntro - Standard section header with title and subtitle
 * 
 * Features:
 * - Staggered reveal animations
 * - Consistent typography and spacing
 * - Centered layout with max-width constraint
 */
export function SectionIntro({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9 }}
        className="text-4xl md:text-5xl font-semibold"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="mx-auto mt-4 max-w-2xl text-lg text-[--color-muted]"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
