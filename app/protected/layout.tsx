/**
 * @description
 * A React layout component designed to wrap protected pages (or any page)
 * with the application's standard navigation and footer.
 *
 * @remarks
 * This component provides a consistent look and feel (nav bar, footer)
 * for authenticated routes.
 *
 * 1.  **Purpose:** Its primary role is to render its `children` prop
 * within a standard page structure.
 *
 * 2.  **Structure:** It renders a full-page layout consisting of:
 * - A `<nav>` bar at the top.
 * - A main content area (`<div className="flex-1">`) that
 * renders the `children`.
 * - A `<footer>` at the bottom.
 *
 * 3.  **Composed Components:** The nav and footer are composed of
 * several other shared components:
 * - `<DeployButton />`: In the nav, for Vercel deployment.
 * - `<AuthButton />`: In the nav, to show user status and
 * the logout button.
 * - `<EnvVarWarning />`: A fallback in the nav if env vars
 * are missing.
 * - `<ThemeSwitcher />`: In the footer, for theme control.
 *
 * 4.  **Conditional Logic:**
 * - It includes the `hasEnvVars` check in the nav to
 * conditionally render either the `<EnvVarWarning />` or
 * the `<AuthButton />`.
 *
 * @example
 * // Used as the layout for a protected route group,
 * // e.g., in `app/protected/layout.tsx`
 * export default function Layout({ children }) {
 * return <ProtectedLayout>{children}</ProtectedLayout>;
 * }
 *
 * @dependencies
 * - `next/link`: For the home link.
 * - `@/components/deploy-button`: Renders Vercel deploy button.
 * - `@/components/env-var-warning`: Renders warning for missing env vars.
 * - `@/components/auth-button`: Renders login/logout buttons.
 * - `@/components/theme-switcher`: Renders the theme toggle.
 * - `@/lib/utils (hasEnvVars)`: Utility to check for env vars.
 */

import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Next.js Supabase Starter</Link>
              <div className="flex items-center gap-2">
                <DeployButton />
              </div>
            </div>
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          </div>
        </nav>
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          {children}
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a>
          </p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}
