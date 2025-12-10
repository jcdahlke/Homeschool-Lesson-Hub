"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LogoutButton } from "../auth/logout-button";

const items = [
  { href: "/profile", label: "Update Profile" },
  { href: "/profile/password", label: "Update Password" },
  { href: "/profile/delete", label: "Delete Account" },
];

export function ProfileSideMenu() {
  const pathname = usePathname();

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
            {items.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/profile" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left",
                    isActive
                      ? "bg-brandGreen/10 font-medium text-brandGreen"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <LogoutButton
              className="
                mt-3 flex w-full justify-start
                rounded-md px-3 py-2 text-left text-sm
                text-red-600 bg-white
                hover:bg-red-50
                shadow-none
              "
            />
          </nav>
        </CardContent>
      </Card>
    </aside>
  );
}
