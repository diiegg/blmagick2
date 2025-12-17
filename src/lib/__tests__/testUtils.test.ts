import { describe, expect, it } from "vitest";
import {
	createConsoleSpy,
	createKeyMatcher,
	createReactWarningChecker,
	expectNoConsoleErrors,
	expectNoKeyWarnings,
	validateUniqueKeys,
} from "../test-utils";

describe("Test Utilities", () => {
	describe("createConsoleSpy", () => {
		it("should capture console errors", () => {
			const spy = createConsoleSpy();

			console.error("Test error 1");
			console.error("Test error 2");

			expect(spy.getErrors()).toHaveLength(2);
			expect(spy.getErrors()[0]).toContain("Test error 1");
			expect(spy.hasErrors()).toBe(true);

			spy.restore();
		});

		it("should capture console warnings", () => {
			const spy = createConsoleSpy();

			console.warn("Test warning");

			expect(spy.getWarnings()).toHaveLength(1);
			expect(spy.hasErrors()).toBe(true); // hasErrors includes warnings

			spy.restore();
		});

		it("should detect React key warnings", () => {
			const spy = createConsoleSpy();

			console.error(
				"Warning: Encountered two children with the same key, `item-1`",
			);

			expect(spy.hasKeyWarnings()).toBe(true);

			spy.restore();
		});

		it("should restore console after use", () => {
			const spy = createConsoleSpy();
			const errorCount = spy.getErrors().length;

			spy.restore();

			// After restore, errors should not be captured
			console.error("This should not be captured");

			expect(spy.getErrors()).toHaveLength(errorCount);
		});
	});

	describe("validateUniqueKeys", () => {
		it("should validate unique keys", () => {
			const keys = ["item-1", "item-2", "item-3"];
			const result = validateUniqueKeys(keys);

			expect(result.isValid).toBe(true);
			expect(result.duplicates).toHaveLength(0);
			expect(result.undefinedCount).toBe(0);
		});

		it("should detect duplicate keys", () => {
			const keys = ["item-1", "item-2", "item-1"];
			const result = validateUniqueKeys(keys);

			expect(result.isValid).toBe(false);
			expect(result.duplicates).toContain("item-1");
		});

		it("should count undefined keys", () => {
			const keys = ["item-1", "undefined", ""];
			const result = validateUniqueKeys(keys);

			expect(result.isValid).toBe(false);
			expect(result.undefinedCount).toBe(2);
		});

		it("should detect multiple issues", () => {
			const keys = ["item-1", "item-1", "undefined", "item-2", ""];
			const result = validateUniqueKeys(keys);

			expect(result.isValid).toBe(false);
			expect(result.duplicates).toContain("item-1");
			expect(result.undefinedCount).toBe(2);
		});
	});

	describe("createKeyMatcher", () => {
		it("should match valid key patterns", () => {
			const matcher = createKeyMatcher(/^item-\d+$/);

			expect(matcher("item-1")).toBe(true);
			expect(matcher("item-123")).toBe(true);
			expect(matcher("item-abc")).toBe(false);
			expect(matcher("other-1")).toBe(false);
		});

		it("should work with complex patterns", () => {
			const matcher = createKeyMatcher(/^[a-z]+-[0-9a-f]{8}$/);

			expect(matcher("user-12345678")).toBe(true);
			expect(matcher("post-abcdef12")).toBe(true);
			expect(matcher("user-12345")).toBe(false); // Too short
			expect(matcher("User-12345678")).toBe(false); // Capital letter
		});
	});

	describe("expectNoKeyWarnings", () => {
		it("should pass when no key warnings", async () => {
			await expect(
				expectNoKeyWarnings(() => {
					// No warnings
				}),
			).resolves.not.toThrow();
		});

		it("should fail when key warnings are present", async () => {
			await expect(
				expectNoKeyWarnings(() => {
					console.error("Warning: Encountered two children with the same key");
				}),
			).rejects.toThrow("React key warnings detected");
		});
	});

	describe("expectNoConsoleErrors", () => {
		it("should pass when no console errors", async () => {
			await expect(
				expectNoConsoleErrors(() => {
					// No errors
				}),
			).resolves.not.toThrow();
		});

		it("should fail when console errors are present", async () => {
			await expect(
				expectNoConsoleErrors(() => {
					console.error("Test error");
				}),
			).rejects.toThrow("Console errors detected");
		});
	});

	describe("createReactWarningChecker", () => {
		it("should detect React key warnings", () => {
			const checker = createReactWarningChecker();

			console.error("Warning: Encountered two children with the same key");

			expect(checker.hasKeyWarnings()).toBe(true);
			expect(checker.getAllWarnings()).toHaveLength(1);

			checker.cleanup();
		});

		it("should detect unrecognized props", () => {
			const checker = createReactWarningChecker();

			console.error("Warning: React does not recognize the `whileInView` prop");

			expect(checker.hasUnrecognizedProps()).toBe(true);

			checker.cleanup();
		});

		it("should detect memory leak warnings", () => {
			const checker = createReactWarningChecker();

			console.error(
				"Warning: Can't perform a React state update on an unmounted component",
			);

			expect(checker.hasMemoryLeaks()).toBe(true);

			checker.cleanup();
		});

		it("should detect prop type warnings", () => {
			const checker = createReactWarningChecker();

			console.warn("Warning: Failed prop type: Invalid prop `count` of type");

			expect(checker.hasPropTypeWarnings()).toBe(true);

			checker.cleanup();
		});

		it("should handle multiple warning types", () => {
			const checker = createReactWarningChecker();

			console.error("Warning: Encountered two children with the same key");
			console.warn("Warning: Failed prop type");
			console.error("React does not recognize the prop");

			expect(checker.hasKeyWarnings()).toBe(true);
			expect(checker.hasPropTypeWarnings()).toBe(true);
			expect(checker.hasUnrecognizedProps()).toBe(true);
			expect(checker.getAllWarnings()).toHaveLength(3);

			checker.cleanup();
		});
	});
});
