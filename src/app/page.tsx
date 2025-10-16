"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Check, Cloud, Code, Cog, Eye, Globe, Layers, Menu, Shield, Star, Target, X } from "lucide-react"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: undefined });
  const haloShift = useTransform(scrollY, [0, 800], [0, 60]);

  return (
    <main
      ref={pageRef}
      className="relative min-h-screen overflow-x-hidden bg-[--color-bg] text-[--color-text] selection:bg-[--color-brand]/20"
    >
      {/* Ambient halos */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ y: haloShift }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-[-25%] left-[-10%] h-[45rem] w-[45rem] rounded-full bg-[--halo-brand] blur-[120px]"
        />
        <motion.div
          style={{ y: haloShift }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 2 }}
          className="absolute bottom-[-20%] right-[-10%] h-[50rem] w-[50rem] rounded-full bg-[--halo-accent] blur-[140px]"
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-[--color-border]/60 bg-[--color-bg]/80 backdrop-blur-xl">
        <div className="section flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="text-2xl">🪄</span>
            <span className="text-lg">BlackMagickOps</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-[--color-muted] md:flex">
            <a href="#disciplines" className="transition-colors hover:text-[--color-text]">Disciplines</a>
            <a href="#framework" className="transition-colors hover:text-[--color-text]">Framework</a>
            <a href="#philosophy" className="transition-colors hover:text-[--color-text]">Philosophy</a>
            <a href="#work" className="transition-colors hover:text-[--color-text]">Work</a>
            <a href="#contact" className="btn btn-primary px-6 py-2">
              Start a Project →
            </a>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-[--color-border] text-[--color-muted]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-[--color-border]/60 bg-[--color-bg]/95 md:hidden"
          >
            <div className="section flex flex-col gap-4 py-6 text-[--color-muted]">
              <a href="#disciplines" onClick={() => setMobileMenuOpen(false)}>Disciplines</a>
              <a href="#framework" onClick={() => setMobileMenuOpen(false)}>Framework</a>
              <a href="#philosophy" onClick={() => setMobileMenuOpen(false)}>Philosophy</a>
              <a href="#work" onClick={() => setMobileMenuOpen(false)}>Work</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary px-6 py-3 text-center">
                Start a Project
              </a>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero */}
      <section className="relative min-h-screen pt-16 overflow-hidden">
        {/* Background Mystical Pattern - Subtle */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          <MysticalPattern />
        </div>

        {/* Ethereal Spirit Orbs - Full Hero Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <EtherealSpiritOrbs />
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
                <span className="text-4xl">🪄</span>
                <span className="text-2xl font-semibold">BlackMagickOps</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl leading-tight tracking-tight md:text-7xl md:leading-[1.05] lg:text-left text-center">
                <span className="text-[--color-text]">Precision. Discipline.</span>
                <br />
                <span className="text-[--color-brand]">Magic.</span>
              </h1>

              {/* Main Description */}
              <p className="text-xl text-[--color-muted] max-w-2xl lg:text-left text-center">
                Engineering the invisible — we build{" "}
                <strong className="font-semibold text-[--color-text]">cloud-native platforms</strong>{" "}
                that move with reliability, efficiency, and intent.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-wrap gap-4 lg:justify-start justify-center">
                <a href="#contact" className="btn btn-primary px-8 py-4 text-lg">
                  Begin the Ritual
                </a>
                <a href="#disciplines" className="btn btn-ghost px-8 py-4 text-lg">
                  Explore Capabilities
                </a>
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
                      rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                      scale: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
                    }}
                  />
                </div>

                <div className="absolute bottom-1/3 left-1/4 w-24 h-24">
                  <motion.div
                    className="w-full h-full rounded-full border-2 border-[--color-brand]/20"
                    animate={{ rotate: -360, scale: [0.8, 1.2, 0.8] }}
                    transition={{
                      rotate: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                      scale: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
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
                    BlackMagickOps is your <strong className="text-[--color-text]">10x DevOps Engineer</strong> who can independently build,
                    optimize, and secure your entire platform infrastructure.
                  </p>

                  {/* Key Benefits */}
                  <div className="space-y-3">
                    {[
                      "Platform Engineering Excellence",
                      "Automated DevOps Pipelines",
                      "FinOps & Cost Optimization"
                    ].map((benefit, i) => (
                      <motion.div
                        key={benefit}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-[--color-accent]" />
                        <span className="text-sm text-[--color-text]">{benefit}</span>
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

      {/* Disciplines */}
      <section id="disciplines" className="py-28">
        <div className="section">
          <SectionIntro
            title="Core Disciplines"
            subtitle="Each engagement blends infrastructure mastery, automation, and disciplined execution."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: "🏗️",
                title: "Platform Engineering",
                desc: "Developer platforms with golden paths, strong guardrails, and seamless delivery.",
                bullets: [
                  "Backstage IDP · Templates & golden paths",
                  "Multi-tenant Kubernetes with OPA guardrails",
                  "Observability-as-a-Product (SLOs, error budgets)",
                ],
              },
              {
                icon: "⚙️",
                title: "DevOps Acceleration",
                desc: "CI/CD at scale, supply chain security, progressive delivery made routine.",
                bullets: [
                  "Trunk-based, canary/blue-green, DORA focus",
                  "SBOM, provenance, SLSA-aligned controls",
                  "Dagger · GitHub Actions/GitLab CI",
                ],
              },
              {
                icon: "🜲",
                title: "Automation & FinOps",
                desc: "Self-healing ops, actionable observability, cost control baked into your runbook.",
                bullets: [
                  "Event-driven ops · KEDA · ChatOps",
                  "Unified cost + reliability dashboards",
                  "Rightsizing policies · budget alerts",
                ],
              },
            ].map((discipline, i) => (
              <motion.article
                key={discipline.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
                className="glass p-8 hover:border-[--color-brand]/40 transition-all group"
              >
                <div className="mb-4 text-5xl">{discipline.icon}</div>
                <h3 className="text-2xl font-semibold mb-3">{discipline.title}</h3>
                <p className="text-[--color-muted] mb-6">{discipline.desc}</p>
                <div className="h-px w-full bg-gradient-to-r from-[--color-brand]/20 via-[--color-accent]/20 to-transparent mb-4" />
                <ul className="space-y-2 text-sm text-[--color-muted]">
                  {discipline.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="text-[--color-accent] mt-1">·</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <SigilDivider />

      {/* Ritual Framework */}
      <RitualFramework />

      <SigilDivider />

      {/* Philosophy */}
      <section id="philosophy" className="py-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.4 }}
          className="section text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-8">Our Philosophy</h2>
          <p className="text-xl leading-relaxed text-[--color-muted]">
            We treat engineering as a sacred craft — where precision is devotion, and automation is ritual.
            Our mission: to summon order from chaos through deliberate design and disciplined execution.
          </p>
        </motion.div>
      </section>

      <SigilDivider />

      {/* Case Sigils */}
      <CaseSigils />

      {/* Alliances */}
      <Alliances />

      <SigilDivider />

      {/* Contact */}
      <section id="contact" className="py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.1 }}
          className="section max-w-4xl mx-auto"
        >
          <div className="glass p-10 md:p-14">
            <h2 className="text-center text-4xl font-semibold mb-6">Initiate Contact</h2>
            <p className="mx-auto max-w-md text-center text-[--color-muted] mb-10">
              Describe your objective — we'll respond with a precision plan and a path to measurable wins.
            </p>

            <form className="mx-auto max-w-2xl space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="block text-sm">
                  <span className="text-[--color-muted] mb-2 block">Name</span>
                  <input
                    className="w-full rounded-xl border border-[--color-border] bg-[--color-surface]/50 px-4 py-3"
                    placeholder="Ada Lovelace"
                  />
                </label>
                <label className="block text-sm">
                  <span className="text-[--color-muted] mb-2 block">Work Email</span>
                  <input
                    type="email"
                    className="w-full rounded-xl border border-[--color-border] bg-[--color-surface]/50 px-4 py-3"
                    placeholder="you@company.com"
                  />
                </label>
              </div>

              <label className="block text-sm">
                <span className="text-[--color-muted] mb-2 block">Message</span>
                <textarea
                  className="w-full rounded-xl border border-[--color-border] bg-[--color-surface]/50 px-4 py-3"
                  rows={5}
                  placeholder="Tell us about your platform, constraints, and desired outcomes…"
                />
              </label>

              <div className="flex justify-center pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.99 }}
                  type="button"
                  className="btn btn-primary px-10 py-4 text-lg"
                >
                  Request Consultation
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </section>

      {/* Invocation CTA */}
      <InvocationCTA />

      {/* Footer */}
      <footer className="border-t border-[--color-border]/60 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2 }}
          className="section text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-xl">
            <span>🪄</span>
            <span className="font-semibold">BlackMagickOps</span>
          </div>
          <p className="text-sm text-[--color-muted]">DevOps • Platform Engineering • Automation</p>
          <p className="text-xs text-[--color-muted]/60">© {new Date().getFullYear()} BlackMagickOps. All rights reserved.</p>
        </motion.div>
      </footer>
    </main>
  );
}

/* ---------- Sigil Divider ---------- */
function SigilDivider({ variant = "default" }: { variant?: "default" | "primary" }) {
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

/* ---------- Section Intro ---------- */
function SectionIntro({ title, subtitle }: { title: string; subtitle: string }) {
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

/* ---------- Ritual Framework ---------- */
function RitualFramework() {
  const steps = [
    { k: "Discover", d: "Stakeholders, constraints, SLOs, current-state mapping." },
    { k: "Design", d: "Reference architecture, guardrails, golden paths." },
    { k: "Automate", d: "IaC, pipelines, policies, runbooks, paved roads." },
    { k: "Optimize", d: "SLOs, cost KPIs, continuous improvement." },
  ];

  return (
    <section id="framework" className="py-28">
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
              boxShadow: "0 0 24px rgba(110,142,248,0.12) inset, 0 0 20px rgba(91,227,193,0.10)",
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
              transition={{ duration: 2.2, delay: 0.2 + idx * 0.15, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror" }}
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

/* ---------- Case Sigils ---------- */
function CaseSigils() {
  const items = [
    {
      t: "IDP for 120+ Squads",
      d: "Backstage-powered golden paths, GitOps, and SRE guardrails cut lead time by 47%.",
      s: "AKS · Argo CD · Backstage · Pulumi",
    },
    {
      t: "SLSA-Aligned Supply Chain",
      d: "End-to-end provenance and SBOM with automated policy checks at the edge.",
      s: "GH Actions · Dagger · Cosign · OPA",
    },
    {
      t: "FinOps & SLO Dashboard",
      d: "Unified cost + reliability views to steer investment and protect margin.",
      s: "BigQuery · Grafana · OpenTelemetry",
    },
  ];

  return (
    <section id="work" className="py-28">
      <div className="section">
        <SectionIntro title="Case Sigils" subtitle="Selected engagements, sealed and delivered." />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {items.map((c, i) => (
            <motion.article
              key={c.t}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.1 }}
              className="group relative overflow-hidden glass p-8 text-left"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[--color-brand]/12 via-transparent to-[--color-accent]/12 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="mb-4 h-12 w-12 rounded-full bg-gradient-to-tr from-[--color-brand]/70 to-[--color-accent]/70" />
              <h3 className="text-xl font-semibold mb-3">{c.t}</h3>
              <p className="text-[--color-muted] mb-4">{c.d}</p>
              <div className="text-sm text-[--color-muted]/80">Stack: {c.s}</div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Alliances ---------- */
function Alliances() {
  const tools = [
    "AKS", "EKS", "GKE", "Azure", "GCP", "AWS",
    "Pulumi", "Terraform", "Dagger", "Argo CD", "Backstage",
    "OpenTelemetry", "Grafana", "OPA", "Cosign",
  ];

  return (
    <section id="alliances" className="py-24">
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

/* ---------- Invocation CTA ---------- */
function InvocationCTA() {
  return (
    <section className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="section text-center max-w-3xl mx-auto"
      >
        <h3 className="text-3xl md:text-4xl font-semibold mb-4">The ritual begins when intent meets precision.</h3>
        <p className="text-lg text-[--color-muted] mb-6">
          Speak your intent — we'll return with a plan, a pilot, and a measurable win.
        </p>
        <div className="flex justify-center">
          <a href="#contact" className="btn btn-ghost px-8 py-3 hover:border-[--color-brand]/60">
            Initiate →
          </a>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Mystical Pattern ---------- */
function MysticalPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {/* Floating geometric shapes */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern id="hexPattern" x="0" y="0" width="100" height="87" patternUnits="userSpaceOnUse">
            <motion.path
              d="M 50,5 L 80,25 L 80,65 L 50,85 L 20,65 L 20,25 Z"
              fill="none"
              stroke="var(--color-brand)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexPattern)" />
      </svg>

      {/* Ethereal Spirit Orbs */}
      <EtherealSpiritOrbs />

      {/* Floating circles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-[--color-accent]"
          style={{
            width: `${Math.random() * 120 + 60}px`,
            height: `${Math.random() * 120 + 60}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.1, 0.3, 0.1],
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Rotating pentagrams */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`penta-${i}`}
          className="absolute"
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + i * 15}%`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60 + i * 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <svg width="150" height="150" viewBox="0 0 100 100">
            <motion.polygon
              points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
              fill="none"
              stroke="var(--color-brand)"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
          </svg>
        </motion.div>
      ))}

      {/* Particle field */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-[--color-accent]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Ethereal Spirit Orbs ---------- */
function EtherealSpiritOrbs() {
  // Generate initial positions for 8 unique spirit orbs
  const [orbs] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10, // 10-90% to avoid edges
      y: Math.random() * 80 + 10,
      size: Math.random() * 80 + 40, // 40-120px randomized sizes
      intensity: Math.random() * 0.4 + 0.2, // 0.2-0.6 opacity for better visibility
      speed: Math.random() * 2 + 1, // 1-3x speed multiplier
      phase: Math.random() * Math.PI * 2, // Random starting phase for movement
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <SpiritOrb key={orb.id} {...orb} />
      ))}
    </div>
  );
}

/* ---------- Individual Spirit Orb ---------- */
function SpiritOrb({
  id,
  x: initialX,
  y: initialY,
  size,
  intensity,
  speed,
  phase
}: {
  id: number;
  x: number;
  y: number;
  size: number;
  intensity: number;
  speed: number;
  phase: number;
}) {
  const [isMerging, setIsMerging] = useState(false);
  const [mergeCycle, setMergeCycle] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [currentPosition, setCurrentPosition] = useState({ x: initialX, y: initialY });
  const [targetPosition, setTargetPosition] = useState({ x: initialX, y: initialY });

  // Some orbs have slow breathing aura (30% chance)
  const hasSlowBreathing = id % 3 === 0 || id === 7;

  useEffect(() => {
    // Random merge/split cycles (30% chance every 8-12 seconds)
    const mergeInterval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance
        setIsMerging(true);
        setTimeout(() => {
          setIsMerging(false);
          setMergeCycle(prev => prev + 1);
        }, 3000); // 3 second merge duration
      }
    }, 8000 + Math.random() * 4000); // Every 8-12 seconds

    // Random disappearing/reappearing cycles (like they're alive)
    const disappearInterval = setInterval(() => {
      if (Math.random() < 0.25) { // 25% chance to disappear
        setIsVisible(false);
        setTimeout(() => {
          setIsVisible(true);
          // Change position when reappearing
          setCurrentPosition({
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
          });
        }, 2000 + Math.random() * 3000); // Disappear for 2-5 seconds
      }
    }, 10000 + Math.random() * 8000); // Every 10-18 seconds

    // Random movement cycles - like they're exploring
    const movementInterval = setInterval(() => {
      if (isVisible && Math.random() < 0.4) { // 40% chance to move
        setTargetPosition({
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
        });
      }
    }, 6000 + Math.random() * 6000); // Every 6-12 seconds

    return () => {
      clearInterval(mergeInterval);
      clearInterval(disappearInterval);
      clearInterval(movementInterval);
    };
  }, [isVisible, id]);

  // Gradual position movement
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setCurrentPosition(prev => ({
        x: prev.x + (targetPosition.x - prev.x) * 0.02, // Slow gradual movement
        y: prev.y + (targetPosition.y - prev.y) * 0.02,
      }));
    }, 100);

    return () => clearInterval(moveInterval);
  }, [targetPosition]);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${currentPosition.x}%`,
        top: `${currentPosition.y}%`,
        width: `${size}px`,
        height: `${size}px`,
      }}
      animate={{
        // Gentle floating with sine/cosine wave patterns
        x: [0, Math.sin(phase + id * 0.5) * 30, Math.sin(phase + id * 0.5 + Math.PI) * 20, 0],
        y: [0, Math.cos(phase + id * 0.3) * 25, Math.cos(phase + id * 0.3 + Math.PI) * 30, 0],
        // Smooth scale animations (0.6x to 1x scale)
        scale: isMerging
          ? [1, 0.3, 1.5, 1] // Dramatic merge transformations
          : [0.6, 1, 0.8, 1], // Gentle breathing motion
        // Alive disappearing/appearing effect
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 8 / speed, // Different speeds for each orb
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay: id * 0.7, // Randomized timing to prevent synchronization
        opacity: {
          duration: isVisible ? 1.5 : 2, // Faster appear, slower disappear
          ease: "easeInOut",
        },
      }}
    >
      {/* Breathing Aura - Expands beyond the orb (with slow breathing variant) */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle,
            transparent 40%,
            var(--color-accent) 70%,
            var(--color-brand) 85%,
            transparent 100%
          )`,
          filter: 'blur(16px)',
          transform: 'scale(2)', // Expands beyond the orb
        }}
        animate={{
          opacity: [0, intensity * 0.3, intensity * 0.6, 0],
          scale: hasSlowBreathing
            ? [1.5, 3, 2.5, 1.5] // Slow, deep breathing for some orbs
            : [1.5, 2.5, 2, 1.5], // Normal breathing
        }}
        transition={{
          duration: hasSlowBreathing ? 8 / speed : 5 / speed, // Slower breathing for some
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: id * 0.4,
        }}
      />

      {/* Outer Glow Ring - Multi-layered for depth */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle,
            transparent 20%,
            var(--color-brand) 45%,
            var(--color-accent) 65%,
            transparent 85%
          )`,
          filter: 'blur(8px)',
        }}
        animate={{
          opacity: [intensity * 0.4, intensity * 0.9, intensity * 0.4],
          scale: [0.8, 1.3, 0.8], // Expanding and contracting rings
        }}
        transition={{
          duration: 4 / speed,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: id * 0.2,
        }}
      />

      {/* Inner Pulsing Core - Different intensities */}
      <motion.div
        className="absolute inset-2 rounded-full"
        style={{
          background: `radial-gradient(circle,
            var(--color-accent) 0%,
            var(--color-brand) 35%,
            rgba(110, 142, 248, 0.3) 60%,
            transparent 80%
          )`,
          filter: 'blur(3px)',
        }}
        animate={{
          opacity: isMerging
            ? [intensity * 0.5, intensity * 0.1, intensity * 1.2, intensity * 0.8] // Dramatic merge intensity
            : [intensity * 0.3, intensity * 1, intensity * 0.5, intensity * 0.8], // Breathing with different intensities
          scale: isMerging
            ? [1, 0.1, 2.2, 1] // Dramatic transformations during merge
            : [0.6, 1, 0.7, 1], // Gentle pulsing core
        }}
        transition={{
          duration: 3 / speed,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: id * 0.15,
        }}
      />

      {/* Inner Energy Core - Varying opacity */}
      <motion.div
        className="absolute inset-3 rounded-full"
        style={{
          background: `radial-gradient(circle,
            var(--color-accent) 0%,
            rgba(91, 227, 193, 0.8) 40%,
            transparent 70%
          )`,
          filter: 'blur(1px)',
        }}
        animate={{
          opacity: [intensity * 0.6, intensity * 1.2, intensity * 0.4],
          scale: [0.4, 0.9, 0.6],
        }}
        transition={{
          duration: 2 / speed,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: id * 0.1,
        }}
      />

      {/* Spirit Trail Effect - Rotating color gradients */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from ${id * 45}deg,
            transparent,
            var(--color-brand),
            var(--color-accent),
            transparent,
            rgba(110, 142, 248, 0.3),
            transparent
          )`,
          filter: 'blur(6px)',
        }}
        animate={{
          rotate: 360,
          opacity: isMerging
            ? [0, intensity * 0.8, intensity * 1.2, 0] // Enhanced trails during merge
            : [0, intensity * 0.4, intensity * 0.6, 0],
        }}
        transition={{
          rotate: {
            duration: 12 / speed, // Slower rotation for more mystical effect
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          },
          opacity: {
            duration: 4 / speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: id * 0.5,
          },
        }}
      />

      {/* Additional Trail Layer - For enhanced mystical effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `conic-gradient(from ${-id * 60}deg,
            rgba(91, 227, 193, 0.2),
            transparent,
            var(--color-accent),
            transparent,
            var(--color-brand),
            transparent
          )`,
          filter: 'blur(4px)',
        }}
        animate={{
          rotate: -360,
          opacity: [0, intensity * 0.3, 0],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          rotate: {
            duration: 15 / speed, // Counter-rotation for complex trails
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          },
          opacity: {
            duration: 6 / speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: id * 0.6,
          },
          scale: {
            duration: 5 / speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: id * 0.3,
          },
        }}
      />

      {/* Alive Energy Pulse - Random bursts of energy */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle,
            var(--color-accent) 0%,
            transparent 50%
          )`,
          filter: 'blur(2px)',
        }}
        animate={{
          opacity: [0, 0, 0, intensity * 1.5, 0], // Random energy bursts
          scale: [0.5, 0.5, 0.5, 2, 0.5],
        }}
        transition={{
          duration: 8 / speed,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeOut",
          delay: id * 1.2 + Math.random() * 3, // Random timing for alive effect
        }}
      />
    </motion.div>
  );
}

/* ---------- Animated Metrics ---------- */
function AnimatedMetrics() {
  const metrics = [
    { value: 99.9, suffix: "%", label: "Platform Uptime", prefix: "" },
    { value: 47, suffix: "%", label: "Deployment Speed ↑", prefix: "+" },
    { value: 120, suffix: "+", label: "Squads Empowered", prefix: "" },
    { value: 2.3, suffix: "M", label: "Cost Optimized", prefix: "$" },
  ];

  return (
    <section className="py-20">
      <div className="section">
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

/* ---------- Count Up Metric ---------- */
function CountUpMetric({ end, prefix = "", suffix = "" }: { end: number; prefix?: string; suffix?: string }) {
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
    <div ref={ref} className="text-3xl md:text-4xl font-bold text-[--color-brand]">
      {prefix}{displayValue}{suffix}
    </div>
  );
}
