import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
	output: "export",
	trailingSlash: true,

	// Performance optimizations
	poweredByHeader: false,
	compress: true,

	// Image optimization
	images: {
		unoptimized: true, // Required for static export
		formats: ["image/webp", "image/avif"],
		minimumCacheTTL: 60,
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},

	// Code splitting and performance
	experimental: {
		gzipSize: true,
	},

	// Headers for PWA and security (disabled for static export)
	// async headers() {
	//   return [
	//     {
	//       source: '/manifest.json',
	//       headers: [
	//         {
	//           key: 'Content-Type',
	//           value: 'application/manifest+json',
	//         },
	//         {
	//           key: 'Cache-Control',
	//           value: 'public, max-age=31536000, immutable',
	//         },
	//       ],
	//     },
	//     {
	//       source: '/(.*)',
	//       headers: [
	//         {
	//           key: 'X-Content-Type-Options',
	//           value: 'nosniff',
	//         },
	//         {
	//           key: 'X-Frame-Options',
	//           value: 'DENY',
	//         },
	//         {
	//           key: 'X-XSS-Protection',
	//           value: '1; mode=block',
	//         },
	//         {
	//           key: 'Referrer-Policy',
	//           value: 'strict-origin-when-cross-origin',
	//         },
	//         {
	//           key: 'Permissions-Policy',
	//           value: 'camera=(), microphone=(), geolocation=()',
	//         },
	//       ],
	//     },
	//   ];
	// },

	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default withSentryConfig(nextConfig, {
	// For all available options, see:
	// https://www.npmjs.com/package/@sentry/webpack-plugin#options

	org: "personal-2kq",

	project: "javascript-nextjs",

	// Only print logs for uploading source maps in CI
	silent: !process.env.CI,

	// For all available options, see:
	// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

	// Upload a larger set of source maps for prettier stack traces (increases build time)
	widenClientFileUpload: true,

	// Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
	// This can increase your server load as well as your hosting bill.
	// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
	// side errors will fail.
	tunnelRoute: "/monitoring",

	// Automatically tree-shake Sentry logger statements to reduce bundle size
	disableLogger: true,

	// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
	// See the following for more information:
	// https://docs.sentry.io/product/crons/
	// https://vercel.com/docs/cron-jobs
	automaticVercelMonitors: true,
});
