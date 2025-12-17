import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "../ErrorBoundary";
import * as Sentry from "@sentry/nextjs";

// Mock Sentry
vi.mock("@sentry/nextjs", () => ({
	captureException: vi.fn(),
}));

// Test component that throws an error
function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {
	if (shouldThrow) {
		throw new Error("Test error");
	}
	return <div>No error</div>;
}

describe("ErrorBoundary", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		// Suppress console.error for cleaner test output
		vi.spyOn(console, "error").mockImplementation(() => {});
	});

	describe("Normal Operation", () => {
		it("renders children when no error occurs", () => {
			render(
				<ErrorBoundary>
					<div>Test content</div>
				</ErrorBoundary>,
			);

			expect(screen.getByText("Test content")).toBeInTheDocument();
		});

		it("passes props to children correctly", () => {
			render(
				<ErrorBoundary>
					<ThrowError shouldThrow={false} />
				</ErrorBoundary>,
			);

			expect(screen.getByText("No error")).toBeInTheDocument();
		});
	});

	describe("Error Handling", () => {
		it("catches errors from child components", () => {
			render(
				<ErrorBoundary>
					<ThrowError shouldThrow={true} />
				</ErrorBoundary>,
			);

			// Should not see the child content
			expect(screen.queryByText("No error")).not.toBeInTheDocument();
		});

		it("displays default fallback UI when error occurs", () => {
			const { container } = render(
				<ErrorBoundary>
					<ThrowError shouldThrow={true} />
				</ErrorBoundary>,
			);

			// Default fallback is a muted text div (silent failure)
			const fallback = container.querySelector(".text-\\[--color-muted\\]");
			expect(fallback).toBeInTheDocument();
		});

		it("displays custom fallback UI when provided", () => {
			render(
				<ErrorBoundary fallback={<div>Custom error message</div>}>
					<ThrowError shouldThrow={true} />
				</ErrorBoundary>,
			);

			expect(screen.getByText("Custom error message")).toBeInTheDocument();
		});
	});

	describe("Sentry Integration", () => {
		it("sends error to Sentry when error occurs", () => {
			render(
				<ErrorBoundary>
					<ThrowError shouldThrow={true} />
				</ErrorBoundary>,
			);

			expect(Sentry.captureException).toHaveBeenCalled();
		});

		it("sends error with React component stack context", () => {
			render(
				<ErrorBoundary>
					<ThrowError shouldThrow={true} />
				</ErrorBoundary>,
			);

			expect(Sentry.captureException).toHaveBeenCalledWith(
				expect.any(Error),
				expect.objectContaining({
					contexts: expect.objectContaining({
						react: expect.any(Object),
					}),
				}),
			);
		});

		it("captures the correct error instance", () => {
			const testError = new Error("Specific test error");

			function ThrowSpecificError() {
				throw testError;
				return null;
			}

			render(
				<ErrorBoundary>
					<ThrowSpecificError />
				</ErrorBoundary>,
			);

			expect(Sentry.captureException).toHaveBeenCalledWith(
				testError,
				expect.any(Object),
			);
		});
	});

	describe("Error Callback", () => {
		it("calls onError callback when provided", () => {
			const onErrorMock = vi.fn();

			render(
				<ErrorBoundary onError={onErrorMock}>
					<ThrowError shouldThrow={true} />
				</ErrorBoundary>,
			);

			expect(onErrorMock).toHaveBeenCalled();
		});

		it("receives error and errorInfo in callback", () => {
			const onErrorMock = vi.fn();

			render(
				<ErrorBoundary onError={onErrorMock}>
					<ThrowError shouldThrow={true} />
				</ErrorBoundary>,
			);

			expect(onErrorMock).toHaveBeenCalledWith(
				expect.any(Error),
				expect.objectContaining({
					componentStack: expect.any(String),
				}),
			);
		});
	});

	describe("Development vs Production", () => {
		it("logs error to console in development", () => {
			const originalEnv = process.env.NODE_ENV;
			vi.stubEnv("NODE_ENV", "development");

			const consoleErrorSpy = vi
				.spyOn(console, "error")
				.mockImplementation(() => {});

			render(
				<ErrorBoundary>
					<ThrowError shouldThrow={true} />
				</ErrorBoundary>,
			);

			// In development, should log to console
			expect(consoleErrorSpy).toHaveBeenCalled();

			vi.stubEnv("NODE_ENV", originalEnv);
		});
	});

	describe("State Management", () => {
		it("updates hasError state when error occurs", () => {
			const { container } = render(
				<ErrorBoundary>
					<ThrowError shouldThrow={true} />
				</ErrorBoundary>,
			);

			// Fallback UI should be rendered (state.hasError = true)
			const fallback = container.querySelector(".text-\\[--color-muted\\]");
			expect(fallback).toBeInTheDocument();
		});

		it("stores error in component state", () => {
			// This is implicit - if error is stored, fallback is rendered
			const { container } = render(
				<ErrorBoundary>
					<ThrowError shouldThrow={true} />
				</ErrorBoundary>,
			);

			expect(
				container.querySelector(".text-\\[--color-muted\\]"),
			).toBeInTheDocument();
		});
	});

	describe("Multiple Errors", () => {
		it("handles multiple child errors independently", () => {
			render(
				<div>
					<ErrorBoundary fallback={<div>Error 1</div>}>
						<ThrowError shouldThrow={true} />
					</ErrorBoundary>
					<ErrorBoundary fallback={<div>Error 2</div>}>
						<ThrowError shouldThrow={true} />
					</ErrorBoundary>
				</div>,
			);

			expect(screen.getByText("Error 1")).toBeInTheDocument();
			expect(screen.getByText("Error 2")).toBeInTheDocument();
		});

		it("isolates errors to specific boundaries", () => {
			render(
				<div>
					<ErrorBoundary fallback={<div>Caught error</div>}>
						<ThrowError shouldThrow={true} />
					</ErrorBoundary>
					<ErrorBoundary>
						<div>This should still render</div>
					</ErrorBoundary>
				</div>,
			);

			expect(screen.getByText("Caught error")).toBeInTheDocument();
			expect(screen.getByText("This should still render")).toBeInTheDocument();
		});
	});

	describe("Animation Protection", () => {
		it("prevents animation crashes from breaking the page", () => {
			function BrokenAnimation() {
				throw new Error("Animation frame error");
				return null;
			}

			const { container } = render(
				<ErrorBoundary>
					<BrokenAnimation />
				</ErrorBoundary>,
			);

			// Should render fallback instead of crashing
			expect(
				container.querySelector(".text-\\[--color-muted\\]"),
			).toBeInTheDocument();
		});
	});

	describe("Accessibility", () => {
		it("fallback UI is not disruptive (silent failure)", () => {
			const { container } = render(
				<ErrorBoundary>
					<ThrowError shouldThrow={true} />
				</ErrorBoundary>,
			);

			const fallback = container.querySelector(".text-\\[--color-muted\\]");
			expect(fallback).toHaveClass("text-sm", "italic");
		});

		it("custom fallback can include proper ARIA labels", () => {
			render(
				<ErrorBoundary
					fallback={
						<div role="alert" aria-live="polite">
							Something went wrong
						</div>
					}
				>
					<ThrowError shouldThrow={true} />
				</ErrorBoundary>,
			);

			const alert = screen.getByRole("alert");
			expect(alert).toHaveAttribute("aria-live", "polite");
		});
	});
});
