"use client";

import { MysticalCard } from "@/components/ui/UIComponents";
import Link from "next/link";

export default function CookiesPage() {
	return (
		<main className="section min-h-screen py-24">
			<div className="max-w-4xl mx-auto space-y-8">
				<div className="text-center space-y-4">
					<h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[--color-text] to-[--color-muted]">
						Cookie Policy
					</h1>
					<p className="text-[--color-muted]">
						Last updated: {new Date().toLocaleDateString()}
					</p>
				</div>

				<MysticalCard className="prose prose-invert max-w-none text-[--color-muted]">
					<div className="space-y-6">
						<section>
							<h2 className="text-2xl font-semibold text-[--color-text] mb-4">
								1. Use of Cookies
							</h2>
							<p>
								BlackMagickOps ("we", "us", "our") uses cookies on the
								BlackMagickOps website (the "Service"). By using the Service,
								you consent to the use of cookies.
							</p>
							<p className="mt-2">
								Our Cookies Policy explains what cookies are, how we use
								cookies, how third-parties we may partner with may use cookies
								on the Service, your choices regarding cookies, and further
								information about cookies.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-[--color-text] mb-4">
								2. What are Cookies?
							</h2>
							<p>
								Cookies are small pieces of text sent by your web browser by a
								website you visit. A cookie file is stored in your web browser
								and allows the Service or a third-party to recognize you and
								make your next visit easier and the Service more useful to you.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-[--color-text] mb-4">
								3. How BlackMagickOps uses Cookies
							</h2>
							<p>
								When you use and access the Service, we may place a number of
								cookies files in your web browser. We use cookies for the
								following purposes:
							</p>
							<ul className="list-disc pl-6 space-y-2 mt-2">
								<li>To enable certain functions of the Service.</li>
								<li>To provide analytics.</li>
								<li>To store your preferences.</li>
							</ul>
							<p className="mt-4">
								We use both session and persistent cookies on the Service and we
								use different types of cookies to run the Service:
							</p>
							<ul className="list-disc pl-6 space-y-2 mt-2">
								<li>
									<strong>Essential cookies:</strong> We may use essential
									cookies to authenticate users and prevent fraudulent use of
									user accounts.
								</li>
								<li>
									<strong>Analytics cookies:</strong> We may use analytics
									cookies to track information how the Service is used so that
									we can make improvements.
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-[--color-text] mb-4">
								4. Your Choices Regarding Cookies
							</h2>
							<p>
								If you'd like to delete cookies or instruct your web browser to
								delete or refuse cookies, please visit the help pages of your
								web browser.
							</p>
							<p className="mt-2">
								Please note, however, that if you delete cookies or refuse to
								accept them, you might not be able to use all of the features we
								offer, you may not be able to store your preferences, and some
								of our pages might not display properly.
							</p>
							<ul className="list-disc pl-6 space-y-2 mt-2">
								<li>
									For the Chrome web browser, please visit this page from
									Google:{" "}
									<a
										href="https://support.google.com/accounts/answer/32050"
										target="_blank"
										className="text-[--color-brand] hover:underline"
									>
										Google Help
									</a>
								</li>
								<li>
									For the Internet Explorer web browser, please visit this page
									from Microsoft:{" "}
									<a
										href="http://support.microsoft.com/kb/278835"
										target="_blank"
										className="text-[--color-brand] hover:underline"
									>
										Microsoft Help
									</a>
								</li>
								<li>
									For the Firefox web browser, please visit this page from
									Mozilla:{" "}
									<a
										href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored"
										target="_blank"
										className="text-[--color-brand] hover:underline"
									>
										Mozilla Help
									</a>
								</li>
								<li>
									For the Safari web browser, please visit this page from Apple:{" "}
									<a
										href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
										target="_blank"
										className="text-[--color-brand] hover:underline"
									>
										Apple Help
									</a>
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-2xl font-semibold text-[--color-text] mb-4">
								5. More Information
							</h2>
							<p>
								You can learn more about cookies at the following third-party
								websites:
							</p>
							<ul className="list-disc pl-6 space-y-2 mt-2">
								<li>
									<a
										href="http://www.allaboutcookies.org/"
										target="_blank"
										className="text-[--color-brand] hover:underline"
									>
										AllAboutCookies
									</a>
								</li>
								<li>
									<a
										href="http://www.networkadvertising.org/"
										target="_blank"
										className="text-[--color-brand] hover:underline"
									>
										Network Advertising Initiative
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
