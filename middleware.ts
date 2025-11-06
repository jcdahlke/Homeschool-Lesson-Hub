/**
 * @description
 * The main Next.js middleware entry point for the application.
 *
 * @remarks
 * This file is responsible for intercepting incoming requests
 * and processing them *before* they reach the page or route handler.
 *
 * 1.  **`middleware` function:**
 * - This is the core middleware function.
 * - It imports the `updateSession` utility from
 * `@/lib/supabase/middleware`.
 * - It awaits the `updateSession` function, passing in the
 * `request` object. `updateSession` contains all the
 * complex logic for session refreshing and route
 * protection.
 * - It then returns the `NextResponse` object that
 * `updateSession` provides.
 *
 * 2.  **`config` object:**
 * - This `config` object defines which routes the
 * middleware should run on.
 * - The `matcher` array uses a regular expression to
 * match *all* request paths *except* for:
 * - Static files (`_next/static`)
 * - Image optimization files (`_next/image`)
 * - The `favicon.ico` file
 * - Any files with common image extensions
 * (svg, png, jpg, etc.).
 * - This ensures that the middleware (and thus the
 * session-refresh logic) runs on every page load
 * and API route, but *not* on static asset requests,
 * which improves performance.
 *
 * @dependencies
 * - `next/server (NextRequest)`: For the request type.
 * - `@/lib/supabase/middleware`: For the actual session
 * management logic.
 */

import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
