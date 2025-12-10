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
import { FormEvent, Suspense } from "react";

type Props = {
  className?: string;
};

// 1. INNER LOGIC
function SearchBarContent({ className }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // REMOVED: The useEffect that cleared the 'q' param.
  // We WANT the 'q' param to stay in the URL so the server knows what to search for.

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = String(formData.get("q") || "").trim();

    // Preserve existing filters while searching
    const params = new URLSearchParams(searchParams?.toString());
    
    if (q) {
      params.set("q", q);
    } else {
      params.delete("q");
    }

    // Reset page to home if on a different page, but keep params
    const targetPath = pathname.startsWith("/lessons/") ? "/" : pathname;
    
    router.push(`${targetPath}?${params.toString()}`);
  };

  const hiddenRoutes = ["/auth/login", "/auth/sign-up"];
  if (pathname && hiddenRoutes.includes(pathname)) {
    return null;
  }

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

// 2. EXPORTED WRAPPER
export function SearchBar(props: Props) {
  return (
    <Suspense fallback={<div className="w-full max-w-xl h-10 bg-muted/20 rounded-md" />}>
      <SearchBarContent {...props} />
    </Suspense>
  );
}