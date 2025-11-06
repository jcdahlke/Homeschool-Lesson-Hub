/**
 * @description
 * An asynchronous React Server Component (RSC) that represents a
 * protected route, only accessible to authenticated users.
 *
 * @remarks
 * This component demonstrates server-side authentication checking.
 *
 * 1.  **Async Server Component:** This is an `async` component,
 * allowing it to perform server-side data fetching and
 * authentication checks.
 * 2.  **Authentication:**
 * - It initializes the Supabase *server-side* client.
 * - It calls `supabase.auth.getClaims()` to check for an
 * active, valid user session.
 * - **Redirect Logic:** If the `error` exists or no `data.claims`
 * are found, it immediately calls `redirect("/auth/login")`
 * to send the user to the login page.
 * 3.  **Protected Content:**
 * - If the user is authenticated, the component renders.
 * - It displays an `<InfoIcon>` with a message confirming
 * this is a protected page.
 * - It renders a `<pre>` block showing the user's
 * `claims` data (e.g., email, user ID) retrieved from Supabase.
 * - It renders the `<FetchDataSteps />` tutorial component as
 * the "Next steps" for the authenticated user.
 *
 * @example
 * // This component would be placed at a route like
 * // `app/protected/page.tsx` and would be wrapped by
 * // `app/protected/layout.tsx`.
 *
 * @dependencies
 * - `next/navigation (redirect)`: For server-side redirects.
 * - `@/lib/supabase/server`: The server-side Supabase client factory.
 * - `lucide-react`: For the `InfoIcon`.
 * - `@/components/tutorial/fetch-data-steps`: The tutorial component.
 */

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import { FetchDataSteps } from "@/components/tutorial/fetch-data-steps";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(data.claims, null, 2)}
        </pre>
      </div>
      <div>
        <h2 className="font-bold text-2xl mb-4">Next steps</h2>
        <FetchDataSteps />
      </div>
    </div>
  );
}
