/**
 * @description
 * An asynchronous React Server Component (RSC) designed to
 * display authentication-related errors.
 *
 * @remarks
 * This page is likely used as a redirect target when an
 * authentication provider (like Supabase) encounters an error
 * and passes the error details as a URL search parameter.
 *
 * 1.  **Async Server Component:** This is an `async` component,
 * allowing it to `await` the `searchParams` prop, which
 * Next.js provides as a Promise.
 * 2.  **Search Parameters:**
 * - It's typed to receive `searchParams`, which it
 * expects to contain an `error` string.
 * - `const params = await searchParams;` resolves the
 * promise to access the URL parameters.
 * 3.  **Conditional Rendering:**
 * - It renders a `<Card>` component to display the error.
 * - If `params.error` exists, it displays the specific
 * error message (e.g., "Code error: [message]").
 * - If no `error` param is found, it displays a generic
 * "An unspecified error occurred" message.
 *
 * @example
 * // This component would be placed at a route like
 * // `app/auth/error/page.tsx`.
 *
 * @dependencies
 * - `@/components/ui/card`: For UI layout (Card,
 * CardHeader, CardTitle, CardContent).
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Sorry, something went wrong.
              </CardTitle>
            </CardHeader>
            <CardContent>
              {params?.error ? (
                <p className="text-sm text-muted-foreground">
                  Code error: {params.error}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  An unspecified error occurred.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
