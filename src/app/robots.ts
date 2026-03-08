import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/", "/admin/"],
			},
			{
				userAgent: "GPTBot",
				disallow: "/",
			},
			{
				userAgent: "ChatGPT-User",
				disallow: "/",
			},
			{
				userAgent: "CCBot",
				disallow: "/",
			},
			{
				userAgent: "Google-Extended",
				disallow: "/",
			},
		],
		sitemap: "https://blackmagickops.com/sitemap.xml",
	};
}
