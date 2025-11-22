"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { FormEvent } from "react";

type Props = {
  className?: string;
};

export function SearchBar({ className }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Hide on login / signup pages
  const hiddenRoutes = ["/auth/login", "/auth/sign-up"];
  if (pathname && hiddenRoutes.includes(pathname)) {
    return null;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = String(formData.get("q") || "").trim();

    // Example: keep user on the same page and just set ?q=
    const params = new URLSearchParams(searchParams?.toString());
    if (q) params.set("q", q);
    else params.delete("q");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex w-full max-w-xl items-center rounded-md border bg-background px-4 py-2 shadow-sm",
        className
      )}
    >
      <Search className="mr-2 h-4 w-4 text-muted-foreground" />
      <input
        name="q"
        defaultValue={searchParams?.get("q") ?? ""}
        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        placeholder="Search..."
      />
    </form>
  );
}
