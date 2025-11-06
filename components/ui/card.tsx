/**
 * @description
 * A set of React components that form a "Card" UI element, built
 * using a compound component pattern.
 *
 * @remarks
 * This file is a common pattern in UI libraries (like shadcn/ui).
 * It exports multiple components that are intended to be nested to
 * build a complete, styled card.
 *
 * 1.  **Compound Components:** It includes `Card`, `CardHeader`,
 * `CardFooter`, `CardTitle`, `CardDescription`, and `CardContent`.
 * These are designed to be used together to structure a card.
 *
 * 2.  **Ref Forwarding:** Each component uses `React.forwardRef`
 * to allow a `ref` prop to be passed down to the underlying
 * `div` element.
 *
 * 3.  **Styling:** Each component uses the `cn` utility to merge
 * a set of base Tailwind CSS classes (e.g., `rounded-xl border`,
 * `p-6`) with any custom `className` prop passed by the parent.
 *
 * @example
 * <Card>
 * <CardHeader>
 * <CardTitle>My Card Title</CardTitle>
 * <CardDescription>My card description.</CardDescription>
 * </CardHeader>
 * <CardContent>
 * <p>The main content of the card.</p>
 * </CardContent>
 * <CardFooter>
 * <Button>View Details</Button>
 * </CardFooter>
 * </Card>
 *
 * @dependencies
 * - `react (forwardRef)`: For component definition and ref forwarding.
 * - `@/lib/utils (cn)`: Utility for merging Tailwind classes.
 */

import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
