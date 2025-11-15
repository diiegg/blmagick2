import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Cleanup after each test
afterEach(() => {
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

// Store original console methods for optional strict error checking
// These can be used in individual tests that want to detect console errors
export const originalConsoleError = console.error;
export const originalConsoleWarn = console.warn;
