/**
 * @description
 * A React component that serves as the page route for the
 * user login feature.
 *
 * @remarks
 * This component's primary role is to provide a layout and
 * render the actual form component.
 *
 * 1.  **Layout:** It provides a centered layout, ensuring the
 * content is vertically (`min-h-svh`, `items-center`) and
 * horizontally (`justify-center`) centered on the page.
 * 2.  **Sizing:** It constrains the width of the form area
 * to `max-w-sm` (a small-width container), which is
 * typical for auth forms.
 * 3.  **Composition:** It imports and renders the
 * `<LoginForm />` component, which contains
 * all the logic, state, and UI for the login
 * flow.
 *
 * @example
 * // This component would be placed at a route like
 * // `app/auth/login/page.tsx`.
 *
 * @dependencies
 * - `@/components/login-form`: The actual form
 * component being rendered.
 */


import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#f4f4f4]">
      {/* Left side */}
      <section className="flex flex-1 items-center justify-center px-6 py-10 md:px-16">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold md:text-3xl">
            We’ve Missed You!
          </h1>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            More than 150* lessons are waiting for your next homeschool adventure!
          </p>
          <p className="text-xs text-muted-foreground pt-1">*exaggerated number for dramatic effect</p>

          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </section>

      {/* Right side image */}
      <section className="relative hidden lg:block flex-1">
        <Image
          src="/images/login-hero.jpg"
          alt="Homeschool girl with laptop doing math"
          fill
          className="object-cover"
          priority
        />
      </section>
    </div>
  );
}
