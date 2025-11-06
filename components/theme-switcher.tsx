/**
 * @description
 * A React Client Component (`"use client"`) that provides a dropdown
 * menu for switching the application's theme (light, dark, or system).
 *
 * @remarks
 * This component is designed to work with `next-themes`.
 *
 * 1.  **Client Component:** Uses `"use client"` to leverage React
 * hooks like `useState`, `useEffect`, and the `useTheme` hook.
 * 2.  **Hydration Mismatch Prevention:**
 * - It uses a `mounted` state, initialized to `false`.
 * - A `useEffect` hook sets `mounted` to `true` only on the
 * client side, after the component has mounted.
 * - It returns `null` if `!mounted`. This is a crucial step
 * to prevent a hydration mismatch error, as the `theme`
 * from `useTheme` might be different on the server (default)
 * versus the client (from localStorage).
 * 3.  **Hooks:**
 * - `useTheme`: From `next-themes`, this hook provides the
 * current `theme` and the `setTheme` function.
 * 4.  **UI Components:**
 * - It uses `DropdownMenu` components from `@/components/ui`
 * (likely shadcn/ui) to build the switcher.
 * - The `DropdownMenuTrigger` is a `Button` that displays
 * an icon (`Sun`, `Moon`, or `Laptop` from `lucide-react`)
 * corresponding to the currently active theme.
 * - The `DropdownMenuContent` contains a `DropdownMenuRadioGroup`
 * bound to the `theme` value, allowing the user to select
 * a new theme.
 *
 * @example
 * // Placed in the site header or footer.
 * <ThemeSwitcher />
 *
 * @dependencies
 * - `react (useState, useEffect)`: For client-side state and effects.
 * - `next-themes (useTheme)`: For theme context and control.
 * - `lucide-react`: For icons (Sun, Moon, Laptop).
 * - `@/components/ui/*`: shadcn/ui components for the
 * dropdown menu and button.
 */

"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 16;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"sm"}>
          {theme === "light" ? (
            <Sun
              key="light"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
            />
          ) : theme === "dark" ? (
            <Moon
              key="dark"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
            />
          ) : (
            <Laptop
              key="system"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-content" align="start">
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(e) => setTheme(e)}
        >
          <DropdownMenuRadioItem className="flex gap-2" value="light">
            <Sun size={ICON_SIZE} className="text-muted-foreground" />{" "}
            <span>Light</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2" value="dark">
            <Moon size={ICON_SIZE} className="text-muted-foreground" />{" "}
            <span>Dark</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2" value="system">
            <Laptop size={ICON_SIZE} className="text-muted-foreground" />{" "}
            <span>System</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ThemeSwitcher };
