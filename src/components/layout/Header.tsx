"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Skip link for keyboard navigation */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <header className="fixed top-0 z-50 w-full border-b border-[--color-border]/60 bg-[--color-bg]/80 backdrop-blur-xl" role="banner">
      <div className="section flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2 font-semibold tracking-tight" aria-label="BlackMagickOps - Home">
          <span className="text-2xl" aria-hidden="true">🪄</span>
          <span className="text-lg">BlackMagickOps</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-[--color-muted] md:flex" aria-label="Main navigation">
          <a href="#disciplines" className="transition-colors hover:text-[--color-text]">Disciplines</a>
          <a href="#framework" className="transition-colors hover:text-[--color-text]">Framework</a>
          <a href="#philosophy" className="transition-colors hover:text-[--color-text]">Philosophy</a>
          <a href="#work" className="transition-colors hover:text-[--color-text]">Work</a>
          <a href="#contact" className="btn btn-primary px-6 py-2" aria-label="Contact us to start a project">
            Start a Project →
          </a>
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl border border-[--color-border] text-[--color-muted]"
          aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.nav
          id="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-[--color-border]/60 bg-[--color-bg]/95 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="section flex flex-col gap-4 py-6 text-[--color-muted]">
            <a href="#disciplines" onClick={() => setMobileMenuOpen(false)}>Disciplines</a>
            <a href="#framework" onClick={() => setMobileMenuOpen(false)}>Framework</a>
            <a href="#philosophy" onClick={() => setMobileMenuOpen(false)}>Philosophy</a>
            <a href="#work" onClick={() => setMobileMenuOpen(false)}>Work</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary px-6 py-3 text-center" aria-label="Contact us to start a project">
              Start a Project
            </a>
          </div>
        </motion.nav>
      )}
      </header>
    </>
  );
}
