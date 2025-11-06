/**
 * @description
 * A React Client Component (`"use client"`) that renders a
 * simple button to log the user out.
 *
 * @remarks
 * This component handles the client-side logic for signing a
 * user out.
 *
 * 1.  **Client Component:** Uses `"use client"` to leverage
 * React hooks (`useRouter`).
 * 2.  **Hooks:**
 * - `useRouter`: From `next/navigation`, used to
 * programmatically redirect the user after logout.
 * 3.  **Logout Function (`logout`):**
 * - This `async` function is triggered by the button's
 * `onClick` event.
 * - It initializes the *client-side* Supabase client.
 * - It calls `supabase.auth.signOut()` to clear the
 * user's session and local auth tokens.
 * - After sign-out, it redirects the user to the
 * `/auth/login` page.
 *
 * @example
 * // Used inside the <AuthButton /> component when a user
 * // is logged in.
 * <LogoutButton />
 *
 * @dependencies
 * - `next/navigation (useRouter)`: For programmatic navigation.
 * - `@/lib/supabase/client`: The client-side Supabase client factory.
 * - `@/components/ui/button`: A custom Button component.
 */

"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return <Button onClick={logout}>Logout</Button>;
}
