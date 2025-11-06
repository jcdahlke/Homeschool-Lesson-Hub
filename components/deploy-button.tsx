/**
 * @description
 * A React component that renders a "Deploy to Vercel" button.
 *
 * @remarks
 * This component provides a one-click deployment link for Vercel.
 *
 * 1.  It uses the Next.js `Link` component to create a hyperlink.
 * 2.  The `href` attribute contains a specially crafted URL for
 * `vercel.com/new/clone`. This URL includes query parameters
 * that pre-configure the Vercel deployment wizard with
 * the source repository, project name, and other demo details.
 * 3.  The link is styled as a Button component (`./ui/button`).
 * 4.  It includes an inline SVG that renders the Vercel logo (a triangle).
 * 5.  `target="_blank"` ensures the link opens in a new browser tab.
 *
 * @example
 * // Used in a component (e.g., a footer or admin page)
 * <DeployButton />
 *
 * @dependencies
 * - `next/link`: For client-side navigation.
 * - `./ui/button`: A custom Button component (likely from shadcn/ui).
 */

import Link from "next/link";
import { Button } from "./ui/button";

export function DeployButton() {
  return (
    <>
      <Link
        href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&demo-title=nextjs-with-supabase&demo-description=This+starter+configures+Supabase+Auth+to+use+cookies%2C+making+the+user%27s+session+available+throughout+the+entire+Next.js+app+-+Client+Components%2C+Server+Components%2C+Route+Handlers%2C+Server+Actions+and+Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&demo-image=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png"
        target="_blank"
      >
        <Button className="flex items-center gap-2" size="sm">
          <svg
            className="h-3 w-3"
            viewBox="0 0 76 65"
            fill="hsl(var(--background)/1)"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="inherit" />
          </svg>
          <span>Deploy to Vercel</span>
        </Button>
      </Link>
    </>
  );
}
