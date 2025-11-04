"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Check, CheckCircle, ChevronDown, Cloud, Code, Cog, Eye, Globe, Layers, Shield, Star, Target, X } from "lucide-react"

// Import layout and UI components directly (small bundle size)
import {
  Header,
  Footer,
  AnimatedMetrics,
  SigilDivider,
  SectionIntro,
  TypewriterText,
  MysticalCard,
  FloatingCTA,
  MysticalInput,
  MysticalTextarea,
  PortalImage,
  CascadingList,
  FloatingQuote,
  ScrollReveal,
  FloatingSocialIcon,
  SuccessAnimation,
  RitualFramework,
  CaseSigils,
  Alliances,
  InvocationCTA,
} from "@/components";

// Lazy load heavy animation components for better performance
const EnergyGrid = dynamic(() => import('@/components/animations/EnergyGrid').then(mod => ({ default: mod.EnergyGrid })), {
  ssr: false,
  loading: () => null
});

const MysticalPattern = dynamic(() => import('@/components/animations/MysticalPattern').then(mod => ({ default: mod.MysticalPattern })), {
  ssr: false,
  loading: () => null
});

const EtherealSpiritOrbs = dynamic(() => import('@/components/animations/EtherealSpiritOrbs').then(mod => ({ default: mod.EtherealSpiritOrbs })), {
  ssr: false,
  loading: () => null
});

export default function Home() {

  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: undefined });
  const haloShift = useTransform(scrollY, [0, 800], [0, 60]);

  return (
    <main
      ref={pageRef}
      className="relative z-20 min-h-screen overflow-x-hidden bg-[--color-bg] text-[--color-text] selection:bg-[--color-brand]/20"
      style={{ paddingTop: '150px' }}
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
      <Header />

      {/* Energy Grid Background - Subtle animated grid */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
        <EnergyGrid />
      </div>

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
                <FloatingCTA
                  href="#contact"
                  className="px-8 py-4 text-lg"
                  variant="primary"
                >
                  Begin the Ritual
                </FloatingCTA>
                <FloatingCTA
                  href="#disciplines"
                  className="px-8 py-4 text-lg"
                  variant="ghost"
                >
                  Explore Capabilities
                </FloatingCTA>
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

      {/* Disciplines - Enhanced with Tabbed Interface */}
      <section id="disciplines" className="py-28">
        <div className="section">
          <SectionIntro
            title="Core Disciplines"
            subtitle="Each engagement blends infrastructure mastery, automation, and disciplined execution."
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
                              <h3 className="text-2xl font-semibold">Platform Engineering</h3>
                              <p className="text-[--color-muted]">Developer platforms with golden paths and strong guardrails</p>
                            </div>
                          </div>
                          <CascadingList
                            items={[
                              "Backstage IDP · Templates & golden paths",
                              "Multi-tenant Kubernetes with OPA guardrails",
                              "Observability-as-a-Product (SLOs, error budgets)"
                            ]}
                            delay={0.1}
                          />
                        </MysticalCard>
                      </div>
                      <div className="mystical-pattern bg-opacity-20 rounded-2xl p-8 glass-enhanced">
                        <h4 className="text-lg font-semibold mb-4">Key Technologies</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {["Kubernetes", "Backstage", "OPA", "Prometheus"].map((tech, i) => (
                            <div key={tech} className="chip icon-hover text-center">
                              {tech}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
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
                              <h3 className="text-2xl font-semibold">DevOps Acceleration</h3>
                              <p className="text-[--color-muted]">CI/CD at scale with supply chain security</p>
                            </div>
                          </div>
                          <CascadingList
                            items={[
                              "Trunk-based, canary/blue-green, DORA focus",
                              "SBOM, provenance, SLSA-aligned controls",
                              "Dagger · GitHub Actions/GitLab CI"
                            ]}
                            delay={0.1}
                          />
                        </MysticalCard>
                      </div>
                      <div className="circuit-pattern bg-opacity-20 rounded-2xl p-8 glass-enhanced">
                        <h4 className="text-lg font-semibold mb-4">Deployment Strategies</h4>
                        <div className="space-y-3">
                          {["Blue-Green", "Canary", "Rolling", "Feature Flags"].map((strategy, i) => (
                            <div key={strategy} className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-[--color-brand] rounded-full"></div>
                              <span>{strategy}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
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
                              <h3 className="text-2xl font-semibold">Automation & FinOps</h3>
                              <p className="text-[--color-muted]">Self-healing ops with cost control</p>
                            </div>
                          </div>
                          <CascadingList
                            items={[
                              "Event-driven ops · KEDA · ChatOps",
                              "Unified cost + reliability dashboards",
                              "Rightsizing policies · budget alerts"
                            ]}
                            delay={0.1}
                          />
                        </MysticalCard>
                      </div>
                      <div className="tech-grid bg-opacity-20 rounded-2xl p-8 glass-premium">
                        <h4 className="text-lg font-semibold mb-4">Cost Optimization</h4>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span>Infrastructure Cost</span>
                            <span className="text-[--color-success]">-40%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Deployment Time</span>
                            <span className="text-[--color-success]">-75%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Manual Processes</span>
                            <span className="text-[--color-success]">-90%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              ]}
            />
          </div>
        </div>
      </section>

      <SigilDivider />

      {/* Enhanced Ritual Framework with Timeline */}
      <section id="framework" className="py-28">
        <div className="section">
          <SectionIntro
            title="Our Ritual Framework"
            subtitle="Every engagement follows the same precision cycle — discover, design, automate, optimize."
          />

          <div className="mt-16 asymmetric-grid">
            <div>
              <ProcessTimeline
                steps={[
                  {
                    title: "Discover",
                    description: "Stakeholders, constraints, SLOs, current-state mapping.",
                    icon: <Eye className="w-6 h-6" />
                  },
                  {
                    title: "Design",
                    description: "Reference architecture, guardrails, golden paths.",
                    icon: <Code className="w-6 h-6" />
                  },
                  {
                    title: "Automate",
                    description: "IaC, pipelines, policies, runbooks, paved roads.",
                    icon: <Cog className="w-6 h-6" />
                  },
                  {
                    title: "Optimize",
                    description: "SLOs, cost KPIs, continuous improvement.",
                    icon: <Target className="w-6 h-6" />
                  }
                ]}
              />
            </div>

            <div className="glass-premium p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-6">Framework Benefits</h3>
              <div className="space-y-4">
                {[
                  { metric: "Deployment Velocity", improvement: "10x faster" },
                  { metric: "Infrastructure Cost", improvement: "40% reduction" },
                  { metric: "System Reliability", improvement: "99.9% uptime" },
                  { metric: "Developer Experience", improvement: "85% satisfaction" }
                ].map((benefit, i) => (
                  <motion.div
                    key={benefit.metric}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex justify-between items-center p-3 rounded-lg bg-[--color-bg]/50"
                  >
                    <span className="text-[--color-muted]">{benefit.metric}</span>
                    <span className="text-[--color-brand] font-semibold">{benefit.improvement}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Testimonials */}
      <section id="testimonials" className="py-32">
        <div className="section">
          <SectionIntro
            title="Client Testimonials"
            subtitle="What our clients say about the mystical transformation of their infrastructure."
          />

          <div className="mt-16">
            <TestimonialCarousel
              testimonials={[
                {
                  quote: "BlackMagickOps transformed our deployment pipeline from chaos to precision. Their platform engineering approach reduced our time-to-market by 70% while improving reliability dramatically.",
                  author: "Sarah Chen",
                  role: "VP of Engineering",
                  company: "TechFlow Systems"
                },
                {
                  quote: "The mystical precision they brought to our infrastructure was remarkable. We went from manual deployments to fully automated CI/CD with comprehensive monitoring in just 12 weeks.",
                  author: "Marcus Rodriguez",
                  role: "CTO",
                  company: "CloudNative Solutions"
                },
                {
                  quote: "Their FinOps integration saved us 40% on cloud costs while doubling our deployment frequency. The golden paths they created made our developers incredibly productive.",
                  author: "Elena Kowalski",
                  role: "DevOps Director",
                  company: "ScaleUp Ventures"
                },
                {
                  quote: "The Backstage IDP implementation was game-changing. Our development teams now have self-service capabilities with proper guardrails. Security and compliance are baked in.",
                  author: "David Kim",
                  role: "Platform Lead",
                  company: "Enterprise Corp"
                },
                {
                  quote: "BlackMagickOps doesn't just implement tools, they create a culture of excellence. The observability and SLO framework they built transformed how we think about reliability.",
                  author: "Priya Patel",
                  role: "Engineering Manager",
                  company: "Innovation Labs"
                }
              ]}
            />
          </div>
        </div>
      </section>

      <SigilDivider />

      {/* FAQ Section */}
      <section id="faq" className="py-32">
        <div className="section">
          <SectionIntro
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about our mystical DevOps practices."
          />

          <div className="mt-16 max-w-4xl mx-auto">
            <AccordionSection
              items={[
                {
                  title: "What makes BlackMagickOps different from other DevOps consultancies?",
                  content: (
                    <div className="space-y-4">
                      <p>We combine mystical precision with modern engineering practices. Our approach integrates platform engineering, automation, and FinOps into a unified ritual framework that delivers measurable results.</p>
                      <ul className="space-y-2 text-[--color-muted]">
                        <li>• Mystical framework with proven methodologies</li>
                        <li>• Focus on developer experience and platform engineering</li>
                        <li>• Integration of cost optimization from day one</li>
                        <li>• Comprehensive automation and self-healing systems</li>
                      </ul>
                    </div>
                  )
                },
                {
                  title: "How long does a typical engagement take?",
                  content: (
                    <div className="space-y-4">
                      <p>Our ritual framework typically spans 12-16 weeks, broken into four phases:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="p-4 rounded-lg bg-[--color-surface]">
                          <h5 className="font-semibold text-[--color-brand]">Discover (2-3 weeks)</h5>
                          <p className="text-sm text-[--color-muted] mt-1">Assessment and planning</p>
                        </div>
                        <div className="p-4 rounded-lg bg-[--color-surface]">
                          <h5 className="font-semibold text-[--color-brand]">Design (3-4 weeks)</h5>
                          <p className="text-sm text-[--color-muted] mt-1">Architecture and strategy</p>
                        </div>
                        <div className="p-4 rounded-lg bg-[--color-surface]">
                          <h5 className="font-semibold text-[--color-brand]">Automate (6-8 weeks)</h5>
                          <p className="text-sm text-[--color-muted] mt-1">Implementation and deployment</p>
                        </div>
                        <div className="p-4 rounded-lg bg-[--color-surface]">
                          <h5 className="font-semibold text-[--color-brand]">Optimize (1-2 weeks)</h5>
                          <p className="text-sm text-[--color-muted] mt-1">Monitoring and refinement</p>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  title: "What technologies do you specialize in?",
                  content: (
                    <div className="space-y-4">
                      <p>We work with cutting-edge cloud-native technologies and proven enterprise solutions:</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                        {[
                          "Kubernetes", "Backstage", "Terraform", "GitHub Actions",
                          "Prometheus", "Grafana", "ArgoCD", "OPA", "KEDA", "Istio"
                        ].map((tech) => (
                          <div key={tech} className="chip text-center bg-[--color-brand]/10 text-[--color-brand]">
                            {tech}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                },
                {
                  title: "Do you provide ongoing support after implementation?",
                  content: (
                    <div className="space-y-4">
                      <p>Yes, we offer multiple support models to ensure your mystical infrastructure continues to evolve:</p>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-[--color-success] mt-0.5" />
                          <div>
                            <strong>Managed Services:</strong> Full platform management and 24/7 monitoring
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-[--color-success] mt-0.5" />
                          <div>
                            <strong>Advisory Retainer:</strong> Monthly strategy sessions and architecture reviews
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-[--color-success] mt-0.5" />
                          <div>
                            <strong>On-Demand Support:</strong> Access to our experts for troubleshooting and optimization
                          </div>
                        </li>
                      </ul>
                    </div>
                  )
                },
                {
                  title: "What are your pricing models?",
                  content: (
                    <div className="space-y-4">
                      <p>We offer flexible engagement models tailored to your needs and budget:</p>
                      <div className="space-y-4 mt-4">
                        <div className="p-4 rounded-lg border border-[--color-border]">
                          <h5 className="font-semibold text-[--color-accent]">Project-Based</h5>
                          <p className="text-sm text-[--color-muted] mt-1">Fixed scope, timeline, and budget for defined deliverables</p>
                        </div>
                        <div className="p-4 rounded-lg border border-[--color-border]">
                          <h5 className="font-semibold text-[--color-accent]">Time & Materials</h5>
                          <p className="text-sm text-[--color-muted] mt-1">Flexible hourly or daily rates for ongoing work</p>
                        </div>
                        <div className="p-4 rounded-lg border border-[--color-border]">
                          <h5 className="font-semibold text-[--color-accent]">Value-Based</h5>
                          <p className="text-sm text-[--color-muted] mt-1">Pricing tied to measurable business outcomes and cost savings</p>
                        </div>
                      </div>
                    </div>
                  )
                }
              ]}
            />
          </div>
        </div>
      </section>

      <SigilDivider />

      {/* Contact */}
      <section id="contact" className="py-32">
        <ScrollReveal direction="bottom" className="section max-w-4xl mx-auto">
          <MysticalCard className="p-10 md:p-14">
            <div className="text-center mb-10">
              <TypewriterText
                text="Initiate Contact"
                delay={500}
              />
              <motion.h2
                className="text-4xl font-semibold mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2, duration: 0.8 }}
              />
              <ScrollReveal direction="top" delay={0.3}>
                <p className="mx-auto max-w-md text-[--color-muted]">
                  Describe your objective — we'll respond with a precision plan and a path to measurable wins.
                </p>
              </ScrollReveal>
            </div>

            <div className="mx-auto max-w-2xl">
              <MysticalContactForm />
            </div>
          </MysticalCard>
        </ScrollReveal>
      </section>

      {/* Invocation CTA */}
      <InvocationCTA />

      {/* Footer */}
      <footer className="border-t border-[--color-border]/60 bg-[--color-bg] py-16">
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
                <span className="text-2xl">🪄</span>
                <span className="font-semibold">BlackMagickOps</span>
              </div>
              <p className="text-[--color-muted] mb-6 max-w-md">
                DevOps • Platform Engineering • Automation
              </p>
              <p className="text-sm text-[--color-muted] mb-6">
                Precision. Discipline. Magic. Transform your infrastructure with mystical DevOps practices.
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
              <h4 className="font-semibold text-[--color-text] mb-4">Services</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#disciplines" className="text-[--color-muted] hover:text-[--color-brand] transition-colors">
                    Platform Engineering
                  </a>
                </li>
                <li>
                  <a href="#disciplines" className="text-[--color-muted] hover:text-[--color-brand] transition-colors">
                    DevOps Acceleration
                  </a>
                </li>
                <li>
                  <a href="#disciplines" className="text-[--color-muted] hover:text-[--color-brand] transition-colors">
                    Automation & FinOps
                  </a>
                </li>
                <li>
                  <a href="#framework" className="text-[--color-muted] hover:text-[--color-brand] transition-colors">
                    Consulting
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-[--color-text] mb-4">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#work" className="text-[--color-muted] hover:text-[--color-brand] transition-colors">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-[--color-muted] hover:text-[--color-brand] transition-colors">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-[--color-muted] hover:text-[--color-brand] transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-[--color-muted] hover:text-[--color-brand] transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-[--color-text] mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#philosophy" className="text-[--color-muted] hover:text-[--color-brand] transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-[--color-muted] hover:text-[--color-brand] transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/careers" className="text-[--color-muted] hover:text-[--color-brand] transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/partners" className="text-[--color-muted] hover:text-[--color-brand] transition-colors">
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
              <p>© {new Date().getFullYear()} BlackMagickOps. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <a href="/privacy" className="hover:text-[--color-brand] transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="hover:text-[--color-brand] transition-colors">
                  Terms of Service
                </a>
                <a href="/cookies" className="hover:text-[--color-brand] transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>

            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
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

      {/* Mystical Brand Section */}
      <section className="relative z-10 overflow-hidden bg-[--color-brand] py-32">
        {/* Content */}
        <div className="relative section text-center">
          <div className="text-4xl md:text-6xl lg:text-8xl font-normal text-black leading-none tracking-normal">
            BLACKMAGICKOPS
          </div>
        </div>

        {/* Scroll-triggered Reveal Effect */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 origin-left"
        />
      </section>

      {/* Performance Monitor (Development only) */}
      <PerformanceMonitor />
    </main>
  );
}

/* ---------- Sigil Divider ---------- */

// Enhanced Contact Form
function MysticalContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setShowSuccess(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', project: '', message: '' });

    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <MysticalInput
            placeholder="Your Name"
            value={formData.name}
            onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
            required
          />
          <MysticalInput
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
            required
          />
        </div>

        <MysticalInput
          placeholder="Project Type"
          value={formData.project}
          onChange={(value) => setFormData(prev => ({ ...prev, project: value }))}
        />

        <MysticalTextarea
          placeholder="Tell us about your mystical project..."
          value={formData.message}
          onChange={(value) => setFormData(prev => ({ ...prev, message: value }))}
          rows={5}
          required
        />

        <FloatingCTA
          href="#"
          className="w-full justify-center"
          variant="primary"
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
            />
          ) : null}
          {isSubmitting ? 'Casting Spell...' : 'Begin the Ritual →'}
        </FloatingCTA>
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
  priority = false
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
      { threshold: 0.1 }
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
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
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
  children
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
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
  items
}: {
  items: Array<{ href: string; label: string; }>
}) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
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
                  ? 'bg-[--color-brand] text-white'
                  : 'text-[--color-muted] hover:text-[--color-text] hover:bg-[--color-surface]'
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
  variant = "default"
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "glass" | "neomorphic";
}) {
  const baseClasses = "p-6 rounded-xl transition-all duration-300";
  const variantClasses = {
    default: "bg-[--color-surface] border border-[--color-border]",
    glass: "glass-enhanced",
    neomorphic: "neomorphic"
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
  className = ""
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

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('mousedown', handleMouseDown);
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
                ? 'bg-[--color-brand]'
                : 'bg-[--color-muted]'
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
  className = ""
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
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
          }
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      return () => {
        fcpObserver.disconnect();
        lcpObserver.disconnect();
      };
    }
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;

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
  defaultTab = 0
}: {
  tabs: Array<{ label: string; content: React.ReactNode; icon?: React.ReactNode; }>;
  defaultTab?: number;
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="tab-container">
      <div className="tab-list">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.icon && <span className="icon mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
}

// Accordion Component
function AccordionSection({
  items
}: {
  items: Array<{ title: string; content: React.ReactNode; }>;
}) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className={`accordion-item ${openItems.includes(index) ? 'open' : ''}`}>
          <button
            className="accordion-header"
            onClick={() => toggleItem(index)}
          >
            <span className="font-medium">{item.title}</span>
            <ChevronDown className={`accordion-icon w-5 h-5 ${openItems.includes(index) ? 'rotate-180' : ''}`} />
          </button>
          <div className={`accordion-content ${openItems.includes(index) ? 'open' : 'closed'}`}>
            <div className="accordion-body">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Timeline Component
function ProcessTimeline({
  steps
}: {
  steps: Array<{ title: string; description: string; icon?: React.ReactNode; }>;
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
  testimonials
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
      <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
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
                <div className="text-sm text-[--color-muted]">{testimonial.role} at {testimonial.company}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${current === index ? 'active' : ''}`}
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
  sections
}: {
  sections: Array<{ id: string; label: string; }>;
}) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
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
                    ? 'bg-[--color-brand] text-white'
                    : 'text-[--color-muted] hover:text-[--color-text] hover:bg-[--color-surface]'
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
function InfiniteScrollContainer({
  items,
  renderItem,
  loadMore,
  hasMore
}: {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
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
      { threshold: 0.1 }
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
            <div className="text-[--color-muted] text-sm">Scroll to load more...</div>
          )}
        </div>
      )}
    </div>
  );
}

// Masonry Portfolio Layout
function MasonryPortfolio({
  projects
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
          className={`masonry-item card-module ${project.featured ? 'glass-premium' : 'neomorphic'}`}
        >
          {project.image && (
            <div className="mb-4 rounded-lg overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-cover"
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
