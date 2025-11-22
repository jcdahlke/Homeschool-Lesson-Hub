/**
 * Site header, keeps consistent header for all pages
 *
 */

import { hasEnvVars } from "@/lib/utils";
import { AuthButton } from "./auth-button";
import { EnvVarWarning } from "./env-var-warning";
import { Logo } from "./site-logo";

export function Header() {
  return (
    <nav className="w-full flex justify-between border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5">
        <Logo />
      </div>
      <div className="w-full flex justify-end p-3 px-5">
        {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
      </div>
    </nav>
  );
}
