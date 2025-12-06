import { PageRow } from "@/components/layout/page-row";
import { ProfileSideMenu } from "@/components/layout/profile-side-menu";
import { UpdatePassword } from "@/components/profile/update-password";

export default function PasswordPage() {
  return (
    <PageRow>
      <ProfileSideMenu />
      <UpdatePassword />
      <div className="hidden w-72 shrink-0 xl:block space-y-4" />
    </PageRow>
  );
}
