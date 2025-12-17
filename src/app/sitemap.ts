import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://blackmagickops.com";

	// Define static routes
	const routes = [
		"",
		"/#disciplines",
		"/#framework",
		"/#philosophy",
		"/#testimonials",
		"/#faq",
		"/#contact",
	];

	return routes.map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date(),
		changeFrequency: "weekly",
		priority: route === "" ? 1 : 0.8,
	}));
}
