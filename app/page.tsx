/**
 * app/page.tsx
 * 
 * @description
 * The main homepage component for the Next.js application. 
 * Has layout: SideMenu, LessonFeed, AdMenu. 
 * 
 * @remarks
 * Structured and interactive user interface.
 * 
 * @dependencies
 * - `@/components/layout/AdMenu`: For displaying advertisements.
 * - `@/components/layout/LessonFeed`: For displaying the lesson feed.
 * - `@/components/layout/SideMenu`: For displaying the side navigation menu.
 */

import { AdMenu } from "@/components/layout/AdMenu";
import { LessonFeed } from "@/components/layout/LessonFeed";
import { SideMenu } from "@/components/layout/SideMenu";

export default function HomePage() {
  return (
    <main className="bg-muted/40">
      <div className="mx-auto flex w-full max-w-full gap-6 px-4 py-6 lg:px-8">
        <SideMenu />
        <LessonFeed />
        <AdMenu />
      </div>
    </main>
  );
}
