/**
 * @description
 * A React component that renders a static page to inform the
 * user that their sign-up was successful.
 *
 * @remarks
 * This page is typically shown immediately after a user submits
 * the sign-up form.
 *
 * 1.  **Purpose:** It's a "post-action" confirmation page.
 * Its only job is to inform the user of the next step.
 * 2.  **Layout:** It uses a standard centered layout (flex,
 * `min-h-svh`, `max-w-sm`) to display a `<Card>` component.
 * 3.  **Content:** The card's content explicitly tells the
 * user to "Check your email to confirm" their account. This
 * is a crucial step in a double-opt-in registration flow.
 *
 * @example
 * // This component would be placed at a route like
 * // `app/auth/sign-up-success/page.tsx`.
 *
 * @dependencies
 * - `@/components/ui/card`: For UI layout (Card,
 * CardHeader, CardTitle, CardDescription, CardContent).
 */

import { PageRow } from "@/components/layout/page-row";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <PageRow innerClassName="items-center justify-center">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              Thank you for signing up!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You&apos;ve successfully signed up. Please check your email to
              confirm your account before signing in.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageRow>
  );
}
