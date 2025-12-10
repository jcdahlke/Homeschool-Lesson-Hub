import { getMyLessons } from "@/app/lessons/actions";
import { FilterBar } from "@/components/lesson-feed/filter-bar";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export async function UserLessonFeed({ searchParams }: { searchParams: { filter?: string } }) {
  const filter = searchParams?.filter || "New";
  const lessons = await getMyLessons(filter);

  return (
    <section className="flex-1 space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">My Lessons</h1>
      </div>

      {/* Use the shared FilterBar */}
      <FilterBar />

      <div className="space-y-5">
        {lessons.map((lesson: any) => (
          <Link 
            key={lesson.lesson_id} 
            href={`/lessons/${lesson.lesson_id}`}
            className="block transition-opacity hover:opacity-80"
          >
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="py-6 space-y-6">
                
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-muted border">
                    <img
                      src={lesson.author?.profile_image || "/default-profile-picture.png"}
                      alt="User avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="text-xs text-muted-foreground leading-tight">
                        <div className="font-medium text-sm text-foreground">
                          @{lesson.author?.username}
                        </div>
                        <div>{formatDate(lesson.created_at)}</div>
                      </div>

                      {/* Type Badge */}
                      <div className="rounded bg-muted px-2 py-1 text-[10px] uppercase font-bold text-muted-foreground">
                        {lesson.lesson_type?.replace('_lesson', '')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">{lesson.title}</h2>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {lesson.description}
                  </p>
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-1">
                  {lesson.lesson_topic?.map((lt: any) => (
                    <span
                      key={lt.topic.topic_name}
                      className="rounded-full bg-brandGreen/10 px-2 py-0.5 text-[11px] font-medium text-brandGreen"
                    >
                      {lt.topic.topic_name}
                    </span>
                  ))}
                </div>

              </CardContent>
            </Card>
          </Link>
        ))}

        {lessons.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            You haven't created any {filter !== "New" ? filter : ""} lessons yet.
          </div>
        )}
      </div>
    </section>
  );
}