"use client";

import { useRouter, useSearchParams } from "next/navigation";

const FILTERS = ["New", "Interactive", "Video", "Analogy"];

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || "New";

  const handleFilterClick = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    if (filter === "New") {
      params.delete("filter"); // Clean URL for default
    } else {
      params.set("filter", filter);
    }
    router.push(`/?${params.toString()}`); // Update URL, triggers server refresh
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