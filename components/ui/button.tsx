/**
 * @description
 * A React component that renders a highly versatile and styled button.
 *
 * @remarks
 * This component is a cornerstone of a UI library (likely shadcn/ui)
 * and uses several key patterns:
 *
 * 1.  **CVA (class-variance-authority):**
 * - It defines `buttonVariants` using `cva` to manage a base set
 * of styles (layout, focus, transitions) and a matrix of
 * variants.
 * - `variant`: "default", "destructive", "outline", "secondary",
 * "ghost", "link".
 * - `size`: "default", "sm", "lg", "icon".
 *
 * 2.  **`asChild` Prop & Radix Slot:**
 * - It includes an `asChild` boolean prop.
 * - When `asChild` is `true`, the component renders a
 * `@radix-ui/react-slot` (`Slot`) component instead of a
 * regular `<button>`.
 * - `Slot` merges its props and styles onto its immediate
 * React child. This is a powerful pattern that allows
 * this Button component to wrap other components (like
 * `next/link`) and pass all the button styles and
 * accessibility props to it.
 *
 * 3.  **`cn` Utility:**
 * - Uses the `cn` utility to merge the CVA-generated
 * classes with any custom `className` prop.
 *
 * 4.  **Ref Forwarding:**
 * - Uses `React.forwardRef` to correctly pass a `ref` prop
 * down to the underlying DOM element (`<button>` or the
 * `Slot` child).
 *
 * @example
 * // Standard button
 * <Button>Click me</Button>
 *
 * // Destructive, small button
 * <Button variant="destructive" size="sm">Delete</Button>
 *
 * // Used as a Next.js Link
 * <Button asChild>
 * <Link href="/dashboard">Go to Dashboard</Link>
 * </Button>
 *
 * @dependencies
 * - `react`: For component definition and `forwardRef`.
 * - `@radix-ui/react-slot`: For the `asChild` prop functionality.
 * - `class-variance-authority`: For creating style variants.
 * - `@/lib/utils (cn)`: Utility for merging Tailwind classes.
 */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
