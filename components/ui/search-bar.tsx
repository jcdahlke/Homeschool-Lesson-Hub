// "use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { Search } from "lucide-react";
// import { FormEvent, useEffect } from "react";

// type Props = {
//   className?: string;
// };

// export function SearchBar({ className }: Props) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     if (searchParams?.has("q")) {
//       const params = new URLSearchParams(searchParams.toString());
//       params.delete("q");
//       router.replace(`${pathname}?${params.toString()}`);
//     }
//   }, [pathname, router, searchParams]);

//   // Hide on login / signup pages
//   const hiddenRoutes = ["/auth/login", "/auth/sign-up"];
//   if (pathname && hiddenRoutes.includes(pathname)) {
//     return null;
//   }

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const q = String(formData.get("q") || "").trim();

//     // Example: keep user on the same page and just set ?q=
//     const params = new URLSearchParams(searchParams?.toString());
//     if (q) params.set("q", q);
//     else params.delete("q");

//     router.push(`${pathname}?${params.toString()}`);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className={cn(
//         "flex w-full max-w-xl items-center rounded-md border bg-background px-4 py-2 shadow-sm",
//         className
//       )}
//     >
//       <Search className="mr-2 h-4 w-4 text-muted-foreground" />
//       <input
//         name="q"
//         defaultValue={searchParams?.get("q") ?? ""}
//         className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
//         placeholder="Search..."
//       />
//     </form>
//   );
// }


"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { FormEvent, useEffect, Suspense } from "react";

type Props = {
  className?: string;
};

// 1. We move the logic into a non-exported "Content" component
function SearchBarContent({ className }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Hide on login / signup pages
  // We check this early to avoid running effects if not needed
  const hiddenRoutes = ["/auth/login", "/auth/sign-up"];
  if (pathname && hiddenRoutes.includes(pathname)) {
    return null;
  }

  // NOTE: This effect clears the 'q' param immediately on load. 
  // Ensure this is intended behavior, as it might clear your search results 
  // as soon as they appear.
  useEffect(() => {
    if (searchParams?.has("q")) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("q");
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [pathname, router, searchParams]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = String(formData.get("q") || "").trim();

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

// 2. We export this wrapper component
export function SearchBar(props: Props) {
  return (
    // The Suspense boundary tells Next.js: "If the search params aren't ready
    // (like during static generation of the 404 page), just render the fallback 
    // instead of crashing."
    <Suspense fallback={<div className="w-full max-w-xl h-10" />}>
      <SearchBarContent {...props} />
    </Suspense>
  );
}