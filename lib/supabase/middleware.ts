/**
 * @description
 * A Next.js middleware utility function responsible for session management
 * and route protection using Supabase.
 *
 * @remarks
 * This function is intended to be imported and 'awaited' inside the
 * main `middleware.ts` file for the Next.js application.
 *
 * 1.  **Purpose:** Its primary job is to refresh the user's Supabase
 * session cookie on every request and protect routes.
 *
 * 2.  **Supabase SSR Client:**
 * - It initializes a *server-side* Supabase client using
 * `createServerClient` from `@supabase/ssr`.
 * - **Crucially:** It's configured with a custom cookie handler
 * (`getAll`, `setAll`) that allows Supabase to read
 * cookies from the incoming `NextRequest` and write
 * `Set-Cookie` headers to the outgoing `NextResponse`.
 *
 * 3.  **Session Refresh (The "Magic"):**
 * - The `await supabase.auth.getClaims()` line is the most
 * important part. This call *always* runs and performs
 * a check on the user's auth token.
 * - If the token is expired but a valid refresh token
 * exists, Supabase will *automatically* refresh the token.
 * - When it does, the `setAll` function in the cookie
 * handler is triggered, which writes the *new* auth
 * token to the `supabaseResponse` via `Set-Cookie` headers.
 *
 * 4.  **Route Protection:**
 * - After refreshing the session, it checks if a user exists.
 * - If `!user` and the user is trying to access a protected
 * page (i.e., not `/`, `/auth/*`, or `/login`), it
 * redirects them to `/auth/login`.
 *
 * 5.  **Env Var Guard:**
 * - It includes the `hasEnvVars` check as a "tutorial-only"
 * guard clause, which skips all auth logic if env vars
 * are not set.
 *
 * 6.  **Return Value:**
 * - It *must* return the `supabaseResponse` object. This
 * response object (which was initialized at the start)
 * now contains any `Set-Cookie` headers from Supabase,
 * ensuring the user's session remains in sync.
 *
 * @example
 * // In `middleware.ts` (e.g., at the root of /app or /src)
 *
 * import { updateSession } from '@/lib/supabase/middleware'
 * import { type NextRequest } from 'next/server'
 *
 * export async function middleware(request: NextRequest) {
 * return await updateSession(request)
 * }
 *
 * export const config = {
 * matcher: [
 * // Match all routes except for static assets
 * '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
 * ],
 * }
 *
 * @dependencies
 * - `@supabase/ssr`: For `createServerClient`.
 * - `next/server`: For `NextResponse` and `NextRequest` types.
 * - `../utils (hasEnvVars)`: For the tutorial guard clause.
 */

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasEnvVars } from "../utils";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // If the env vars are not set, skip middleware check. You can remove this
  // once you setup the project.
  if (!hasEnvVars) {
    return supabaseResponse;
  }

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  const pathname = request.nextUrl.pathname;

  // Only these routes require auth:
  const protectedPaths = [
    "/lessons/create",
    // "/lessons/edit",
    "/profile",
    // add more as needed
  ];

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
