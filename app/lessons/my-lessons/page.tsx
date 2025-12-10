import { createClient } from "@/lib/supabase/server";
import { PageRow } from "@/components/layout/page-row";
import { SideMenu } from "@/components/layout/side-menu";
import { UserLessonFeed } from "@/components/layout/user-lesson-feed";
import { UserInfoSidebar } from "@/components/layout/user-info-sidebar";
import { redirect } from "next/navigation";

export default async function MyLessonsPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  if (!user) {
    redirect("/auth/login");
  }

  // TODO: replace with real query
  const lessonsCount = 7;

  return (
    <PageRow>
      <SideMenu isLoggedIn={!!user} />
      <UserLessonFeed />
      <UserInfoSidebar user={user} lessonsCount={lessonsCount} />
    </PageRow>
  );
}
