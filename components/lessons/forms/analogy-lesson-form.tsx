"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { LessonType } from "../lesson-types";
import { LessonFormHeader } from "./lesson-form-header";

const AGE_RANGES = [
  { value: "0-4", label: "0–4 years" },
  { value: "5-8", label: "5–8 years" },
  { value: "9-13", label: "9–13 years" },
  { value: "14-18", label: "14–18 years" },
];

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
  const [subjects, setSubjects] = React.useState<string[]>([]);
  const [subjectInput, setSubjectInput] = React.useState("");
  const [ageRange, setAgeRange] = React.useState("");

  function addSubject() {
    const value = subjectInput.trim();
    if (!value) return;
    if (subjects.includes(value)) {
      setSubjectInput("");
      return;
    }
    if (subjects.length >= 3) return;
    setSubjects(prev => [...prev, value]);
    setSubjectInput("");
  }

  function removeSubject(s: string) {
    setSubjects(prev => prev.filter(x => x !== s));
  }

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
          <LessonFormHeader
            value={lessonType}
            onChange={onChangeType}
          />
        </CardHeader>

        <CardContent className="space-y-6 pt-2 pb-6">
          {/* Title */}
          <div className="space-y-1">
            <Label htmlFor="title" className="text-md font-semibold">
              Title<span className="ml-0.5 text-red-600">*</span>
            </Label>
            <p className="text-[11px] text-muted-foreground">
              Write a short title for your lesson plan. Max 60 characters.
            </p>
            <Input
              id="title"
              name="title"
              required
              maxLength={60}
              className="h-9 rounded-sm text-xs"
              placeholder="Type catching attention title"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label htmlFor="description" className="text-md font-semibold">
              Description<span className="ml-0.5 text-red-600">*</span>
            </Label>
            <p className="text-[11px] text-muted-foreground">
              Write a description for others to see on first glance. Max 250
              characters.
            </p>
            <Textarea
              id="description"
              name="description"
              required
              maxLength={250}
              className="min-h-[72px] rounded-sm text-sm"
              placeholder="Type lesson description"
            />
          </div>

          {/* Subjects */}
          <div className="space-y-1">
            <Label className="text-md font-semibold">
              Subjects<span className="ml-0.5 text-red-600">*</span>
            </Label>
            <p className="text-[11px] text-muted-foreground">
              Select up to 3 subject tags.
            </p>

            <div className="flex min-h-[36px] flex-wrap items-center gap-1 rounded-sm border bg-background px-3 py-1.5 text-xs">
              {subjects.map(subject => (
                <button
                  key={subject}
                  type="button"
                  onClick={() => removeSubject(subject)}
                  className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5"
                >
                  <span>{subject}</span>
                  <span className="text-[10px] leading-none">×</span>
                </button>
              ))}

              <input
                className="min-w-[80px] flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                placeholder={
                  subjects.length ? "" : "Type subject and press Enter"
                }
                value={subjectInput}
                onChange={e => setSubjectInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSubject();
                  }
                }}
              />
            </div>
          </div>

          {/* Age range */}
          <div className="space-y-1">
            <Label className="text-md font-semibold">
              Age Range<span className="ml-0.5 text-red-600">*</span>
            </Label>
            <p className="text-[11px] text-muted-foreground">
              Select an age range from the options below.
            </p>

            <RadioGroup
              value={ageRange}
              onValueChange={setAgeRange}
            >
              {AGE_RANGES.map(range => (
                <div
                  key={range.value}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem
                    id={`age-${range.value}`}
                    value={range.value}
                    className="h-3 w-3"
                  />
                  <Label
                    htmlFor={`age-${range.value}`}
                    className="text-sm font-normal"
                  >
                    {range.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Comparison object */}
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

          {/* Lesson plan */}
          <div className="space-y-1">
            <Label htmlFor="lessonPlan" className="text-md font-semibold">
              Lesson Plan<span className="ml-0.5 text-red-600">*</span>
            </Label>
            <p className="text-[11px] text-muted-foreground">
              Write your full lesson plan. Be as detailed as you want.
            </p>
            <Textarea
              id="lessonPlan"
              name="lessonPlan"
              required
              className="min-h-[220px] rounded-sm text-sm"
              placeholder="Type your lesson plan"
            />
          </div>

          {/* Footer buttons */}
          <div className="mt-4 flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 rounded-full px-4 text-sm"
            >
              Save as draft
            </Button>
            <Button
              type="submit"
              size="sm"
              className="h-8 rounded-full bg-brandGreen px-6 text-sm text-white hover:bg-brandGreenDark"
            >
              Publish
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
