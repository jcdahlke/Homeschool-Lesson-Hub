/**
 * @description
 * A React component that serves as the page route for the
 * user sign-up feature.
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
 * `<SignUpForm />` component, which contains
 * all the logic, state, and UI for the user registration
 * flow.
 *
 * @example
 * // This component would be placed at a route like
 * // `app/auth/sign-up/page.tsx`.
 *
 * @dependencies
 * - `@/components/sign-up-form`: The actual form
 * component being rendered.
 */

import Image from "next/image";
import { SignUpForm } from "@/components/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#f4f4f4]">
      {/* Left side: copy + form */}
      <section className="flex flex-1 items-center justify-center px-6 py-10 md:px-16">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold md:text-3xl">
            Homeschool Lesson Hub
          </h1>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Get more features and privileges by joining the most helpful
            community.
          </p>

          <div className="mt-8">
            <SignUpForm />
          </div>
        </div>
      </section>

      {/* Right side: hero image */}
      <section className="relative hidden lg:block flex-1">
        <Image
          src="/images/register.jpg" 
          alt="Girl making paper rainbows"
          fill
          className="object-cover"
          priority
        />
      </section>
    </div>
  );
}
