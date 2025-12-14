/**
 * Test Utilities for React Key Error Detection
 *
 * Helpers for detecting console errors, React key warnings, and other
 * common issues in component tests.
 */

import { vi } from "vitest";
import type { Mock } from "vitest";

export interface ConsoleSpyResult {
	spy: any; // Using any to avoid complex Vitest type mismatch
	restore: () => void;
	getErrors: () => string[];
	getWarnings: () => string[];
	hasKeyWarnings: () => boolean;
	hasErrors: () => boolean;
}

/**
 * Create a console spy that captures errors and warnings
 *
 * @example
 * ```typescript
 * it('should not have console errors', () => {
 *   const consoleSpy = createConsoleSpy();
 *
 *   render(<MyComponent />);
 *
 *   expect(consoleSpy.hasErrors()).toBe(false);
 *   expect(consoleSpy.hasKeyWarnings()).toBe(false);
 *
 *   consoleSpy.restore();
 * });
 * ```
 */
export function createConsoleSpy(): ConsoleSpyResult {
	const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
	const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

	return {
		spy: errorSpy,
		restore: () => {
			errorSpy.mockRestore();
			warnSpy.mockRestore();
		},
		getErrors: () => {
			return errorSpy.mock.calls.map((call) => call[0]?.toString() || "");
		},
		getWarnings: () => {
			return warnSpy.mock.calls.map((call) => call[0]?.toString() || "");
		},
		hasKeyWarnings: () => {
			const allMessages = [...errorSpy.mock.calls, ...warnSpy.mock.calls].map(
				(call) => call[0]?.toString() || "",
			);

			return allMessages.some(
				(msg) =>
					msg.includes("same key") ||
					msg.includes("unique key") ||
					msg.includes("key prop"),
			);
		},
		hasErrors: () => {
			return errorSpy.mock.calls.length > 0 || warnSpy.mock.calls.length > 0;
		},
	};
}

/**
 * Test helper to verify no React key warnings are produced
 *
 * @example
 * ```typescript
 * it('should render list without key warnings', async () => {
 *   await expectNoKeyWarnings(() => {
 *     render(<List items={[1, 2, 3]} />);
 *   });
 * });
 * ```
 */
export async function expectNoKeyWarnings(
	testFn: () => void | Promise<void>,
): Promise<void> {
	const consoleSpy = createConsoleSpy();

	try {
		await testFn();

		if (consoleSpy.hasKeyWarnings()) {
			const errors = consoleSpy.getErrors();
			const warnings = consoleSpy.getWarnings();
			throw new Error(
				`React key warnings detected:\n${[...errors, ...warnings].join("\n")}`,
			);
		}
	} finally {
		consoleSpy.restore();
	}
}

/**
 * Test helper to verify no console errors are produced
 *
 * @example
 * ```typescript
 * it('should render without errors', async () => {
 *   await expectNoConsoleErrors(() => {
 *     render(<MyComponent />);
 *   });
 * });
 * ```
 */
export async function expectNoConsoleErrors(
	testFn: () => void | Promise<void>,
): Promise<void> {
	const consoleSpy = createConsoleSpy();

	try {
		await testFn();

		if (consoleSpy.hasErrors()) {
			const errors = consoleSpy.getErrors();
			throw new Error(`Console errors detected:\n${errors.join("\n")}`);
		}
	} finally {
		consoleSpy.restore();
	}
}

/**
 * Extract keys from rendered component's DOM
 *
 * @param container - The container element from render()
 * @param selector - CSS selector to find keyed elements (default: '[data-key]')
 * @returns Array of key values
 *
 * @example
 * ```typescript
 * const { container } = render(<List items={items} />);
 * const keys = extractKeysFromDOM(container);
 * expect(new Set(keys).size).toBe(keys.length); // All unique
 * ```
 */
export function extractKeysFromDOM(
	container: HTMLElement,
	selector = "[data-key]",
): string[] {
	return Array.from(container.querySelectorAll(selector)).map(
		(el) => el.getAttribute("data-key") || "",
	);
}

/**
 * Verify all keys are unique in a list
 *
 * @param keys - Array of keys to check
 * @returns Object with validation results
 *
 * @example
 * ```typescript
 * const keys = ['item-1', 'item-2', 'item-1']; // Duplicate!
 * const result = validateUniqueKeys(keys);
 * expect(result.isValid).toBe(false);
 * expect(result.duplicates).toEqual(['item-1']);
 * ```
 */
export function validateUniqueKeys(keys: string[]): {
	isValid: boolean;
	duplicates: string[];
	undefinedCount: number;
} {
	const seen = new Set<string>();
	const duplicates = new Set<string>();
	let undefinedCount = 0;

	for (const key of keys) {
		if (key === "undefined" || key === "") {
			undefinedCount++;
			continue;
		}

		if (seen.has(key)) {
			duplicates.add(key);
		} else {
			seen.add(key);
		}
	}

	return {
		isValid: duplicates.size === 0 && undefinedCount === 0,
		duplicates: Array.from(duplicates),
		undefinedCount,
	};
}

/**
 * Create a matcher for testing key patterns
 *
 * @param pattern - RegExp pattern to match keys against
 * @returns Function to test key validity
 *
 * @example
 * ```typescript
 * const matcher = createKeyMatcher(/^item-\d+$/);
 * expect(matcher('item-1')).toBe(true);
 * expect(matcher('item-abc')).toBe(false);
 * ```
 */
export function createKeyMatcher(pattern: RegExp): (key: string) => boolean {
	return (key: string) => pattern.test(key);
}

/**
 * Test helper to check for common React warnings
 *
 * @example
 * ```typescript
 * it('should not have React warnings', () => {
 *   const checker = createReactWarningChecker();
 *
 *   render(<MyComponent />);
 *
 *   expect(checker.hasKeyWarnings()).toBe(false);
 *   expect(checker.hasMemoryLeaks()).toBe(false);
 *   expect(checker.hasPropTypeWarnings()).toBe(false);
 *
 *   checker.cleanup();
 * });
 * ```
 */
export function createReactWarningChecker() {
	const consoleSpy = createConsoleSpy();

	return {
		hasKeyWarnings: () => {
			return consoleSpy
				.getErrors()
				.some(
					(msg) =>
						msg.includes("same key") ||
						msg.includes("unique key") ||
						msg.includes("key prop"),
				);
		},
		hasMemoryLeaks: () => {
			return consoleSpy
				.getErrors()
				.some(
					(msg) =>
						msg.includes("memory leak") || msg.includes("unmounted component"),
				);
		},
		hasPropTypeWarnings: () => {
			return consoleSpy
				.getWarnings()
				.some(
					(msg) =>
						msg.includes("Invalid prop") || msg.includes("Failed prop type"),
				);
		},
		hasUnrecognizedProps: () => {
			return consoleSpy
				.getErrors()
				.some((msg) => msg.includes("React does not recognize"));
		},
		getAllWarnings: () => {
			return [...consoleSpy.getErrors(), ...consoleSpy.getWarnings()];
		},
		cleanup: () => {
			consoleSpy.restore();
		},
	};
}
