import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { PageRow } from "@/components/layout/page-row";
import { ProfileSideMenu } from "@/components/layout/profile-side-menu";
import { UpdateProfile } from "@/components/profile/update-profile";

export default async function ProfilePage() {
  const supabase = await createClient();

  // 1. Get the authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  // 2. Fetch the profile data from your 'app_user' table
  const { data: userProfile, error: profileError } = await supabase
    .from("app_user")
    .select("full_name, username, bio, profile_image")
    .eq("supabase_id", user.id)
    .single();

  return (
    <PageRow>
      <ProfileSideMenu />
      {/* 3. Pass the fetched data to your friend's component */}
      <UpdateProfile initialData={userProfile} />
      <div className="hidden w-72 shrink-0 xl:block space-y-4" />
    </PageRow>
  );
}
