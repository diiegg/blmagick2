import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

// Store original console methods
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

// Global console error tracking
const consoleErrors: string[] = [];
const consoleWarnings: string[] = [];

// Override console.error to track errors
console.error = (...args: any[]) => {
	const message = args
		.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg)))
		.join(" ");

	consoleErrors.push(message);

	// Still log to console for debugging
	originalConsoleError(...args);
};

// Override console.warn to track warnings
console.warn = (...args: any[]) => {
	const message = args
		.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg)))
		.join(" ");

	consoleWarnings.push(message);

	// Still log to console for debugging
	originalConsoleWarn(...args);
};

// Check for console errors before each test
beforeEach(() => {
	consoleErrors.length = 0;
	consoleWarnings.length = 0;
});

// Cleanup after each test and report console errors
afterEach(() => {
	// Check for React key warnings
	const keyErrors = consoleErrors.filter(
		(msg) =>
			msg.includes("same key") ||
			msg.includes("unique key") ||
			msg.includes("key prop"),
	);

	if (keyErrors.length > 0) {
		throw new Error(`❌ React key errors detected:\n${keyErrors.join("\n")}`);
	}

	// Check for other critical errors (excluding expected test errors)
	const criticalErrors = consoleErrors.filter(
		(msg) =>
			!msg.includes(
				"Not implemented: HTMLFormElement.prototype.requestSubmit",
			) &&
			!msg.includes(
				"Not implemented: HTMLCanvasElement.prototype.getContext",
			) &&
			!msg.includes("Warning: ReactDOM.render"),
	);

	if (criticalErrors.length > 0) {
		console.warn(`⚠️  Console errors in test:\n${criticalErrors.join("\n")}`);
	}

	cleanup();
	vi.restoreAllMocks();
});

// Mock Next.js router
vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: vi.fn(),
		replace: vi.fn(),
		prefetch: vi.fn(),
		back: vi.fn(),
		pathname: "/",
		query: {},
		asPath: "/",
	}),
	usePathname: () => "/",
	useSearchParams: () => new URLSearchParams(),
}));

// Mock Framer Motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
	motion: {
		div: "div",
		button: "button",
		section: "section",
		nav: "nav",
		header: "header",
		footer: "footer",
		span: "span",
		p: "p",
		h1: "h1",
		h2: "h2",
		h3: "h3",
		ul: "ul",
		li: "li",
		a: "a",
	},
	AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
	useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
	useTransform: () => ({ get: () => 0 }),
	useSpring: () => ({ get: () => 0 }),
	useMotionValue: () => ({ get: () => 0, set: vi.fn() }),
	useInView: () => true,
}));

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
	constructor() {}
	disconnect() {}
	observe() {}
	takeRecords() {
		return [];
	}
	unobserve() {}
} as any;

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: vi.fn().mockImplementation((query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

// Mock scrollTo
window.scrollTo = vi.fn();

// Export original console methods for optional use in individual tests
export { originalConsoleError, originalConsoleWarn };
