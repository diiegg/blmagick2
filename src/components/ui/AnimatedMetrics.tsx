"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Clock, Zap, CheckCircle } from "lucide-react";

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
		{ value: 99.9, suffix: "%", label: "Platform Uptime", prefix: "" },
		{ value: 47, suffix: "%", label: "Deployment Speed ↑", prefix: "+" },
		{ value: 120, suffix: "+", label: "Squads Empowered", prefix: "" },
		{ value: 2.3, suffix: "M", label: "Cost Optimized", prefix: "$" },
	];

	return (
		<section className="py-20">
			<div className="section">
				{/* Gradient Card Timeline - Narrative Cards */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.6 }}
					className="max-w-6xl mx-auto mb-24 space-y-6"
				>
					{/* Card 1: Urgency */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-500/20 p-8 cursor-pointer hover:border-red-500/40 transition-all duration-300"
					>
						<div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all duration-500" />
						<div className="relative z-10 flex items-start gap-6">
							<div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
								<Clock className="w-6 h-6 text-red-400" />
							</div>
							<div>
								<div className="text-sm font-semibold text-red-400 mb-2">
									The 2027 Deadline
								</div>
								<p className="text-lg text-gray-200 leading-relaxed">
									The 2027 deadline is real:{" "}
									<span className="text-white font-semibold">
										Gartner says 40% of enterprises will deploy agentic
										automation.
									</span>{" "}
									Will you lead or play catch-up? Get{" "}
									<span className="text-[--color-brand]">
										self-healing infrastructure
									</span>
									,{" "}
									<span className="text-[--color-accent]">AI-powered IDPs</span>
									, and carbon-aware FinOps—
									<span className="font-semibold">live in 12 weeks</span>.
								</p>
							</div>
						</div>
					</motion.div>

					{/* Card 2: Vision */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.4 }}
						className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 p-8 cursor-pointer hover:border-purple-500/40 transition-all duration-300"
					>
						<div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500" />
						<div className="relative z-10 flex items-start gap-6">
							<div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
								<Zap className="w-6 h-6 text-purple-400" />
							</div>
							<div>
								<div className="text-sm font-semibold text-purple-400 mb-2">
									The 10x Multiplier
								</div>
								<p className="text-lg text-gray-200 leading-relaxed">
									Remember when you hired your first 10x engineer? Now imagine{" "}
									<span className="text-white font-semibold">
										100 of them working 24/7
									</span>
									—analyzing logs, remediating incidents, optimizing costs, and
									scaling infrastructure{" "}
									<span className="text-[--color-accent]">
										without human intervention
									</span>
									.
								</p>
							</div>
						</div>
					</motion.div>

					{/* Card 3: Solution */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.6 }}
						className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-900/20 to-teal-900/20 border border-green-500/20 p-8 cursor-pointer hover:border-green-500/40 transition-all duration-300"
					>
						<div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all duration-500" />
						<div className="relative z-10 flex items-start gap-6">
							<div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
								<CheckCircle className="w-6 h-6 text-green-400" />
							</div>
							<div>
								<div className="text-sm font-semibold text-green-400 mb-2">
									The Reality
								</div>
								<p className="text-lg text-gray-200 leading-relaxed">
									That's not science fiction. That's{" "}
									<span className="text-[--color-brand] font-semibold">
										BlackMagickOps' Cognitive Platform Engineering
									</span>
									.
								</p>
							</div>
						</div>
					</motion.div>
				</motion.div>

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

		let startTime: number;
		const duration = 2000;
		const startValue = 0;

		const animate = (currentTime: number) => {
			if (!startTime) startTime = currentTime;
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);

			// Easing function for smooth animation
			const easeOutQuart = 1 - Math.pow(1 - progress, 4);
			const currentValue = startValue + (end - startValue) * easeOutQuart;

			setCount(currentValue);

			if (progress < 1) {
				requestAnimationFrame(animate);
			} else {
				setCount(end);
			}
		};

		requestAnimationFrame(animate);
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
