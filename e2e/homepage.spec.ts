import { test, expect } from "@playwright/test";

test.describe("Homepage - Critical User Journeys", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("page loads successfully with all main sections", async ({ page }) => {
		// Check page title
		await expect(page).toHaveTitle(/BlackMagickOps/i);

		// Wait for hero section to be visible
		await expect(
			page.locator("text=Precision. Discipline. Magic."),
		).toBeVisible();

		// Verify main sections are present
		await expect(page.locator("#disciplines")).toBeVisible();
		await expect(page.locator("#framework")).toBeVisible();
		await expect(page.locator("#philosophy")).toBeVisible();
		await expect(page.locator("#work")).toBeVisible();
		await expect(page.locator("#contact")).toBeVisible();
	});

	test("navigation links work correctly", async ({ page }) => {
		// Click Disciplines link
		await page.click("text=Disciplines");
		await expect(page.url()).toContain("#disciplines");

		// Click Framework link
		await page.click("text=Framework");
		await expect(page.url()).toContain("#framework");

		// Click Work link
		await page.click("text=Work");
		await expect(page.url()).toContain("#work");
	});

	test("smooth scroll to sections on navigation", async ({ page }) => {
		// Get initial scroll position
		const initialScroll = await page.evaluate(() => window.scrollY);

		// Click on Framework section
		await page.click('a[href="#framework"]');

		// Wait for URL to update (faster than timeout)
		await expect(page).toHaveURL(/#framework/);

		// Verify scroll position changed
		const newScroll = await page.evaluate(() => window.scrollY);
		expect(newScroll).toBeGreaterThan(initialScroll);
	});

	test("CTA buttons are visible and clickable", async ({ page }) => {
		// Check "Start a Project" button in header
		const ctaButton = page.locator("text=Start a Project").first();
		await expect(ctaButton).toBeVisible();

		// Click should navigate to contact section
		await ctaButton.click();
		await expect(page.url()).toContain("#contact");
	});

	test("animated metrics are visible and display values", async ({ page }) => {
		// Scroll to metrics section
		await page.locator("text=Platform Uptime").scrollIntoViewIfNeeded();

		// Check that metrics are visible (don't wait for animation)
		await expect(page.locator("text=Platform Uptime")).toBeVisible();
		await expect(page.locator("text=Deployment Speed")).toBeVisible();
		await expect(page.locator("text=Squads Empowered")).toBeVisible();

		// Verify values are present (animation will complete eventually)
		await expect(page.locator("text=/99\\.9%/")).toBeVisible({ timeout: 3000 });
		await expect(page.locator("text=/\\+47%/")).toBeVisible({ timeout: 3000 });
	});
});

test.describe("Contact Form", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/#contact");
		// Wait for form to be visible instead of networkidle
		await expect(page.locator('input[placeholder*="Your Name"]')).toBeVisible();
	});

	test("form is visible and all fields are present", async ({ page }) => {
		await expect(page.locator('input[placeholder*="Your Name"]')).toBeVisible();
		await expect(page.locator('input[type="email"]')).toBeVisible();
		await expect(
			page.locator('input[placeholder*="Project Type"]'),
		).toBeVisible();
		await expect(
			page.locator('textarea[placeholder*="mystical project"]'),
		).toBeVisible();
		await expect(page.locator('button[type="submit"]')).toBeVisible();
	});

	test("shows validation errors for invalid inputs", async ({ page }) => {
		// Click submit without filling form
		await page.click('button[type="submit"]');

		// Check for validation errors
		await expect(page.locator("text=/Name must be at least/i")).toBeVisible();
		await expect(
			page.locator("text=/Please enter a valid email/i"),
		).toBeVisible();
		await expect(
			page.locator("text=/Message must be at least/i"),
		).toBeVisible();
	});

	test("validates email format", async ({ page }) => {
		const emailInput = page.locator('input[type="email"]');

		// Enter invalid email
		await emailInput.fill("invalid-email");
		await emailInput.blur();

		// Click submit to trigger validation
		await page.click('button[type="submit"]');

		// Should show email validation error
		await expect(page.locator("text=/valid email address/i")).toBeVisible();
	});

	test("accepts valid form submission", async ({ page }) => {
		// Fill out form with valid data
		await page.fill('input[placeholder*="Your Name"]', "John Doe");
		await page.fill('input[type="email"]', "john@example.com");
		await page.fill(
			'input[placeholder*="Project Type"]',
			"Platform Engineering",
		);
		await page.fill(
			'textarea[placeholder*="mystical project"]',
			"I need help with Kubernetes implementation.",
		);

		// Submit form
		await page.click('button[type="submit"]');

		// Should show loading state
		await expect(page.locator("text=/Casting Spell/i")).toBeVisible();

		// Wait for form to reset (indicates success)
		await expect(page.locator('input[placeholder*="Your Name"]')).toHaveValue(
			"",
			{ timeout: 3000 },
		);
	});

	test("disables submit button while submitting", async ({ page }) => {
		// Fill out form
		await page.fill('input[placeholder*="Your Name"]', "John Doe");
		await page.fill('input[type="email"]', "john@example.com");
		await page.fill(
			'textarea[placeholder*="mystical project"]',
			"Test message for validation",
		);

		// Get submit button
		const submitButton = page.locator('button[type="submit"]');

		// Submit form
		await submitButton.click();

		// Button should be disabled during submission
		await expect(submitButton).toBeDisabled();
	});
});

test.describe("Mobile Navigation", () => {
	test.use({ viewport: { width: 375, height: 667 } });

	test("mobile menu opens and closes", async ({ page }) => {
		await page.goto("/");

		// Mobile menu should be hidden initially
		await expect(
			page.locator('[aria-label="Mobile navigation"]'),
		).not.toBeVisible();

		// Click hamburger menu
		await page.click('[aria-label="Open mobile menu"]');

		// Mobile menu should be visible
		await expect(
			page.locator('[aria-label="Mobile navigation"]'),
		).toBeVisible();

		// Close menu
		await page.click('[aria-label="Close mobile menu"]');

		// Menu should be hidden again
		await expect(
			page.locator('[aria-label="Mobile navigation"]'),
		).not.toBeVisible();
	});

	test("mobile menu navigation links work", async ({ page }) => {
		await page.goto("/");

		// Open mobile menu
		await page.click('[aria-label="Open mobile menu"]');

		// Click a navigation link
		const mobileNav = page.locator('[aria-label="Mobile navigation"]');
		await mobileNav.locator('a[href="#framework"]').click();

		// Should navigate to section
		await expect(page.url()).toContain("#framework");

		// Menu should close after clicking
		await expect(
			page.locator('[aria-label="Mobile navigation"]'),
		).not.toBeVisible();
	});
});

test.describe("Accessibility", () => {
	test("skip link is present and functional", async ({ page }) => {
		await page.goto("/");

		// Focus skip link with keyboard
		await page.keyboard.press("Tab");

		// Skip link should be visible when focused
		const skipLink = page.locator("text=Skip to main content");
		await expect(skipLink).toBeFocused();

		// Click should navigate to main content
		await skipLink.click();

		// Main content should be in view
		const mainContent = page.locator("#main-content");
		await expect(mainContent).toBeInViewport();
	});

	test("all images have alt text", async ({ page }) => {
		await page.goto("/");

		// Get all images
		const images = await page.locator("img").all();

		// Check each image has alt attribute
		for (const img of images) {
			await expect(img).toHaveAttribute("alt");
		}
	});

	test("form fields have proper labels", async ({ page }) => {
		await page.goto("/#contact");

		// Check aria-labels on form fields
		await expect(page.locator('input[aria-label*="name"]')).toBeVisible();
		await expect(page.locator('input[aria-label*="email"]')).toBeVisible();
		await expect(
			page.locator('textarea[aria-label*="description"]'),
		).toBeVisible();
	});

	test("buttons have descriptive labels", async ({ page }) => {
		await page.goto("/");

		// Check CTA button has descriptive aria-label
		const ctaButton = page.locator('[aria-label*="Contact us to start"]');
		await expect(ctaButton).toBeVisible();

		// Check submit button has clear label
		await page.goto("/#contact");
		const submitButton = page.locator('button[type="submit"]');
		await expect(submitButton).toHaveText(/Begin the Ritual/i);
	});

	test("keyboard navigation works throughout page", async ({ page }) => {
		await page.goto("/");

		// Tab through focusable elements
		await page.keyboard.press("Tab"); // Skip link
		await page.keyboard.press("Tab"); // Logo
		await page.keyboard.press("Tab"); // First nav link

		// Verify focus is visible
		const focusedElement = page.locator(":focus");
		await expect(focusedElement).toBeVisible();
	});
});

test.describe("Performance", () => {
	test("page loads within acceptable time", async ({ page }) => {
		const startTime = Date.now();

		await page.goto("/");
		await page.waitForLoadState("domcontentloaded");

		const loadTime = Date.now() - startTime;

		// Should load within 2 seconds
		expect(loadTime).toBeLessThan(2000);
	});

	test("animations do not block interaction", async ({ page }) => {
		await page.goto("/");

		// Immediately try to interact with navigation
		await page.click("text=Disciplines");

		// Should navigate even if animations are running
		await expect(page.url()).toContain("#disciplines");
	});
});
