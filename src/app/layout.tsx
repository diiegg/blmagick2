import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";

// Optimized font loading with Next.js
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
	preload: true,
});

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	variable: "--font-space-grotesk",
	display: "swap",
	preload: true,
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-jetbrains-mono",
	display: "swap",
	preload: false, // Code font loaded on-demand
});

// Geist fonts (modern Aeonik alternative with superior rendering)
// GeistSans and GeistMono are pre-configured with optimal settings

export const metadata: Metadata = {
	title: {
		default:
			"BlackMagickOps - Autonomous Infrastructure & AI-Driven Engineering",
		template: "%s | BlackMagickOps",
	},
	description:
		"We build Agentic Platforms that think, heal, and scale. Move beyond DevOps into the age of AI-Driven Engineering with Cognitive IDPs and Autonomous Workflows.",
	keywords: [
		"Autonomous Infrastructure",
		"AI Agents",
		"Agentic Workflows",
		"Cognitive IDP",
		"Platform Engineering",
		"Internal Developer Platform",
		"Self-Healing Infrastructure",
		"DevOps",
		"Cloud Native",
		"Kubernetes",
		"Eco-FinOps",
		"Automation",
		"Infrastructure as Code",
		"GitOps",
		"Backstage",
		"Site Reliability Engineering",
	],
	authors: [{ name: "BlackMagickOps", url: "https://blackmagickops.com" }],
	creator: "BlackMagickOps",
	publisher: "BlackMagickOps",
	metadataBase: new URL("https://blackmagickops.com"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://blackmagickops.com",
		title: "BlackMagickOps - Autonomous Infrastructure & AI-Driven Engineering",
		description:
			"We build Agentic Platforms that think, heal, and scale. Move beyond DevOps into the age of AI-Driven Engineering.",
		siteName: "BlackMagickOps",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "BlackMagickOps - Autonomous Infrastructure",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "BlackMagickOps - Autonomous Infrastructure",
		description:
			"We build Agentic Platforms that think, heal, and scale. Move beyond DevOps.",
		images: ["/twitter-image.png"],
		creator: "@blackmagickops",
		site: "@blackmagickops",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	verification: {
		// Add when available:
		// google: 'your-google-site-verification-code',
		// yandex: 'your-yandex-verification-code',
		// bing: 'your-bing-verification-code',
	},
	category: "Technology",
	classification: "Business",
	manifest: "/manifest.json",
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	themeColor: [
		{ media: "(prefers-color-scheme: dark)", color: "#6E8EF8" },
		{ media: "(prefers-color-scheme: light)", color: "#6E8EF8" },
	],
};

// Structured Data - Enhanced with multiple schemas
const structuredData = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Organization",
			"@id": "https://blackmagickops.com/#organization",
			name: "BlackMagickOps",
			description:
				"Expert DevOps consultancy specializing in platform engineering, automation, and cloud-native infrastructure.",
			url: "https://blackmagickops.com",
			logo: {
				"@type": "ImageObject",
				url: "https://blackmagickops.com/logo.png",
				width: 512,
				height: 512,
			},
			sameAs: [
				"https://github.com/blackmagickops",
				"https://linkedin.com/company/blackmagickops",
				"https://twitter.com/blackmagickops",
			],
			contactPoint: {
				"@type": "ContactPoint",
				contactType: "customer service",
				availableLanguage: "English",
				areaServed: "US",
			},
			areaServed: {
				"@type": "Country",
				name: "United States",
			},
			knowsAbout: [
				"DevOps",
				"Platform Engineering",
				"Kubernetes",
				"CI/CD",
				"Cloud Native",
				"Infrastructure as Code",
				"Automation",
				"FinOps",
				"Observability",
			],
		},
		{
			"@type": "WebSite",
			"@id": "https://blackmagickops.com/#website",
			url: "https://blackmagickops.com",
			name: "BlackMagickOps",
			description:
				"Precision. Discipline. Magic. - Transform your infrastructure with mystical DevOps precision.",
			publisher: {
				"@id": "https://blackmagickops.com/#organization",
			},
			inLanguage: "en-US",
		},
		{
			"@type": "Service",
			"@id": "https://blackmagickops.com/#platform-engineering",
			name: "Platform Engineering",
			description:
				"Developer platforms with golden paths, strong guardrails, Backstage IDP, multi-tenant Kubernetes with OPA, and observability-as-a-product.",
			provider: {
				"@id": "https://blackmagickops.com/#organization",
			},
			serviceType: "Platform Engineering",
			areaServed: "US",
		},
		{
			"@type": "Service",
			"@id": "https://blackmagickops.com/#devops-acceleration",
			name: "DevOps Acceleration",
			description:
				"CI/CD at scale, supply chain security with SLSA attestations, progressive delivery, and immutable GitOps workflows.",
			provider: {
				"@id": "https://blackmagickops.com/#organization",
			},
			serviceType: "DevOps Consulting",
			areaServed: "US",
		},
		{
			"@type": "Service",
			"@id": "https://blackmagickops.com/#automation-finops",
			name: "Automation & FinOps",
			description:
				"Self-healing ops, actionable observability, cost control, and infrastructure automation.",
			provider: {
				"@id": "https://blackmagickops.com/#organization",
			},
			serviceType: "Cloud Automation",
			areaServed: "US",
		},
		{
			"@type": "WebPage",
			"@id": "https://blackmagickops.com/#webpage",
			url: "https://blackmagickops.com",
			name: "BlackMagickOps - DevOps & Platform Engineering Excellence",
			description:
				"Precision. Discipline. Magic. - Expert DevOps consultancy specializing in platform engineering, automation, and cloud-native infrastructure.",
			isPartOf: {
				"@id": "https://blackmagickops.com/#website",
			},
			about: {
				"@id": "https://blackmagickops.com/#organization",
			},
			inLanguage: "en-US",
		},
	],
};

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			className={`dark ${GeistSans.variable} ${GeistMono.variable} ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
		>
			<head>
				{/* Umami Analytics */}
				<script
					defer
					src="https://cloud.umami.is/script.js"
					data-website-id="8969449a-d5bd-4862-b747-acda531d2d29"
				/>

				{/* Structured Data */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(structuredData),
					}}
				/>

				{/* PWA Service Worker Registration */}
				<script
					dangerouslySetInnerHTML={{
						__html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                      if (process.env.NODE_ENV === 'development') {
                        console.log('SW registered: ', registration);
                      }
                    })
                    .catch((registrationError) => {
                      if (process.env.NODE_ENV === 'development') {
                        console.log('SW registration failed: ', registrationError);
                      }
                    });
                });
              }
            `,
					}}
				/>
			</head>
			<body className="antialiased">
				<div id="main-content">{children}</div>
			</body>
		</html>
	);
}
