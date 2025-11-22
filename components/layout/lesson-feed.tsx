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
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="shadow-sm">
                <CardContent className="flex gap-4 pt-4">
                  {/* Avatar */}
                  <div className="mt-1 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-muted" />

                  {/* Text */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-medium">SampleUser{i}</span>
                      <span>5 min ago</span>
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold">
                        Sample Lesson Title
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Short lesson description. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Consequat aliquet maecenas
                        ut sit nulla.
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
                  </div>

                  {/* More menu dots placeholder */}
                  <div className="mt-1 h-6 w-6 flex-shrink-0 rounded-full text-muted-foreground">
                    ···
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
    )
}