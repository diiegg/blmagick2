"use client";

import { motion } from "framer-motion";
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

/**
 * CaseSigils - Portfolio/case studies section
 *
 * Features:
 * - Grid of case study cards
 * - Hover gradient effects
 * - Tech stack badges
 */
export function CaseSigils() {
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
