"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Enhanced keyboard navigation hook with focus trap and skip links
 * Implements WCAG 2.1 keyboard navigation guidelines
 */
export function useKeyboardNavigation(containerRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Tab trap for modals
      if (e.key === "Tab") {
        const focusableElements = container.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }

      // Escape to close
      if (e.key === "Escape") {
        const closeButton = container.querySelector<HTMLButtonElement>('[aria-label*="Close"]');
        closeButton?.click();
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [containerRef]);
}

/**
 * Roving tabindex for custom components (radio groups, toolbars)
 * Implements arrow key navigation
 */
export function useRovingTabIndex<T extends HTMLElement>(
  items: React.RefObject<T>[],
  orientation: "horizontal" | "vertical" = "horizontal"
) {
  const currentIndex = useRef(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const keys = orientation === "horizontal" ? ["ArrowLeft", "ArrowRight"] : ["ArrowUp", "ArrowDown"];
      const [prevKey, nextKey] = keys;

      if (e.key === prevKey) {
        e.preventDefault();
        currentIndex.current = Math.max(0, currentIndex.current - 1);
        items[currentIndex.current]?.current?.focus();
      } else if (e.key === nextKey) {
        e.preventDefault();
        currentIndex.current = Math.min(items.length - 1, currentIndex.current + 1);
        items[currentIndex.current]?.current?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        currentIndex.current = 0;
        items[0]?.current?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        currentIndex.current = items.length - 1;
        items[items.length - 1]?.current?.focus();
      }
    },
    [items, orientation]
  );

  useEffect(() => {
    items.forEach((item) => {
      item.current?.addEventListener("keydown", handleKeyDown);
    });

    return () => {
      items.forEach((item) => {
        item.current?.removeEventListener("keydown", handleKeyDown);
      });
    };
  }, [items, handleKeyDown]);

  return { currentIndex: currentIndex.current };
}

/**
 * Focus visible - only show focus rings for keyboard navigation
 */
export function useFocusVisible() {
  useEffect(() => {
    let hadKeyboardEvent = false;

    const handlePointerDown = () => {
      hadKeyboardEvent = false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        hadKeyboardEvent = true;
      }
    };

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (hadKeyboardEvent) {
        target.setAttribute("data-focus-visible", "true");
      } else {
        target.removeAttribute("data-focus-visible");
      }
    };

    const handleBlur = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      target.removeAttribute("data-focus-visible");
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focus", handleFocus, true);
    document.addEventListener("blur", handleBlur, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focus", handleFocus, true);
      document.removeEventListener("blur", handleBlur, true);
    };
  }, []);
}
