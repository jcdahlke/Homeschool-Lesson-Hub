import Link from "next/link";
import { notFound } from "next/navigation";
import { PageRow } from "@/components/layout/page-row";
import { SideMenu } from "@/components/layout/side-menu";
import { AdMenu } from "@/components/layout/ad-sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { getLessonById } from "../actions";

type LessonPageProps = {
  // Next.js 15: params is a Promise now
  params: Promise<{ lessonId: string }>;
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function LessonPage(props: LessonPageProps) {
  // ✅ unwrap the params Promise
  const { lessonId } = await props.params;

  if (!lessonId) {
    notFound();
  }

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  // lessonId will now be a real string like "27", not undefined
  const lesson = await getLessonById(lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <PageRow>
      <SideMenu isLoggedIn={!!user} />

      <main className="flex-1 px-6 py-8 space-y-6">
        {/* Back link */}
        <div>
          <Link
            href="/"
            className="text-sm font-medium text-brandGreen hover:underline"
          >
            ← Back to lessons
          </Link>
        </div>

        {/* Lesson card */}
        <Card className="shadow-sm">
          <CardContent className="py-6 space-y-6">
            {/* Header: author + meta */}
            <div className="flex items-start gap-3">
              <img
                src={
                  lesson.author?.profile_image || "/default-profile-picture.png"
                }
                alt={lesson.author?.username || "User"}
                className="h-10 w-10 flex-shrink-0 rounded-full object-cover bg-muted border"
              />

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="text-xs text-muted-foreground">
                    <div className="font-medium text-sm text-foreground">
                      @{lesson.author?.username || "Unknown Author"}
                    </div>
                    <div>{formatDate(lesson.created_at)}</div>
                  </div>

                  <div className="rounded bg-muted px-2 py-1 text-[10px] uppercase font-bold text-muted-foreground">
                    {lesson.lesson_type?.replace("_lesson", "")}
                  </div>
                </div>

                {/* Topics */}
                {lesson.lesson_topic?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {lesson.lesson_topic.map((lt: any) => (
                      <span
                        key={lt.topic.topic_name}
                        className="rounded-full bg-brandGreen/10 px-2 py-0.5 text-[11px] font-medium text-brandGreen"
                      >
                        {lt.topic.topic_name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Title + description */}
            <div className="space-y-2">
              <h1 className="text-xl font-semibold">{lesson.title}</h1>
              <p className="text-sm text-muted-foreground">
                {lesson.description}
              </p>
            </div>

            {/* Meta chips (age range, subjects) */}
            <div className="flex flex-wrap gap-2 text-xs">
              {lesson.age_range && (
                <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                  Age range: {lesson.age_range}
                </span>
              )}

              {Array.isArray(lesson.subjects) &&
                lesson.subjects.map((subject: string) => (
                  <span
                    key={subject}
                    className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground"
                  >
                    {subject}
                  </span>
                ))}
            </div>

            {/* Type-specific blocks (you can tweak to your schema) */}
            {lesson.lesson_type === "analogy_lesson" &&
              lesson.analogy_lesson?.[0]?.comparison_object && (
                <div className="rounded-md bg-muted p-3 text-xs">
                  <p className="font-semibold text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                    Analogy comparison object
                  </p>
                  <p className="text-sm text-foreground">
                    {lesson.analogy_lesson[0].comparison_object}
                  </p>
                </div>
              )}

            {lesson.lesson_type === "video_lesson" &&
              lesson.video_lesson?.[0]?.video_url && (
                <div className="space-y-2">
                  <p className="font-semibold text-[11px] uppercase tracking-wide text-muted-foreground">
                    Video
                  </p>
                  <a
                    href={lesson.video_lesson[0].video_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex text-sm font-medium text-brandGreen hover:underline"
                  >
                    Watch video lesson
                  </a>
                </div>
              )}

            {lesson.lesson_type === "interactive_lesson" &&
              lesson.interactive_lesson?.[0]?.instructions && (
                <div className="space-y-2">
                  <p className="font-semibold text-[11px] uppercase tracking-wide text-muted-foreground">
                    Interactive instructions
                  </p>
                  <p className="text-sm whitespace-pre-wrap">
                    {lesson.interactive_lesson[0].instructions}
                  </p>
                </div>
              )}

            {/* Lesson plan */}
            {lesson.lesson_plan && (
              <div className="space-y-2">
                <p className="font-semibold text-[11px] uppercase tracking-wide text-muted-foreground">
                  Lesson plan
                </p>
                <div className="rounded-md border bg-background px-4 py-3">
                  <p className="whitespace-pre-wrap text-sm text-foreground">
                    {lesson.lesson_plan}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <AdMenu />
    </PageRow>
  );
}
