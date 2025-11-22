/**
 * @description
 * A React component that renders a warning message indicating that
 * Supabase environment variables are missing.
 *
 * @remarks
 * This component is likely used as a fallback or placeholder when
 * the application detects that the necessary Supabase environment
 * variables (like SUPABASE_URL and SUPABASE_ANON_KEY) are not set.
 *
 * 1.  It displays a `<Badge>` component with the text
 * "Supabase environment variables required".
 * 2.  It also renders "Sign in" and "Sign up" buttons.
 * 3.  Crucially, these buttons are `disabled`, visually communicating
 * to the user (likely a developer running the app) that
 * authentication is not functional because of the missing configuration.
 *
 * @example
 * // Used conditionally, perhaps in place of <AuthButton />
 * // if env vars are not present.
 * <EnvVarWarning />
 *
 * @dependencies
 * - `./ui/badge`: A custom Badge component (likely from shadcn/ui).
 * - `./ui/button`: A custom Button component (likely from shadcn/ui).
 */

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";


export function EnvVarWarning() {
  return (
    <div className="flex gap-4 items-center">
      <Badge variant={"outline"} className="font-normal">
        Supabase environment variables required
      </Badge>
      <div className="flex gap-2">
        <Button size="sm" variant={"outline"} disabled>
          Sign in
        </Button>
        <Button size="sm" variant={"default"} disabled>
          Sign up
        </Button>
      </div>
    </div>
  );
}
