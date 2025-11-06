"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[--color-border]/60 bg-[--color-bg] py-16" role="contentinfo">
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
              <span className="text-2xl" aria-hidden="true">🪄</span>
              <span className="font-semibold">BlackMagickOps</span>
            </div>
            <p className="text-[--color-muted] mb-6 max-w-md">
              DevOps • Platform Engineering • Automation
            </p>
            <p className="text-sm text-[--color-muted] mb-6">
              Precision. Discipline. Magic. Transform your infrastructure with mystical DevOps practices.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4" role="navigation" aria-label="Social media links">
              <a
                href="https://github.com/blackmagickops"
                className="w-8 h-8 rounded-lg bg-[--color-surface] border border-[--color-border] flex items-center justify-center hover:border-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand]"
                aria-label="Visit our GitHub profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="https://linkedin.com/company/blackmagickops"
                className="w-8 h-8 rounded-lg bg-[--color-surface] border border-[--color-border] flex items-center justify-center hover:border-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand]"
                aria-label="Visit our LinkedIn profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com/blackmagickops"
                className="w-8 h-8 rounded-lg bg-[--color-surface] border border-[--color-border] flex items-center justify-center hover:border-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand]"
                aria-label="Visit our Twitter profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h4 className="font-semibold text-[--color-text] mb-4">Services</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#disciplines" className="text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded">
                  Platform Engineering
                </a>
              </li>
              <li>
                <a href="#disciplines" className="text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded">
                  DevOps Acceleration
                </a>
              </li>
              <li>
                <a href="#disciplines" className="text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded">
                  Automation & FinOps
                </a>
              </li>
              <li>
                <a href="#framework" className="text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded">
                  Consulting
                </a>
              </li>
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources">
            <h4 className="font-semibold text-[--color-text] mb-4">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#work" className="text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#faq" className="text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/blog" className="text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded">
                  Blog
                </a>
              </li>
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h4 className="font-semibold text-[--color-text] mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#philosophy" className="text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded">
                  Contact
                </a>
              </li>
              <li>
                <a href="/careers" className="text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded">
                  Careers
                </a>
              </li>
              <li>
                <a href="/partners" className="text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded">
                  Partners
                </a>
              </li>
            </ul>
          </nav>
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
            <nav className="flex items-center gap-6" aria-label="Legal">
              <a href="/privacy" className="hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded">
                Terms of Service
              </a>
              <a href="/cookies" className="hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded">
                Cookie Policy
              </a>
            </nav>
          </div>

          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2 text-sm text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded-lg p-2"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowRight className="w-4 h-4 -rotate-90" aria-hidden="true" />
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
