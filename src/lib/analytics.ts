/**
 * Analytics and Web Vitals monitoring utilities
 * Tracks Core Web Vitals and custom events
 */

import type { Metric } from "web-vitals";

// Types for custom events
export interface AnalyticsEvent {
	name: string;
	category: string;
	label?: string;
	value?: number;
	metadata?: Record<string, unknown>;
}

// Web Vitals thresholds (Google standards)
const WEB_VITALS_THRESHOLDS = {
	CLS: { good: 0.1, needsImprovement: 0.25 },
	FID: { good: 100, needsImprovement: 300 },
	FCP: { good: 1800, needsImprovement: 3000 },
	LCP: { good: 2500, needsImprovement: 4000 },
	TTFB: { good: 800, needsImprovement: 1800 },
	INP: { good: 200, needsImprovement: 500 },
} as const;

/**
 * Get rating for a Web Vital metric
 */
function getRating(metric: Metric): "good" | "needs-improvement" | "poor" {
	const threshold =
		WEB_VITALS_THRESHOLDS[metric.name as keyof typeof WEB_VITALS_THRESHOLDS];
	if (!threshold) return "good";

	if (metric.value <= threshold.good) return "good";
	if (metric.value <= threshold.needsImprovement) return "needs-improvement";
	return "poor";
}

/**
 * Send Web Vitals to analytics
 */
export function sendToAnalytics(metric: Metric): void {
	const rating = getRating(metric);

	// Send to Google Analytics
	if (typeof window !== "undefined" && "gtag" in window) {
		(window as any).gtag("event", metric.name, {
			event_category: "Web Vitals",
			event_label: metric.id,
			value: Math.round(
				metric.name === "CLS" ? metric.value * 1000 : metric.value,
			),
			metric_rating: rating,
			non_interaction: true,
		});
	}

	// Send to Vercel Analytics
	if (typeof window !== "undefined" && "va" in window) {
		(window as any).va("event", {
			name: metric.name,
			data: {
				value: metric.value,
				rating,
				navigationType: metric.navigationType,
			},
		});
	}

	// Log in development
	if (process.env.NODE_ENV === "development") {
		console.log(`[Web Vitals] ${metric.name}:`, {
			value: metric.value,
			rating,
			navigationType: metric.navigationType,
		});
	}
}

/**
 * Track custom events
 */
export function trackEvent(event: AnalyticsEvent): void {
	// Send to Google Analytics
	if (typeof window !== "undefined" && "gtag" in window) {
		(window as any).gtag("event", event.name, {
			event_category: event.category,
			event_label: event.label,
			value: event.value,
			...event.metadata,
		});
	}

	// Send to dataLayer for GTM
	if (typeof window !== "undefined" && "dataLayer" in window) {
		(window as any).dataLayer.push({
			event: event.name,
			category: event.category,
			label: event.label,
			value: event.value,
			...event.metadata,
		});
	}

	// Log in development
	if (process.env.NODE_ENV === "development") {
		console.log("[Analytics Event]", event);
	}
}

/**
 * Track page views
 */
export function trackPageView(url: string, title?: string): void {
	// Google Analytics
	if (typeof window !== "undefined" && "gtag" in window) {
		(window as any).gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
			page_path: url,
			page_title: title,
		});
	}

	// Custom event
	trackEvent({
		name: "page_view",
		category: "Navigation",
		label: url,
		metadata: { title },
	});
}

/**
 * Track form submissions
 */
export function trackFormSubmission(formName: string, success: boolean): void {
	trackEvent({
		name: "form_submission",
		category: "Engagement",
		label: formName,
		value: success ? 1 : 0,
		metadata: { success },
	});
}

/**
 * Track CTA clicks
 */
export function trackCTAClick(ctaId: string, destination?: string): void {
	trackEvent({
		name: "cta_click",
		category: "Conversion",
		label: ctaId,
		metadata: { destination },
	});
}

/**
 * Track external link clicks
 */
export function trackExternalLink(url: string, text?: string): void {
	trackEvent({
		name: "external_link_click",
		category: "Outbound",
		label: url,
		metadata: { text },
	});
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(depth: number): void {
	trackEvent({
		name: "scroll_depth",
		category: "Engagement",
		label: `${depth}%`,
		value: depth,
	});
}

/**
 * Track time on page
 */
export function trackTimeOnPage(seconds: number): void {
	trackEvent({
		name: "time_on_page",
		category: "Engagement",
		value: seconds,
	});
}

/**
 * Initialize performance observer for custom metrics
 */
export function initPerformanceObserver(): void {
	if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
		return;
	}

	try {
		// Observe long tasks
		const longTaskObserver = new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) {
				if (entry.duration > 50) {
					trackEvent({
						name: "long_task",
						category: "Performance",
						value: Math.round(entry.duration),
						metadata: {
							startTime: entry.startTime,
							name: entry.name,
						},
					});
				}
			}
		});

		longTaskObserver.observe({ entryTypes: ["longtask"] });

		// Observe navigation timing
		const navigationObserver = new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) {
				const navEntry = entry as PerformanceNavigationTiming;
				trackEvent({
					name: "navigation_timing",
					category: "Performance",
					metadata: {
						domContentLoaded: Math.round(
							navEntry.domContentLoadedEventEnd -
								navEntry.domContentLoadedEventStart,
						),
						domComplete: Math.round(navEntry.domComplete - navEntry.fetchStart),
						loadComplete: Math.round(
							navEntry.loadEventEnd - navEntry.fetchStart,
						),
					},
				});
			}
		});

		navigationObserver.observe({ entryTypes: ["navigation"] });
	} catch (error) {
		console.error("Failed to initialize performance observer:", error);
	}
}

/**
 * Hook for tracking time spent on page
 */
export function useTimeOnPage(): () => void {
	if (typeof window === "undefined") return () => {};

	const startTime = Date.now();
	const interval = setInterval(() => {
		const timeSpent = Math.floor((Date.now() - startTime) / 1000);
		trackTimeOnPage(timeSpent);
	}, 10000); // Report every 10 seconds

	const handleUnload = () => {
		const timeSpent = Math.floor((Date.now() - startTime) / 1000);
		trackTimeOnPage(timeSpent);
	};

	window.addEventListener("beforeunload", handleUnload);

	return () => {
		clearInterval(interval);
		window.removeEventListener("beforeunload", handleUnload);
	};
}

/**
 * Hook for tracking scroll depth
 */
export function useScrollDepth(): () => void {
	if (typeof window === "undefined") return () => {};

	const thresholds = [25, 50, 75, 100];
	const tracked = new Set<number>();

	const handleScroll = () => {
		const scrollHeight =
			document.documentElement.scrollHeight - window.innerHeight;
		const scrolled = window.scrollY;
		const scrollPercent = Math.round((scrolled / scrollHeight) * 100);

		thresholds.forEach((threshold) => {
			if (scrollPercent >= threshold && !tracked.has(threshold)) {
				tracked.add(threshold);
				trackScrollDepth(threshold);
			}
		});
	};

	window.addEventListener("scroll", handleScroll, { passive: true });

	return () => {
		window.removeEventListener("scroll", handleScroll);
	};
}
