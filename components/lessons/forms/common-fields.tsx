"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

// Updated to match Database ENUM types
export const AGE_RANGES = [
  { value: "Preschool (3-5)", label: "Preschool (3–5)" },
  { value: "Elementary (6-10)", label: "Elementary (6–10)" },
  { value: "Middle School (11-13)", label: "Middle School (11–13)" },
  { value: "High School (14+)", label: "High School (14+)" },
];

export const SUBJECTS = [
  { value: "Math", label: "Math" },
  { value: "Science", label: "Science" },
  { value: "History", label: "History" },
  { value: "English", label: "English" },
  { value: "Other", label: "Other" },
];

/* ---------- Hooks ---------- */

// Renamed from useSubjects to useTopics
export function useTopics(initial: string[] = []) {
  const [topics, setTopics] = React.useState<string[]>(initial);
  const [topicInput, setTopicInput] = React.useState("");

  function addTopic() {
    const value = topicInput.trim();
    if (!value) return;
    if (topics.includes(value)) {
      setTopicInput("");
      return;
    }
    if (topics.length >= 3) return;
    setTopics((prev) => [...prev, value]);
    setTopicInput("");
  }

  function removeTopic(topic: string) {
    setTopics((prev) => prev.filter((t) => t !== topic));
  }

  return {
    topics,
    topicInput,
    setTopicInput,
    addTopic,
    removeTopic,
  };
}

/* ---------- Shared field components ---------- */

interface BaseFieldProps {
  name?: string;
}

export function TitleField({ name = "title" }: BaseFieldProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor={name} className="text-md font-semibold">
        Title<span className="ml-0.5 text-red-600">*</span>
      </Label>
      <p className="text-[11px] text-muted-foreground">
        Write a short title for your lesson plan. Max 60 characters.
      </p>
      <Input
        id={name}
        name={name}
        required
        maxLength={60}
        className="h-9 rounded-sm text-xs"
        placeholder="Type catching attention title"
      />
    </div>
  );
}

export function DescriptionField({ name = "description" }: BaseFieldProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor={name} className="text-md font-semibold">
        Description<span className="ml-0.5 text-red-600">*</span>
      </Label>
      <p className="text-[11px] text-muted-foreground">
        Write a description for others to see on first glance. Max 250
        characters.
      </p>
      <Textarea
        id={name}
        name={name}
        required
        maxLength={250}
        className="min-h-[72px] rounded-sm text-sm"
        placeholder="Type lesson description"
      />
    </div>
  );
}

// Renamed from SubjectsFieldProps to TopicsFieldProps
type TopicsFieldProps = {
  topics: string[];
  topicInput: string;
  setTopicInput: (value: string) => void;
  addTopic: () => void;
  removeTopic: (topic: string) => void;
  name?: string;
};

// Renamed from SubjectsField to TopicsField
export function TopicsField({
  topics,
  topicInput,
  setTopicInput,
  addTopic,
  removeTopic,
  name = "topics",
}: TopicsFieldProps) {
  return (
    <div className="space-y-1">
      <Label className="text-md font-semibold">
        Topics<span className="ml-0.5 text-red-600">*</span>
      </Label>
      <p className="text-[11px] text-muted-foreground">
        Add specific tags (e.g. "Fractions", "Civil War"). Select up to 3.
      </p>

      <div className="flex min-h-[36px] flex-wrap items-center gap-1 rounded-sm border bg-background px-3 py-1.5 text-xs">
        {topics.map((topic) => (
          <button
            key={topic}
            type="button"
            onClick={() => removeTopic(topic)}
            className="flex items-center gap-1 rounded-full bg-muted px-2 py-0.5"
          >
            <span>{topic}</span>
            <span className="text-[10px] leading-none">×</span>
          </button>
        ))}

        {/* Hidden input for FormData extraction (optional if manual append is used) */}
        <input 
          type="hidden" 
          name={name} 
          value={JSON.stringify(topics)} 
        />

        <input
          className="min-w-[80px] flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          placeholder={topics.length ? "" : "Type topic and press Enter"}
          value={topicInput}
          onChange={(e) => setTopicInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTopic();
            }
          }}
        />
      </div>
    </div>
  );
}

// NEW Component: SubjectField
type SubjectFieldProps = {
  value: string;
  onChange: (value: string) => void;
  name?: string;
};

export function SubjectField({ value, onChange, name = "subject" }: SubjectFieldProps) {
  return (
    <div className="space-y-1">
      <Label className="text-md font-semibold">
        Subject<span className="ml-0.5 text-red-600">*</span>
      </Label>
      <p className="text-[11px] text-muted-foreground">
        Select the main subject area.
      </p>

      <RadioGroup 
        name={name} 
        value={value} 
        onValueChange={onChange}
        className="flex flex-wrap gap-4 pt-1"
      >
        {SUBJECTS.map((sub) => (
          <div key={sub.value} className="flex items-center space-x-2">
            <RadioGroupItem
              id={`${name}-${sub.value}`}
              value={sub.value}
              className="h-3 w-3"
            />
            <Label
              htmlFor={`${name}-${sub.value}`}
              className="text-sm font-normal cursor-pointer"
            >
              {sub.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

type AgeRangeFieldProps = {
  value: string;
  onChange: (value: string) => void;
  name?: string;
};

export function AgeRangeField({ value, onChange, name = "ageRange" }: AgeRangeFieldProps) {
  return (
    <div className="space-y-1">
      <Label className="text-md font-semibold">
        Age Range<span className="ml-0.5 text-red-600">*</span>
      </Label>
      <p className="text-[11px] text-muted-foreground">
        Select an age range from the options below.
      </p>

      <RadioGroup name={name} value={value} onValueChange={onChange}>
        {AGE_RANGES.map((range) => (
          <div key={range.value} className="flex items-center space-x-2">
            <RadioGroupItem
              id={`${name}-${range.value}`}
              value={range.value}
              className="h-3 w-3"
            />
            <Label
              htmlFor={`${name}-${range.value}`}
              className="text-sm font-normal"
            >
              {range.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export function LessonPlanField({ name = "lessonPlan" }: BaseFieldProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor={name} className="text-md font-semibold">
        Lesson Plan<span className="ml-0.5 text-red-600">*</span>
      </Label>
      <p className="text-[11px] text-muted-foreground">
        Write your full lesson plan. Be as detailed as you want.
      </p>
      <Textarea
        id={name}
        name={name}
        required
        className="min-h-[220px] rounded-sm text-sm"
        placeholder="Type your lesson plan"
      />
    </div>
  );
}

export function FormFooterButtons() {
  return (
    <div className="mt-4 flex justify-end gap-3 pt-4">
      {/* DRAFT BUTTON -- TODO: implement if taking project further */}
      {/* <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-8 rounded-full px-4 text-sm"
      >
        Save as draft
      </Button> */}

      {/* SUBMIT BUTTON */}
      <Button
        type="submit"
        size="md"
        className="px-8 bg-brandGreen hover:bg-brandGreenDark flex items-center gap-2"
      >
        Create Lesson
        {/* Publish */}
      </Button>
    </div>
  );
}