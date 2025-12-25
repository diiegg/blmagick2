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
 * CaseSigils - Portfolio/case studies section
 *
 * Features:
 * - Detailed case study cards with challenge/solution/results
 * - Before/after metrics with icons
 * - Customer testimonials integrated
 * - Tech stack badges
 */
export function CaseSigils() {
	const cases = [
		{
			title: "Enterprise IDP: 120 Teams, Zero Ticket Chaos",
			icon: <Users className="w-6 h-6" />,
			challenge:
				"Global fintech with 120 engineering squads drowning in infrastructure tickets. Mean time to provision: 72 hours. Developer NPS: 12.",
			solution:
				"Deployed Backstage-powered Internal Developer Platform with golden paths, GitOps workflows, and AI-assisted service scaffolding.",
			results: [
				{ label: "Lead time", before: "72h", after: "38min", icon: Zap },
				{ label: "Developer NPS", before: "12", after: "74", icon: TrendingUp },
				{
					label: "Infrastructure tickets",
					before: "2,400/mo",
					after: "40/mo",
					icon: CheckCircle,
				},
			],
			testimonial: {
				quote:
					"We went from DevOps bottleneck to platform enabler in 12 weeks.",
				author: "VP Engineering",
				company: "Confidential FinTech",
			},
			stack:
				"Azure Kubernetes (AKS) · Argo CD · Backstage · Pulumi · LangChain",
		},
		{
			title: "SLSA Level 3: Provenance That Actually Matters",
			icon: <Shield className="w-6 h-6" />,
			challenge:
				"Security-conscious SaaS company needed SLSA Level 3 compliance for enterprise contracts but faced 8-month vendor quotes.",
			solution:
				"Built automated supply chain security pipeline with build provenance, SBOM generation, and policy-as-code validation at every commit.",
			results: [
				{
					label: "Time to compliance",
					before: "8 months (est.)",
					after: "6 weeks",
					icon: Zap,
				},
				{
					label: "Artifacts signed/validated",
					before: "0%",
					after: "100%",
					icon: CheckCircle,
				},
				{
					label: "Enterprise deals unblocked",
					before: "3 on hold",
					after: "$4.2M ARR",
					icon: DollarSign,
				},
			],
			testimonial: {
				quote:
					"BlackMagickOps unblocked $4M in pipeline with a security posture our competitors can't match.",
				author: "CTO",
				company: "Series B SaaS",
			},
			stack: "GitHub Actions · Dagger · Cosign · Open Policy Agent · GUAC",
		},
		{
			title: "FinOps AI: $2M Saved, Carbon Footprint Halved",
			icon: <DollarSign className="w-6 h-6" />,
			challenge:
				"High-growth startup burning $400K/month on cloud. No visibility into cost drivers. CFO threatening to freeze headcount.",
			solution:
				"Deployed agentic FinOps platform with predictive scaling, carbon-aware scheduling, and automated rightsizing agents.",
			results: [
				{
					label: "Cloud spend",
					before: "$400K/mo",
					after: "$160K/mo",
					icon: DollarSign,
				},
				{
					label: "Carbon footprint",
					before: "87t CO₂/yr",
					after: "34t CO₂/yr",
					icon: TrendingUp,
				},
				{
					label: "CFO happiness",
					before: "😰",
					after: "🎉",
					icon: CheckCircle,
				},
			],
			testimonial: {
				quote:
					"We're carbon-neutral certified AND spending 60% less. BlackMagickOps made our CFO a believer in platform engineering.",
				author: "Elena Kowalski, Director of Engineering",
				company: "Sustainable Tech Startup",
			},
			stack:
				"Google Cloud (GKE) · BigQuery · Grafana · OpenTelemetry · Custom ML Models",
		},
	];

	return (
		<section id="work" className="py-20">
			<div className="section">
				<SectionIntro
					title="Case Sigils"
					subtitle="Real transformations. Real metrics. Real testimonials."
				/>
				<div className="mt-12 space-y-8">
					{cases.map((c, i) => (
						<motion.article
							key={c.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{ duration: 0.8, delay: 0.1 + i * 0.1 }}
							className="group relative overflow-hidden glass-enhanced p-8 md:p-10 text-left"
						>
							<div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[--color-brand]/8 via-transparent to-[--color-accent]/8 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

							{/* Header */}
							<div className="flex items-start gap-4 mb-6">
								<div className="p-3 rounded-xl bg-gradient-to-tr from-[--color-brand]/70 to-[--color-accent]/70 text-white">
									{c.icon}
								</div>
								<div className="flex-1">
									<h3 className="text-2xl font-semibold mb-2">{c.title}</h3>
								</div>
							</div>

							{/* Challenge */}
							<div className="mb-6">
								<h4 className="text-sm font-semibold text-[--color-brand] uppercase tracking-wider mb-2">
									The Challenge
								</h4>
								<p className="text-[--color-muted]">{c.challenge}</p>
							</div>

							{/* Solution */}
							<div className="mb-6">
								<h4 className="text-sm font-semibold text-[--color-brand] uppercase tracking-wider mb-2">
									What We Did
								</h4>
								<p className="text-[--color-muted]">{c.solution}</p>
							</div>

							{/* Results */}
							<div className="mb-6">
								<h4 className="text-sm font-semibold text-[--color-brand] uppercase tracking-wider mb-3">
									The Results
								</h4>
								<div className="grid md:grid-cols-3 gap-4">
									{c.results.map((result, idx) => {
										const IconComponent = result.icon;
										return (
											<motion.div
												key={result.label}
												initial={{ opacity: 0, scale: 0.95 }}
												whileInView={{ opacity: 1, scale: 1 }}
												viewport={{ once: true }}
												transition={{ delay: 0.2 + idx * 0.1 }}
												className="glass p-4 rounded-lg"
											>
												<div className="flex items-center gap-2 mb-2">
													<IconComponent className="w-4 h-4 text-[--color-accent]" />
													<span className="text-xs text-[--color-muted] uppercase">
														{result.label}
													</span>
												</div>
												<div className="flex items-baseline gap-2">
													<span className="text-sm text-red-400 line-through">
														{result.before}
													</span>
													<span className="text-lg font-semibold text-[--color-success]">
														→ {result.after}
													</span>
												</div>
											</motion.div>
										);
									})}
								</div>
							</div>

							{/* Testimonial */}
							<div className="border-l-2 border-[--color-brand] pl-4 mb-6 italic text-[--color-muted]">
								"{c.testimonial.quote}"
								<div className="mt-2 text-sm not-italic">
									<strong className="text-[--color-text]">
										{c.testimonial.author}
									</strong>
									, {c.testimonial.company}
								</div>
							</div>

							{/* Stack */}
							<div className="text-sm">
								<span className="text-[--color-muted]/80">Stack: </span>
								<span className="text-[--color-muted]">{c.stack}</span>
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
					title="Alliances"
					subtitle="We weave modern DevOps craft through open standards and platform primitives."
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
					The ritual begins when intent meets precision.
				</h3>
				<p className="text-lg text-[--color-muted] mb-6">
					Speak your intent — we'll return with a plan, a pilot, and a
					measurable win.
				</p>
				<div className="flex justify-center">
					<a
						href="#contact"
						className="btn btn-ghost px-8 py-3 hover:border-[--color-brand]/60"
					>
						Initiate →
					</a>
				</div>
			</motion.div>
		</section>
	);
}
