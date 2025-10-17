"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Check, CheckCircle, ChevronDown, Cloud, Code, Cog, Eye, Globe, Layers, Menu, Shield, Star, Target, X } from "lucide-react"

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

      {/* Performance Monitor (Development only) */}
      <PerformanceMonitor />
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

/* ---------- Energy Grid Background ---------- */
function EnergyGrid() {
  // Create grid dimensions
  const gridSize = 40; // Size of each grid cell in pixels
  const cols = Math.ceil(window?.innerWidth / gridSize) || 30;
  const rows = Math.ceil(window?.innerHeight / gridSize) || 20;

  // Generate grid lines with random data flow pulses
  const [pulses, setPulses] = useState<Array<{
    id: number;
    type: 'horizontal' | 'vertical';
    position: number;
    delay: number;
    duration: number;
    intensity: number;
  }>>([]);

  useEffect(() => {
    // Generate random data flow pulses
    const generatePulses = () => {
      const newPulses = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        type: Math.random() > 0.5 ? 'horizontal' : 'vertical' as 'horizontal' | 'vertical',
        position: Math.floor(Math.random() * (Math.random() > 0.5 ? rows : cols)),
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4, // 3-7 seconds
        intensity: 0.3 + Math.random() * 0.4, // 0.3-0.7 intensity
      }));
      setPulses(newPulses);
    };

    generatePulses();

    // Regenerate pulses periodically
    const interval = setInterval(generatePulses, 8000);
    return () => clearInterval(interval);
  }, [cols, rows]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Vertical Grid Lines */}
      <div className="absolute inset-0">
        {Array.from({ length: cols }, (_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-[--color-brand] to-transparent"
            style={{
              left: `${(i * gridSize)}px`,
              opacity: 0.1,
            }}
            animate={{
              opacity: [0.05, 0.2, 0.05],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Horizontal Grid Lines */}
      <div className="absolute inset-0">
        {Array.from({ length: rows }, (_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-[--color-accent] to-transparent"
            style={{
              top: `${(i * gridSize)}px`,
              opacity: 0.1,
            }}
            animate={{
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 5 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.05,
            }}
          />
        ))}
      </div>

      {/* Data Flow Pulses */}
      {pulses.map((pulse) => (
        <motion.div
          key={pulse.id}
          className={`absolute ${
            pulse.type === 'horizontal'
              ? 'left-0 w-full h-px bg-gradient-to-r from-transparent via-[--color-brand] to-transparent'
              : 'top-0 h-full w-px bg-gradient-to-b from-transparent via-[--color-accent] to-transparent'
          }`}
          style={{
            [pulse.type === 'horizontal' ? 'top' : 'left']: `${pulse.position * gridSize}px`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            opacity: [0, pulse.intensity, pulse.intensity * 0.5, 0],
            scale: pulse.type === 'horizontal'
              ? [1, 1, 1, 1]
              : [1, 1, 1, 1],
          }}
          transition={{
            duration: pulse.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: pulse.delay,
          }}
        />
      ))}

      {/* Grid Intersection Points - Data Nodes */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }, (_, i) => {
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          return (
            <motion.div
              key={`node-${i}`}
              className="absolute w-1 h-1 rounded-full bg-[--color-brand]"
              style={{
                left: `${x}%`,
                top: `${y}%`,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.3 + Math.random() * 2,
              }}
            />
          );
        })}
      </div>

      {/* Energy Flow Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 rounded-full bg-[--color-accent]"
            style={{
              filter: 'blur(1px)',
            }}
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              opacity: [0, 0.6, 0],
              scale: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: i * 1.5,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Mystical Interactive Components ---------- */

// Typewriter Text Effect
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsComplete(true);
      }
    }, delay + 50 + Math.random() * 100);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, delay]);

  return (
    <span className={`${!isComplete ? 'typewriter' : ''}`}>
      {displayText}
    </span>
  );
}

// Mystical Card with Shimmer Effect
function MysticalCard({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={`mystical-card mystical-hover p-6 rounded-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

// Floating CTA Button
function FloatingCTA({
  children,
  href,
  className = "",
  variant = "primary"
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  variant?: "primary" | "ghost";
}) {
  return (
    <motion.a
      href={href}
      className={`floating-cta btn btn-${variant} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.a>
  );
}

// Mystical Input Field
function MysticalInput({
  type = "text",
  placeholder,
  value,
  onChange,
  required = false
}: {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`mystical-input relative ${isFocused ? 'focused' : ''}`}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        className="w-full px-4 py-3 bg-[--color-surface] border border-[--color-border] rounded-lg text-[--color-text] placeholder-[--color-muted] focus:outline-none focus:border-[--color-brand] transition-all duration-300"
      />
      {isFocused && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-[--color-brand]/20 to-[--color-accent]/20 rounded-lg -z-10 blur-sm"
        />
      )}
    </div>
  );
}

// Mystical Textarea
function MysticalTextarea({
  placeholder,
  value,
  onChange,
  rows = 4,
  required = false
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  required?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`mystical-input relative ${isFocused ? 'focused' : ''}`}>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        rows={rows}
        className="w-full px-4 py-3 bg-[--color-surface] border border-[--color-border] rounded-lg text-[--color-text] placeholder-[--color-muted] focus:outline-none focus:border-[--color-brand] transition-all duration-300 resize-none"
      />
      {isFocused && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-[--color-brand]/20 to-[--color-accent]/20 rounded-lg -z-10 blur-sm"
        />
      )}
    </div>
  );
}

// Portal Image Reveal
function PortalImage({
  src,
  alt,
  className = "",
  delay = 0
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, borderRadius: "50%" }}
      animate={isInView ? { scale: 1, borderRadius: "0.75rem" } : {}}
      transition={{
        duration: 1.2,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={`mystical-portal overflow-hidden ${className}`}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </motion.div>
  );
}

// Cascading List Items
function CascadingList({
  items,
  delay = 0
}: {
  items: string[];
  delay?: number;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <ul ref={ref} className="space-y-3">
      {items.map((item, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: delay + index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="mystical-list-item pl-6 relative"
        >
          <div className="w-2 h-2 rounded-full bg-[--color-accent] absolute left-0 top-2" />
          {item}
        </motion.li>
      ))}
    </ul>
  );
}

// Floating Quote
function FloatingQuote({
  quote,
  author,
  delay = 0
}: {
  quote: string;
  author: string;
  delay?: number;
}) {
  const ref = useRef<HTMLQuoteElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.blockquote
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateY: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{
        duration: 1,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="mystical-quote p-6 rounded-lg italic text-lg"
    >
      <p className="mb-4">"{quote}"</p>
      <footer className="text-[--color-muted] text-sm">— {author}</footer>
    </motion.blockquote>
  );
}

// Scroll Reveal Wrapper
function ScrollReveal({
  children,
  direction = "bottom",
  delay = 0,
  className = ""
}: {
  children: React.ReactNode;
  direction?: "left" | "right" | "top" | "bottom";
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const getInitialTransform = () => {
    switch (direction) {
      case "left": return { x: -60, y: 0 };
      case "right": return { x: 60, y: 0 };
      case "top": return { x: 0, y: -60 };
      case "bottom": return { x: 0, y: 60 };
      default: return { x: 0, y: 60 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...getInitialTransform() }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Floating Social Icons
function FloatingSocialIcon({
  href,
  icon,
  label
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      className="floating-social w-12 h-12 rounded-full bg-[--color-surface] border border-[--color-border] flex items-center justify-center text-[--color-muted] hover:text-[--color-text] hover:border-[--color-brand]"
      whileHover={{ y: -4, scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {icon}
    </motion.a>
  );
}

// Success Animation
function SuccessAnimation({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[--color-surface] border border-[--color-brand] rounded-xl p-8 text-center success-celebration"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="text-4xl mb-4">✨</div>
          <h3 className="text-xl font-semibold text-[--color-text] mb-2">
            Ritual Complete!
          </h3>
          <p className="text-[--color-muted]">
            Your magical message has been sent
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

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
