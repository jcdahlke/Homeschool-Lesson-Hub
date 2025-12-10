"use client";

import * as React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

const PREP_TIMES = [
  { value: "15", label: "15 mins" },
  { value: "30", label: "30 mins" },
  { value: "45", label: "45 mins" },
  { value: "60+", label: "60 mins +" },
];

type Props = {
  lessonType: LessonType;
  onChangeType: (type: LessonType) => void;
};

type InteractiveLessonPayload = {
  lessonType: LessonType;
  title: string;
  description: string;
  subjects: string[];
  ageRange: string;
  prepTime: string;
  materials: string;
  lessonPlan: string;
};

export function InteractiveLessonForm({ lessonType, onChangeType }: Props) {
  const { subjects, subjectInput, setSubjectInput, addSubject, removeSubject } =
    useSubjects();
  const [ageRange, setAgeRange] = React.useState("");
  const [prepTime, setPrepTime] = React.useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload: InteractiveLessonPayload = {
      lessonType,
      title: (formData.get("title") as string) ?? "",
      description: (formData.get("description") as string) ?? "",
      subjects,
      ageRange,
      prepTime,
      materials: (formData.get("materials") as string) ?? "",
      lessonPlan: (formData.get("lessonPlan") as string) ?? "",
    };

    // TODO: send to Supabase / API route
    console.log("Interactive lesson payload", payload);
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

          {/* Prep Time (unique) */}
          <div className="space-y-1">
            <Label className="text-md font-semibold">
              Prep Time<span className="ml-0.5 text-red-600">*</span>
            </Label>
            <p className="text-[11px] text-muted-foreground">
              Select a prep time from the options below.
            </p>

            <RadioGroup value={prepTime} onValueChange={setPrepTime}>
              {PREP_TIMES.map((time) => (
                <div key={time.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    id={`prep-${time.value}`}
                    value={time.value}
                    className="h-3 w-3"
                  />
                  <Label
                    htmlFor={`prep-${time.value}`}
                    className="text-sm font-normal"
                  >
                    {time.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Materials (unique) */}
          <div className="space-y-1">
            <Label htmlFor="materials" className="text-md font-semibold">
              Materials<span className="ml-0.5 text-red-600">*</span>
            </Label>
            <p className="text-[11px] text-muted-foreground">
              Write your list of materials separated by commas (Example:
              Scissors, Glue, Paper).
            </p>
            <Input
              id="materials"
              name="materials"
              required
              className="h-9 rounded-sm text-sm"
              placeholder="Type list of materials"
            />
          </div>

          <LessonPlanField />
          <FormFooterButtons />
        </CardContent>
      </form>
    </Card>
  );
}
