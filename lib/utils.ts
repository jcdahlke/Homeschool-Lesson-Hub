/**
 * @description
 * This file exports utility functions and constants used throughout
 * the application.
 *
 * @remarks
 *
 * 1.  **`cn` (function):**
 * - This is a helper function for conditionally merging
 * Tailwind CSS class names.
 * - It uses `clsx` to handle conditional classes (e.g.,
 * `cn("p-4", { "bg-red-500": hasError })`).
 * - It then pipes the result through `tailwind-merge` (`twMerge`)
 * to intelligently resolve conflicting Tailwind classes
 * (e.g., `cn("p-4", "p-2")` will correctly resolve to just
 * `"p-2"`).
 * - This is a standard utility in shadcn/ui and modern
 * Tailwind projects.
 *
 * 2.  **`hasEnvVars` (constant):**
 * - This is a boolean constant used to check if the
 * essential Supabase environment variables
 * (`NEXT_PUBLIC_SUPABASE_URL` and
 * `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`) are present.
 * - This is used for "tutorial purposes" (as noted in the
 * code comment) to conditionally render UI, such as
* showing a warning (`<EnvVarWarning />`) or the
 * actual authentication flow (`<AuthButton />`).
 *
 * @dependencies
 * - `clsx`: For conditional class name construction.
 * - `tailwind-merge`: For merging/resolving Tailwind class conflicts.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This check can be removed, it is just for tutorial purposes
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
