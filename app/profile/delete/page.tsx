import { PageRow } from "@/components/layout/page-row";
import { ProfileSideMenu } from "@/components/layout/profile-side-menu";
import { DeleteAccount } from "@/components/profile/delete-account";

export default function DeleteAccountPage() {
  return (
    <PageRow>
      <ProfileSideMenu />
      <DeleteAccount />
      <div className="hidden w-72 shrink-0 xl:block space-y-4">
        TODO: Joey, the details here are optional and do not currently define how
      we handle deletes. It is filler information that I copied from
      StackOverflow. If there is anything too complicated to implement, remove
      it :)
      </div>
    </PageRow>
  );
}
