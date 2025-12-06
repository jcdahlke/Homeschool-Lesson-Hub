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
    <nav className="w-full border-b">
      <div className="mx-auto flex h-16 items-center gap-6 lg:container lg:px-16 xl:px-20">
        <Logo />

        <div className="flex-1 flex justify-center">
          <SearchBar className="w-full max-w-xl" />
        </div>

        {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
      </div>
    </nav>
  );
}
