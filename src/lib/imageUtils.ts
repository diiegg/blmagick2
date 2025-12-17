/**
 * Image Utilities for Progressive Loading (Task 1.1.4)
 * Provides blur placeholders and LQIP (Low Quality Image Placeholder) support
 */

/**
 * Generates a shimmer placeholder for images
 * Creates a CSS-based shimmer effect while images load
 */
export function shimmer(w: number, h: number): string {
	return `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#1a1a1b" offset="20%" />
          <stop stop-color="#2a2a2c" offset="50%" />
          <stop stop-color="#1a1a1b" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#1a1a1b" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>
  `;
}

/**
 * Converts shimmer SVG to base64 data URL
 */
export function toBase64(str: string): string {
	return typeof window === "undefined"
		? Buffer.from(str).toString("base64")
		: window.btoa(str);
}

/**
 * Generates a blur placeholder data URL for Next.js Image component
 * @param w - Width of the image
 * @param h - Height of the image
 * @returns Base64 data URL for use with placeholder="blur"
 */
export function generateBlurDataURL(w = 800, h = 600): string {
	return `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;
}

/**
 * Default blur placeholder for common image sizes
 */
export const DEFAULT_BLUR_DATA_URL = generateBlurDataURL(800, 600);

/**
 * Blur placeholder for hero images
 */
export const HERO_BLUR_DATA_URL = generateBlurDataURL(1920, 1080);

/**
 * Blur placeholder for thumbnails
 */
export const THUMBNAIL_BLUR_DATA_URL = generateBlurDataURL(400, 300);

/**
 * Blur placeholder for avatars/icons
 */
export const AVATAR_BLUR_DATA_URL = generateBlurDataURL(200, 200);
