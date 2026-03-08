"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense } from "react";
// Optimized Framer Motion imports - tree-shakeable (Task 1.1.3)
import { motion } from "framer-motion";
import { useScroll } from "framer-motion";
import { useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	ArrowRight,
	Check,
	CheckCircle,
	ChevronDown,
	Cloud,
	Code,
	Cog,
	Cpu,
	DollarSign,
	Eye,
	Globe,
	Layers,
	Shield,
	Star,
	Target,
	TrendingUp,
	X,
} from "lucide-react";

// Import layout and UI components directly (small bundle size)
import {
	Header,
	Footer,
	SigilDivider,
	TypewriterText,
	MysticalInput,
	MysticalTextarea,
	SuccessAnimation,
	Skeleton,
	ErrorBoundary,
} from "@/components";

// Lazy load below-fold components for better performance (Task 1.1.2)
const AnimatedMetrics = dynamic(() =>
	import("@/components").then((mod) => ({ default: mod.AnimatedMetrics })),
);

const SectionIntro = dynamic(() =>
	import("@/components").then((mod) => ({ default: mod.SectionIntro })),
);

const MysticalCard = dynamic(() =>
	import("@/components").then((mod) => ({ default: mod.MysticalCard })),
);

const PortalImage = dynamic(() =>
	import("@/components").then((mod) => ({ default: mod.PortalImage })),
);

const CascadingList = dynamic(() =>
	import("@/components").then((mod) => ({ default: mod.CascadingList })),
);

const FloatingQuote = dynamic(() =>
	import("@/components").then((mod) => ({ default: mod.FloatingQuote })),
);

const ScrollReveal = dynamic(() =>
	import("@/components").then((mod) => ({ default: mod.ScrollReveal })),
);

const FloatingSocialIcon = dynamic(() =>
	import("@/components").then((mod) => ({ default: mod.FloatingSocialIcon })),
);

const RitualFramework = dynamic(() =>
	import("@/components").then((mod) => ({ default: mod.RitualFramework })),
);

const CardSkeleton = dynamic(() =>
	import("@/components").then((mod) => ({ default: mod.CardSkeleton })),
);

const MetricsSkeleton = dynamic(() =>
	import("@/components").then((mod) => ({ default: mod.MetricsSkeleton })),
);

const EnhancedCTA = dynamic(() =>
	import("@/components").then((mod) => ({ default: mod.EnhancedCTA })),
);

const CTAGroup = dynamic(() =>
	import("@/components").then((mod) => ({ default: mod.CTAGroup })),
);

const CaseSigils = dynamic(() =>
	import("@/components").then((mod) => ({ default: mod.CaseSigils })),
);

const Alliances = dynamic(() =>
	import("@/components").then((mod) => ({ default: mod.Alliances })),
);

const InvocationCTA = dynamic(() =>
	import("@/components").then((mod) => ({ default: mod.InvocationCTA })),
);

// Import security and keyboard navigation utilities
import {
	CSRFProtection,
	RateLimiter,
	InputSanitizer,
	useHoneypot,
} from "@/lib/formSecurity";
import { useFocusVisible } from "@/hooks/useKeyboardNavigation";

// Import analytics and monitoring
import { WebVitals } from "@/components/analytics/WebVitals";
// Import image utilities for progressive loading (Task 1.1.4)
import { generateBlurDataURL } from "@/lib/imageUtils";

// Lazy load heavy animation components for better performance
const EnergyGrid = dynamic(
	() =>
		import("@/components/animations/EnergyGrid").then((mod) => ({
			default: mod.EnergyGrid,
		})),
	{
		ssr: false,
		loading: () => <Skeleton className="h-full w-full" />,
	},
);

const MysticalPattern = dynamic(
	() =>
		import("@/components/animations/MysticalPattern").then((mod) => ({
			default: mod.MysticalPattern,
		})),
	{
		ssr: false,
		loading: () => <Skeleton className="h-64 w-full" />,
	},
);

const EtherealSpiritOrbs = dynamic(
	() =>
		import("@/components/animations/EtherealSpiritOrbs").then((mod) => ({
			default: mod.EtherealSpiritOrbs,
		})),
	{
		ssr: false,
		loading: () => null,
	},
);

/** Terminal line animation for hero section */
function TerminalLine({
	delay,
	prompt,
	command,
	result,
	success,
	subtle,
	highlight,
}: {
	delay: number;
	prompt: string;
	command: string;
	result?: string;
	success?: boolean;
	subtle?: boolean;
	highlight?: boolean;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, x: -10 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.4, delay }}
			className={`flex items-center gap-2 ${subtle ? "text-[--color-muted]/60" : ""} ${highlight ? "text-[--color-accent] font-semibold" : ""}`}
		>
			{prompt && (
				<span
					className={
						success ? "text-[--color-success]" : "text-[--color-muted]"
					}
				>
					{prompt}
				</span>
			)}
			{command && (
				<span
					className={success ? "text-[--color-success]" : "text-[--color-text]"}
				>
					{command}
				</span>
			)}
			{result && <span>{result}</span>}
		</motion.div>
	);
}

export default function Home() {
	const pageRef = useRef<HTMLDivElement>(null);
	const { scrollY } = useScroll({ container: undefined });
	const haloShift = useTransform(scrollY, [0, 800], [0, 60]);

	return (
		<>
			{/* Web Vitals Monitoring */}
			<WebVitals />
			<main
				id="main-content"
				ref={pageRef}
				className="relative z-20 overflow-x-hidden bg-[--color-bg] text-[--color-text] selection:bg-[--color-brand]/20"
			>
				{/* Ambient halos */}
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0"
				>
					<motion.div
						style={{ y: haloShift }}
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 2, ease: "easeOut" }}
						className="absolute top-[-25%] left-[-10%] h-[45rem] w-[45rem] rounded-full bg-[--halo-brand] blur-[120px]"
					/>
				</div>

				{/* Header */}
				<Header />

				{/* Energy Grid Background - Subtle animated grid */}
				<div className="fixed inset-0 pointer-events-none z-0 opacity-10">
					<ErrorBoundary>
						<Suspense fallback={null}>
							<EnergyGrid />
						</Suspense>
					</ErrorBoundary>
				</div>

				{/* Main Content */}
				{/* Hero */}
				<section className="relative min-h-screen pt-16 overflow-hidden">
					{/* Background Mystical Pattern - Subtle */}
					<div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
						<ErrorBoundary>
							<Suspense fallback={null}>
								<MysticalPattern />
							</Suspense>
						</ErrorBoundary>
					</div>

					{/* Ethereal Spirit Orbs - Full Hero Background */}
					<div className="absolute inset-0 overflow-hidden pointer-events-none">
						<ErrorBoundary>
							<Suspense fallback={null}>
								<EtherealSpiritOrbs />
							</Suspense>
						</ErrorBoundary>
					</div>

					<div className="section relative z-10 min-h-screen flex items-center">
						<div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center w-full">
							{/* Left Column - Main Content */}
							<div className="lg:col-span-3 space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
								{/* Main Headline - Pain-led */}
								<h1 className="text-5xl leading-tight tracking-tight md:text-7xl md:leading-[1.05] lg:text-left text-center">
									<span className="text-[--color-text]">
										Your Infrastructure
									</span>
									<br />
									<span className="text-[--color-text]">
										Is Holding You Back.
									</span>
								</h1>
								{/* Main Description */}
								<p className="text-xl text-[--color-muted] max-w-2xl lg:text-left text-center">
									Slow deploys. Runaway cloud costs. Engineers stuck writing
									YAML instead of features.{" "}
									<strong className="font-semibold text-[--color-text]">
										We build internal platforms that fix all three
									</strong>
									—with self-healing infrastructure, developer self-service, and
									FinOps automation.{" "}
									<strong className="font-semibold text-[--color-brand]">
										Delivered in 12 weeks.
									</strong>
								</p>
								{/* Industry benchmarks instead of fake testimonial */}
								<div className="glass-enhanced p-4 rounded-lg border-l-4 border-[--color-accent] mt-6">
									<p className="text-sm font-semibold text-[--color-accent] mb-2">
										Typical targets based on DORA / FinOps Foundation benchmarks
									</p>
									<div className="grid grid-cols-3 gap-4 text-center">
										<div>
											<div className="text-lg font-bold text-[--color-brand]">
												10x
											</div>
											<div className="text-xs text-[--color-muted]">
												Deploy Frequency
											</div>
										</div>
										<div>
											<div className="text-lg font-bold text-[--color-brand]">
												40-60%
											</div>
											<div className="text-xs text-[--color-muted]">
												Cloud Cost Reduction
											</div>
										</div>
										<div>
											<div className="text-lg font-bold text-[--color-brand]">
												&lt;1hr
											</div>
											<div className="text-xs text-[--color-muted]">
												Lead Time for Changes
											</div>
										</div>
									</div>
								</div>
								{/* Primary CTAs */}
								<div className="flex flex-wrap gap-4 lg:justify-start justify-center mt-8">
									<EnhancedCTA
										href="#contact"
										className="px-8 py-4 text-lg"
										variant="primary"
										analyticsId="hero-free-assessment"
										testVariant="A"
									>
										Free Infrastructure Assessment
									</EnhancedCTA>
									<EnhancedCTA
										href="#disciplines"
										className="px-8 py-4 text-lg"
										variant="ghost"
										analyticsId="hero-see-how-it-works"
									>
										See How It Works
									</EnhancedCTA>
								</div>
							</div>

							{/* Right Column - Terminal Animation */}
							<div className="hidden lg:block lg:col-span-2 relative z-10 animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
								<div className="glass p-0 relative z-10 backdrop-blur-md rounded-xl overflow-hidden border border-[--color-border]">
									{/* Terminal header */}
									<div className="flex items-center gap-2 px-4 py-3 bg-[--color-surface] border-b border-[--color-border]">
										<div className="w-3 h-3 rounded-full bg-red-500/60" />
										<div className="w-3 h-3 rounded-full bg-yellow-500/60" />
										<div className="w-3 h-3 rounded-full bg-green-500/60" />
										<span className="ml-2 text-xs text-[--color-muted] font-mono">
											blackmagickops ~ platform
										</span>
									</div>
									{/* Terminal body */}
									<div className="p-6 font-mono text-sm space-y-3">
										<TerminalLine
											delay={0.5}
											prompt="$"
											command="bmops deploy --env staging --stack python-api"
										/>
										<TerminalLine
											delay={1.5}
											prompt=""
											command=""
											result="Provisioning infrastructure..."
											subtle
										/>
										<TerminalLine
											delay={2.5}
											prompt="✓"
											command="Infrastructure ready (38s)"
											success
										/>
										<TerminalLine
											delay={3.2}
											prompt="✓"
											command="Security scan passed"
											success
										/>
										<TerminalLine
											delay={3.6}
											prompt="i"
											command="Build provenance: SLSA Level 3"
										/>
										<TerminalLine
											delay={3.9}
											prompt="✓"
											command="SLO dashboard configured"
											success
										/>
										<TerminalLine
											delay={4.6}
											prompt="✓"
											command="Monitoring & alerts active"
											success
										/>
										<TerminalLine
											delay={5.3}
											prompt=""
											command=""
											result="→ staging.your-app.com is live"
											highlight
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<SigilDivider variant="primary" />

				{/* Animated Metrics */}
				<AnimatedMetrics />

				{/* Disciplines - Enhanced with Tabbed Interface */}
				<section
					id="disciplines"
					className="py-28"
					aria-labelledby="disciplines-heading"
				>
					<div className="section">
						<SectionIntro
							title="Core Disciplines"
							subtitle="Each engagement blends infrastructure mastery, automation, and disciplined execution."
							headingId="disciplines-heading"
						/>

						{/* Executive Summary - 3 bullets max */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.8 }}
							className="mt-12 max-w-4xl mx-auto"
						>
							<div className="glass-premium p-8 rounded-2xl">
								<h3 className="text-xl font-semibold mb-6 text-center">
									What We Actually Do
								</h3>
								<div className="grid md:grid-cols-3 gap-6">
									<div className="flex items-start gap-3">
										<div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-[--color-brand]"></div>
										<p className="text-[--color-muted] leading-relaxed">
											We build{" "}
											<strong className="text-[--color-text]">
												internal platforms
											</strong>{" "}
											so developers self-serve
										</p>
									</div>
									<div className="flex items-start gap-3">
										<div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-[--color-accent]"></div>
										<p className="text-[--color-muted] leading-relaxed">
											We automate{" "}
											<strong className="text-[--color-text]">
												incident response
											</strong>{" "}
											so you sleep through alerts
										</p>
									</div>
									<div className="flex items-start gap-3">
										<div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-[--color-success]"></div>
										<p className="text-[--color-muted] leading-relaxed">
											We cut{" "}
											<strong className="text-[--color-text]">
												cloud costs 40-60%
											</strong>{" "}
											without sacrificing performance
										</p>
									</div>
								</div>
							</div>
						</motion.div>

						<div className="mt-16">
							<TabbedInterface
								tabs={[
									{
										label: "Cognitive IDP",
										icon: <Shield className="w-4 h-4" />,
										content: (
											<div className="asymmetric-grid">
												<div className="space-y-6">
													<MysticalCard className="neomorphic">
														<div className="flex items-center gap-4 mb-6">
															<div className="text-5xl">🧠</div>
															<div>
																<h3 className="text-2xl font-semibold">
																	Cognitive IDP
																</h3>
																<p className="text-[--color-muted]">
																	Your developers' time back. Instantly.
																</p>
															</div>
														</div>

														{/* Problem-Solving: Hard Way vs BlackMagickOps Way */}
														<div className="glass-enhanced p-6 rounded-lg space-y-4 mb-6">
															<div className="border-l-4 border-red-500 pl-4">
																<h4 className="font-semibold text-red-400 mb-2">
																	The Hard Way
																</h4>
																<p className="text-sm text-[--color-muted]">
																	Your developers waste 40% of their sprint
																	wrestling with{" "}
																	<TechTerm
																		term="YAML"
																		definition="YAML Ain't Markup Language - config file format"
																	/>{" "}
																	configs, hunting down microservice owners, and
																	waiting 3 days for infrastructure tickets.
																</p>
															</div>

															<div className="border-l-4 border-[--color-brand] pl-4">
																<h4 className="font-semibold text-[--color-brand] mb-2">
																	The BlackMagickOps Way
																</h4>
																<p className="text-sm text-[--color-muted]">
																	Ask your{" "}
																	<TechTerm
																		term="IDP"
																		definition="Internal Developer Platform - self-service portal for devs"
																	/>
																	:{" "}
																	<span className="italic">
																		"Deploy a Python API with Redis caching and
																		PostgreSQL on production-similar staging."
																	</span>
																</p>
																<p className="text-sm text-[--color-muted] mt-2">
																	<span className="font-semibold text-[--color-accent]">
																		Three minutes later
																	</span>
																	, it's live—with golden-path guardrails,
																	automatic SBOM generation, and{" "}
																	<TechTerm
																		term="SLO"
																		definition="Service Level Objective - reliability targets"
																	/>{" "}
																	dashboards configured.
																</p>
															</div>
														</div>

														{/* Value Proposition: Outcomes */}
														<div className="space-y-3 mb-6">
															<h4 className="font-semibold">What Changes:</h4>
															<ul className="space-y-2">
																<li className="flex items-start gap-3">
																	<CheckCircle className="w-5 h-5 text-[--color-success] mt-0.5" />
																	<span>MTTR drops from days to minutes</span>
																</li>
																<li className="flex items-start gap-3">
																	<CheckCircle className="w-5 h-5 text-[--color-success] mt-0.5" />
																	<span>Developer NPS jumps 40+ points</span>
																</li>
																<li className="flex items-start gap-3">
																	<CheckCircle className="w-5 h-5 text-[--color-success] mt-0.5" />
																	<span>
																		Platform teams become force multipliers, not
																		bottlenecks
																	</span>
																</li>
															</ul>
														</div>

														<div className="text-xs text-[--color-muted] border-t border-[--color-border] pt-4">
															<strong>Tech Reality Check:</strong> Backstage +
															LangChain + Vector embeddings +{" "}
															<TechTerm
																term="Kubernetes CRDs"
																definition="Custom Resource Definitions - extend K8s with custom objects"
															/>
														</div>
													</MysticalCard>
												</div>
												<div className="mystical-pattern bg-opacity-20 rounded-2xl p-6 glass-enhanced cursor-pointer hover:bg-opacity-30 transition-all duration-200 ease-out">
													<h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
														<Cpu className="w-5 h-5 text-[--color-brand]" />
														The AI Stack
													</h4>
													<div className="space-y-6">
														{/* Core Platform */}
														<div>
															<h5 className="text-xs uppercase tracking-wider text-[--color-brand] mb-3 font-semibold">
																Core Platform
															</h5>
															<div className="grid grid-cols-2 gap-3">
																{[
																	"Backstage IDP",
																	"Kubernetes",
																	"ArgoCD",
																	"Crossplane",
																].map((tech) => (
																	<div
																		key={tech}
																		className="chip icon-hover text-center text-sm"
																	>
																		{tech}
																	</div>
																))}
															</div>
														</div>

														{/* AI & LLM Layer */}
														<div>
															<h5 className="text-xs uppercase tracking-wider text-[--color-accent] mb-3 font-semibold">
																AI & LLM Layer
															</h5>
															<div className="grid grid-cols-2 gap-3">
																{[
																	"LangChain",
																	"Vector DB",
																	"OpenAI",
																	"Anthropic",
																].map((tech) => (
																	<div
																		key={tech}
																		className="chip icon-hover text-center text-sm"
																	>
																		{tech}
																	</div>
																))}
															</div>
														</div>

														{/* Observability */}
														<div>
															<h5 className="text-xs uppercase tracking-wider text-[--color-muted] mb-3 font-semibold">
																Observability
															</h5>
															<div className="grid grid-cols-2 gap-3">
																{[
																	"Prometheus",
																	"Grafana",
																	"OpenTelemetry",
																	"Jaeger",
																].map((tech) => (
																	<div
																		key={tech}
																		className="chip icon-hover text-center text-sm"
																	>
																		{tech}
																	</div>
																))}
															</div>
														</div>
													</div>
												</div>
											</div>
										),
									},
									{
										label: "Agentic Workflows",
										icon: <Cog className="w-4 h-4" />,
										content: (
											<div className="asymmetric-grid">
												<div className="space-y-6">
													<MysticalCard className="neomorphic">
														<div className="flex items-center gap-4 mb-6">
															<div className="text-5xl">🤖</div>
															<div>
																<h3 className="text-2xl font-semibold">
																	Agentic Workflows
																</h3>
																<p className="text-[--color-muted]">
																	L1 Support That Never Sleeps
																</p>
															</div>
														</div>

														{/* Competitive Comparison */}
														<div className="grid md:grid-cols-2 gap-4 mb-6">
															<div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
																<h4 className="font-semibold text-red-400 mb-2">
																	Industry Standard
																</h4>
																<ol className="text-sm text-[--color-muted] space-y-1">
																	<li>1. PagerDuty wakes you at 3 AM</li>
																	<li>2. You SSH into prod</li>
																	<li>3. Panic. Roll back. Hope.</li>
																</ol>
															</div>

															<div className="p-4 rounded-lg bg-[--color-brand]/10 border border-[--color-brand]/20">
																<h4 className="font-semibold text-[--color-brand] mb-2">
																	BlackMagickOps Standard
																</h4>
																<p className="text-sm text-[--color-muted] mb-2">
																	Your agentic L1 support{" "}
																	<span className="font-semibold">already</span>
																	:
																</p>
																<ul className="text-sm text-[--color-muted] space-y-1">
																	<li>✓ Detected the anomaly</li>
																	<li>
																		✓ Correlated 47 log entries to root cause
																	</li>
																	<li>✓ Applied the fix (auto-rollback)</li>
																	<li>✓ Updated the postmortem draft</li>
																	<li>
																		✓ Sent you a Slack summary—
																		<em>while you slept</em>
																	</li>
																</ul>
															</div>
														</div>

														{/* Trend Analysis */}
														<div className="glass-premium p-5 rounded-lg mb-6">
															<div className="flex items-start gap-3">
																<TrendingUp className="w-5 h-5 text-[--color-accent] mt-1" />
																<div>
																	<h4 className="font-semibold mb-2">
																		Why This Matters
																	</h4>
																	<p className="text-sm text-[--color-muted]">
																		Gartner predicts{" "}
																		<span className="text-[--color-brand] font-semibold">
																			40% of enterprises will use agentic
																			automation by 2027
																		</span>
																		. The question isn't <em>if</em> your
																		infrastructure becomes autonomous—it's{" "}
																		<em>when</em> you decide to lead or follow.
																	</p>
																</div>
															</div>
														</div>

														<CascadingList
															items={[
																"Auto-Remediation Agents",
																"Incident Triage Bots",
																"Self-Healing Pipelines",
															]}
															delay={0.1}
														/>
													</MysticalCard>
												</div>
												<div className="circuit-pattern bg-opacity-20 rounded-2xl p-6 glass-enhanced cursor-pointer hover:bg-opacity-30 transition-all duration-200 ease-out">
													<h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
														<Cpu className="w-5 h-5 text-[--color-brand]" />
														Agent Capabilities
													</h4>
													<div className="space-y-6">
														{/* Autonomous Actions */}
														<div>
															<h5 className="text-xs uppercase tracking-wider text-[--color-brand] mb-3 font-semibold">
																Autonomous Actions
															</h5>
															<div className="space-y-2">
																{[
																	"Auto-Rollback on Failure",
																	"Self-Healing Infrastructure",
																	"Predictive Scaling",
																	"Zero-Touch Deployments",
																].map((item) => (
																	<div
																		key={item}
																		className="flex items-center gap-3"
																	>
																		<div className="w-2 h-2 bg-[--color-brand] rounded-full"></div>
																		<span className="text-sm">{item}</span>
																	</div>
																))}
															</div>
														</div>

														{/* Intelligence & Analysis */}
														<div>
															<h5 className="text-xs uppercase tracking-wider text-[--color-accent] mb-3 font-semibold">
																Intelligence & Analysis
															</h5>
															<div className="space-y-2">
																{[
																	"Real-Time Log Analysis",
																	"Root Cause Identification",
																	"Anomaly Detection",
																	"Performance Optimization",
																].map((item) => (
																	<div
																		key={item}
																		className="flex items-center gap-3"
																	>
																		<div className="w-2 h-2 bg-[--color-accent] rounded-full"></div>
																		<span className="text-sm">{item}</span>
																	</div>
																))}
															</div>
														</div>

														{/* Security & Compliance */}
														<div>
															<h5 className="text-xs uppercase tracking-wider text-[--color-muted] mb-3 font-semibold">
																Security & Compliance
															</h5>
															<div className="space-y-2">
																{[
																	"Automated Security Patching",
																	"Vulnerability Scanning",
																	"Policy Enforcement",
																	"Compliance Monitoring",
																].map((item) => (
																	<div
																		key={item}
																		className="flex items-center gap-3"
																	>
																		<div className="w-2 h-2 bg-[--color-muted] rounded-full"></div>
																		<span className="text-sm">{item}</span>
																	</div>
																))}
															</div>
														</div>
													</div>
												</div>
											</div>
										),
									},
									{
										label: "Eco-FinOps",
										icon: <Target className="w-4 h-4" />,
										content: (
											<div className="asymmetric-grid">
												<div className="space-y-6">
													<MysticalCard className="neomorphic">
														<div className="flex items-center gap-4 mb-6">
															<div className="text-5xl">🌱</div>
															<div>
																<h3 className="text-2xl font-semibold">
																	Eco-FinOps
																</h3>
																<p className="text-[--color-muted]">
																	Resource Autonomy & Profitability
																</p>
															</div>
														</div>

														{/* Industry Context */}
														<div className="glass-enhanced p-5 rounded-lg border-l-4 border-[--color-accent] mb-6">
															<p className="text-sm text-[--color-muted]">
																<strong className="text-[--color-accent]">
																	Industry benchmark:
																</strong>{" "}
																Organizations following the FinOps Foundation
																Crawl/Walk/Run framework typically achieve
																30-60% cloud cost reduction. Green Software
																Foundation carbon-aware scheduling can shift
																batch workloads to low-carbon hours at zero
																additional cost.
															</p>
														</div>

														{/* Value Proposition: What We Deliver */}
														<div className="space-y-3 mb-6">
															<h4 className="font-semibold">
																What We Deliver:
															</h4>
															<div className="space-y-2">
																<div className="flex items-start gap-3">
																	<div className="w-2 h-2 bg-[--color-brand] rounded-full mt-2"></div>
																	<div>
																		<strong>Predictive scaling:</strong>{" "}
																		Right-sized 200+ workloads using ML usage
																		patterns
																	</div>
																</div>
																<div className="flex items-start gap-3">
																	<div className="w-2 h-2 bg-[--color-brand] rounded-full mt-2"></div>
																	<div>
																		<strong>Carbon-aware scheduling:</strong>{" "}
																		Shifted batch jobs to low-carbon hours
																		(free!)
																	</div>
																</div>
																<div className="flex items-start gap-3">
																	<div className="w-2 h-2 bg-[--color-brand] rounded-full mt-2"></div>
																	<div>
																		<strong>
																			Spot instance orchestration:
																		</strong>{" "}
																		70% cost savings on non-critical workloads
																	</div>
																</div>
															</div>
														</div>

														{/* Financial Impact */}
														<div className="glass-premium p-5 rounded-lg">
															<h4 className="font-semibold mb-3 flex items-center gap-2">
																<DollarSign className="w-5 h-5 text-[--color-success]" />
																Your CFO Will Love This
															</h4>
															<div className="grid grid-cols-2 gap-4 text-center">
																<div>
																	<div className="text-3xl font-bold text-[--color-success]">
																		300%
																	</div>
																	<div className="text-sm text-[--color-muted]">
																		Average ROI
																	</div>
																	<div className="text-xs text-[--color-muted]">
																		First year
																	</div>
																</div>
																<div>
																	<div className="text-3xl font-bold text-[--color-success]">
																		$400K-$2M
																	</div>
																	<div className="text-sm text-[--color-muted]">
																		Typical Savings
																	</div>
																	<div className="text-xs text-[--color-muted]">
																		Annually
																	</div>
																</div>
															</div>
														</div>
													</MysticalCard>
												</div>
												<div className="tech-grid bg-opacity-20 rounded-2xl p-6 glass-premium cursor-pointer hover:bg-opacity-40 hover:shadow-[0_0_30px_rgba(129,140,248,0.3)] transition-all duration-300 ease-out">
													<h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
														<TrendingUp className="w-5 h-5 text-[--color-accent]" />
														Optimization Impact
													</h4>
													<div className="space-y-6">
														{/* Cost Efficiency */}
														<div>
															<h5 className="text-xs uppercase tracking-wider text-[--color-brand] mb-3 font-semibold">
																Cost Efficiency
															</h5>
															<div className="space-y-3">
																<div className="flex justify-between items-center p-3 rounded-lg bg-[--color-bg]/30">
																	<span className="text-sm">
																		Cloud Waste Reduction
																	</span>
																	<span className="text-[--color-success] font-semibold">
																		-60%
																	</span>
																</div>
																<div className="flex justify-between items-center p-3 rounded-lg bg-[--color-bg]/30">
																	<span className="text-sm">
																		Infrastructure Costs
																	</span>
																	<span className="text-[--color-success] font-semibold">
																		-45%
																	</span>
																</div>
																<div className="flex justify-between items-center p-3 rounded-lg bg-[--color-bg]/30">
																	<span className="text-sm">
																		Operational ROI
																	</span>
																	<span className="text-[--color-success] font-semibold">
																		+300%
																	</span>
																</div>
															</div>
														</div>

														{/* Environmental Impact */}
														<div>
															<h5 className="text-xs uppercase tracking-wider text-[--color-accent] mb-3 font-semibold">
																Environmental Impact
															</h5>
															<div className="space-y-3">
																<div className="flex justify-between items-center p-3 rounded-lg bg-[--color-bg]/30">
																	<span className="text-sm">
																		Carbon Footprint
																	</span>
																	<span className="text-[--color-success] font-semibold">
																		-40%
																	</span>
																</div>
																<div className="flex justify-between items-center p-3 rounded-lg bg-[--color-bg]/30">
																	<span className="text-sm">
																		Energy Efficiency
																	</span>
																	<span className="text-[--color-success] font-semibold">
																		+55%
																	</span>
																</div>
																<div className="flex justify-between items-center p-3 rounded-lg bg-[--color-bg]/30">
																	<span className="text-sm">
																		Green Computing Score
																	</span>
																	<span className="text-[--color-success] font-semibold">
																		A+
																	</span>
																</div>
															</div>
														</div>

														{/* Performance Gains */}
														<div>
															<h5 className="text-xs uppercase tracking-wider text-[--color-muted] mb-3 font-semibold">
																Performance Gains
															</h5>
															<div className="space-y-3">
																<div className="flex justify-between items-center p-3 rounded-lg bg-[--color-bg]/30">
																	<span className="text-sm">
																		Resource Utilization
																	</span>
																	<span className="text-[--color-success] font-semibold">
																		+75%
																	</span>
																</div>
																<div className="flex justify-between items-center p-3 rounded-lg bg-[--color-bg]/30">
																	<span className="text-sm">
																		Auto-Scaling Efficiency
																	</span>
																	<span className="text-[--color-success] font-semibold">
																		+90%
																	</span>
																</div>
																<div className="flex justify-between items-center p-3 rounded-lg bg-[--color-bg]/30">
																	<span className="text-sm">
																		Idle Resource Elimination
																	</span>
																	<span className="text-[--color-success] font-semibold">
																		-80%
																	</span>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										),
									},
								]}
							/>
						</div>
					</div>
				</section>

				<SigilDivider />

				{/* Enhanced Ritual Framework with Timeline */}
				<section
					id="framework"
					className="py-28"
					aria-labelledby="framework-heading"
				>
					<div className="section">
						<SectionIntro
							title="How We Work"
							subtitle="No 200-page docs. No drive-by consulting. We pair-program with your team through every phase until your infrastructure runs itself."
							headingId="framework-heading"
						/>

						<div className="mt-16 asymmetric-grid">
							<div>
								<ProcessTimeline
									steps={[
										{
											title: "Discover",
											subtitle: "Week 1-2",
											description:
												"Deep system audit: We map dependencies, bottlenecks, and failure modes. Train context models on your architecture. Identify the top 3 automation opportunities with ROI projections.",
											icon: <Eye className="w-6 h-6" />,
										},
										{
											title: "Architect",
											subtitle: "Week 3-5",
											description:
												"Design self-healing topologies, agentic workflows, and platform interfaces. Your team reviews architecture decisions with us—no black boxes.",
											icon: <Code className="w-6 h-6" />,
										},
										{
											title: "Automate",
											subtitle: "Week 6-10",
											description:
												"Deploy autonomous pipelines, LLM-powered IDPs, and agentic guardrails. We pair-program with your engineers—this is knowledge transfer, not gatekeeping.",
											icon: <Cog className="w-6 h-6" />,
										},
										{
											title: "Evolve",
											subtitle: "Week 11+",
											description:
												"Continuous model tuning, system optimization, and 24/7 monitoring. Your infrastructure learns from incidents and patches itself before you wake up.",
											icon: <Target className="w-6 h-6" />,
										},
									]}
								/>
							</div>

							<div className="glass-premium p-8 rounded-2xl">
								<h3 className="text-xl font-semibold mb-6">
									Framework Benefits
								</h3>
								<div className="space-y-4">
									{[
										{
											metric: "Deployment Velocity",
											improvement: "10x faster",
										},
										{
											metric: "Infrastructure Cost",
											improvement: "40% reduction",
										},
										{
											metric: "System Reliability",
											improvement: "99.9% uptime",
										},
										{
											metric: "Developer Experience",
											improvement: "85% satisfaction",
										},
									].map((benefit, i) => (
										<motion.div
											key={benefit.metric}
											initial={{ opacity: 0, x: 20 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{ delay: i * 0.1 }}
											className="flex justify-between items-center p-3 rounded-lg bg-[--color-bg]/50"
										>
											<span className="text-[--color-muted]">
												{benefit.metric}
											</span>
											<span className="text-[--color-brand] font-semibold">
												{benefit.improvement}
											</span>
										</motion.div>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>

				<SigilDivider />

				{/* About */}
				<section id="about" className="py-28" aria-labelledby="about-heading">
					<div className="section max-w-4xl mx-auto">
						<motion.div
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true, amount: 0.4 }}
							transition={{ duration: 1 }}
						>
							<h2
								id="about-heading"
								className="text-4xl md:text-5xl font-semibold mb-8 text-center"
							>
								Who We Are
							</h2>
							<div className="glass-premium p-8 md:p-10 rounded-2xl space-y-6">
								<p className="text-lg leading-relaxed text-[--color-muted]">
									BlackMagickOps is a platform engineering consultancy founded
									by infrastructure engineers who've spent years building and
									scaling cloud-native systems. We've seen the same problems
									repeat across organizations — manual deployments, runaway
									costs, developer friction — and we built a practice around
									solving them systematically.
								</p>
								<p className="text-lg leading-relaxed text-[--color-muted]">
									We treat engineering as a craft where{" "}
									<strong className="text-[--color-text]">
										precision is discipline
									</strong>{" "}
									and{" "}
									<strong className="text-[--color-text]">
										automation is leverage
									</strong>
									. Our mission: turn your infrastructure from a cost center
									into a competitive advantage.
								</p>
								<div className="grid md:grid-cols-3 gap-6 pt-4 border-t border-[--color-border]">
									<div>
										<div className="text-sm font-semibold text-[--color-brand] mb-1">
											Methodology
										</div>
										<p className="text-sm text-[--color-muted]">
											DORA metrics, SPACE framework, FinOps Foundation
											Crawl/Walk/Run
										</p>
									</div>
									<div>
										<div className="text-sm font-semibold text-[--color-brand] mb-1">
											Approach
										</div>
										<p className="text-sm text-[--color-muted]">
											Pair programming, knowledge transfer, your team owns
											everything we build
										</p>
									</div>
									<div>
										<div className="text-sm font-semibold text-[--color-brand] mb-1">
											Philosophy
										</div>
										<p className="text-sm text-[--color-muted]">
											Platform as a Product. Open standards. No vendor lock-in.
											No black boxes.
										</p>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</section>

				<SigilDivider />

				{/* Case Sigils */}
				<CaseSigils />

				{/* Alliances */}
				<Alliances />

				<SigilDivider />

				{/* FAQ Section */}
				<section id="faq" className="py-20">
					<div className="section">
						<SectionIntro
							title="Frequently Asked Questions"
							subtitle="Straight answers. No jargon."
						/>

						<div className="mt-16 max-w-4xl mx-auto">
							<AccordionSection
								items={[
									{
										title: "What exactly does BlackMagickOps do?",
										content: (
											<p>
												We build internal developer platforms, automate
												infrastructure operations, and optimize cloud costs.
												Think of us as the team that turns your infrastructure
												from a bottleneck into a competitive advantage. We use
												industry-standard frameworks (DORA metrics, FinOps
												Foundation, Platform as a Product) and open-source tools
												— no proprietary lock-in.
											</p>
										),
									},
									{
										title: "How long does a typical engagement take?",
										content: (
											<p>
												12 weeks for a full engagement: 2 weeks discovery, 3
												weeks architecture, 5 weeks implementation, 2 weeks
												knowledge transfer and optimization. We pair-program
												with your engineers throughout — when we leave, your
												team owns and understands everything we built.
											</p>
										),
									},
									{
										title:
											"We don't have any customers yet on the site — why should we trust you?",
										content: (
											<p>
												Fair question. We're a new consultancy, and we believe
												in earning trust through transparency rather than
												fabricated case studies. Start with a free 30-minute
												infrastructure assessment — we'll identify concrete
												automation opportunities with ROI projections. If the
												assessment is valuable, we'll talk about a pilot
												engagement with clear success criteria and a pause
												clause if we're not delivering value by week 4.
											</p>
										),
									},
									{
										title: "What does pricing look like?",
										content: (
											<p>
												We offer project-based pricing with clear deliverables,
												or time-and-materials for ongoing work. Every engagement
												starts with a free assessment so we can scope
												accurately. We're transparent about costs and include a
												value-check at week 4 — if we're not on track, we pause
												and reassess together.
											</p>
										),
									},
									{
										title: "What technologies do you work with?",
										content: (
											<p>
												Kubernetes (AKS/EKS/GKE), Backstage, ArgoCD, Crossplane,
												Pulumi, Terraform, GitHub Actions, Prometheus, Grafana,
												OpenTelemetry, OPA, KEDA, and more. We're cloud-agnostic
												(AWS, Azure, GCP) and opinionated about open standards.
												We don't push proprietary tools.
											</p>
										),
									},
								]}
							/>
						</div>
					</div>
				</section>

				<SigilDivider />

				{/* Contact */}
				<section
					id="contact"
					className="py-20"
					aria-labelledby="contact-heading"
				>
					<ScrollReveal
						direction="bottom"
						className="section max-w-4xl mx-auto"
					>
						<MysticalCard className="p-10 md:p-14">
							<div className="text-center mb-10">
								<motion.h2
									id="contact-heading"
									className="text-4xl md:text-5xl font-semibold mb-6"
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
									transition={{ delay: 0.3, duration: 0.8 }}
								>
									Ready to Stop Firefighting?
								</motion.h2>
								<ScrollReveal direction="top" delay={0.5}>
									<p className="mx-auto max-w-2xl text-lg text-[--color-muted] mb-8">
										Most companies spend{" "}
										<span className="text-red-400 font-semibold">
											12-18 months
										</span>{" "}
										on "DevOps transformation" that delivers slide decks, not
										software velocity.{" "}
										<span className="text-[--color-brand] font-semibold">
											We ship production infrastructure in 12 weeks.
										</span>
									</p>
								</ScrollReveal>

								{/* What Happens Timeline */}
								<div className="text-left max-w-3xl mx-auto glass-enhanced p-8 rounded-lg space-y-6 mb-8">
									<h3 className="text-xl font-semibold text-center mb-6">
										What Happens When You Contact Us
									</h3>

									<div className="grid md:grid-cols-3 gap-6">
										<motion.div
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true, amount: 0.3 }}
											transition={{ delay: 0.1 }}
											className="space-y-2"
										>
											<div className="text-3xl" aria-hidden="true">
												📅
											</div>
											<h4 className="font-semibold">Day 1-3</h4>
											<p className="text-sm text-[--color-muted]">
												Discovery call → We audit 1 system (free) → You get a
												heat map of your biggest bottlenecks
											</p>
										</motion.div>

										<motion.div
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true, amount: 0.3 }}
											transition={{ delay: 0.2 }}
											className="space-y-2"
										>
											<div className="text-3xl" aria-hidden="true">
												📊
											</div>
											<h4 className="font-semibold">Day 7</h4>
											<p className="text-sm text-[--color-muted]">
												Detailed proposal with specific ROI projections, 12-week
												roadmap, and risk assessment
											</p>
										</motion.div>

										<motion.div
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true, amount: 0.3 }}
											transition={{ delay: 0.3 }}
											className="space-y-2"
										>
											<div className="text-3xl" aria-hidden="true">
												🚀
											</div>
											<h4 className="font-semibold">Week 2</h4>
											<p className="text-sm text-[--color-muted]">
												Pilot phase begins (if you choose to proceed)
											</p>
										</motion.div>
									</div>

									<motion.div
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, amount: 0.3 }}
										transition={{ delay: 0.4 }}
										className="border-t border-[--color-border] pt-6"
									>
										<div className="flex items-start gap-3">
											<Shield className="w-6 h-6 text-[--color-success] mt-1" />
											<div>
												<h4 className="font-semibold text-[--color-success]">
													Zero Risk
												</h4>
												<p className="text-sm text-[--color-muted]">
													Don't see measurable improvements by Week 4? We pause,
													reassess, or you walk away—no hard feelings.
												</p>
											</div>
										</div>
									</motion.div>
								</div>
							</div>

							<div className="mx-auto max-w-2xl">
								<MysticalContactForm />
							</div>
						</MysticalCard>
					</ScrollReveal>
				</section>

				{/* Invocation CTA */}
				<InvocationCTA />
			</main>
			{/* Footer */}
			{/* Footer */}
			<Footer />
			{/* Performance Monitor (Development only) */}
			<PerformanceMonitor />
		</>
	);
}

/* ---------- Sigil Divider ---------- */

// Form validation schema
const contactFormSchema = z.object({
	name: z
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be less than 50 characters")
		.regex(
			/^[a-zA-Z\s'-]+$/,
			"Name can only contain letters, spaces, hyphens, and apostrophes",
		),
	email: z
		.string()
		.email("Please enter a valid email address")
		.max(100, "Email must be less than 100 characters"),
	project: z
		.string()
		.min(3, "Project type must be at least 3 characters")
		.max(100, "Project type must be less than 100 characters")
		.optional()
		.or(z.literal("")),
	message: z
		.string()
		.min(10, "Message must be at least 10 characters")
		.max(1000, "Message must be less than 1000 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// Rate limiter for form submissions (max 3 per 5 minutes)
const formRateLimiter = new RateLimiter({
	maxAttempts: 3,
	windowMs: 5 * 60 * 1000,
});

// Enhanced Contact Form with Security
function MysticalContactForm() {
	const [showSuccess, setShowSuccess] = useState(false);
	const [rateLimitError, setRateLimitError] = useState<string | null>(null);
	const [csrfToken, setCSRFToken] = useState<string>("");
	const honeypot = useHoneypot();

	// Initialize CSRF token and focus visible on mount
	useEffect(() => {
		const token = CSRFProtection.getToken() || CSRFProtection.generateToken();
		setCSRFToken(token);
	}, []);

	// Initialize focus-visible for keyboard navigation
	useFocusVisible();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		watch,
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
		mode: "onSubmit",
	});

	const onSubmit = async (data: ContactFormData) => {
		// Check rate limit
		const userIdentifier = `form_${typeof window !== "undefined" ? window.location.hostname : "local"}`;
		if (!formRateLimiter.isAllowed(userIdentifier)) {
			const remainingTime = Math.ceil(
				formRateLimiter.getRemainingTime(userIdentifier) / 1000 / 60,
			);
			setRateLimitError(
				`Too many submissions. Please wait ${remainingTime} minutes.`,
			);
			return;
		}

		// Validate CSRF token
		if (!CSRFProtection.validateToken(csrfToken)) {
			console.error("CSRF token validation failed");
			return;
		}

		// Check honeypot (bot detection)
		const honeypotValue =
			(
				document.querySelector(
					`[name="${honeypot.fieldName}"]`,
				) as HTMLInputElement
			)?.value || "";
		if (!honeypot.validate(honeypotValue)) {
			console.log("Bot detected via honeypot");
			return;
		}

		// Sanitize inputs
		const sanitizedData = {
			name: InputSanitizer.sanitizeText(data.name, 50),
			email: InputSanitizer.sanitizeEmail(data.email),
			project: data.project
				? InputSanitizer.sanitizeText(data.project, 100)
				: "",
			message: InputSanitizer.sanitizeText(data.message, 1000),
		};

		// Check for SQL injection attempts
		const allInputs = Object.values(sanitizedData).join(" ");
		if (InputSanitizer.hasSQLInjection(allInputs)) {
			console.error("Potential SQL injection detected");
			return;
		}

		// Simulate form submission with security data
		await new Promise((resolve) => setTimeout(resolve, 2000));

		setShowSuccess(true);
		setRateLimitError(null);
		reset();

		// Generate new CSRF token after successful submission
		const newToken = CSRFProtection.generateToken();
		setCSRFToken(newToken);

		setTimeout(() => setShowSuccess(false), 3000);
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-6"
				aria-label="Contact form"
				noValidate
			>
				<div className="grid md:grid-cols-2 gap-6">
					<div>
						<input
							{...register("name")}
							id="contact-name"
							type="text"
							placeholder="Your Name"
							aria-label="Your name"
							className="w-full px-4 py-3 bg-[--color-surface] border border-[--color-border] rounded-lg text-[--color-text] placeholder-[--color-muted] focus:outline-none focus:border-[--color-brand] transition-all duration-300"
						/>
						{errors.name && (
							<p className="mt-1 text-sm text-red-400" role="alert">
								{errors.name.message}
							</p>
						)}
					</div>
					<div>
						<input
							{...register("email")}
							id="contact-email"
							type="email"
							placeholder="Email Address"
							aria-label="Your email address"
							className="w-full px-4 py-3 bg-[--color-surface] border border-[--color-border] rounded-lg text-[--color-text] placeholder-[--color-muted] focus:outline-none focus:border-[--color-brand] transition-all duration-300"
						/>
						{errors.email && (
							<p className="mt-1 text-sm text-red-400" role="alert">
								{errors.email.message}
							</p>
						)}
					</div>
				</div>

				<div>
					<input
						{...register("project")}
						id="contact-project"
						type="text"
						placeholder="Project Type (Optional)"
						aria-label="Project type or category"
						className="w-full px-4 py-3 bg-[--color-surface] border border-[--color-border] rounded-lg text-[--color-text] placeholder-[--color-muted] focus:outline-none focus:border-[--color-brand] transition-all duration-300"
					/>
					{errors.project && (
						<p className="mt-1 text-sm text-red-400" role="alert">
							{errors.project.message}
						</p>
					)}
				</div>

				<div>
					<textarea
						{...register("message")}
						id="contact-message"
						placeholder="Tell us about your mystical project..."
						rows={5}
						aria-label="Project description and details"
						className="w-full px-4 py-3 bg-[--color-surface] border border-[--color-border] rounded-lg text-[--color-text] placeholder-[--color-muted] focus:outline-none focus:border-[--color-brand] transition-all duration-300 resize-none"
					/>
					{errors.message && (
						<p className="mt-1 text-sm text-red-400" role="alert">
							{errors.message.message}
						</p>
					)}
				</div>

				{/* Honeypot field for bot detection */}
				<input
					type="text"
					name={honeypot.fieldName}
					style={{
						position: "absolute",
						left: "-9999px",
						width: "1px",
						height: "1px",
						opacity: 0,
						pointerEvents: "none",
					}}
					tabIndex={-1}
					autoComplete="off"
					aria-hidden="true"
				/>

				{/* Rate limit error */}
				{rateLimitError && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
						role="alert"
					>
						<p className="text-red-400 text-sm">{rateLimitError}</p>
					</motion.div>
				)}

				<button
					type="submit"
					disabled={isSubmitting}
					className="w-full px-6 py-3 bg-[--color-brand] hover:bg-[--color-brand]/90 text-white rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
					aria-label={
						isSubmitting ? "Submitting form..." : "Submit contact form"
					}
				>
					{isSubmitting ? (
						<motion.div
							animate={{ rotate: 360 }}
							transition={{
								duration: 1,
								repeat: Number.POSITIVE_INFINITY,
								ease: "linear",
							}}
							className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
						/>
					) : null}
					{isSubmitting ? "Sending Message..." : "Begin the Ritual →"}
				</button>
			</form>
			<SuccessAnimation show={showSuccess} />
		</>
	);
}

/* ---------- Enhanced Technical Components ---------- */

// Technical Term Tooltip Component - for acronyms and jargon
function TechTerm({ term, definition }: { term: string; definition: string }) {
	const termId = `tooltip-${term.toLowerCase().replace(/\s+/g, "-")}`;
	return (
		<span
			className="tech-term"
			tabIndex={0}
			role="button"
			aria-describedby={termId}
		>
			{term}
			<span id={termId} role="tooltip" className="tooltip">
				{definition}
			</span>
		</span>
	);
}

// Lazy Loading Image Component
function LazyImage({
	src,
	alt,
	className = "",
	width,
	height,
	priority = false,
}: {
	src: string;
	alt: string;
	className?: string;
	width?: number;
	height?: number;
	priority?: boolean;
}) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isInView, setIsInView] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsInView(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.1 },
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<div ref={ref} className={`relative overflow-hidden ${className}`}>
			{!isLoaded && (
				<div className="lazy-placeholder absolute inset-0 rounded-lg" />
			)}
			{(isInView || priority) && (
				<Image
					src={src}
					alt={alt}
					width={width || 800}
					height={height || 600}
					loading={priority ? "eager" : "lazy"}
					placeholder="blur"
					blurDataURL={generateBlurDataURL(width || 800, height || 600)}
					onLoad={() => setIsLoaded(true)}
					className={`transition-opacity duration-500 ${
						isLoaded ? "opacity-100" : "opacity-0"
					}`}
				/>
			)}
		</div>
	);
}

// Accessible Modal Component
function AccessibleModal({
	isOpen,
	onClose,
	title,
	children,
}: {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
}) {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
			modalRef.current?.focus();
		} else {
			document.body.style.overflow = "";
		}

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				onClose();
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "";
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
		>
			<div
				ref={modalRef}
				className="glass-enhanced max-w-2xl w-full mx-4 p-6 rounded-xl"
				onClick={(e) => e.stopPropagation()}
				tabIndex={-1}
			>
				<div className="flex justify-between items-center mb-4">
					<h2 id="modal-title" className="text-xl font-semibold">
						{title}
					</h2>
					<button
						onClick={onClose}
						className="btn-touch p-2 rounded-lg hover:bg-[--color-surface] transition-colors"
						aria-label="Close modal"
					>
						<X className="w-5 h-5" />
					</button>
				</div>
				{children}
			</div>
		</div>
	);
}

// Responsive Navigation Component
function ResponsiveNav({
	items,
}: {
	items: Array<{ href: string; label: string }>;
}) {
	const [activeSection, setActiveSection] = useState("");

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{ threshold: 0.5 },
		);

		items.forEach(({ href }) => {
			const element = document.querySelector(href);
			if (element) observer.observe(element);
		});

		return () => observer.disconnect();
	}, [items]);

	return (
		<nav className="sticky-nav hidden lg:block" aria-label="Page navigation">
			<ul className="space-y-2">
				{items.map(({ href, label }) => (
					<li key={href}>
						<a
							href={href}
							className={`block px-4 py-2 rounded-lg transition-all ${
								activeSection === href.slice(1)
									? "bg-[--color-brand] text-white"
									: "text-[--color-muted] hover:text-[--color-text] hover:bg-[--color-surface]"
							}`}
						>
							{label}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}

// Enhanced Card Component with Neumorphism
function NeomorphicCard({
	children,
	className = "",
	variant = "default",
}: {
	children: React.ReactNode;
	className?: string;
	variant?: "default" | "glass" | "neomorphic";
}) {
	const baseClasses = "p-6 rounded-xl transition-all duration-300";
	const variantClasses = {
		default: "bg-[--color-surface] border border-[--color-border]",
		glass: "glass-enhanced",
		neomorphic: "neomorphic",
	};

	return (
		<div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
			{children}
		</div>
	);
}

// Touch-Optimized Carousel
function TouchCarousel({
	items,
	className = "",
}: {
	items: React.ReactNode[];
	className?: string;
}) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTouch, setIsTouch] = useState(false);

	const next = () => {
		setCurrentIndex((prev) => (prev + 1) % items.length);
	};

	const previous = () => {
		setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
	};

	useEffect(() => {
		const handleTouchStart = () => setIsTouch(true);
		const handleMouseDown = () => setIsTouch(false);

		document.addEventListener("touchstart", handleTouchStart);
		document.addEventListener("mousedown", handleMouseDown);

		return () => {
			document.removeEventListener("touchstart", handleTouchStart);
			document.removeEventListener("mousedown", handleMouseDown);
		};
	}, []);

	return (
		<div className={`relative overflow-hidden ${className}`}>
			<div
				className="flex transition-transform duration-300 ease-out"
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
			>
				{items.map((item, index) => (
					<div key={index} className="w-full flex-shrink-0">
						{item}
					</div>
				))}
			</div>

			{/* Navigation */}
			<div
				className="flex justify-center mt-4 space-x-2"
				role="group"
				aria-label="Carousel navigation"
			>
				{items.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentIndex(index)}
						className={`btn-touch min-w-[44px] min-h-[44px] w-12 h-12 rounded-full transition-all duration-200 flex items-center justify-center ${
							index === currentIndex
								? "bg-[--color-brand] shadow-[0_0_20px_rgba(129,140,248,0.4)]"
								: "bg-[--color-surface] border border-[--color-border] hover:border-[--color-brand]"
						}`}
						aria-label={`Go to slide ${index + 1} of ${items.length}`}
						aria-current={index === currentIndex ? "true" : "false"}
					>
						<span
							className={`w-2 h-2 rounded-full ${
								index === currentIndex ? "bg-white" : "bg-[--color-muted]"
							}`}
						/>
					</button>
				))}
			</div>

			{/* Touch indicators */}
			{isTouch && (
				<div className="swipe-indicator absolute bottom-0 left-1/2 transform -translate-x-1/2" />
			)}
		</div>
	);
}

// Masonry Layout Component
function MasonryLayout({
	items,
	className = "",
}: {
	items: React.ReactNode[];
	className?: string;
}) {
	return (
		<div className={`masonry-grid ${className}`}>
			{items.map((item, index) => (
				<div key={index} className="masonry-item">
					{item}
				</div>
			))}
		</div>
	);
}

// Performance Monitor Component (Development only)
function PerformanceMonitor() {
	const [metrics, setMetrics] = useState<{
		fcp?: number;
		lcp?: number;
		cls?: number;
		fid?: number;
	}>({});

	useEffect(() => {
		if (typeof window !== "undefined" && "PerformanceObserver" in window) {
			// First Contentful Paint
			const fcpObserver = new PerformanceObserver((list) => {
				for (const entry of list.getEntries()) {
					if (entry.name === "first-contentful-paint") {
						setMetrics((prev) => ({ ...prev, fcp: entry.startTime }));
					}
				}
			});
			fcpObserver.observe({ entryTypes: ["paint"] });

			// Largest Contentful Paint
			const lcpObserver = new PerformanceObserver((list) => {
				const entries = list.getEntries();
				const lastEntry = entries[entries.length - 1];
				setMetrics((prev) => ({ ...prev, lcp: lastEntry.startTime }));
			});
			lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

			return () => {
				fcpObserver.disconnect();
				lcpObserver.disconnect();
			};
		}
	}, []);

	// Only show in development
	if (process.env.NODE_ENV !== "development") return null;

	return (
		<div className="fixed bottom-4 right-4 bg-[--color-surface] border border-[--color-border] rounded-lg p-4 text-xs z-50">
			<h4 className="font-semibold mb-2">Performance Metrics</h4>
			<div className="space-y-1">
				{metrics.fcp && <div>FCP: {Math.round(metrics.fcp)}ms</div>}
				{metrics.lcp && <div>LCP: {Math.round(metrics.lcp)}ms</div>}
			</div>
		</div>
	);
}

/* ---------- Modern Layout Components ---------- */

// Tabbed Interface Component
function TabbedInterface({
	tabs,
	defaultTab = 0,
}: {
	tabs: Array<{
		label: string;
		content: React.ReactNode;
		icon?: React.ReactNode;
	}>;
	defaultTab?: number;
}) {
	const [activeTab, setActiveTab] = useState(defaultTab);
	const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

	// Keyboard navigation handler
	const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
		let nextIndex: number | null = null;

		if (e.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
		else if (e.key === "ArrowLeft")
			nextIndex = (index - 1 + tabs.length) % tabs.length;
		else if (e.key === "Home") nextIndex = 0;
		else if (e.key === "End") nextIndex = tabs.length - 1;

		if (nextIndex === null) return;

		e.preventDefault();
		setActiveTab(nextIndex);
		tabRefs.current[nextIndex]?.focus();
	};

	return (
		<div className="tab-container">
			<div className="tab-list" role="tablist" aria-label="Navigation tabs">
				{tabs.map((tab, index) => (
					<button
						key={index}
						ref={(el) => {
							tabRefs.current[index] = el;
						}}
						role="tab"
						aria-selected={activeTab === index}
						aria-controls={`tabpanel-${index}`}
						id={`tab-${index}`}
						tabIndex={activeTab === index ? 0 : -1}
						className={`tab-button ${activeTab === index ? "active" : ""}
							${activeTab === index ? "text-[--color-brand]" : "text-[--color-muted]"}
							hover:text-[--color-text] transition-all duration-200
							${activeTab === index ? "shadow-[0_0_20px_rgba(129,140,248,0.3)]" : ""}
							focus-visible:outline-[--color-brand] focus-visible:outline-offset-2`}
						onClick={() => setActiveTab(index)}
						onKeyDown={(e) => handleKeyDown(e, index)}
					>
						{tab.icon && <span className="icon mr-2">{tab.icon}</span>}
						{tab.label}
					</button>
				))}
			</div>
			<div
				role="tabpanel"
				id={`tabpanel-${activeTab}`}
				aria-labelledby={`tab-${activeTab}`}
				className="tab-content"
			>
				{tabs[activeTab]?.content}
			</div>
		</div>
	);
}

// Accordion Component
function AccordionSection({
	items,
}: {
	items: Array<{ title: string; content: React.ReactNode }>;
}) {
	const [openItems, setOpenItems] = useState<number[]>([]);

	const toggleItem = (index: number) => {
		setOpenItems((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
		);
	};

	// Keyboard navigation handler
	const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault();
			toggleItem(index);
		}
	};

	return (
		<div
			className="space-y-2"
			role="region"
			aria-label="Expandable content sections"
		>
			{items.map((item, index) => {
				const isOpen = openItems.includes(index);
				const contentId = `accordion-content-${index}`;
				const headerId = `accordion-header-${index}`;

				return (
					<div key={index} className={`accordion-item ${isOpen ? "open" : ""}`}>
						<button
							id={headerId}
							className="accordion-header min-h-[44px] w-full flex items-center justify-between text-left px-4 py-3 focus-visible:ring-2 focus-visible:ring-[--color-brand] focus-visible:outline-none rounded-lg transition-all"
							onClick={() => toggleItem(index)}
							onKeyDown={(e) => handleKeyDown(e, index)}
							aria-expanded={isOpen}
							aria-controls={contentId}
						>
							<span className="font-medium">{item.title}</span>
							<ChevronDown
								className={`accordion-icon w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
								aria-hidden="true"
							/>
						</button>
						<div
							id={contentId}
							role="region"
							aria-labelledby={headerId}
							className={`accordion-content ${isOpen ? "open" : "closed"}`}
							hidden={!isOpen}
						>
							<div className="accordion-body">{item.content}</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

// Timeline Component
function ProcessTimeline({
	steps,
}: {
	steps: Array<{
		title: string;
		subtitle?: string;
		description: string;
		icon?: React.ReactNode;
	}>;
}) {
	return (
		<div className="timeline" role="list" aria-label="Process timeline steps">
			{steps.map((step, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, x: -20 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ delay: index * 0.1 }}
					className="timeline-item"
					role="listitem"
				>
					<div className="flex items-start gap-4">
						{step.icon && (
							<div className="icon-float p-3 bg-[--color-brand] rounded-xl text-white">
								{step.icon}
							</div>
						)}
						<div>
							<div className="flex items-baseline gap-3 mb-2">
								<h4 className="text-lg font-semibold">{step.title}</h4>
								{step.subtitle && (
									<span className="text-sm text-[--color-brand]">
										{step.subtitle}
									</span>
								)}
							</div>
							<p className="text-[--color-muted]">{step.description}</p>
						</div>
					</div>
				</motion.div>
			))}
		</div>
	);
}
