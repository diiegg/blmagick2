"use client";

import { MysticalCard } from "@/components/ui/UIComponents";

export default function TermsPage() {
	return (
		<main className="section min-h-screen py-24">
			<div className="max-w-4xl mx-auto space-y-8">
				<div className="text-center space-y-4">
					<h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[--color-text] to-[--color-muted]">
						Terms of Service
					</h1>
					<p className="text-[--color-muted]">
						Last updated: {new Date().toLocaleDateString()}
					</p>
				</div>

				<MysticalCard className="prose prose-invert max-w-none text-[--color-muted]">
					<div className="space-y-6">
						<section>
							<h2 className="text-2xl font-semibold text-[--color-text] mb-4">
								1. Agreement to Terms
							</h2>
							<p>
								These Terms of Service ("Terms") constitute a legally binding
								agreement made between you, whether personally or on behalf of
								an entity ("you") and{" "}
								<strong>BlackMagickOps - Engineering the invisible</strong>
								("we," "us," or "our"), concerning your access to and use of the
								BlackMagickOps website as well as any other media form, media
								channel, or mobile website related, linked, or otherwise
								connected thereto (collectively, the "Site").
							</p>
							<p className="mt-2">
								You agree that by accessing the Site, you have read, understood,
								and agreed to be bound by all of these Terms of Service. If you
								do not agree with all of these Terms, then you are expressly
								prohibited from using the Site and you must discontinue use
								immediately.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-[--color-text] mb-4">
								2. Intellectual Property Rights
							</h2>
							<p>
								Unless otherwise indicated, the Site is our proprietary property
								and all source code, databases, functionality, software, website
								designs, audio, video, text, photographs, and graphics on the
								Site (collectively, the "Content") and the trademarks, service
								marks, and logos contained therein (the "Marks") are owned or
								controlled by us or licensed to us, and are protected by
								copyright and trademark laws and various other intellectual
								property rights and unfair competition laws of the European
								Union, international copyright laws, and international
								conventions.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-[--color-text] mb-4">
								3. User Representations
							</h2>
							<p>By using the Site, you represent and warrant that:</p>
							<ul className="list-disc pl-6 space-y-2 mt-2">
								<li>
									All registration information you submit will be true,
									accurate, current, and complete.
								</li>
								<li>
									You have the legal capacity and you agree to comply with these
									Terms of Service.
								</li>
								<li>
									You are not a minor in the jurisdiction in which you reside.
								</li>
								<li>
									You will not access the Site through automated or non-human
									means, whether through a bot, script, or otherwise.
								</li>
								<li>
									You will not use the Site for any illegal or unauthorized
									purpose.
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-[--color-text] mb-4">
								4. Limitation of Liability
							</h2>
							<p>
								In no event will we or our directors, employees, or agents be
								liable to you or any third party for any direct, indirect,
								consequential, exemplary, incidental, special, or punitive
								damages, including lost profit, lost revenue, loss of data, or
								other damages arising from your use of the Site, even if we have
								been advised of the possibility of such damages.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-[--color-text] mb-4">
								5. Dispute Resolution
							</h2>
							<p>
								To expedite resolution and control the cost of any dispute,
								controversy, or claim related to these Terms of Service (each a
								"Dispute" and collectively, the "Disputes") brought by either
								you or us, the parties agree to first attempt to negotiate any
								Dispute informally for at least thirty (30) days before
								initiating legal proceedings. These Terms shall be governed by
								and defined following the laws of the European Union.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-[--color-text] mb-4">
								6. Contact Us
							</h2>
							<p>
								In order to resolve a complaint regarding the Site or to receive
								further information regarding use of the Site, please contact us
								at:
							</p>
							<p className="mt-2 text-[--color-brand]">
								<a href="mailto:contact@blackmagickops.com">
									contact@blackmagickops.com
								</a>
							</p>
						</section>
					</div>
				</MysticalCard>
			</div>
		</main>
	);
}
