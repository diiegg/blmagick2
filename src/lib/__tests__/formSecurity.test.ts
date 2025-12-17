import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import {
	CSRFProtection,
	RateLimiter,
	InputSanitizer,
	useHoneypot,
} from "../formSecurity";

// Mock nanoid
vi.mock("nanoid", () => ({
	nanoid: (size?: number) => `mock-id-${size || 21}`,
}));

describe("Form Security Utilities", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		sessionStorage.clear();
	});

	describe("CSRFProtection", () => {
		it("generates a new token and stores it in sessionStorage", () => {
			const token = CSRFProtection.generateToken();
			expect(token).toBe("mock-id-32");
			expect(sessionStorage.getItem("csrf_token")).toBe("mock-id-32");
			expect(sessionStorage.getItem("csrf_token_expiry")).toBeDefined();
		});

		it("retrieves an existing valid token", () => {
			CSRFProtection.generateToken();
			const token = CSRFProtection.getToken();
			expect(token).toBe("mock-id-32");
		});

		it("returns null if token does not exist", () => {
			const token = CSRFProtection.getToken();
			expect(token).toBeNull();
		});

		it("returns null and clears storage if token is expired", () => {
			CSRFProtection.generateToken();

			// Mock Date.now to be in the future
			const futureTime = Date.now() + 3600000 + 1000;
			vi.spyOn(Date, "now").mockReturnValue(futureTime);

			const token = CSRFProtection.getToken();
			expect(token).toBeNull();
			expect(sessionStorage.getItem("csrf_token")).toBeNull();
		});

		it("validates a correct token", () => {
			const token = CSRFProtection.generateToken();
			expect(CSRFProtection.validateToken(token)).toBe(true);
		});

		it("rejects an incorrect token", () => {
			CSRFProtection.generateToken();
			expect(CSRFProtection.validateToken("wrong-token")).toBe(false);
		});
	});

	describe("RateLimiter", () => {
		it("allows requests within the limit", () => {
			const limiter = new RateLimiter({ maxAttempts: 2, windowMs: 1000 });
			const id = "user-1";

			expect(limiter.isAllowed(id)).toBe(true);
			expect(limiter.isAllowed(id)).toBe(true);
		});

		it("blocks requests exceeding the limit", () => {
			const limiter = new RateLimiter({ maxAttempts: 1, windowMs: 1000 });
			const id = "user-2";

			expect(limiter.isAllowed(id)).toBe(true);
			expect(limiter.isAllowed(id)).toBe(false);
		});

		it("resets limit after window expires", () => {
			const limiter = new RateLimiter({ maxAttempts: 1, windowMs: 1000 });
			const id = "user-3";

			vi.useFakeTimers();

			expect(limiter.isAllowed(id)).toBe(true);
			expect(limiter.isAllowed(id)).toBe(false);

			// Advance time past window
			vi.advanceTimersByTime(1001);

			expect(limiter.isAllowed(id)).toBe(true);

			vi.useRealTimers();
		});

		it("calculates remaining time correctly", () => {
			const windowMs = 1000;
			const limiter = new RateLimiter({ maxAttempts: 1, windowMs });
			const id = "user-4";

			vi.useFakeTimers();
			limiter.isAllowed(id);

			vi.advanceTimersByTime(500);
			// Should be around 500ms remaining
			const remaining = limiter.getRemainingTime(id);
			expect(remaining).toBe(500); // 1000 - 500

			vi.useRealTimers();
		});
	});

	describe("InputSanitizer", () => {
		it("sanitizes HTML input", () => {
			const dirty = '<script>alert("xss")</script>Hello';
			const clean = InputSanitizer.sanitizeHTML(dirty);
			// DOMPurify with empty allowed tags should strip everything
			expect(clean).toBe("Hello");
		});

		it("sanitizes email input", () => {
			const dirty = "  User@Example.com  ";
			const clean = InputSanitizer.sanitizeEmail(dirty);
			expect(clean).toBe("user@example.com");
		});

		it("sanitizes text input (removes null bytes)", () => {
			const dirty = "Hello\x00World";
			const clean = InputSanitizer.sanitizeText(dirty);
			expect(clean).toBe("HelloWorld");
		});

		it("detects SQL injection", () => {
			expect(InputSanitizer.hasSQLInjection("SELECT * FROM users")).toBe(true);
			expect(InputSanitizer.hasSQLInjection("DROP TABLE users")).toBe(true);
			expect(InputSanitizer.hasSQLInjection("normal text")).toBe(false);
		});
	});

	describe("useHoneypot", () => {
		it("generates field name on client side (useEffect)", () => {
			const { result } = renderHook(() => useHoneypot());

			// Initial state should be default
			expect(result.current.fieldName).toBe("field_honeypot");

			// After effect runs (simulated by renderHook)
			// With mock nanoid(10) -> mock-id-10
			expect(result.current.fieldName).toBe("field_mock-id-10");
		});

		it("validates empty value correctly", () => {
			const { result } = renderHook(() => useHoneypot());
			expect(result.current.validate("")).toBe(true);
			expect(result.current.validate("bot-content")).toBe(false);
		});
	});
});
