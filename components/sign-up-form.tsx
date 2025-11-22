/**
 * @description
 * A React Client Component (`"use client"`) that renders a complete
 * sign-up form for new users.
 *
 * @remarks
 * This component manages all the necessary state for a user
 * registration flow.
 *
 * 1.  **Client Component:** Uses `"use client"` to leverage React hooks
 * like `useState` and `useRouter`.
 * 2.  **State Management:** Manages local state for:
 * - `email`: The user's email input.
 * - `password`: The user's password input.
 * - `repeatPassword`: The password confirmation input.
 * - `error`: Any error message (e.g., from validation or Supabase).
 * - `isLoading`: A boolean to disable the form during submission.
 * 3.  **Hooks:**
 * - `useRouter`: From `next/navigation`, used to programmatically
 * redirect the user after a successful sign-up.
 * 4.  **Form Submission (`handleSignUp`):**
 * - Performs local validation to check if `password` and
 * `repeatPassword` match.
 * - Initializes the *client-side* Supabase client.
 * - Calls `supabase.auth.signUp` with the email and password.
 * - Includes an `emailRedirectTo` option, specifying that the
 * confirmation link in the email should send the user to
 * `/protected` after they confirm.
 * - On success (i.e., the sign-up request was sent), it redirects
 * the user to `/auth/sign-up-success` (likely a page that
 * says "Check your email").
 * - On failure, it catches the error and displays it to the user.
 * 5.  **Navigation Links:**
 * - Includes a `Link` to `/auth/login` for users who
 * already have an account.
 *
 * @example
 * // Placed on the /auth/sign-up page.
 * <SignUpForm />
 *
 * @dependencies
 * - `react (useState)`: For managing component-level state.
 * - `next/navigation (useRouter)`: For programmatic navigation.
 * - `next/link`: For declarative navigation links.
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
      router.refresh();
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
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="repeat-password">Repeat Password</Label>
                </div>
                <Input
                  id="repeat-password"
                  type="password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating an account..." : "Sign up"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
