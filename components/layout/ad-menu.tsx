import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function AdMenu() {
  return (
    <aside className="hidden w-72 shrink-0 xl:block space-y-4">
      {/* Fake CS452 ad */}
      <Card>
        <CardHeader className="space-y-1 pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <span>Un-Paid Promotion</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="aspect-[16/9] overflow-hidden rounded-md bg-muted">
            <Image
              src="/images/cs452-ad.jpg"
              alt="CS452 Advertisement"
              width={288}
              height={162}
              className="object-cover"
            />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-semibold">
              BYU CS 452: Database Modeling Concepts
            </h3>
            <p className="text-xs text-muted-foreground">
              Master the foundations of modern data design. Build real-world
              database systems, learn powerful query languages, and level up
              your data-modeling brain. Relational. Deductive. Object-oriented.
              All in one course.
            </p>
            <a
              href="https://catalog.byu.edu/courses/08102-002"
              target="_blank"
              rel="noreferrer"
              className="mt-1 text-xs font-medium text-brandGreen hover:underline"
            >
              Enrollment open now!
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Featured links */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Featured Links</CardTitle>
        </CardHeader>

        <CardContent className="space-y-1 text-sm">
          <ul className="list-disc space-y-1 pl-4 text-brandGreen">
            <li>
              <a
                href="https://github.com/jcdahlke/Homeschool-Lesson-Hub"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                GitHub Source Code
              </a>
            </li>
            <li>
              <a
                href="https://byu.instructure.com/courses/32608/pages/final-project"
                className="hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                CS 452 Final Project Instruction
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </aside>
  );
}
