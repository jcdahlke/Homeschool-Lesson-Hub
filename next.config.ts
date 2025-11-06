/**
 * @description
 * This is the main configuration file for a Next.js application.
 *
 * @remarks
 * 1.  **Purpose:** It allows you to customize the behavior of
 * Next.js, such as setting up redirects, rewrites, custom
 * webpack configurations, environment variables, and more.
 *
 * 2.  **`nextConfig` object:**
 * - This object holds all your custom configurations.
 * - In this starter, it is initially empty (`{}`), meaning
 * it uses all of Next.js's default settings.
 *
 * 3.  **`export default`:**
 * - The configuration object is exported as the default
 * export, which Next.js automatically detects and uses
 * when you run `npm run dev` or `npm run build`.
 *
 * @example
 * // To add a configuration, you might modify it like this:
 * const nextConfig = {
 * reactStrictMode: true,
 * images: {
 * domains: ['example.com'],
 * },
 * };
 *
 * @see {@link https://nextjs.org/docs/api-reference/next.config.js/introduction} for all available options.
 *
 * @type {import('next').NextConfig}
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
