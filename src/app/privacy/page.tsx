"use client";

import { MysticalCard } from "@/components/ui/UIComponents";
import Link from "next/link";

export default function PrivacyPage() {
	return (
		<main className="section min-h-screen py-24">
			<div className="max-w-4xl mx-auto space-y-8">
				<div className="text-center space-y-4">
					<h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[--color-text] to-[--color-muted]">
						Privacy Policy
					</h1>
					<p className="text-[--color-muted]">
						Last updated: {new Date().toLocaleDateString()}
					</p>
				</div>

				<MysticalCard className="prose prose-invert max-w-none text-[--color-muted]">
					<div className="space-y-6">
						<section>
							<h2 className="text-2xl font-semibold text-[--color-text] mb-4">
								1. Introduction
							</h2>
							<p>
								Welcome to{" "}
								<strong>BlackMagickOps - Engineering the invisible</strong>{" "}
								("we," "our," or "us"). We are committed to protecting your
								personal data and respecting your privacy. This Privacy Policy
								explains how we collect, use, disclose, and safeguard your
								information when you visit our website, in compliance with the
								General Data Protection Regulation (GDPR).
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-[--color-text] mb-4">
								2. Data Controller
							</h2>
							<p>
								For the purposes of the GDPR, the Data Controller is
								BlackMagickOps. If you have any questions about this policy, you
								may contact us at: <br />
								<a
									href="mailto:contact@blackmagickops.com"
									className="text-[--color-brand] hover:underline"
								>
									contact@blackmagickops.com
								</a>
								.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-[--color-text] mb-4">
								3. Information We Collect
							</h2>
							<p>We may collect and process the following data about you:</p>
							<ul className="list-disc pl-6 space-y-2 mt-2">
								<li>
									<strong>Personal Identification Information:</strong> Name,
									email address, phone number, and company name when you fill
									out forms or contact us.
								</li>
								<li>
									<strong>Technical Data:</strong> IP address, browser type,
									operating system, and usage details collected automatically
									via cookies and analytics.
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-[--color-text] mb-4">
								4. How We Use Your Data
							</h2>
							<p>We use your data for the following purposes:</p>
							<ul className="list-disc pl-6 space-y-2 mt-2">
								<li>To provide and maintain our services.</li>
								<li>To notify you about changes to our services.</li>
								<li>
									To provide customer support and respond to your inquiries.
								</li>
								<li>
									To gather analysis or valuable information so that we can
									improve our website.
								</li>
								<li>To monitor the usage of our service.</li>
							</ul>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-[--color-text] mb-4">
								5. Legal Basis for Processing
							</h2>
							<p>
								Under the GDPR, we process your personal data under the
								following conditions:
							</p>
							<ul className="list-disc pl-6 space-y-2 mt-2">
								<li>
									<strong>Consent:</strong> You have given your consent for
									processing personal data for one or more specific purposes.
								</li>
								<li>
									<strong>Contract:</strong> Processing is necessary for the
									performance of a contract to which you are a party.
								</li>
								<li>
									<strong>Legitimate Interests:</strong> Processing is necessary
									for the purposes of the legitimate interests pursued by us or
									by a third party.
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-[--color-text] mb-4">
								6. Your Data Protection Rights
							</h2>
							<p>
								If you are a resident of the European Economic Area (EEA), you
								have certain data protection rights, including:
							</p>
							<ul className="list-disc pl-6 space-y-2 mt-2">
								<li>
									<strong>The right to access:</strong> You have the right to
									request copies of your personal data.
								</li>
								<li>
									<strong>The right to rectification:</strong> You have the
									right to request that we correct any information you believe
									is inaccurate.
								</li>
								<li>
									<strong>The right to erasure:</strong> You have the right to
									request that we erase your personal data, under certain
									conditions.
								</li>
								<li>
									<strong>The right to restrict processing:</strong> You have
									the right to request that we restrict the processing of your
									personal data.
								</li>
								<li>
									<strong>The right to object to processing:</strong> You have
									the right to object to our processing of your personal data.
								</li>
								<li>
									<strong>The right to data portability:</strong> You have the
									right to request that we transfer the data that we have
									collected to another organization, or directly to you.
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-[--color-text] mb-4">
								7. Cookies
							</h2>
							<p>
								We use cookies to improve your experience. For detailed
								information, please see our{" "}
								<Link
									href="/cookies"
									className="text-[--color-brand] hover:underline"
								>
									Cookie Policy
								</Link>
								.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-[--color-text] mb-4">
								8. Contact Us
							</h2>
							<p>
								If you have any questions about this Privacy Policy, please
								contact us:
							</p>
							<ul className="list-disc pl-6 space-y-2 mt-2">
								<li>
									By email:{" "}
									<a
										href="mailto:contact@blackmagickops.com"
										className="text-[--color-brand] hover:underline"
									>
										contact@blackmagickops.com
									</a>
								</li>
								<li>
									By visiting our website:{" "}
									<a
										href="https://blackmagickops.com"
										className="text-[--color-brand] hover:underline"
									>
										blackmagickops.com
									</a>
								</li>
							</ul>
						</section>
					</div>
				</MysticalCard>
			</div>
		</main>
	);
}
