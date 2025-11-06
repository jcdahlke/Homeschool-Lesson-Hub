/**
 * @description
 * A React component (likely a Server Component) that renders a
 * tutorial guide for signing up the first user.
 *
 * @remarks
 * This component provides a dynamic, context-aware step for
 * developers deploying on Vercel.
 *
 * 1.  **Conditional Rendering (Vercel):**
 * - It checks `process.env.VERCEL_ENV` to see if the app is
 * running in a Vercel "preview" or "production" environment.
 * - If it is, it renders a special `<TutorialStep>` that
 * dynamically displays the relevant Vercel environment
 * variables (`VERCEL_URL`, `VERCEL_PROJECT_PRODUCTION_URL`).
 * - This step instructs the developer to update their Supabase
 * project's redirect URLs to match their Vercel deployment,
 * which is a crucial step for Vercel-based auth to work.
 *
 * 2.  **Standard Step:**
 * - It always renders a final `<TutorialStep>` that encourages
 * the developer to visit the app's `/auth/sign-up` page
 * to create the first user account.
 *
 * @example
 * // Used on a home or documentation page.
 * <SignUpUserSteps />
 *
 * @dependencies
 * - `next/link`: For navigation to auth pages and external docs.
 * - `./tutorial-step`: A child component for a single step.
 * - `lucide-react`: For the `ArrowUpRight` icon.
 */

import Link from "next/link";
import { TutorialStep } from "./tutorial-step";
import { ArrowUpRight } from "lucide-react";

export function SignUpUserSteps() {
  return (
    <ol className="flex flex-col gap-6">
      {process.env.VERCEL_ENV === "preview" ||
      process.env.VERCEL_ENV === "production" ? (
        <TutorialStep title="Set up redirect urls">
          <p>It looks like this App is hosted on Vercel.</p>
          <p className="mt-4">
            This particular deployment is
            <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
              &quot;{process.env.VERCEL_ENV}&quot;
            </span>{" "}
            on
            <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
              https://{process.env.VERCEL_URL}
            </span>
            .
          </p>
          <p className="mt-4">
            You will need to{" "}
            <Link
              className="text-primary hover:text-foreground"
              href={
                "https://supabase.com/dashboard/project/_/auth/url-configuration"
              }
            >
              update your Supabase project
            </Link>{" "}
            with redirect URLs based on your Vercel deployment URLs.
          </p>
          <ul className="mt-4">
            <li>
              -{" "}
              <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
                http://localhost:3000/**
              </span>
            </li>
            <li>
              -{" "}
              <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
                {`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/**`}
              </span>
            </li>
            <li>
              -{" "}
              <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
                {`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(
                  ".vercel.app",
                  "",
                )}-*-[vercel-team-url].vercel.app/**`}
              </span>{" "}
              (Vercel Team URL can be found in{" "}
              <Link
                className="text-primary hover:text-foreground"
                href="https://vercel.com/docs/accounts/create-a-team#find-your-team-id"
                target="_blank"
              >
                Vercel Team settings
              </Link>
              )
            </li>
          </ul>
          <Link
            href="https://supabase.com/docs/guides/auth/redirect-urls#vercel-preview-urls"
            target="_blank"
            className="text-primary/50 hover:text-primary flex items-center text-sm gap-1 mt-4"
          >
            Redirect URLs Docs <ArrowUpRight size={14} />
          </Link>
        </TutorialStep>
      ) : null}
      <TutorialStep title="Sign up your first user">
        <p>
          Head over to the{" "}
          <Link
            href="auth/sign-up"
            className="font-bold hover:underline text-foreground/80"
          >
            Sign up
          </Link>{" "}
          page and sign up your first user. It&apos;s okay if this is just you
          for now. Your awesome idea will have plenty of users later!
        </p>
      </TutorialStep>
    </ol>
  );
}
