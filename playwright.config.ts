import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E Testing Configuration
 * Tests critical user journeys and accessibility
 */
export default defineConfig({
	testDir: "./e2e",

	// Maximum time one test can run
	timeout: 20 * 1000, // Reduced from 30s to 20s

	// Test execution settings
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0, // Reduced from 2 to 1 retry
	workers: process.env.CI ? 4 : undefined, // Increased from 2 to 4 workers

	// Reporter configuration
	reporter: process.env.CI
		? [["html"], ["list"], ["github"]]
		: [["html"], ["list"]],

	// Shared settings for all projects
	use: {
		baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000",
		trace: "retain-on-failure", // Changed from on-first-retry to reduce overhead
		screenshot: "only-on-failure",
		video: "off", // Disabled video to speed up tests
		// Optimize navigation waits
		navigationTimeout: 15000, // Reduced from default 30s
		actionTimeout: 10000, // Reduced from default 30s
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
