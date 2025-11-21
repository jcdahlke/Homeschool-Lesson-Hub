/**
 * @description
 * This is the main configuration file for Tailwind CSS.
 *
 * @remarks
 * This file configures Tailwind's behavior, including theme settings,
 * content scanning, plugins, and dark mode strategy. This specific
 * configuration is typical of a project using shadcn/ui.
 *
 * 1.  **`darkMode: ["class"]`**:
 * - Configures dark mode to be activated by a `.dark` class
 * on a parent element (usually the `<html>` tag).
 * - This is managed by `next-themes` (as seen in `layout.tsx`).
 *
 * 2.  **`content`**:
 * - An array of "glob" patterns.
 * - Tailwind CSS scans these files at build time to find
 * all the utility classes being used.
 * - It then "tree-shakes" the CSS, generating a final stylesheet
 * containing *only* the classes found, which keeps the
 * file size minimal.
 *
 * 3.  **`theme.extend.colors`**:
 * - Extends Tailwind's default color palette.
 * - **Key Feature:** All colors are defined as CSS variables
 * (e.g., `hsl(var(--background))`).
 * - This is the core of shadcn/ui's theming system. These
 * variables (like `--background`, `--primary`, etc.) are
 * defined in a global CSS file (like `globals.css`),
 * and different values are provided for light and dark themes.
 *
 * 4.  **`theme.extend.borderRadius`**:
 * - Extends border-radius utilities.
 * - It also uses a CSS variable (`--radius`) for consistent
 * rounding, which can be easily changed in `globals.css`.
 *
 * 5.  **`plugins`**:
 * - `require("tailwindcss-animate")`: Adds a plugin that
 * provides utilities for CSS animations (e.g., fade-in,
 * slide-in). This is used by many shadcn/ui components
 * like `DropdownMenu` for their open/close animations.
 *
 * 6.  **`satisfies Config`**:
 * - This is a TypeScript feature, not part of JavaScript.
 * - It "satisfies" the `Config` type from `tailwindcss`,
 * which provides type-checking and auto-completion
 * for the configuration object within a TypeScript
 * environment (even though this is a `.js` file).
 *
 * @type {import('tailwindcss').Config}
 */

import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brandGreen: "hsl(var(--brand-green))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
