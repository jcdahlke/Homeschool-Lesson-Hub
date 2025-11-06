/**
 * @description
 * A React component that renders a single, checkable step for a
 * tutorial list.
 *
 * @remarks
 * This component is designed to be used as an `<li>` element inside
 * an `<ol>` (as seen in `ConnectSupabaseSteps`, `FetchDataSteps`, etc.).
 *
 * 1.  **Composition:** It wraps its content in an `<li>` tag.
 * 2.  **Core Functionality:**
 * - It uses a `Checkbox` component from `@/components/ui/checkbox`.
 * - The `Checkbox` is given the `peer` class.
 * - The `<label>` (which contains the `title` and `children`)
 * uses the `peer-checked:line-through` utility class.
 * - This creates an effect where clicking the checkbox (the "peer")
 * causes the associated label text to get a line-through,
 * visually "completing" the step.
 * 3.  **Accessibility:** The `<label>` is correctly associated with
 * the `Checkbox` via the `htmlFor` and `id` props, which are
 * both set to the `title`.
 *
 * @param {object} props
 * @param {string} props.title - The title of the tutorial step.
 * Used as the label text and the `id` for the checkbox.
 * @param {React.ReactNode} props.children - The descriptive content
 * or instructions for the step.
 *
 * @example
 * <ol>
 * <TutorialStep title="My First Step">
 * <p>Here is the description for the first step.</p>
 * </TutorialStep>
 * <TutorialStep title="My Second Step">
 * <p>Here is the description for the second step.</p>
 * </TutorialStep>
 * </ol>
 *
 * @dependencies
 * - `../ui/checkbox`: The custom Checkbox component.
 */

import { Checkbox } from "../ui/checkbox";

export function TutorialStep({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="relative">
      <Checkbox
        id={title}
        name={title}
        className={`absolute top-[3px] mr-2 peer`}
      />
      <label
        htmlFor={title}
        className={`relative text-base text-foreground peer-checked:line-through font-medium`}
      >
        <span className="ml-8">{title}</span>
        <div
          className={`ml-8 text-sm peer-checked:line-through font-normal text-muted-foreground`}
        >
          {children}
        </div>
      </label>
    </li>
  );
}
