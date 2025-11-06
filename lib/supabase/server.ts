/**
 * @description
 * A factory function for creating a Supabase client instance specifically
 * for use in *server-side* environments within the Next.js App Router.
 *
 * @remarks
 * This function is intended for use in Server Components, Server Actions,
 * and Route Handlers.
 *
 * 1.  **Purpose:** It abstracts the creation of a Supabase client
 * that can read and write cookies in a server-side context.
 *
 * 2.  **`cookies()` from `next/headers`:**
 * - This function is `async` because it must `await cookies()`
 * from `next/headers` to get access to the read-only
 * cookie store for the incoming request.
 *
 * 3.  **`@supabase/ssr`:**
 * - It uses the `createServerClient` function from the
 * `@supabase/ssr` package.
 *
 * 4.  **Cookie Handler (`getAll`, `setAll`):**
 * - `getAll()`: Reads all cookies from the `cookieStore`.
 * - `setAll()`: Attempts to set cookies using `cookieStore.set()`.
 *
 * 5.  **The `try...catch` Block (Important):**
 * - The `setAll` operation is wrapped in a `try...catch` block.
 * - **Why?** `cookieStore.set()` (which sets *outgoing* headers)
 * will *fail* if this client is used in a Next.js Server
 * Component (like a `page.tsx`). Server Components are
 * for *rendering* and cannot modify outgoing headers.
 * - This error is *intentionally caught and ignored*.
 * - **Is this safe?** Yes, because this starter is configured
 * to use the `updateSession` middleware
 * (`lib/supabase/middleware.ts`). That middleware runs
 * *before* the Server Component and is responsible for
 * refreshing the auth token and setting the cookie.
 * - Therefore, this client's main job in a Server Component
 * is to *read* auth status and *fetch data*, not to
 * *write* session updates (which the middleware handles).
 * - This `try...catch` allows the *same* `createClient`
 * function to be used safely in both Server Components
 * (where `setAll` fails) and Server Actions/Route Handlers
 * (where `setAll` succeeds).
 *
 * @example
 * // In a Server Component (e.g., app/protected/page.tsx)
 * import { createClient } from '@/lib/supabase/server'
 *
 * export default async function Page() {
 * const supabase = await createClient()
 * const { data: notes } = await supabase.from('notes').select()
 * // ...
 * }
 *
 * @dependencies
 * - `@supabase/ssr`: For `createServerClient`.
 * - `next/headers`: For the `cookies()` function.
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Especially important if using Fluid compute: Don't put this client in a
 * global variable. Always create a new client within each function when using
 * it.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
}
