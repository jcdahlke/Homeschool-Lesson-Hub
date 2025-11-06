/**
 * @description
 * A React component that renders a styled text input field.
 *
 * @remarks
 * This is a fundamental UI component, often part of a library
 * like shadcn/ui.
 *
 * 1.  **Ref Forwarding:**
 * - It uses `React.forwardRef` to allow a `ref` prop to be
 * passed down to the native `<input>` element. This is
 * essential for form libraries (like `react-hook-form`)
 * that need direct access to the input DOM node.
 *
 * 2.  **Styling:**
 * - It uses the `cn` utility to merge a set of base
 * Tailwind CSS classes with any custom `className`
 * prop provided by the parent.
 * - The base styles define the input's height, width,
 * border, background, padding, and transitions.
 * - It includes styles for `placeholder`, `focus-visible`,
 * `file:` input types, and `disabled` states.
 *
 * 3.  **Props:**
 * - It accepts all standard props for an `<input>` element,
 * including `type`, `placeholder`, `value`, `onChange`, etc.
 *
 * @example
 * <Input type="email" placeholder="Email" />
 * <Input type="password" placeholder="Password" />
 *
 * @dependencies
 * - `react (forwardRef)`: For component definition and ref forwarding.
 * - `@/lib/utils (cn)`: Utility for merging Tailwind classes.
 */

import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
