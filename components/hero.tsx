/**
 * @description
 * A React component that renders the main "hero" section of the page.
 *
 * @remarks
 * This component is primarily for display and branding, showing
 * the Next.js and Supabase logos and a marketing headline.
 *
 * 1.  **Logo Display:** It renders the `<SupabaseLogo />` and
 * `<NextLogo />` components, wrapped in external links
 * (`<a>` tags) to their respective websites.
 * 2.  **Headline:** It displays a large headline promoting the
 * template as a fast way to build with Supabase and Next.js.
 * The product names in the headline are also links.
 * 3.  **Styling:** It uses Tailwind CSS for layout (flexbox, gap)
 * and typography.
 * 4.  **Accessibility:** It includes a screen-reader-only `<h1>`
 * (`sr-only`) to provide a top-level heading for the page.
 * 5.  **Visual Divider:** It renders a full-width gradient line
 * as a decorative separator.
 *
 * @example
 * // Used on the main landing page.
 * <Hero />
 *
 * @dependencies
 * - `./next-logo`: A component that renders the Next.js logo.
 * - `./supabase-logo`: A component that renders the Supabase logo.
 */

import { NextLogo } from "./next-logo";
import { SupabaseLogo } from "./supabase-logo";

export function Hero() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
        >
          <SupabaseLogo />
        </a>
        <span className="border-l rotate-45 h-6" />
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          <NextLogo />
        </a>
      </div>
      <h1 className="sr-only">Supabase and Next.js Starter Template</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        The fastest way to build apps with{" "}
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Supabase
        </a>{" "}
        and{" "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Next.js
        </a>
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
