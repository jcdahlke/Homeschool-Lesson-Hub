import { BookOpen } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

type UserProfileData = {
  user_id: string;
  username: string | null;
  profile_image: string | null;
};

type UserInfoSidebarProps = {
  profileData: UserProfileData;
  lessonsCount: number;
};

export function UserInfoSidebar({ profileData, lessonsCount }: UserInfoSidebarProps) {
  // Username: from profileData, or default
  const rawUsername = profileData.username ?? "user";

  // Ensure we don't end up with @@something if the user added one manually
  const username = rawUsername.replace(/^@/, "");

  // Avatar: from profileData or branded placeholder
  const avatarUrl = profileData.profile_image || "/images/pfp-default.png";

  const fallbackInitial =
    username && username.length > 0
      ? username[0]!.toUpperCase()
      : "U";

  return (
    <aside className="hidden w-72 shrink-0 xl:block">
      <Card className="h-fit">
        <CardContent className="flex flex-col items-center gap-4 py-6">
          {/* Avatar */}
          <Avatar className="h-32 w-32">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback>{fallbackInitial}</AvatarFallback>
          </Avatar>

          {/* Username only */}
          <p className="mt-1 text-base font-semibold">@{username}</p>

          {/* Divider */}
          <div className="h-px w-full bg-muted" />

          {/* Lesson count with pluralization */}
          <div className="flex items-center gap-2 text-sm font-medium text-brandGreen">
            <BookOpen className="h-4 w-4" />
            <span>
              {lessonsCount} {lessonsCount === 1 ? "Lesson" : "Lessons"}
            </span>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
