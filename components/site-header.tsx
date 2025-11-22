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
    <nav className="w-full flex border-b">
      <div
        className="
          relative flex justify-between items-center
          h-16
          mx-auto
          lg:container
          lg:px-16
          xl:px-20"
      >
        <Logo />
      </div>
      <div className="
          relative flex justify-end items-center
          h-16
          mx-auto
          lg:container
          lg:px-16
          xl:px-20">
        {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
      </div>
    </nav>
  );
}
