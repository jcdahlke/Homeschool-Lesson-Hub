import Link from "next/link";

export function Logo() {
  return (
    <div className="flex items-center gap-4">
      <Link href="/" className="flex items-center gap-2">
        {/* Put whatever your logo/brand text is here */}
        <span className="text-lg font-bold tracking-tight">
          Homeschool Lesson Hub
        </span>
      </Link>
    </div>
  );
}
