/**
 * Site header, keeps consistent header for all pages
 *
 */

import { hasEnvVars } from "@/lib/utils";
import { AuthButton } from "../auth/auth-button";
import { Logo } from "../branding/logo";
import { SearchBar } from "../ui/search-bar";
import { EnvVarWarning } from "../shared/env-var-warning";

export function Header() {
  return (
    <nav className="w-full flex border-b">
      <div className="relative flex justify-between items-center h-16 mx-auto lg:container lg:px-16 xl:px-20">
        <Logo />
        <SearchBar className="flex-1 max-w-xl" />
      </div>
      <div className="relative flex justify-end items-center h-16 mx-auto lg:container lg:px-16 xl:px-20">
        {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
      </div>
    </nav>
  );
}
