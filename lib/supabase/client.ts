/**
 * @description
 * A factory function for creating a Supabase client instance
 * specifically for use in *client-side* components.
 *
 * @remarks
 * This function is intended to be used within React Client
 * Components (i.e., files marked with `"use client"`).
 *
 * 1.  **Purpose:** It abstracts the creation of the Supabase
 * browser client, ensuring it's always instantiated
 * with the correct environment variables.
 * 2.  **`@supabase/ssr`:** It uses the `createBrowserClient`
 * function from the `@supabase/ssr` package, which is
 * designed to work with Next.js and handle auth
 * storage (like cookies) correctly in a browser environment.
 * 3.  **Environment Variables:**
 * - It reads `NEXT_PUBLIC_SUPABASE_URL` and
 * `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` from
 * `process.env`.
 * - The `!` (non-null assertion operator) is used,
 * implying that the application logic (perhaps in
 * `utils.ts` with `hasEnvVars`) is expected to handle
 * cases where these variables might be missing.
 *
 * @example
 * // In a Client Component (e.g., login-form.tsx)
 * 'use client'
 *
 * import { createClient } from '@/lib/supabase/client'
 *
 * const supabase = createClient();
 * // ... now use supabase.auth.signInWithPassword(...)
 *
 * @dependencies
 * - `@supabase/ssr`: Provides the `createBrowserClient` function.
 */

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
