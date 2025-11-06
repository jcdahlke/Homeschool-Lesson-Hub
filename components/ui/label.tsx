/**
 * @description
 * A React Client Component (`"use client"`) that renders a styled,
 * accessible `<label>` element.
 *
 * @remarks
 * This component is built as a wrapper around the
 * `@radix-ui/react-label` primitive and is a core part of
 * a UI library (like shadcn/ui).
 *
 * 1.  **Client Component:** Uses `"use client"` as it's a
 * fundamental building block for client-side forms.
 * 2.  **Radix UI Primitive:**
 * - It uses `LabelPrimitive.Root` as the base component.
 * Radix's label provides enhanced accessibility,
 * automatically associating with an input when wrapped
 * or when using `htmlFor`.
 * 3.  **Ref Forwarding:** Uses `React.forwardRef` to pass a `ref`
 * prop down to the `LabelPrimitive.Root` element.
 * 4.  **CVA (class-variance-authority):**
 * - It defines `labelVariants` using `cva` to set the
 * base styles for the label.
 * - The styles include `peer-disabled:` utilities, which
 * are a powerful feature. When this label is associated
 * with an input that has the `peer` class, the label
 * will automatically become opaque and get a
 * `cursor-not-allowed` style if the peer input
 * is `disabled`.
 * 5.  **Styling:**
 * - Uses the `cn` utility to merge the classes from
 * `labelVariants()` with any custom `className` prop.
 *
 * @example
 * <div className="grid gap-2">
 * <Label htmlFor="email">Email</Label>
 * <Input id="email" type="email" placeholder="m@example.com" />
 * </div>
 *
 * @dependencies
 * - `react (forwardRef)`: For component definition and ref forwarding.
 * - `@radix-ui/react-label`: For the core accessible
 * label functionality.
 * - `class-variance-authority`: For creating style variants.
 * - `@/lib/utils (cn)`: Utility for merging Tailwind classes.
 */

"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
