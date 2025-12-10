"use client";

import * as React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LessonType } from "../lesson-types";
import { LessonFormHeader } from "./header";
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

type AnalogyLessonPayload = {
  lessonType: LessonType;
  title: string;
  description: string;
  subjects: string[];
  ageRange: string;
  comparisonObject: string;
  lessonPlan: string;
};

export function AnalogyLessonForm({ lessonType, onChangeType }: Props) {
  const { subjects, subjectInput, setSubjectInput, addSubject, removeSubject } =
    useSubjects();
  const [ageRange, setAgeRange] = React.useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload: AnalogyLessonPayload = {
      lessonType,
      title: (formData.get("title") as string) ?? "",
      description: (formData.get("description") as string) ?? "",
      subjects,
      ageRange,
      comparisonObject: (formData.get("comparisonObject") as string) ?? "",
      lessonPlan: (formData.get("lessonPlan") as string) ?? "",
    };

    // TODO: send to Supabase / API route
    console.log("Analogy lesson payload", payload);
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

          {/* Comparison object (unique) */}
          <div className="space-y-1">
            <Label
              htmlFor="comparisonObject"
              className="text-md font-semibold"
            >
              Comparison Object<span className="ml-0.5 text-red-600">*</span>
            </Label>
            <p className="text-[11px] text-muted-foreground">
              Explain the comparison object of your analogy.
            </p>
            <Input
              id="comparisonObject"
              name="comparisonObject"
              required
              className="h-9 rounded-sm text-sm"
              placeholder="Type comparison object"
            />
          </div>

          <LessonPlanField />
          <FormFooterButtons />
        </CardContent>
      </form>
    </Card>
  );
}
