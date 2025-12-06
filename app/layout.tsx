/**
 * @description
 * The root layout component for the Next.js application.
 *
 * @remarks
 * This component sets up the foundational HTML structure (`<html>` and `<body>`)
 * and wraps the entire application with necessary providers.
 *
 * 1.  **Metadata:**
 * - It exports a `metadata` object, which Next.js uses to
 * set the page's `<head>` tags (title, description).
 * - It dynamically calculates `metadataBase` using a
 * `defaultUrl` (either from `process.env.VERCEL_URL` or
 * `localhost:3000`), which is crucial for SEO and social
 * media link previews.
 *
 * 2.  **Fonts:**
 * - It imports and configures the `Geist` font.
 * - The font's class (`geistSans.className`) is applied to
 * the `<body>` tag, along with `antialiased` for
 * smoother font rendering.
 *
 * 3.  **Theme Provider:**
 * - It wraps the `children` (the rest of the app) in the
 * `<ThemeProvider>` from `next-themes`.
 * - This provider is configured to manage the theme via
 * the `class` attribute, default to the "system" theme,
 * and allow `next-themes` to enable/disable system-based
 * theme changes.
 *
 * 4.  **Hydration Warning:**
 * - `suppressHydrationWarning` is added to the `<html>` tag.
 * This is a common and necessary practice when using
 * `next-themes`, as the theme (light/dark) may differ
 * between the server-rendered HTML and the initial
_ client render (which checks `localStorage`), preventing
 * a React hydration mismatch warning.
 *
 * @example
 * // This component is automatically used by Next.js to wrap
 * // all pages in the `app` directory.
 *
 * @dependencies
 * - `next/metadata`: For `Metadata` type.
 * - `next/font/google`: For loading the `Geist` font.
 * - `next-themes`: For the `ThemeProvider` component.
 * - `./globals.css`: For global application styles.
 */

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Homeschool Lesson Hub",
  description: "A community space for sharing homeschool lesson ideas.",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1">{children}</div> <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
