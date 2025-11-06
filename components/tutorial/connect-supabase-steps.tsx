/**
 * @description
 * A React component that renders a list of tutorial steps
 * for connecting a Next.js application to Supabase.
 *
 * @remarks
 * This component structures a tutorial as an ordered list (`<ol>`).
 *
 * 1.  **Composition:** It uses a child component, `<TutorialStep>`,
 * to render each individual step in the list.
 * 2.  **Content:** It provides instructions for:
 * - Creating a Supabase project.
 * - Setting up local environment variables (`.env.local`).
 * - Restarting the Next.js development server.
 * - Refreshing the page.
 * 3.  **Styling:**
 * - Includes external links with appropriate styling.
 * - Uses inline-block elements (`<span>`) styled to look
 * like code snippets for file and command names.
 *
 * @example
 * // Used on a home or setup page to guide developers.
 * <ConnectSupabaseSteps />
 *
 * @dependencies
 * - `./tutorial-step`: A child component used to render
 * each numbered step with a title and content.
 */

import { TutorialStep } from "./tutorial-step";

export function ConnectSupabaseSteps() {
  return (
    <ol className="flex flex-col gap-6">
      <TutorialStep title="Create Supabase project">
        <p>
          Head over to{" "}
          <a
            href="https://app.supabase.com/project/_/settings/api"
            target="_blank"
            className="font-bold hover:underline text-foreground/80"
            rel="noreferrer"
          >
            database.new
          </a>{" "}
          and create a new Supabase project.
        </p>
      </TutorialStep>

      <TutorialStep title="Declare environment variables">
        <p>
          Rename the{" "}
          <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
            .env.example
          </span>{" "}
          file in your Next.js app to{" "}
          <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
            .env.local
          </span>{" "}
          and populate with values from{" "}
          <a
            href="https://app.supabase.com/project/_/settings/api"
            target="_blank"
            className="font-bold hover:underline text-foreground/80"
            rel="noreferrer"
          >
            your Supabase project&apos;s API Settings
          </a>
          .
        </p>
      </TutorialStep>

      <TutorialStep title="Restart your Next.js development server">
        <p>
          You may need to quit your Next.js development server and run{" "}
          <span className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-xs font-medium text-secondary-foreground border">
            npm run dev
          </span>{" "}
          again to load the new environment variables.
        </p>
      </TutorialStep>

      <TutorialStep title="Refresh the page">
        <p>
          You may need to refresh the page for Next.js to load the new
          environment variables.
        </p>
      </TutorialStep>
    </ol>
  );
}
