import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E Testing Configuration
 * Tests critical user journeys and accessibility
 */
export default defineConfig({
	testDir: "./e2e",

	// Maximum time one test can run
	timeout: 30 * 1000,

	// Test execution settings
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 2 : undefined,

	// Reporter configuration
	reporter: process.env.CI
		? [["html"], ["list"], ["github"]]
		: [["html"], ["list"]],

	// Shared settings for all projects
	use: {
		baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000",
		trace: "on-first-retry",
		screenshot: "only-on-failure",
		video: "retain-on-failure",
	},

	// Configure projects for different browsers
	// CI: Test only critical browsers for speed (chromium + mobile)
	// Local: Add more browsers by uncommenting below
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "mobile-chrome",
			use: { ...devices["Pixel 5"] },
		},
		// Uncomment for comprehensive browser testing:
		// {
		// 	name: "firefox",
		// 	use: { ...devices["Desktop Firefox"] },
		// },
		// {
		// 	name: "webkit",
		// 	use: { ...devices["Desktop Safari"] },
		// },
		// {
		// 	name: "mobile-safari",
		// 	use: { ...devices["iPhone 12"] },
		// },
	],

	// Run local dev server before tests (if not already running)
	// Use npx serve for static export (output: 'export' in next.config.ts)
	// Note: Build already done in CI workflow step, just serve the files
	webServer: {
		command: process.env.CI ? "npx serve@latest out -l 3000" : "pnpm dev",
		url: "http://localhost:3000",
		reuseExistingServer: !process.env.CI,
		timeout: 120 * 1000,
	},
});
