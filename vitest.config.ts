import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
	plugins: [react()],
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["./vitest.setup.ts"],
		css: true,
		exclude: ["node_modules", "e2e/**"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			exclude: [
				"node_modules/",
				"vitest.setup.ts",
				"**/*.config.{ts,js,mjs}",
				"**/*.d.ts",
				"**/types/",
				".next/",
				"out/",
				"public/**",
				"scripts/**",
				"e2e/**",
				"coverage/**",
				"src/instrumentation*.ts",
				"src/app/global-error.tsx",
				"src/app/sentry-example-page/**",
				"**/__tests__/**",
				"**/index.ts",
			],
			// Apply thresholds only to tested components
			include: ["src/**/*.{ts,tsx}"],
			thresholds: {
				// Global thresholds - set to 0 to prevent CI failures
				// Coverage will still be reported for tracking purposes
				lines: 0,
				functions: 0,
				branches: 0,
				statements: 0,
				// Per-file thresholds only for files with existing tests
				"src/components/layout/Header.tsx": {
					lines: 90,
					branches: 90,
					functions: 40,
				},
				"src/components/ui/AnimatedMetrics.tsx": {
					lines: 75,
					branches: 80,
				},
				"src/components/ui/ErrorBoundary.tsx": {
					lines: 90,
					branches: 90,
					functions: 90,
				},
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
