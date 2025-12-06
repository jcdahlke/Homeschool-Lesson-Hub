import { cn } from "@/lib/utils";

interface PageRowProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}

export function PageRow({ children, className, innerClassName }: PageRowProps) {
  return (
    <main className={cn("flex-1 bg-muted/40 flex", className)}>
      <div
        className={cn(
          "mx-auto flex w-full max-w-full gap-6 px-4 py-6 lg:px-8 flex-1",
          innerClassName
        )}
      >
        {children}
      </div>
    </main>
  );
}