"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { LessonType } from "./lesson-types";
import { AnalogyLessonForm } from "./forms/analogy-lesson-form";
import { InteractiveLessonForm } from "./forms/interactive-lesson-form";
import { VideoLessonForm } from "./forms/video-lesson-form";

/* ------------------- TOP-LEVEL FLOW ------------------- */

export function CreateLesson() {
  const [lessonType, setLessonType] = React.useState<LessonType | "">("");

  // STEP 1: user has not picked a type yet
  if (!lessonType) {
    return (
      <section className="flex-1 px-6 py-8">
        <LessonTypeStep onSelectType={setLessonType} />
      </section>
    );
  }

  // STEP 2: show the correct form
  return (
    <section className="flex-1 px-6 py-8">
      <LessonFormRouter
        lessonType={lessonType}
        onChangeType={setLessonType}
      />
    </section>
  );
}

/* ------------------- STEP 1: PICK TYPE ------------------- */

function LessonTypeStep({
  onSelectType,
}: {
  onSelectType: (type: LessonType) => void;
}) {
  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-sm font-semibold">
          Lesson Type<span className="ml-0.5 text-red-600">*</span>
        </CardTitle>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Select a lesson type from the dropdown.
        </p>
      </CardHeader>

      <CardContent className="pt-0 pb-6">
        <Select onValueChange={value => onSelectType(value as LessonType)}>
          <SelectTrigger className="h-9 rounded-sm text-xs">
            <SelectValue placeholder="Choose lesson type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="analogy">Analogy</SelectItem>
            <SelectItem value="interactive">Interactive</SelectItem>
            <SelectItem value="video">Video</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}

/* ------------------- STEP 2 ROUTER ------------------- */

function LessonFormRouter({
  lessonType,
  onChangeType,
}: {
  lessonType: LessonType;
  onChangeType: (type: LessonType) => void;
}) {
  switch (lessonType) {
    case "analogy":
      return (
        <AnalogyLessonForm
          lessonType={lessonType}
          onChangeType={onChangeType}
        />
      );
    case "interactive":
      return (
        <InteractiveLessonForm
          lessonType={lessonType}
          onChangeType={onChangeType}
        />
      );
    case "video":
      return (
        <VideoLessonForm
          lessonType={lessonType}
          onChangeType={onChangeType}
        />
      );
  }
}
