"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const FILTERS = ["New", "Interactive", "Video", "Analogy"];

export function FilterBar() {
  const router = useRouter();
  const pathname = usePathname(); // Get current path (e.g. /lessons/my-lessons)
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || "New";

  const handleFilterClick = (filter: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (filter === "New") {
      params.delete("filter");
    } else {
      params.set("filter", filter);
    }
    // Push to the CURRENT path, not just "/"
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((label) => (
        <button
          key={label}
          onClick={() => handleFilterClick(label)}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
            currentFilter === label
              ? "border-brandGreen bg-brandGreen/10 text-brandGreen"
              : "border-muted-foreground/20 text-muted-foreground hover:bg-muted"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}