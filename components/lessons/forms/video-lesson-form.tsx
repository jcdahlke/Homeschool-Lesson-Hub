"use client";

import * as React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LessonType } from "../lesson-types";
import { LessonFormHeader } from "./lesson-form-header";
import {
  useSubjects,
  TitleField,
  DescriptionField,
  SubjectsField,
  AgeRangeField,
  LessonPlanField,
  FormFooterButtons,
} from "./common-fields";

type Props = {
  lessonType: LessonType;
  onChangeType: (type: LessonType) => void;
};

type VideoLessonPayload = {
  lessonType: LessonType;
  title: string;
  description: string;
  subjects: string[];
  ageRange: string;
  videoSource: string;
  lessonPlan: string;
};

export function VideoLessonForm({ lessonType, onChangeType }: Props) {
  const { subjects, subjectInput, setSubjectInput, addSubject, removeSubject } =
    useSubjects();
  const [ageRange, setAgeRange] = React.useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload: VideoLessonPayload = {
      lessonType,
      title: (formData.get("title") as string) ?? "",
      description: (formData.get("description") as string) ?? "",
      subjects,
      ageRange,
      videoSource: (formData.get("videoSource") as string) ?? "",
      lessonPlan: (formData.get("lessonPlan") as string) ?? "",
    };

    // TODO: send to Supabase / API route
    console.log("Video lesson payload", payload);
  }

  return (
    <Card className="mx-auto max-w-3xl">
      <form onSubmit={handleSubmit}>
        <CardHeader className="pb-3">
          <LessonFormHeader value={lessonType} onChange={onChangeType} />
        </CardHeader>

        <CardContent className="space-y-6 pt-2 pb-6">
          <TitleField />
          <DescriptionField />

          <SubjectsField
            subjects={subjects}
            subjectInput={subjectInput}
            setSubjectInput={setSubjectInput}
            addSubject={addSubject}
            removeSubject={removeSubject}
          />

          <AgeRangeField value={ageRange} onChange={setAgeRange} />

          {/* Video source (unique) */}
          <div className="space-y-1">
            <Label htmlFor="videoSource" className="text-md font-semibold">
              Video Source<span className="ml-0.5 text-red-600">*</span>
            </Label>
            <p className="text-[11px] text-muted-foreground">
              Describe how to access the video for your lesson. Please do not
              include a link to the video.
            </p>
            <Input
              id="videoSource"
              name="videoSource"
              required
              className="h-9 rounded-sm text-sm"
              placeholder="Type video source instructions"
            />
          </div>

          <LessonPlanField />
          <FormFooterButtons />
        </CardContent>
      </form>
    </Card>
  );
}
