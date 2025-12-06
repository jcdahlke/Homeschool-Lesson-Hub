import { PageRow } from "@/components/layout/page-row";
import { ProfileSideMenu } from "@/components/layout/profile-side-menu";
import { UpdateProfile } from "@/components/profile/update-profile";

export default function ProfilePage() {
  return (
    <PageRow>
      <ProfileSideMenu />
      <UpdateProfile />
      <div className="hidden w-72 shrink-0 xl:block space-y-4" />
    </PageRow>
  );
}
