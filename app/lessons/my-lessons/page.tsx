import { createClient } from "@/utils/supabase/server";
import { PageRow } from "@/components/layout/page-row";
import { SideMenu } from "@/components/layout/side-menu";
import { UserLessonFeed } from "@/components/layout/user-lesson-feed";
import { UserInfoSidebar } from "@/components/layout/user-info-sidebar";
import { redirect } from "next/navigation";

// Next.js 15: searchParams is a Promise
interface MyLessonsPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function MyLessonsPage(props: MyLessonsPageProps) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  if (!user) {
    redirect("/auth/login");
  }

  const { data: appUser } = await supabase
    .from("app_user")
    .select("user_id, username, profile_image")
    .eq("supabase_id", user.id)
    .single();

  let lessonsCount = 0;

  if (appUser) {
    const { count } = await supabase
      .from("lesson")
      .select("*", { count: "exact", head: true })
      .eq("author_id", appUser.user_id);

    lessonsCount = count || 0;
  }

  return (
    <PageRow>
      <SideMenu isLoggedIn={!!user} />
      {/* Pass searchParams to the feed */}
      <UserLessonFeed searchParams={searchParams} />

      {appUser && (
        <UserInfoSidebar
          profileData={appUser}
          lessonsCount={lessonsCount}
        />
      )}
    </PageRow>
  );
}
