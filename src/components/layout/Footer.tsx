"use client";

import { motion } from "framer-motion";
import { ArrowRight, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
	return (
		<footer
			className="border-t border-[--color-border]/60 bg-[--color-bg] py-16 overflow-hidden"
			role="contentinfo"
		>
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
						<div
							className="flex items-center gap-4"
							role="navigation"
							aria-label="Social media links"
						>
							<a
								href="https://x.com/blackmagickops"
								className="w-8 h-8 rounded-lg bg-[--color-surface] border border-[--color-border] flex items-center justify-center hover:border-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand]"
								aria-label="Follow us on X"
								target="_blank"
								rel="noopener noreferrer"
							>
								{/* X (Twitter) Icon (Simple SVG) */}
								<svg
									role="img"
									viewBox="0 0 24 24"
									className="w-4 h-4 fill-current"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>X</title>
									<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
								</svg>
							</a>
							<a
								href="https://linkedin.com/company/blackmagickops"
								className="w-8 h-8 rounded-lg bg-[--color-surface] border border-[--color-border] flex items-center justify-center hover:border-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand]"
								aria-label="Connect on LinkedIn"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Linkedin className="w-4 h-4" />
							</a>
						</div>
					</div>

					{/* Services */}
					<nav aria-label="Services">
						<h4 className="font-semibold text-[--color-text] mb-4">Services</h4>
						<ul className="space-y-3 text-sm">
							<li>
								<a
									href="#disciplines"
									className="text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded"
								>
									Platform Engineering
								</a>
							</li>
							<li>
								<a
									href="#disciplines"
									className="text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded"
								>
									DevOps Acceleration
								</a>
							</li>
							<li>
								<a
									href="#disciplines"
									className="text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded"
								>
									Automation & FinOps
								</a>
							</li>
							<li>
								<a
									href="#framework"
									className="text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded"
								>
									Consulting
								</a>
							</li>
						</ul>
					</nav>

					{/* Resources */}
					<nav aria-label="Resources">
						<h4 className="font-semibold text-[--color-text] mb-4">
							Resources
						</h4>
						<ul className="space-y-3 text-sm">
							<li>
								<a
									href="#work"
									className="text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded"
								>
									Case Studies
								</a>
							</li>
							<li>
								<a
									href="#testimonials"
									className="text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded"
								>
									Testimonials
								</a>
							</li>
							<li>
								<a
									href="#faq"
									className="text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded"
								>
									FAQ
								</a>
							</li>
							<li>
								<a
									href="/blog"
									className="text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded"
								>
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
								<a
									href="#philosophy"
									className="text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded"
								>
									About
								</a>
							</li>
							<li>
								<a
									href="#contact"
									className="text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded"
								>
									Contact
								</a>
							</li>
							<li>
								<a
									href="/careers"
									className="text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded"
								>
									Careers
								</a>
							</li>
							<li>
								<a
									href="/partners"
									className="text-[--color-muted] hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded"
								>
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
						<p>
							© {new Date().getFullYear()} BlackMagickOps. All rights reserved.
						</p>
						<nav className="flex items-center gap-6" aria-label="Legal">
							<Link
								href="/privacy"
								className="hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded"
							>
								Privacy Policy
							</Link>
							<Link
								href="/terms"
								className="hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded"
							>
								Terms of Service
							</Link>
							<Link
								href="/cookies"
								className="hover:text-[--color-brand] transition-colors focus-visible:ring-2 focus-visible:ring-[--color-brand] rounded"
							>
								Cookie Policy
							</Link>
						</nav>
					</div>

					<button
						onClick={() => {
							if (typeof window !== "undefined") {
								window.scrollTo({ top: 0, behavior: "smooth" });
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

			{/* Large Text Effect - Per-Letter Glowing Edge */}
			{/* Large Text Effect - Per-Letter Glowing Edge */}
			<div
				className="w-full mt-12 flex justify-center items-center w-full select-none pointer-events-auto relative z-10 py-24 px-4 overflow-visible"
				onMouseMove={(e) => {
					const letters = e.currentTarget.querySelectorAll(".spotlight-letter");
					letters.forEach((letter) => {
						const rect = letter.getBoundingClientRect();
						const centerX = rect.left + rect.width / 2;
						const centerY = rect.top + rect.height / 2;
						const distance = Math.sqrt(
							Math.pow(e.clientX - centerX, 2) +
								Math.pow(e.clientY - centerY, 2),
						);
						const radius = 80;
						if (distance < radius) {
							const intensity = 1 - distance / radius;
							(letter as HTMLElement).style.webkitTextStroke = `${
								2 * intensity
							}px rgba(91, 227, 193, ${intensity * 0.9})`;
							(letter as HTMLElement).style.filter = `drop-shadow(0 0 ${
								12 * intensity
							}px rgba(91, 227, 193, ${intensity * 0.7}))`;
						} else {
							(letter as HTMLElement).style.webkitTextStroke =
								"0px transparent";
							(letter as HTMLElement).style.filter = "none";
						}
					});
				}}
				onMouseLeave={(e) => {
					const letters = e.currentTarget.querySelectorAll(".spotlight-letter");
					letters.forEach((letter) => {
						(letter as HTMLElement).style.webkitTextStroke = "0px transparent";
						(letter as HTMLElement).style.filter = "none";
					});
				}}
			>
				<div
					style={{ fontSize: "10vw" }}
					className="font-bold leading-tight tracking-tighter whitespace-nowrap text-[--color-text] flex cursor-pointer"
				>
					{[
						"B",
						"l",
						"a",
						"c",
						"k",
						"M",
						"a",
						"g",
						"i",
						"c",
						"k",
						"O",
						"p",
						"s",
					].map((letter, i) => (
						<span
							key={i}
							className="spotlight-letter"
							style={{
								background:
									"linear-gradient(to bottom, rgba(110, 142, 248, 0.4) 0%, rgba(110, 142, 248, 0.1) 100%)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								backgroundClip: "text",
								transition: "all 0.15s ease-out",
								display: "inline-block",
							}}
						>
							{letter}
						</span>
					))}
				</div>
			</div>
		</footer>
	);
}
