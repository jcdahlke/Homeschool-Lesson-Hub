import { getLessons } from "@/app/lessons/actions";
import { FilterBar } from "@/components/lesson-feed/filter-bar"; 
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link"; 

// Helper to format dates nicely (e.g., "Oct 24, 2025")
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export async function LessonFeed({ searchParams }: { searchParams: { filter?: string } }) {
  // 1. Fetch the real data based on the URL filter
  const filter = searchParams?.filter || "New";
  const lessons = await getLessons(filter);

  return (
    <section className="flex-1 space-y-4">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Lessons</h1>
      </div>

      {/* Interactive Filter Bar */}
      <FilterBar />

      {/* Lesson List */}
      <div className="space-y-5">
        {lessons.map((lesson: any) => (
          <Link 
            key={lesson.lesson_id} 
            href={`/lessons/${lesson.lesson_id}`}
            className="block transition-opacity hover:opacity-80"
          >
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="py-6 space-y-6">
                
                {/* Header: Author Info */}
                <div className="flex items-start gap-3">
                  {/* User Avatar */}
                  <img
                    src={lesson.author?.profile_image || "/default-profile-picture.png"}
                    alt={lesson.author?.username || "User"}
                    className="h-10 w-10 flex-shrink-0 rounded-full object-cover bg-muted border"
                  />

                  {/* Name + Date */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="text-xs text-muted-foreground">
                        <div className="font-medium text-sm text-foreground">
                          @{lesson.author?.username || "Unknown Author"}
                        </div>
                        <div>{formatDate(lesson.created_at)}</div>
                      </div>
                      
                      {/* Lesson Type Badge */}
                      <div className="rounded bg-muted px-2 py-1 text-[10px] uppercase font-bold text-muted-foreground">
                        {lesson.lesson_type?.replace('_lesson', '')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Title + Description */}
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">{lesson.title}</h2>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {lesson.description}
                  </p>
                </div>

                {/* Topics / Tags */}
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

        {/* Empty State */}
        {lessons.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            No lessons found for "{filter}". Be the first to create one!
          </div>
        )}
      </div>
    </section>
  );
}