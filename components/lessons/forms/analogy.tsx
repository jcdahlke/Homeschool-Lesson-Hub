"use client";

import * as React from "react";
import { createLesson } from "@/app/lessons/actions";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LessonType } from "../lesson-types";
import { LessonFormHeader } from "./header";
import {
  useTopics,
  TitleField,
  DescriptionField,
  TopicsField,
  SubjectField,
  AgeRangeField,
  LessonPlanField,
  FormFooterButtons,
} from "./common-fields";

type Props = {
  lessonType: LessonType;
  onChangeType: (type: LessonType) => void;
};

export function AnalogyLessonForm({ lessonType, onChangeType }: Props) {
  // 1. Hooks for shared fields
  const { topics, topicInput, setTopicInput, addTopic, removeTopic } = useTopics();

  // 2. State for dropdowns/radios
  const [ageRange, setAgeRange] = React.useState("");
  const [subject, setSubject] = React.useState("");

  // 3. Submit Handler
  async function handleSubmit(formData: FormData) {
    // We manually append state that isn't captured by native inputs
    // (e.g., custom Select components or Arrays)
    
    // Add topics (array)
    topics.forEach((t) => formData.append("topics", t));

    // Add controlled state
    formData.append("ageRange", ageRange);
    formData.append("subject", subject);
    formData.append("lessonType", lessonType);

    // Note: 'title', 'description', 'comparisonObject', and 'lessonPlan' 
    // are captured automatically via their 'name' attributes.

    // Send to Backend
    await createLesson(formData);
  }

  return (
    <Card className="mx-auto max-w-3xl shadow-sm">
      <form action={handleSubmit}>
        <CardHeader className="pb-3 border-b">
          <LessonFormHeader value={lessonType} onChange={onChangeType} />
        </CardHeader>

        <CardContent className="space-y-6 pt-6 pb-6">
          {/* Explicitly passing names to ensure FormData captures them */}
          <TitleField name="title" />
          <DescriptionField name="description" />

          {/* Subject is controlled state, appended manually in handleSubmit */}
          <SubjectField value={subject} onChange={setSubject} />

          {/* Topics are state arrays, appended manually in handleSubmit */}
          <TopicsField
            topics={topics}
            topicInput={topicInput}
            setTopicInput={setTopicInput}
            addTopic={addTopic}
            removeTopic={removeTopic}
          />

          {/* AgeRange is controlled state, appended manually in handleSubmit */}
          <AgeRangeField value={ageRange} onChange={setAgeRange} />

          {/* Unique Field: Comparison Object */}
          <div className="space-y-1">
            <Label
              htmlFor="comparisonObject"
              className="text-md font-semibold"
            >
              Comparison Object<span className="ml-0.5 text-red-600">*</span>
            </Label>
            <p className="text-[11px] text-muted-foreground">
              What familiar object are you comparing the concept to?
            </p>
            <Input
              id="comparisonObject"
              name="comparisonObject" // Ensures this field is in formData
              required
              className="h-9 rounded-sm text-sm"
              placeholder="e.g. A factory, a castle, a solar system"
            />
          </div>

          {/* Explicitly passing name for the textarea */}
          <LessonPlanField name="lessonPlan" />
          
          <FormFooterButtons />
        </CardContent>
      </form>
    </Card>
  );
}