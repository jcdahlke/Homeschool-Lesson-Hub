/**
 * @description
 * A React component that renders a styled "badge" element.
 *
 * @remarks
 * This component is a core part of a UI library (likely shadcn/ui)
 * and uses `class-variance-authority` (CVA) for styling.
 *
 * 1.  **CVA (class-variance-authority):**
 * - It defines `badgeVariants` using `cva` to manage a base set
 * of styles (layout, rounding, font) and several visual
 * variants (`default`, `secondary`, `destructive`, `outline`).
 * - Each variant applies different `border`, `bg` (background),
 * `text`, and `hover` utility classes.
 * 2.  **`cn` Utility:**
 * - The `Badge` component itself uses the `cn` utility to
 * merge the classes from `badgeVariants` with any custom
 * `className` prop provided by the parent component.
 * 3.  **Props (`BadgeProps`):**
 * - The component's props interface extends standard
 * `React.HTMLAttributes<HTMLDivElement>` and the
 * `VariantProps<typeof badgeVariants>`. This allows it
 * to accept all standard `div` props (like `onClick`, `id`)
 * as well as the `variant` prop.
 * 4.  **Exports:**
 * - It exports both the `Badge` component (for use in JSX)
 * and the `badgeVariants` object. Exporting `badgeVariants`
 * is a common pattern, allowing other components to
 * reuse the badge's styles if needed (e.g., applying
 * badge styles to a button).
 *
 * @example
 * // Default badge
 * <Badge>Default</Badge>
 *
 * // Destructive badge
 * <Badge variant="destructive">Destructive</Badge>
 *
 * // Outline badge with custom class
 * <Badge variant="outline" className="mt-2">Outline</Badge>
 *
 * @dependencies
 * - `react`: For component definition.
 * - `class-variance-authority`: For creating style variants.
 * - `@/lib/utils (cn)`: Utility for merging Tailwind classes.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
