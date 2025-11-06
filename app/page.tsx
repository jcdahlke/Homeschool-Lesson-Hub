/**
 * @description
 * The main homepage component for the application, rendered for the `/` route.
 *
 * @remarks
 * This component serves as the central layout for the landing page,
 * composing several other components to build the UI.
 *
 * 1.  **Structure:** It renders a full-page layout consisting of:
 * - A `<nav>` bar at the top.
 * - A main content area (`<div className="flex-1">`).
 * - A `<footer>` at the bottom.
 *
 * 2.  **Conditional Logic (`hasEnvVars`):**
 * - This component relies on a utility function `hasEnvVars()` to
 * check if the necessary Supabase environment variables are set.
 * - **In the nav:** If `!hasEnvVars`, it renders the
 * `<EnvVarWarning />` component. Otherwise, it renders the
 * `<AuthButton />`.
 * - **In the main content:** If `!hasEnvVars`, it renders the
 * `<ConnectSupabaseSteps />` tutorial. Otherwise, it
 * renders the `<SignUpUserSteps />` tutorial.
 *
 * 3.  **Composed Components:**
 * - `<DeployButton />`: In the nav, provides a link to deploy.
 * - `<AuthButton />`: In the nav, shows login/logout status.
 * - `<Hero />`: The main headline/logo section.
 * - `<ConnectSupabaseSteps />`: Tutorial for setting up env vars.
 * - `<SignUpUserSteps />`: Tutorial for signing up a user.
 * - `<ThemeSwitcher />`: In the footer, allows theme changes.
 *
 * @example
 * // This component is automatically rendered by Next.js for
 * // the `/` route (e.g., in `app/page.tsx`).
 *
 * @dependencies
 * - `next/link`: For the "Next.js Supabase Starter" home link.
 * - `@/components/deploy-button`: Renders Vercel deploy button.
 * - `@/components/env-var-warning`: Renders warning for missing env vars.
 * - `@/components/auth-button`: Renders login/logout buttons.
 * - `@/components/hero`: Renders the page's hero section.
 * - `@/components/theme-switcher`: Renders the theme toggle.
 * - `@/components/tutorial/*`: Imports tutorial step components.
 * - `@/lib/utils (hasEnvVars)`: Utility to check for env vars.
 */

import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
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
          <Hero />
          <main className="flex-1 flex flex-col gap-6 px-4">
            <h2 className="font-medium text-xl mb-4">Next steps</h2>
            {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
          </main>
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
