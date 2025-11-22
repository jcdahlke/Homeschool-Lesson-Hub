import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <div className="flex items-center gap-4">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Homeschool Lesson Hub Logo" width={225} height={225} />
      </Link>
    </div>
  );
}
