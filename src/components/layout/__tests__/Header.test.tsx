import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "../Header";

describe("Header", () => {
	it("renders the logo and brand name", () => {
		render(<Header />);

		expect(screen.getByText("BlackMagickOps")).toBeInTheDocument();
		expect(screen.getByLabelText("BlackMagickOps - Home")).toBeInTheDocument();
	});

	it("renders all navigation links", () => {
		render(<Header />);

		const desktopNav = screen.getAllByRole("navigation", {
			name: "Main navigation",
		})[0];

		expect(desktopNav).toHaveTextContent("Disciplines");
		expect(desktopNav).toHaveTextContent("Framework");
		expect(desktopNav).toHaveTextContent("Philosophy");
		expect(desktopNav).toHaveTextContent("Work");
	});

	it('renders "Start a Project" CTA button', () => {
		render(<Header />);

		const ctaButtons = screen.getAllByText(/Start a Project/i);
		expect(ctaButtons.length).toBeGreaterThan(0);
	});

	it("has skip link for keyboard navigation", () => {
		render(<Header />);

		const skipLink = screen.getByText("Skip to main content");
		expect(skipLink).toBeInTheDocument();
		expect(skipLink).toHaveClass("skip-link");
	});

	describe("Mobile Menu", () => {
		it("mobile menu is initially closed", () => {
			render(<Header />);

			const mobileMenu = screen.queryByLabelText("Mobile navigation");
			expect(mobileMenu).not.toBeInTheDocument();
		});

		it("opens mobile menu when hamburger button is clicked", () => {
			render(<Header />);

			const menuButton = screen.getByLabelText("Open mobile menu");
			fireEvent.click(menuButton);

			const mobileMenu = screen.getByLabelText("Mobile navigation");
			expect(mobileMenu).toBeInTheDocument();
		});

		it("closes mobile menu when X button is clicked", () => {
			render(<Header />);

			// Open menu
			const openButton = screen.getByLabelText("Open mobile menu");
			fireEvent.click(openButton);

			// Close menu
			const closeButton = screen.getByLabelText("Close mobile menu");
			fireEvent.click(closeButton);

			const mobileMenu = screen.queryByLabelText("Mobile navigation");
			expect(mobileMenu).not.toBeInTheDocument();
		});

		it("closes mobile menu when navigation link is clicked", () => {
			render(<Header />);

			// Open menu
			const menuButton = screen.getByLabelText("Open mobile menu");
			fireEvent.click(menuButton);

			// Click a link
			const mobileMenu = screen.getByLabelText("Mobile navigation");
			const disciplinesLink = mobileMenu.querySelector(
				'a[href="#disciplines"]',
			);
			fireEvent.click(disciplinesLink!);

			// Menu should be closed
			expect(
				screen.queryByLabelText("Mobile navigation"),
			).not.toBeInTheDocument();
		});

		it("toggles aria-expanded attribute on menu button", () => {
			render(<Header />);

			const menuButton = screen.getByLabelText("Open mobile menu");
			expect(menuButton).toHaveAttribute("aria-expanded", "false");

			fireEvent.click(menuButton);
			expect(menuButton).toHaveAttribute("aria-expanded", "true");
		});
	});

	describe("Accessibility", () => {
		it("has proper ARIA labels on navigation", () => {
			render(<Header />);

			expect(screen.getByRole("banner")).toBeInTheDocument();
			expect(screen.getByLabelText("Main navigation")).toBeInTheDocument();
		});

		it("has descriptive aria-label on CTA button", () => {
			render(<Header />);

			const ctaButton = screen.getByLabelText("Contact us to start a project");
			expect(ctaButton).toBeInTheDocument();
		});

		it("mobile menu button has proper aria-controls", () => {
			render(<Header />);

			const menuButton = screen.getByLabelText("Open mobile menu");
			expect(menuButton).toHaveAttribute("aria-controls", "mobile-menu");
		});
	});

	describe("Styling", () => {
		it("header has fixed positioning and backdrop blur", () => {
			render(<Header />);

			const header = screen.getByRole("banner");
			expect(header).toHaveClass("fixed", "backdrop-blur-xl");
		});

		it("navigation links have hover transitions", () => {
			render(<Header />);

			const disciplinesLink = screen.getAllByText("Disciplines")[0];
			expect(disciplinesLink).toHaveClass("transition-colors");
		});
	});
});
