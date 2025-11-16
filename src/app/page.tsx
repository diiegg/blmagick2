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
	Eye,
	Globe,
	Layers,
	Shield,
	Star,
	Target,
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

export default function Home() {
	const pageRef = useRef<HTMLDivElement>(null);
	const { scrollY } = useScroll({ container: undefined });
	const haloShift = useTransform(scrollY, [0, 800], [0, 60]);

	return (
		<>
			{/* Web Vitals Monitoring */}
			<WebVitals />

			{/* Skip to main content link for keyboard navigation */}
			<a href="#main-content" className="skip-link">
				Skip to main content
			</a>

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
							<motion.div
								initial={{ opacity: 0, x: -40 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 1.2, ease: "easeOut" }}
								className="lg:col-span-3 space-y-8"
							>
								{/* Brand Logo */}
								<div className="flex items-center gap-3 mb-6">
									<span className="text-2xl font-semibold">BlackMagickOps</span>
								</div>{" "}
								{/* Main Headline */}
								<h1 className="text-5xl leading-tight tracking-tight md:text-7xl md:leading-[1.05] lg:text-left text-center">
									<span className="text-[--color-text]">
										Precision. Discipline.
									</span>
									<br />
									<span className="text-[--color-brand]">Magic.</span>
								</h1>
								{/* Main Description */}
								<p className="text-xl text-[--color-muted] max-w-2xl lg:text-left text-center">
									Engineering the invisible — we build{" "}
									<strong className="font-semibold text-[--color-text]">
										cloud-native platforms
									</strong>{" "}
									that move with reliability, efficiency, and intent.
								</p>
								{/* Primary CTAs */}
								<div className="flex flex-wrap gap-4 lg:justify-start justify-center">
									<EnhancedCTA
										href="#contact"
										className="px-8 py-4 text-lg"
										variant="primary"
										analyticsId="hero-begin-ritual"
										testVariant="A"
									>
										Begin the Ritual
									</EnhancedCTA>
									<EnhancedCTA
										href="#disciplines"
										className="px-8 py-4 text-lg"
										variant="ghost"
										analyticsId="hero-explore-capabilities"
									>
										Explore Capabilities
									</EnhancedCTA>
								</div>
							</motion.div>

							{/* Right Column - Supporting Content & Mystical Effects */}
							<motion.div
								initial={{ opacity: 0, x: 40 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
								className="lg:col-span-2 relative"
							>
								{/* Additional mystical elements for right column */}
								<div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
									<div className="absolute top-1/4 right-1/4 w-32 h-32">
										<motion.div
											className="w-full h-full rounded-full border border-[--color-accent]/30"
											animate={{ rotate: 360, scale: [1, 1.1, 1] }}
											transition={{
												rotate: {
													duration: 20,
													repeat: Number.POSITIVE_INFINITY,
													ease: "linear",
												},
												scale: {
													duration: 4,
													repeat: Number.POSITIVE_INFINITY,
													ease: "easeInOut",
												},
											}}
										/>
									</div>

									<div className="absolute bottom-1/3 left-1/4 w-24 h-24">
										<motion.div
											className="w-full h-full rounded-full border-2 border-[--color-brand]/20"
											animate={{ rotate: -360, scale: [0.8, 1.2, 0.8] }}
											transition={{
												rotate: {
													duration: 15,
													repeat: Number.POSITIVE_INFINITY,
													ease: "linear",
												},
												scale: {
													duration: 6,
													repeat: Number.POSITIVE_INFINITY,
													ease: "easeInOut",
												},
											}}
										/>
									</div>
								</div>

								{/* Supporting Content Card */}
								<div className="glass p-8 relative z-10 backdrop-blur-md">
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 1, delay: 0.6 }}
										className="space-y-6"
									>
										{/* Tagline */}
										<h3 className="text-2xl font-semibold text-[--color-brand]">
											Understand. Execute. Deliver.
										</h3>

										{/* Supporting Description */}
										<p className="text-[--color-muted] leading-relaxed">
											BlackMagickOps is your{" "}
											<strong className="text-[--color-text]">
												10x DevOps Engineer
											</strong>{" "}
											who can independently build, optimize, and secure your
											entire platform infrastructure.
										</p>

										{/* Key Benefits */}
										<div className="space-y-3">
											{[
												"Platform Engineering Excellence",
												"Automated DevOps Pipelines",
												"FinOps & Cost Optimization",
											].map((benefit, i) => (
												<motion.div
													key={benefit}
													initial={{ opacity: 0, x: 20 }}
													animate={{ opacity: 1, x: 0 }}
													transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
													className="flex items-center gap-3"
												>
													<div className="w-2 h-2 rounded-full bg-[--color-accent]" />
													<span className="text-sm text-[--color-text]">
														{benefit}
													</span>
												</motion.div>
											))}
										</div>

										{/* Secondary CTA */}
										<motion.div
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.8, delay: 1.2 }}
											className="pt-4"
										>
											<a
												href="#contact"
												className="inline-flex items-center gap-2 text-[--color-brand] hover:text-[--color-accent] transition-colors font-medium"
											>
												Start a Project
												<ArrowRight className="w-4 h-4" />
											</a>
										</motion.div>
									</motion.div>
								</div>
							</motion.div>
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
						<div className="mt-16">
							<TabbedInterface
								tabs={[
									{
										label: "Platform Engineering",
										icon: <Shield className="w-4 h-4 icon-pulse" />,
										content: (
											<div className="asymmetric-grid">
												<div className="space-y-6">
													<MysticalCard className="neomorphic">
														<div className="flex items-center gap-4 mb-6">
															<div className="text-5xl icon-float">🏗️</div>
															<div>
																<h3 className="text-2xl font-semibold">
																	Platform Engineering
																</h3>
																<p className="text-[--color-muted]">
																	Developer platforms with golden paths and
																	strong guardrails
																</p>
															</div>
														</div>
														<CascadingList
															items={[
																"Backstage IDP · Templates & golden paths",
																"Multi-tenant Kubernetes with OPA guardrails",
																"Observability-as-a-Product (SLOs, error budgets)",
															]}
															delay={0.1}
														/>
													</MysticalCard>
												</div>
												<div className="mystical-pattern bg-opacity-20 rounded-2xl p-8 glass-enhanced">
													<h4 className="text-lg font-semibold mb-4">
														Key Technologies
													</h4>
													<div className="grid grid-cols-2 gap-4">
														{[
															"Kubernetes",
															"Backstage",
															"OPA",
															"Prometheus",
														].map((tech, i) => (
															<div
																key={tech}
																className="chip icon-hover text-center"
															>
																{tech}
															</div>
														))}
													</div>
												</div>
											</div>
										),
									},
									{
										label: "DevOps Acceleration",
										icon: <Cog className="w-4 h-4 icon-rotate" />,
										content: (
											<div className="asymmetric-grid">
												<div className="space-y-6">
													<MysticalCard className="neomorphic">
														<div className="flex items-center gap-4 mb-6">
															<div className="text-5xl icon-pulse">⚙️</div>
															<div>
																<h3 className="text-2xl font-semibold">
																	DevOps Acceleration
																</h3>
																<p className="text-[--color-muted]">
																	CI/CD at scale with supply chain security
																</p>
															</div>
														</div>
														<CascadingList
															items={[
																"Trunk-based, canary/blue-green, DORA focus",
																"SBOM, provenance, SLSA-aligned controls",
																"Dagger · GitHub Actions/GitLab CI",
															]}
															delay={0.1}
														/>
													</MysticalCard>
												</div>
												<div className="circuit-pattern bg-opacity-20 rounded-2xl p-8 glass-enhanced">
													<h4 className="text-lg font-semibold mb-4">
														Deployment Strategies
													</h4>
													<div className="space-y-3">
														{[
															"Blue-Green",
															"Canary",
															"Rolling",
															"Feature Flags",
														].map((strategy, i) => (
															<div
																key={strategy}
																className="flex items-center gap-3"
															>
																<div className="w-2 h-2 bg-[--color-brand] rounded-full"></div>
																<span>{strategy}</span>
															</div>
														))}
													</div>
												</div>
											</div>
										),
									},
									{
										label: "Automation & FinOps",
										icon: <Target className="w-4 h-4 icon-float" />,
										content: (
											<div className="asymmetric-grid">
												<div className="space-y-6">
													<MysticalCard className="neomorphic">
														<div className="flex items-center gap-4 mb-6">
															<div className="text-5xl icon-rotate">🜲</div>
															<div>
																<h3 className="text-2xl font-semibold">
																	Automation & FinOps
																</h3>
																<p className="text-[--color-muted]">
																	Self-healing ops with cost control
																</p>
															</div>
														</div>
														<CascadingList
															items={[
																"Event-driven ops · KEDA · ChatOps",
																"Unified cost + reliability dashboards",
																"Rightsizing policies · budget alerts",
															]}
															delay={0.1}
														/>
													</MysticalCard>
												</div>
												<div className="tech-grid bg-opacity-20 rounded-2xl p-8 glass-premium">
													<h4 className="text-lg font-semibold mb-4">
														Cost Optimization
													</h4>
													<div className="space-y-4">
														<div className="flex justify-between items-center">
															<span>Infrastructure Cost</span>
															<span className="text-[--color-success]">
																-40%
															</span>
														</div>
														<div className="flex justify-between items-center">
															<span>Deployment Time</span>
															<span className="text-[--color-success]">
																-75%
															</span>
														</div>
														<div className="flex justify-between items-center">
															<span>Manual Processes</span>
															<span className="text-[--color-success]">
																-90%
															</span>
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
							title="Our Ritual Framework"
							subtitle="Every engagement follows the same precision cycle — discover, design, automate, optimize."
							headingId="framework-heading"
						/>

						<div className="mt-16 asymmetric-grid">
							<div>
								<ProcessTimeline
									steps={[
										{
											title: "Discover",
											description:
												"Stakeholders, constraints, SLOs, current-state mapping.",
											icon: <Eye className="w-6 h-6" />,
										},
										{
											title: "Design",
											description:
												"Reference architecture, guardrails, golden paths.",
											icon: <Code className="w-6 h-6" />,
										},
										{
											title: "Automate",
											description:
												"IaC, pipelines, policies, runbooks, paved roads.",
											icon: <Cog className="w-6 h-6" />,
										},
										{
											title: "Optimize",
											description: "SLOs, cost KPIs, continuous improvement.",
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

				{/* Philosophy */}
				<section
					id="philosophy"
					className="py-32"
					aria-labelledby="philosophy-heading"
				>
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true, amount: 0.4 }}
						transition={{ duration: 1.4 }}
						className="section text-center max-w-3xl mx-auto"
					>
						<h2
							id="philosophy-heading"
							className="text-4xl md:text-5xl font-semibold mb-8"
						>
							Our Philosophy
						</h2>
						<p className="text-xl leading-relaxed text-[--color-muted]">
							We treat engineering as a sacred craft — where precision is
							devotion, and automation is ritual. Our mission: to summon order
							from chaos through deliberate design and disciplined execution.
						</p>
					</motion.div>
				</section>

				<SigilDivider />

				{/* Case Sigils */}
				<CaseSigils />

				{/* Alliances */}
				<Alliances />

				<SigilDivider />

				{/* Testimonials */}
				<section id="testimonials" className="py-20">
					<div className="section">
						<SectionIntro
							title="Client Testimonials"
							subtitle="What our clients say about the mystical transformation of their infrastructure."
						/>

						<div className="mt-16">
							<TestimonialCarousel
								testimonials={[
									{
										quote:
											"BlackMagickOps transformed our deployment pipeline from chaos to precision. Their platform engineering approach reduced our time-to-market by 70% while improving reliability dramatically.",
										author: "Sarah Chen",
										role: "VP of Engineering",
										company: "TechFlow Systems",
									},
									{
										quote:
											"The mystical precision they brought to our infrastructure was remarkable. We went from manual deployments to fully automated CI/CD with comprehensive monitoring in just 12 weeks.",
										author: "Marcus Rodriguez",
										role: "CTO",
										company: "CloudNative Solutions",
									},
									{
										quote:
											"Their FinOps integration saved us 40% on cloud costs while doubling our deployment frequency. The golden paths they created made our developers incredibly productive.",
										author: "Elena Kowalski",
										role: "DevOps Director",
										company: "ScaleUp Ventures",
									},
									{
										quote:
											"The Backstage IDP implementation was game-changing. Our development teams now have self-service capabilities with proper guardrails. Security and compliance are baked in.",
										author: "David Kim",
										role: "Platform Lead",
										company: "Enterprise Corp",
									},
									{
										quote:
											"BlackMagickOps doesn't just implement tools, they create a culture of excellence. The observability and SLO framework they built transformed how we think about reliability.",
										author: "Priya Patel",
										role: "Engineering Manager",
										company: "Innovation Labs",
									},
								]}
							/>
						</div>
					</div>
				</section>

				<SigilDivider />

				{/* FAQ Section */}
				<section id="faq" className="py-20">
					<div className="section">
						<SectionIntro
							title="Frequently Asked Questions"
							subtitle="Everything you need to know about our mystical DevOps practices."
						/>

						<div className="mt-16 max-w-4xl mx-auto">
							<AccordionSection
								items={[
									{
										title:
											"What makes BlackMagickOps different from other DevOps consultancies?",
										content: (
											<div className="space-y-4">
												<p>
													We combine mystical precision with modern engineering
													practices. Our approach integrates platform
													engineering, automation, and FinOps into a unified
													ritual framework that delivers measurable results.
												</p>
												<ul className="space-y-2 text-[--color-muted]">
													<li>
														• Mystical framework with proven methodologies
													</li>
													<li>
														• Focus on developer experience and platform
														engineering
													</li>
													<li>
														• Integration of cost optimization from day one
													</li>
													<li>
														• Comprehensive automation and self-healing systems
													</li>
												</ul>
											</div>
										),
									},
									{
										title: "How long does a typical engagement take?",
										content: (
											<div className="space-y-4">
												<p>
													Our ritual framework typically spans 12-16 weeks,
													broken into four phases:
												</p>
												<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
													<div className="p-4 rounded-lg bg-[--color-surface]">
														<h5 className="font-semibold text-[--color-brand]">
															Discover (2-3 weeks)
														</h5>
														<p className="text-sm text-[--color-muted] mt-1">
															Assessment and planning
														</p>
													</div>
													<div className="p-4 rounded-lg bg-[--color-surface]">
														<h5 className="font-semibold text-[--color-brand]">
															Design (3-4 weeks)
														</h5>
														<p className="text-sm text-[--color-muted] mt-1">
															Architecture and strategy
														</p>
													</div>
													<div className="p-4 rounded-lg bg-[--color-surface]">
														<h5 className="font-semibold text-[--color-brand]">
															Automate (6-8 weeks)
														</h5>
														<p className="text-sm text-[--color-muted] mt-1">
															Implementation and deployment
														</p>
													</div>
													<div className="p-4 rounded-lg bg-[--color-surface]">
														<h5 className="font-semibold text-[--color-brand]">
															Optimize (1-2 weeks)
														</h5>
														<p className="text-sm text-[--color-muted] mt-1">
															Monitoring and refinement
														</p>
													</div>
												</div>
											</div>
										),
									},
									{
										title: "What technologies do you specialize in?",
										content: (
											<div className="space-y-4">
												<p>
													We work with cutting-edge cloud-native technologies
													and proven enterprise solutions:
												</p>
												<div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
													{[
														"Kubernetes",
														"Backstage",
														"Terraform",
														"GitHub Actions",
														"Prometheus",
														"Grafana",
														"ArgoCD",
														"OPA",
														"KEDA",
														"Istio",
													].map((tech) => (
														<div
															key={tech}
															className="chip text-center bg-[--color-brand]/10 text-[--color-brand]"
														>
															{tech}
														</div>
													))}
												</div>
											</div>
										),
									},
									{
										title:
											"Do you provide ongoing support after implementation?",
										content: (
											<div className="space-y-4">
												<p>
													Yes, we offer multiple support models to ensure your
													mystical infrastructure continues to evolve:
												</p>
												<ul className="space-y-3">
													<li className="flex items-start gap-3">
														<CheckCircle className="w-5 h-5 text-[--color-success] mt-0.5" />
														<div>
															<strong>Managed Services:</strong> Full platform
															management and 24/7 monitoring
														</div>
													</li>
													<li className="flex items-start gap-3">
														<CheckCircle className="w-5 h-5 text-[--color-success] mt-0.5" />
														<div>
															<strong>Advisory Retainer:</strong> Monthly
															strategy sessions and architecture reviews
														</div>
													</li>
													<li className="flex items-start gap-3">
														<CheckCircle className="w-5 h-5 text-[--color-success] mt-0.5" />
														<div>
															<strong>On-Demand Support:</strong> Access to our
															experts for troubleshooting and optimization
														</div>
													</li>
												</ul>
											</div>
										),
									},
									{
										title: "What are your pricing models?",
										content: (
											<div className="space-y-4">
												<p>
													We offer flexible engagement models tailored to your
													needs and budget:
												</p>
												<div className="space-y-4 mt-4">
													<div className="p-4 rounded-lg border border-[--color-border]">
														<h5 className="font-semibold text-[--color-accent]">
															Project-Based
														</h5>
														<p className="text-sm text-[--color-muted] mt-1">
															Fixed scope, timeline, and budget for defined
															deliverables
														</p>
													</div>
													<div className="p-4 rounded-lg border border-[--color-border]">
														<h5 className="font-semibold text-[--color-accent]">
															Time & Materials
														</h5>
														<p className="text-sm text-[--color-muted] mt-1">
															Flexible hourly or daily rates for ongoing work
														</p>
													</div>
													<div className="p-4 rounded-lg border border-[--color-border]">
														<h5 className="font-semibold text-[--color-accent]">
															Value-Based
														</h5>
														<p className="text-sm text-[--color-muted] mt-1">
															Pricing tied to measurable business outcomes and
															cost savings
														</p>
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
								<TypewriterText text="Initiate Contact" delay={500} />
								<motion.h2
									id="contact-heading"
									className="text-4xl font-semibold mb-6"
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
									transition={{ delay: 2, duration: 0.8 }}
								/>
								<ScrollReveal direction="top" delay={0.3}>
									<p className="mx-auto max-w-md text-[--color-muted]">
										Describe your objective — we'll respond with a precision
										plan and a path to measurable wins.
									</p>
								</ScrollReveal>
							</div>

							<div className="mx-auto max-w-2xl">
								<MysticalContactForm />
							</div>
						</MysticalCard>
					</ScrollReveal>
				</section>
			</main>

			{/* Footer */}
			<footer className="border-t border-[--color-border]/60 bg-[--color-bg] py-12">
				<div className="section">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.8 }}
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12"
					>
						{/* Brand Section */}
						<div className="lg:col-span-2">
							<div className="flex items-center gap-2 text-xl mb-6">
								<span className="font-semibold">BlackMagickOps</span>
							</div>
							<p className="text-[--color-muted] mb-6 max-w-md">
								DevOps • Platform Engineering • Automation
							</p>
							<p className="text-sm text-[--color-muted] mb-6">
								Precision. Discipline. Magic. Transform your infrastructure with
								mystical DevOps practices.
							</p>

							{/* Social Links */}
							<div className="flex items-center gap-4">
								<a
									href="https://github.com/blackmagickops"
									className="w-8 h-8 rounded-lg bg-[--color-surface] border border-[--color-border] flex items-center justify-center hover:border-[--color-brand] transition-colors"
									aria-label="GitHub"
								>
									<Globe className="w-4 h-4" />
								</a>
								<a
									href="https://linkedin.com/company/blackmagickops"
									className="w-8 h-8 rounded-lg bg-[--color-surface] border border-[--color-border] flex items-center justify-center hover:border-[--color-brand] transition-colors"
									aria-label="LinkedIn"
								>
									<Globe className="w-4 h-4" />
								</a>
								<a
									href="https://twitter.com/blackmagickops"
									className="w-8 h-8 rounded-lg bg-[--color-surface] border border-[--color-border] flex items-center justify-center hover:border-[--color-brand] transition-colors"
									aria-label="Twitter"
								>
									<Globe className="w-4 h-4" />
								</a>
							</div>
						</div>

						{/* Services */}
						<div>
							<h4 className="font-semibold text-[--color-text] mb-4">
								Services
							</h4>
							<ul className="space-y-3 text-sm">
								<li>
									<a
										href="#disciplines"
										className="text-[--color-muted] hover:text-[--color-brand] transition-colors"
									>
										Platform Engineering
									</a>
								</li>
								<li>
									<a
										href="#disciplines"
										className="text-[--color-muted] hover:text-[--color-brand] transition-colors"
									>
										DevOps Acceleration
									</a>
								</li>
								<li>
									<a
										href="#disciplines"
										className="text-[--color-muted] hover:text-[--color-brand] transition-colors"
									>
										Automation & FinOps
									</a>
								</li>
								<li>
									<a
										href="#framework"
										className="text-[--color-muted] hover:text-[--color-brand] transition-colors"
									>
										Consulting
									</a>
								</li>
							</ul>
						</div>

						{/* Resources */}
						<div>
							<h4 className="font-semibold text-[--color-text] mb-4">
								Resources
							</h4>
							<ul className="space-y-3 text-sm">
								<li>
									<a
										href="#work"
										className="text-[--color-muted] hover:text-[--color-brand] transition-colors"
									>
										Case Studies
									</a>
								</li>
								<li>
									<a
										href="#testimonials"
										className="text-[--color-muted] hover:text-[--color-brand] transition-colors"
									>
										Testimonials
									</a>
								</li>
								<li>
									<a
										href="#faq"
										className="text-[--color-muted] hover:text-[--color-brand] transition-colors"
									>
										FAQ
									</a>
								</li>
								<li>
									<a
										href="/blog"
										className="text-[--color-muted] hover:text-[--color-brand] transition-colors"
									>
										Blog
									</a>
								</li>
							</ul>
						</div>

						{/* Company */}
						<div>
							<h4 className="font-semibold text-[--color-text] mb-4">
								Company
							</h4>
							<ul className="space-y-3 text-sm">
								<li>
									<a
										href="#philosophy"
										className="text-[--color-muted] hover:text-[--color-brand] transition-colors"
									>
										About
									</a>
								</li>
								<li>
									<a
										href="#contact"
										className="text-[--color-muted] hover:text-[--color-brand] transition-colors"
									>
										Contact
									</a>
								</li>
								<li>
									<a
										href="/careers"
										className="text-[--color-muted] hover:text-[--color-brand] transition-colors"
									>
										Careers
									</a>
								</li>
								<li>
									<a
										href="/partners"
										className="text-[--color-muted] hover:text-[--color-brand] transition-colors"
									>
										Partners
									</a>
								</li>
							</ul>
						</div>
					</motion.div>

					{/* Bottom Section */}
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="mt-12 pt-8 border-t border-[--color-border]/60 flex flex-col md:flex-row justify-between items-center gap-4"
					>
						<div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-[--color-muted]">
							<p>
								© {new Date().getFullYear()} BlackMagickOps. All rights
								reserved.
							</p>
							<div className="flex items-center gap-6">
								<a
									href="/privacy"
									className="hover:text-[--color-brand] transition-colors"
								>
									Privacy Policy
								</a>
								<a
									href="/terms"
									className="hover:text-[--color-brand] transition-colors"
								>
									Terms of Service
								</a>
								<a
									href="/cookies"
									className="hover:text-[--color-brand] transition-colors"
								>
									Cookie Policy
								</a>
							</div>
						</div>

						<button
							onClick={() => {
								if (typeof window !== "undefined") {
									window.scrollTo({ top: 0, behavior: "smooth" });
								}
							}}
							className="flex items-center gap-2 text-sm text-[--color-muted] hover:text-[--color-brand] transition-colors"
						>
							<span>Back to top</span>
							<ArrowRight className="w-4 h-4 -rotate-90" />
						</button>
					</motion.div>
				</div>
			</footer>

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
		mode: "onBlur",
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
					{isSubmitting ? "Casting Spell..." : "Begin the Ritual →"}
				</button>
			</form>

			<SuccessAnimation show={showSuccess} />
		</>
	);
}

/* ---------- Enhanced Technical Components ---------- */

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
			<div className="flex justify-center mt-4 space-x-2">
				{items.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentIndex(index)}
						className={`btn-touch w-3 h-3 rounded-full transition-colors ${
							index === currentIndex
								? "bg-[--color-brand]"
								: "bg-[--color-muted]"
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
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

	return (
		<div className="tab-container">
			<div className="tab-list">
				{tabs.map((tab, index) => (
					<button
						key={index}
						className={`tab-button ${activeTab === index ? "active" : ""}`}
						onClick={() => setActiveTab(index)}
					>
						{tab.icon && <span className="icon mr-2">{tab.icon}</span>}
						{tab.label}
					</button>
				))}
			</div>
			<div className="tab-content">{tabs[activeTab]?.content}</div>
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

	return (
		<div className="space-y-2">
			{items.map((item, index) => (
				<div
					key={index}
					className={`accordion-item ${openItems.includes(index) ? "open" : ""}`}
				>
					<button
						className="accordion-header"
						onClick={() => toggleItem(index)}
					>
						<span className="font-medium">{item.title}</span>
						<ChevronDown
							className={`accordion-icon w-5 h-5 ${openItems.includes(index) ? "rotate-180" : ""}`}
						/>
					</button>
					<div
						className={`accordion-content ${openItems.includes(index) ? "open" : "closed"}`}
					>
						<div className="accordion-body">{item.content}</div>
					</div>
				</div>
			))}
		</div>
	);
}

// Timeline Component
function ProcessTimeline({
	steps,
}: {
	steps: Array<{ title: string; description: string; icon?: React.ReactNode }>;
}) {
	return (
		<div className="timeline">
			{steps.map((step, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, x: -20 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ delay: index * 0.1 }}
					className="timeline-item"
				>
					<div className="flex items-start gap-4">
						{step.icon && (
							<div className="icon-float p-3 bg-[--color-brand] rounded-xl text-white">
								{step.icon}
							</div>
						)}
						<div>
							<h4 className="text-lg font-semibold mb-2">{step.title}</h4>
							<p className="text-[--color-muted]">{step.description}</p>
						</div>
					</div>
				</motion.div>
			))}
		</div>
	);
}

// Enhanced Carousel Component
function TestimonialCarousel({
	testimonials,
}: {
	testimonials: Array<{
		quote: string;
		author: string;
		role: string;
		company: string;
		avatar?: string;
	}>;
}) {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrent((prev) => (prev + 1) % testimonials.length);
		}, 5000);
		return () => clearInterval(timer);
	}, [testimonials.length]);

	return (
		<div className="carousel-container relative">
			<div
				className="carousel-track"
				style={{ transform: `translateX(-${current * 100}%)` }}
			>
				{testimonials.map((testimonial, index) => (
					<div key={index} className="carousel-slide neomorphic">
						<blockquote className="text-lg mb-6 italic">
							"{testimonial.quote}"
						</blockquote>
						<div className="flex items-center gap-4">
							{testimonial.avatar && (
								<div className="w-12 h-12 rounded-full bg-[--color-brand] flex items-center justify-center text-white font-semibold">
									{testimonial.author.charAt(0)}
								</div>
							)}
							<div>
								<div className="font-semibold">{testimonial.author}</div>
								<div className="text-sm text-[--color-muted]">
									{testimonial.role} at {testimonial.company}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="carousel-controls">
				{testimonials.map((_, index) => (
					<button
						key={index}
						className={`carousel-dot ${current === index ? "active" : ""}`}
						onClick={() => setCurrent(index)}
						aria-label={`Go to testimonial ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
}

// Sticky Sidebar Navigation
function StickyNavigation({
	sections,
}: {
	sections: Array<{ id: string; label: string }>;
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

		sections.forEach(({ id }) => {
			const element = document.getElementById(id);
			if (element) observer.observe(element);
		});

		return () => observer.disconnect();
	}, [sections]);

	return (
		<nav className="sticky-sidebar">
			<div className="relative">
				<div className="nav-indicator" />
				<ul className="space-y-2">
					{sections.map(({ id, label }) => (
						<li key={id}>
							<a
								href={`#${id}`}
								className={`block px-4 py-2 rounded-lg transition-all ${
									activeSection === id
										? "bg-[--color-brand] text-white"
										: "text-[--color-muted] hover:text-[--color-text] hover:bg-[--color-surface]"
								}`}
							>
								{label}
							</a>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}

// Infinite Scroll Container
function InfiniteScrollContainer<T>({
	items,
	renderItem,
	loadMore,
	hasMore,
}: {
	items: T[];
	renderItem: (item: T, index: number) => React.ReactNode;
	loadMore: () => void;
	hasMore: boolean;
}) {
	const [loading, setLoading] = useState(false);
	const observerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			async ([entry]) => {
				if (entry.isIntersecting && hasMore && !loading) {
					setLoading(true);
					await loadMore();
					setLoading(false);
				}
			},
			{ threshold: 0.1 },
		);

		if (observerRef.current) {
			observer.observe(observerRef.current);
		}

		return () => observer.disconnect();
	}, [hasMore, loading, loadMore]);

	return (
		<div className="space-y-6">
			{items.map((item, index) => renderItem(item, index))}
			{hasMore && (
				<div ref={observerRef} className="flex justify-center py-8">
					{loading ? (
						<div className="icon-rotate w-6 h-6 border-2 border-[--color-brand] border-t-transparent rounded-full" />
					) : (
						<div className="text-[--color-muted] text-sm">
							Scroll to load more...
						</div>
					)}
				</div>
			)}
		</div>
	);
}

// Masonry Portfolio Layout
function MasonryPortfolio({
	projects,
}: {
	projects: Array<{
		title: string;
		description: string;
		image?: string;
		tags: string[];
		featured?: boolean;
	}>;
}) {
	return (
		<div className="masonry-grid">
			{projects.map((project, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: index * 0.1 }}
					className={`masonry-item card-module ${project.featured ? "glass-premium" : "neomorphic"}`}
				>
					{project.image && (
						<div className="mb-4 rounded-lg overflow-hidden relative h-48">
							<Image
								src={project.image}
								alt={project.title}
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								className="object-cover"
							/>
						</div>
					)}
					<h3 className="text-xl font-semibold mb-3">{project.title}</h3>
					<p className="text-[--color-muted] mb-4">{project.description}</p>
					<div className="flex flex-wrap gap-2">
						{project.tags.map((tag, tagIndex) => (
							<span
								key={tagIndex}
								className="chip text-xs px-3 py-1 bg-[--color-brand]/20 text-[--color-brand] rounded-full"
							>
								{tag}
							</span>
						))}
					</div>
				</motion.div>
			))}
		</div>
	);
}
