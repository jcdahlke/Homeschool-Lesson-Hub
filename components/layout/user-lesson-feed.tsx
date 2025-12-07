import Image from "next/image";
import { Card, CardContent } from "../ui/card";

export function UserLessonFeed() {
  return (
    <section className="flex-1 space-y-4">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">My Lessons</h1>
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
        {[1, 2, 3].map((i) => (
          <Card key={i} className="shadow-sm">
            <CardContent className="py-6 space-y-6">

              {/* Header */}
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="h-10 w-10 rounded-full overflow-hidden bg-muted">
                  <Image
                    src="/images/pfp-bjgraves.png"
                    alt="User avatar"
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* @username + time */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="text-xs text-muted-foreground leading-tight">
                      <div className="font-medium text-sm text-foreground">
                        @bjgraves
                      </div>
                      <div>5 min ago</div>
                    </div>

                    {/* Menu dots */}
                    <button className="mt-1 h-6 w-6 flex items-center justify-center text-lg text-muted-foreground">
                      •••
                    </button>
                  </div>
                </div>
              </div>

              {/* Title + description */}
              <div className="space-y-2">
                <h2 className="text-sm font-semibold">Sample Lesson Title</h2>
                <p className="text-sm text-muted-foreground">
                  Short Lesson Description. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Consequat aliquet maecenas ut sit
                  nulla.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {["golang", "linux", "overflow"].map((tag) => (
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
