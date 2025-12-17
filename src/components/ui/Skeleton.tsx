"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Modern Skeleton Component with shimmer effect
 * Uses CSS custom properties for theming
 */
export function Skeleton({
	className,
	variant = "default",
	...props
}: HTMLMotionProps<"div"> & {
	variant?: "default" | "circular" | "text" | "card";
}) {
	const variants = {
		default: "rounded-lg",
		circular: "rounded-full",
		text: "rounded h-4",
		card: "rounded-xl",
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className={cn(
				"relative overflow-hidden bg-[--color-surface]",
				variants[variant],
				className,
			)}
			{...props}
		>
			<div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
		</motion.div>
	);
}

/**
 * Card Skeleton - For case study cards
 */
export function CardSkeleton() {
	return (
		<div className="glass rounded-xl p-6 space-y-4">
			<Skeleton className="h-48 w-full" variant="card" />
			<div className="space-y-3">
				<Skeleton className="h-6 w-3/4" variant="text" />
				<Skeleton className="h-4 w-full" variant="text" />
				<Skeleton className="h-4 w-5/6" variant="text" />
			</div>
			<div className="flex gap-2">
				<Skeleton className="h-6 w-16" variant="default" />
				<Skeleton className="h-6 w-20" variant="default" />
				<Skeleton className="h-6 w-24" variant="default" />
			</div>
		</div>
	);
}

/**
 * Metrics Skeleton - For animated statistics
 */
export function MetricsSkeleton() {
	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
			{[...Array(4)].map((_, i) => (
				<div key={i} className="text-center space-y-2">
					<Skeleton className="h-12 w-20 mx-auto" variant="text" />
					<Skeleton className="h-4 w-24 mx-auto" variant="text" />
				</div>
			))}
		</div>
	);
}

/**
 * Hero Skeleton - For above-the-fold content
 */
export function HeroSkeleton() {
	return (
		<div className="min-h-screen flex items-center justify-center px-4">
			<div className="max-w-4xl w-full space-y-8 text-center">
				<Skeleton className="h-16 w-3/4 mx-auto" variant="text" />
				<Skeleton className="h-6 w-full mx-auto" variant="text" />
				<Skeleton className="h-6 w-5/6 mx-auto" variant="text" />
				<div className="flex gap-4 justify-center pt-8">
					<Skeleton className="h-12 w-40" variant="default" />
					<Skeleton className="h-12 w-40" variant="default" />
				</div>
			</div>
		</div>
	);
}

/**
 * Form Skeleton - For contact form
 */
export function FormSkeleton() {
	return (
		<div className="space-y-6">
			<div className="grid md:grid-cols-2 gap-6">
				<Skeleton className="h-12 w-full" variant="default" />
				<Skeleton className="h-12 w-full" variant="default" />
			</div>
			<Skeleton className="h-12 w-full" variant="default" />
			<Skeleton className="h-32 w-full" variant="default" />
			<Skeleton className="h-12 w-full" variant="default" />
		</div>
	);
}
