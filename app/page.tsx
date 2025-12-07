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

import { AdMenu } from "@/components/layout/ad-sidebar";
import { LessonFeed } from "@/components/layout/lesson-feed";
import { PageRow } from "@/components/layout/page-row";
import { SideMenu } from "@/components/layout/side-menu";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  return (
    <PageRow>
      <SideMenu isLoggedIn={!!user} />
      <LessonFeed />
      <AdMenu />
    </PageRow>
  );
}
