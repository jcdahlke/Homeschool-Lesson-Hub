/**
 * @description
 * A React Client Component (`"use client"`) that renders a styled,
 * accessible checkbox.
 *
 * @remarks
 * This component is built as a wrapper around the
 * `@radix-ui/react-checkbox` primitive components, providing
 * custom styling via Tailwind CSS.
 *
 * 1.  **Client Component:** Uses `"use client"` to leverage React
 * hooks and event handlers.
 * 2.  **Radix UI Primitive:**
 * - It uses `CheckboxPrimitive.Root` as the main clickable
 * checkbox element.
 * - It uses `CheckboxPrimitive.Indicator` to control the
 * visibility of the checkmark.
 * 3.  **Ref Forwarding:** Uses `React.forwardRef` to pass a `ref`
 * prop down to the `CheckboxPrimitive.Root` element,
 * allowing parent components to interact with it.
 * 4.  **Styling:**
 * - Uses the `cn` utility to merge base styles with custom
 * `className` props.
 * - Styles the `Root` element's `data-[state=checked]`
 * attribute to change its appearance when checked
 * (e.g., `bg-primary`).
 * 5.  **Icon:**
 * - Uses the `Check` icon from `lucide-react` inside the
 * `Indicator` to show the checked state.
 *
 * @example
 * <div className="flex items-center space-x-2">
 * <Checkbox id="terms" />
 * <label htmlFor="terms">Accept terms and conditions</label>
 * </div>
 *
 * @dependencies
 * - `react (forwardRef)`: For component definition and ref forwarding.
 * - `@radix-ui/react-checkbox`: For the core accessible
 * checkbox functionality.
 * - `lucide-react`: For the `Check` icon.
 * - `@/lib/utils (cn)`: Utility for merging Tailwind classes.
 */

"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
