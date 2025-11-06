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

import { SignUpForm } from "@/components/sign-up-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}
