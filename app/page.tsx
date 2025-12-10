/**
 * app/page.tsx
 *
 * @description
 * The main homepage component for the Next.js application.
 * Has layout: SideMenu, LessonFeed, AdMenu.
 *
 * @remarks
 * Structured and interactive user interface.
 * Now accepts searchParams to filter the LessonFeed.
 *
 * @dependencies
 * - `@/components/layout/AdMenu`: For displaying advertisements.
 * - `@/components/layout/LessonFeed`: For displaying the lesson feed.
 * - `@/components/layout/SideMenu`: For displaying the side navigation menu.
 */

import { AdMenu } from "@/components/layout/ad-menu";
import { LessonFeed } from "@/components/layout/lesson-feed";
import { PageRow } from "@/components/layout/page-row";
import { SideMenu } from "@/components/layout/side-menu";

// Define the type for the search params
// Next.js 15 Update: searchParams is now a Promise
interface HomePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HomePage(props: HomePageProps) {
  // Await the searchParams before using them
  const searchParams = await props.searchParams;

  return (
    <PageRow>
      <SideMenu />
      {/* Pass the resolved search params down to the feed */}
      <LessonFeed searchParams={searchParams} />
      <AdMenu />
    </PageRow>
  );
}