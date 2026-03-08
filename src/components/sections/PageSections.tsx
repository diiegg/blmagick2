"use client";

import { motion } from "framer-motion";
import {
	TrendingUp,
	Users,
	Shield,
	Zap,
	DollarSign,
	CheckCircle,
} from "lucide-react";
import { SectionIntro } from "../ui/SectionComponents";

/**
 * RitualFramework - Displays the 4-step process framework
 *
 * Features:
 * - Grid layout of process steps
 * - Animated central circle with orbiting markers
 * - Staggered reveal animations
 */
export function RitualFramework() {
	const steps = [
		{
			k: "Discover",
			d: "Stakeholders, constraints, SLOs, current-state mapping.",
		},
		{ k: "Design", d: "Reference architecture, guardrails, golden paths." },
		{ k: "Automate", d: "IaC, pipelines, policies, runbooks, paved roads." },
		{ k: "Optimize", d: "SLOs, cost KPIs, continuous improvement." },
	];

	return (
		<section id="framework" className="py-20">
			<div className="section">
				<SectionIntro
					title="Our Ritual Framework"
					subtitle="Every engagement follows the same precision cycle — discover, design, automate, optimize."
				/>

				<div className="mx-auto mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					{steps.map((s, i) => (
						<motion.div
							key={s.k}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}
							className="glass p-6 text-left"
						>
							<div className="text-sm text-[--color-muted]">Step {i + 1}</div>
							<div className="mt-1 text-xl font-semibold">{s.k}</div>
							<div className="mt-2 text-[--color-muted]">{s.d}</div>
							<div className="mt-5 h-px bg-gradient-to-r from-[--color-brand]/25 via-[--color-accent]/25 to-transparent" />
						</motion.div>
					))}
				</div>

				<div className="relative mx-auto mt-14 w-[min(28rem,90vw)] aspect-square">
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 0.28 }}
						viewport={{ once: true, amount: 0.4 }}
						transition={{ duration: 1.2 }}
						className="absolute inset-0 rounded-full border border-[--color-brand]/30"
						style={{
							boxShadow:
								"0 0 24px rgba(110,142,248,0.12) inset, 0 0 20px rgba(91,227,193,0.10)",
							background:
								"radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 70%)",
						}}
					/>

					{[0, 90, 180, 270].map((deg, idx) => (
						<motion.div
							key={deg}
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: [1, 1.08, 1] }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{
								duration: 2.2,
								delay: 0.2 + idx * 0.15,
								repeat: Number.POSITIVE_INFINITY,
								repeatType: "mirror",
							}}
							className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
							style={{
								transform: `translate(-50%, -50%) rotate(${deg}deg) translateX(42%)`,
								background:
									"radial-gradient(circle at 50% 50%, var(--color-accent) 0%, var(--color-brand) 100%)",
								filter: "blur(0.6px)",
							}}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

/**
 * CaseSigils - What We Deliver section (replaces fake case studies)
 *
 * Shows concrete deliverables with industry-standard benchmarks
 * No fabricated testimonials or companies
 */
export function CaseSigils() {
	const deliverables = [
		{
			title: "Internal Developer Platform",
			icon: <Users className="w-6 h-6" />,
			problem:
				"Your developers spend 40% of their sprint on infrastructure tickets, YAML configs, and waiting for environments.",
			solution:
				"We build a Backstage-powered IDP with golden paths, self-service provisioning, and automated guardrails. Platform as a Product.",
			outcomes: [
				"Provisioning time: days → minutes",
				"Developer NPS improvement: 30-50 points (SPACE framework)",
				"Infrastructure ticket volume: 80-95% reduction",
			],
			stack: "Backstage · Kubernetes · ArgoCD · Crossplane · Pulumi",
		},
		{
			title: "Supply Chain Security & Compliance",
			icon: <Shield className="w-6 h-6" />,
			problem:
				"Enterprise contracts require SLSA Level 3, but vendor quotes are 6-8 months and six figures.",
			solution:
				"Automated supply chain security pipeline with build provenance, SBOM generation, and policy-as-code validation at every commit.",
			outcomes: [
				"SLSA Level 3 compliance in 4-6 weeks",
				"100% artifact signing and validation",
				"Continuous compliance — not point-in-time audits",
			],
			stack: "GitHub Actions · Dagger · Cosign · Open Policy Agent · GUAC",
		},
		{
			title: "FinOps & Carbon-Aware Infrastructure",
			icon: <DollarSign className="w-6 h-6" />,
			problem:
				"Cloud spend growing faster than revenue. No visibility into cost drivers. CFO asking hard questions.",
			solution:
				"FinOps Foundation Crawl/Walk/Run framework with predictive scaling, carbon-aware scheduling (Green Software Foundation), and automated rightsizing.",
			outcomes: [
				"Cloud cost reduction: 40-60% (FinOps Foundation benchmark)",
				"Carbon footprint reduction aligned with EU CSRD reporting",
				"Real-time cost attribution per team/service",
			],
			stack: "OpenCost · Grafana · KEDA · Carbon Aware SDK · OpenTelemetry",
		},
	];

	return (
		<section id="work" className="py-20">
			<div className="section">
				<SectionIntro
					title="What We Deliver"
					subtitle="Concrete outcomes with industry-standard benchmarks. No vanity metrics."
				/>
				<div className="mt-12 space-y-8">
					{deliverables.map((d, i) => (
						<motion.article
							key={d.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{ duration: 0.8, delay: 0.1 + i * 0.1 }}
							className="group relative overflow-hidden glass-enhanced p-8 md:p-10 text-left"
						>
							{/* Header */}
							<div className="flex items-start gap-4 mb-6">
								<div className="p-3 rounded-xl bg-gradient-to-tr from-[--color-brand]/70 to-[--color-accent]/70 text-white">
									{d.icon}
								</div>
								<div className="flex-1">
									<h3 className="text-2xl font-semibold mb-2">{d.title}</h3>
								</div>
							</div>

							<div className="grid md:grid-cols-2 gap-6">
								{/* Problem / Solution */}
								<div className="space-y-4">
									<div>
										<h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-2">
											The Problem
										</h4>
										<p className="text-[--color-muted]">{d.problem}</p>
									</div>
									<div>
										<h4 className="text-sm font-semibold text-[--color-brand] uppercase tracking-wider mb-2">
											Our Approach
										</h4>
										<p className="text-[--color-muted]">{d.solution}</p>
									</div>
								</div>

								{/* Outcomes */}
								<div>
									<h4 className="text-sm font-semibold text-[--color-success] uppercase tracking-wider mb-3">
										Target Outcomes
									</h4>
									<div className="space-y-3">
										{d.outcomes.map((outcome) => (
											<div key={outcome} className="flex items-start gap-3">
												<CheckCircle className="w-4 h-4 text-[--color-success] mt-0.5 flex-shrink-0" />
												<span className="text-sm text-[--color-text]">
													{outcome}
												</span>
											</div>
										))}
									</div>
									<div className="mt-4 text-xs text-[--color-muted] border-t border-[--color-border] pt-3">
										<strong>Stack:</strong> {d.stack}
									</div>
								</div>
							</div>
						</motion.article>
					))}
				</div>
			</div>
		</section>
	);
}

/**
 * Alliances - Tech stack/tools showcase
 *
 * Features:
 * - Grid of technology badges
 * - Hover effects on chips
 * - Staggered animations
 */
export function Alliances() {
	const tools = [
		"AKS",
		"EKS",
		"GKE",
		"Azure",
		"GCP",
		"AWS",
		"Pulumi",
		"Terraform",
		"Dagger",
		"Argo CD",
		"Backstage",
		"OpenTelemetry",
		"Grafana",
		"OPA",
		"Cosign",
	];

	return (
		<section id="alliances" className="py-16">
			<div className="section">
				<SectionIntro
					title="Technology Stack"
					subtitle="Open standards and production-proven tools. No vendor lock-in."
				/>
				<div className="mt-10 grid grid-cols-2 gap-4 text-[--color-muted] md:grid-cols-5 lg:grid-cols-6">
					{tools.map((t, i) => (
						<motion.div
							key={t}
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.5, delay: 0.02 * i }}
							className="chip justify-center p-4 hover:border-[--color-brand]/40 hover:text-[--color-text] transition-all"
						>
							{t}
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

/**
 * InvocationCTA - Call-to-action section before contact form
 *
 * Features:
 * - Centered layout with headline and CTA button
 * - Scroll reveal animation
 * - Mystical messaging
 */
export function InvocationCTA() {
	return (
		<section className="pb-16">
			<motion.div
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.4 }}
				transition={{ duration: 0.8 }}
				className="section text-center max-w-3xl mx-auto"
			>
				<h3 className="text-3xl md:text-4xl font-semibold mb-4">
					Ready to stop firefighting infrastructure?
				</h3>
				<p className="text-lg text-[--color-muted] mb-6">
					Start with a free 30-minute infrastructure assessment. We'll identify
					your top 3 automation opportunities with ROI projections.
				</p>
				<div className="flex justify-center">
					<a
						href="#contact"
						className="btn btn-ghost px-8 py-3 hover:border-[--color-brand]/60"
					>
						Book Your Free Assessment →
					</a>
				</div>
			</motion.div>
		</section>
	);
}
