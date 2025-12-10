/**
 * @description
 * An asynchronous React Server Component (RSC) that renders conditional UI
 * elements based on the user's authentication status.
 *
 * @remarks
 * This component operates on the server side ("use server" context is implied
 * by its async nature and server-side Supabase client).
 *
 * // TODO: Update description to match code
 *
 *
 * 1.  It initializes the Supabase server client.
 * 2.  It fetches the user's authentication data (specifically `getClaims()`,
 * which is often faster than `getUser()` as it might read from a JWT).
 * 3.  **Conditional Rendering:**
 * - If a user is found (i.e., `user` is truthy), it displays a
 * personalized welcome message with the user's email.
 * - If no user is found (logged out), it displays "Sign in" and "Sign up"
 * links.
 *
 * @example
 * // Used in a server component (e.g., a header or layout)
 * <AuthButton />
 *
 * @dependencies
 * - `next/link`: For client-side navigation to auth pages.
 * - `./ui/button`: A custom Button component (likely from shadcn/ui).
 * - Uses the `asChild` prop to pass button styling to the `Link` child.
 * - `@/lib/supabase/server`: The server-side Supabase client factory.
 * (likely a client component with an onClick handler).
 */

import Link from "next/link";
import { Button } from "../ui/button";
// Ensure this path matches where you created the file (utils vs lib)
import { createClient } from "@/utils/supabase/server"; 
import { Plus, UserPlus } from "lucide-react";

export async function AuthButton() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const user = data?.user;

  // NOT LOGGED IN
  if (!user) {
    return (
      <div className="flex items-center gap-3">
        {/* Log in */}
        <Button asChild size="md" variant="secondary" className="px-8">
          <Link href="/auth/login">Log in</Link>
        </Button>

        {/* Sign up */}
        <Button
          asChild
          size="md"
          className="px-8 bg-brandGreen hover:bg-brandGreenDark"
        >
          <Link href="/auth/sign-up" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Sign up
          </Link>
        </Button>
      </div>
    );
  }

  // ELSE, LOGGED IN

  // 2. LOGGED IN STATE: Fetch Profile Picture
  let profilePicture = "/default-profile-picture.png";

  // Query the app_user table to get the custom image
  const { data: profile } = await supabase
    .from("app_user")
    .select("profile_image")
    .eq("supabase_id", user.id)
    .single();

  // If they have a custom image, use it
  if (profile?.profile_image) {
    profilePicture = profile.profile_image;
  }

  return (
    <div className="flex items-center gap-6">
      {/* Create Lesson Button */}
      <Button
        asChild
        size="md"
        className="px-8 bg-brandGreen hover:bg-brandGreenDark flex items-center gap-2"
      >
        <Link href="/lessons/create">
          <Plus className="h-4 w-4" />
          Create a Lesson
        </Link>
      </Button>

      {/* Profile Picture Link */}
      <Link href="/profile">
        <img
          src={profilePicture}
          alt="User Profile"
          className="h-12 w-12 rounded-full object-cover border border-gray-200"
        />
      </Link>
    </div>
  );
}
