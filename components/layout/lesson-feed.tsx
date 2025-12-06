import { Card, CardContent } from "../ui/card";

export function LessonFeed() {
  return (
    <section className="flex-1 space-y-4">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Lessons</h1>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {["New", "Interactive", "Video", "Analogy"].map((label, i) => (
          <button
            key={label}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${
              i === 0
                ? "border-brandGreen bg-brandGreen/10 text-brandGreen"
                : "border-muted-foreground/20 text-muted-foreground hover:bg-muted"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Lesson cards – replace with real data later */}
      <div className="space-y-5">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="shadow-sm">
            <CardContent className="py-6 space-y-6">
              {/* Header */}
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-muted" />

                {/* Name + time + menu */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="text-xs text-muted-foreground">
                      <div className="font-medium text-sm text-foreground">
                        SampleUser{i}
                      </div>
                      <div>5 min ago</div>
                    </div>

                    {/* Menu dots */}
                    <div className="mt-1 h-6 w-6 flex-shrink-0 rounded-full text-muted-foreground">
                      ···
                    </div>
                  </div>
                </div>
              </div>

              {/* Title + description */}
              <div className="space-y-2">
                <h2 className="text-sm font-semibold">Sample Lesson Title</h2>
                <p className="text-sm text-muted-foreground">
                  Short lesson description. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Consequat aliquet maecenas ut sit
                  nulla.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {["math", "fractions", "hands-on"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
