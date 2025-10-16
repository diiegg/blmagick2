import next from "eslint-config-next";

export default [
  {
    ignores: [
      "node_modules",
      ".next",
      "out",
      "dist",
      "coverage",
      "build",
      ".netlify",
      "public",
      "*.config.*",
      ".env*",
    ],
  },
  ...next,
  {
    rules: {
      // Relax rules that commonly cause Netlify build failures
      "@next/next/no-html-link-for-pages": "warn",
      "react/no-unescaped-entities": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
