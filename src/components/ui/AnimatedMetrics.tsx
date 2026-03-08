"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
// Icons removed — urgency cards removed

/**
 * AnimatedMetrics - Displays key performance metrics with count-up animations
 *
 * Features:
 * - Grid layout with responsive columns
 * - Count-up animation when metrics scroll into view
 * - Glass morphism styling with hover effects
 * - Custom easing for smooth number transitions
 * - Gradient card timeline with narrative content
 */
export function AnimatedMetrics() {
	const metrics = [
		{ value: 12, suffix: "", label: "Week Engagements", prefix: "" },
		{ value: 40, suffix: "%+", label: "Cost Reduction Target", prefix: "" },
		{ value: 10, suffix: "x", label: "Deploy Frequency Goal", prefix: "" },
		{ value: 99.9, suffix: "%", label: "SLO Attainment Target", prefix: "" },
	];

	return (
		<section className="py-20">
			<div className="section">
				{/* Metrics Grid */}
				<div className="grid grid-cols-2 gap-6 md:grid-cols-4">
					{metrics.map((metric, i) => (
						<motion.div
							key={metric.label}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 0.6, delay: i * 0.1 }}
							className="glass p-6 text-center group hover:border-[--color-brand]/40 transition-all"
						>
							<CountUpMetric
								end={metric.value}
								prefix={metric.prefix}
								suffix={metric.suffix}
							/>
							<div className="mt-2 text-sm text-[--color-muted] group-hover:text-[--color-text] transition-colors">
								{metric.label}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

/**
 * CountUpMetric - Animates a number from 0 to target value
 *
 * @param end - Target number to count up to
 * @param prefix - Optional prefix (e.g., "$", "+")
 * @param suffix - Optional suffix (e.g., "%", "M", "+")
 */
function CountUpMetric({
	end,
	prefix = "",
	suffix = "",
}: { end: number; prefix?: string; suffix?: string }) {
	const [count, setCount] = useState(0);
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.5 });

	useEffect(() => {
		if (!isInView) return;

		let startTime: number | undefined;
		let frameId: number | null = null;
		const duration = 2000;
		const startValue = 0;

		const animate = (currentTime: number) => {
			if (startTime === undefined) startTime = currentTime;
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);

			// Easing function for smooth animation
			const easeOutQuart = 1 - Math.pow(1 - progress, 4);
			const currentValue = startValue + (end - startValue) * easeOutQuart;

			setCount(currentValue);

			if (progress < 1) {
				frameId = requestAnimationFrame(animate);
			} else {
				setCount(end);
			}
		};

		frameId = requestAnimationFrame(animate);

		return () => {
			if (frameId !== null) cancelAnimationFrame(frameId);
		};
	}, [isInView, end]);

	const displayValue = end % 1 === 0 ? Math.floor(count) : count.toFixed(1);

	return (
		<div
			ref={ref}
			className="text-3xl md:text-4xl font-bold text-[--color-brand]"
		>
			{prefix}
			{displayValue}
			{suffix}
		</div>
	);
}
