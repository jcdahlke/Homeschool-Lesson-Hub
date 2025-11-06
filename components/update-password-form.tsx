/**
 * @description
 * A React Client Component (`"use client"`) that renders a form for
 * a user to set a new password.
 *
 * @remarks
 * This component is intended to be used on a special route
 * (e.g., `/auth/update-password`) that the user visits after
 * clicking a password reset link sent to their email.
 *
 * 1.  **Client Component:** Uses `"use client"` to leverage React
 * hooks (`useState`, `useRouter`).
 * 2.  **State Management:** Manages state for:
 * - `password`: The new password entered by the user.
 * - `error`: Any error message from Supabase.
 * - `isLoading`: A boolean to disable the form during submission.
 * 3.  **Hooks:**
 * - `useRouter`: From `next/navigation`, used to redirect
 * the user after a successful password update.
 * 4.  **Form Submission (`handleForgotPassword` - *Note: function name
 * might be a typo, should likely be `handleUpdatePassword`*):**
 * - Initializes the *client-side* Supabase client.
 * - Calls `supabase.auth.updateUser({ password })`. When
 * the user lands on this page from a valid reset token,
 * Supabase has an active session, allowing this call
 * to securely update the authenticated user's password.
 * - On success, it redirects the user to the `/protected` route.
 * - On failure, it catches and displays the error.
 *
 * @example
 * // Placed on the /auth/update-password page.
 * <UpdatePasswordForm />
 *
 * @dependencies
 * - `react (useState)`: For managing component-level state.
 * - `next/navigation (useRouter)`: For programmatic navigation.
 * - `@/lib/supabase/client`: The client-side Supabase client factory.
 * - `@/lib/utils (cn)`: Utility for merging Tailwind classes.
 * - `@/components/ui/*`: UI components (Card, Button, Input, Label).
 */

"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/protected");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Reset Your Password</CardTitle>
          <CardDescription>
            Please enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleForgotPassword}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">New password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="New password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save new password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
