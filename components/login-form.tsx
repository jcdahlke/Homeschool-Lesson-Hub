/**
 * @description
 * A React Client Component (`"use client"`) that renders a complete
 * login form for email and password authentication.
 *
 * @remarks
 * This component manages all the necessary state for a user login flow.
 *
 * 1.  **Client Component:** Uses `"use client"` to leverage React hooks
 * like `useState` and `useRouter`.
 * 2.  **State Management:** Manages local state for:
 * - `email`: The user's email input.
 * - `password`: The user's password input.
 * - `error`: Any error message from Supabase.
 * - `isLoading`: A boolean to disable the form during submission.
 * 3.  **Hooks:**
 * - `useRouter`: From `next/navigation`, used to programmatically
 * redirect the user after a successful login.
 * 4.  **Form Submission (`handleLogin`):**
 * - Initializes the *client-side* Supabase client.
 * - Calls `supabase.auth.signInWithPassword` with the email and password.
 * - On success, it redirects the user to the `/protected` route.
 * - On failure, it catches the error and displays it to the user.
 * 5.  **Navigation Links:**
 * - Includes a `Link` to `/auth/forgot-password`.
 * - Includes a `Link` to `/auth/sign-up` for new users.
 *
 * @example
 * // Placed on the /auth/login page.
 * <LoginForm />
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

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
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
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
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
                  <Link
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/sign-up"
                className="underline underline-offset-4"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
