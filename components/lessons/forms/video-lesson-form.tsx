"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { LessonType } from "../lesson-types";
import { LessonFormHeader } from "./lesson-form-header";

type Props = {
  lessonType: LessonType;
  onChangeType: (type: LessonType) => void;
};

export function VideoLessonForm({ lessonType, onChangeType }: Props) {
  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader className="pb-3">
        <LessonFormHeader
          value={lessonType}
          onChange={onChangeType}
        />
      </CardHeader>
      <CardContent className="pt-4 pb-6 text-xs text-muted-foreground">
        {/* TODO: video lesson fields */}
        Video lesson form coming soon.
      </CardContent>
    </Card>
  );
}
