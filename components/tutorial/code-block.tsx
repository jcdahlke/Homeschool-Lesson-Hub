/**
 * @description
 * A React Client Component (`"use client"`) that renders a
 * formatted block of code with a "copy to clipboard" button.
 *
 * @remarks
 * 1.  **Client Component:** Uses `"use client"` to leverage the
 * `useState` hook for managing the button's icon.
 * 2.  **Local Icons:** Defines `CopyIcon` and `CheckIcon` as
 * self-contained inline SVG components.
 * 3.  **State Management:**
 * - `Icon`: Holds the current icon *component* to display
 * (`CopyIcon` or `CheckIcon`).
 * 4.  **Copy Functionality (`copy`):**
 * - Implements a "copy to clipboard" function.
 * - **NOTE:** Uses `document.execCommand('copy')` via a
 * temporary `<textarea>` element. This method is used
 * for compatibility within iFramed environments, where the
 * modern `navigator.clipboard` API is often restricted.
 * - On successful copy, it provides visual feedback by
 * swapping the icon to `CheckIcon` for 2 seconds,
 * then reverting to `CopyIcon`.
 * 5.  **Layout:**
 * - Renders a `<pre>` tag for the code block.
 * - The `Button` is positioned absolutely in the top-right
 * corner of the `<pre>` block.
 *
 * @example
 * <CodeBlock code={`const hello = "world";`} />
 *
 * @dependencies
 * - `react (useState)`: For state management.
 * - `../ui/button`: Custom Button component.
 */

"use client";

import { useState } from "react";
import { Button } from "../ui/button";

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export function CodeBlock({ code }: { code: string }) {
  const [icon, setIcon] = useState(CopyIcon);

  const copy = async () => {
    await navigator?.clipboard?.writeText(code);
    setIcon(CheckIcon);
    setTimeout(() => setIcon(CopyIcon), 2000);
  };

  return (
    <pre className="bg-muted rounded-md p-6 my-6 relative">
      <Button
        size="icon"
        onClick={copy}
        variant={"outline"}
        className="absolute right-2 top-2"
      >
        {icon}
      </Button>
      <code className="text-xs p-3">{code}</code>
    </pre>
  );
}
