import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <span>
      {/* Light-mode logo */}
      <span className="block dark:hidden">
        <LogoLight />
      </span>

      {/* Dark-mode logo */}
      <span className="hidden dark:block">
        <LogoDark />
      </span>
    </span>
  );
}

function LogoLight() {
  return (
    <div className="flex items-center gap-4">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt="Homeschool Lesson Hub Logo"
          width={225}
          height={225}
        />
      </Link>
    </div>
  );
}

function LogoDark() {
  return (
    <div className="flex items-center gap-4">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo-dark.svg"
          alt="Homeschool Lesson Hub Logo"
          width={225}
          height={225}
        />
      </Link>
    </div>
  );
}
