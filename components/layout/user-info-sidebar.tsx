import { BookOpen } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import type { User } from "@supabase/supabase-js";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

type UserInfoSidebarProps = {
  user: User;
  lessonsCount: number;
  // New prop to accept the database profile data
  profileData?: {
    username: string | null;
    profile_image: string | null;
  } | null;
};

export function UserInfoSidebar({
  user,
  lessonsCount,
  profileData,
}: UserInfoSidebarProps) {
  // 1. Determine Username: Prefer DB > Auth Metadata > Email > Default
  const dbUsername = profileData?.username;
  const authUsername =
    (user.user_metadata as any)?.username ||
    user.email?.split("@")[0] ||
    "user";

  // Use the database username if available, otherwise fall back
  const rawUsername = (dbUsername || authUsername) ?? "user";

  // Ensure we don't end up with @@something if the user added one manually
  const username = rawUsername.replace(/^@/, "");

  // 2. Determine Avatar: Prefer DB > Auth Metadata > Default
  const dbAvatar = profileData?.profile_image;
  const authAvatar = (user.user_metadata as any)?.avatar_url;

  // Use DB image first, then auth image, then branded placeholder
  const avatarUrl =
    dbAvatar || authAvatar || "/images/pfp-bjgraves.png";

  return (
    <aside className="hidden w-72 shrink-0 xl:block">
      <Card className="h-fit">
        <CardContent className="flex flex-col items-center gap-4 py-6">
          {/* Avatar */}
          <Avatar className="h-32 w-32">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback>{username[0]?.toUpperCase()}</AvatarFallback>
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
