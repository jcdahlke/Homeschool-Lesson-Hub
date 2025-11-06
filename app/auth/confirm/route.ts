/**
 * @description
 * A Next.js App Router Route Handler (GET) that processes
 * authentication callbacks from Supabase.
 *
 * @remarks
 * This server-side route is the destination for magic links and
 * email confirmation links sent by Supabase Auth.
 *
 * 1.  **Purpose:** This handler is triggered when a user clicks
 * a link in an auth-related email (e.g., email confirmation,
 * password reset, magic link login).
 *
 * 2.  **Workflow:**
 * - It expects `token_hash` and `type` as URL search
 * parameters.
 * - It initializes the *server-side* Supabase client.
 * - It calls `supabase.auth.verifyOtp` to validate the
 * provided token and type.
 *
 * 3.  **Redirects (Success):**
 * - If `verifyOtp` is successful (no error), Supabase's
 * response automatically sets the auth cookie for the user.
 * - The handler then redirects the user to the `next`
 * parameter (if provided) or to the app's root (`/`).
 *
 * 4.  **Redirects (Failure):**
 * - If `token_hash` or `type` are missing, it redirects
 * to `/auth/error`.
 * - If `verifyOtp` returns an error (e.g., token
 * expired, invalid), it redirects to `/auth/error`
 * and includes the error message as a search parameter.
 *
 * @example
 * // This file would be placed at:
 * // `app/auth/callback/route.ts`
 *
 * // A user would click a link like:
 * // https://[your-domain]/auth/callback?token_hash=...&type=signup
 *
 * @dependencies
 * - `next/server (NextRequest)`: For handling the GET request.
 * - `next/navigation (redirect)`: For server-side redirects.
 * - `@/lib/supabase/server`: The server-side Supabase client.
 * - `@supabase/supabase-js`: For the `EmailOtpType`.
 */

import { createClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      // redirect user to specified redirect URL or root of app
      redirect(next);
    } else {
      // redirect the user to an error page with some instructions
      redirect(`/auth/error?error=${error?.message}`);
    }
  }

  // redirect the user to an error page with some instructions
  redirect(`/auth/error?error=No token hash or type`);
}
