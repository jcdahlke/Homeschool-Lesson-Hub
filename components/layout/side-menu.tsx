"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

type SideMenuProps = {
  isLoggedIn?: boolean;
};

export function SideMenu({ isLoggedIn = false }: SideMenuProps) {
  const pathname = usePathname();

  const isLessons = pathname === "/";
  const isMyLessons = pathname.startsWith("/lessons/my-lessons");

  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <Card className="h-full">
        <CardHeader className="border-b py-3">
          <CardTitle className="text-xs font-semibold tracking-widest text-muted-foreground">
            MENU
          </CardTitle>
        </CardHeader>

        <CardContent className="p-3 pt-3">
          <nav className="space-y-1 text-sm">
            
            {/* Lessons */}
            <Link
              href="/"
              className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left font-medium ${
                isLessons
                  ? "bg-brandGreen/10 text-brandGreen"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              Lessons
            </Link>

            {/* My Lessons */}
            {isLoggedIn && (
              <Link
                href="/lessons/my-lessons"
                className={`flex w-full rounded-md px-3 py-2 text-left ${
                  isMyLessons
                    ? "bg-brandGreen/10 text-brandGreen font-medium"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                My Lessons
              </Link>
            )}

          </nav>
        </CardContent>
      </Card>
    </aside>
  );
}
