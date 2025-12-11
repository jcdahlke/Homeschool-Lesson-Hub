"use client";

import * as React from "react";
import { createLesson } from "@/app/lessons/actions"; // Import the Server Action
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

export function InteractiveLessonForm({ lessonType, onChangeType }: Props) {
  // 1. Hooks & State
  const { topics, topicInput, setTopicInput, addTopic, removeTopic } = useTopics();
  const [ageRange, setAgeRange] = React.useState("");
  const [prepTime, setPrepTime] = React.useState("");
  const [subject, setSubject] = React.useState("");

  // 2. Submit Handler
  async function handleSubmit(formData: FormData) {
    // Manually append controlled state/arrays if needed by the backend action.
    // Note: Since we added 'name' attributes to the inputs below, FormData 
    // will already contain these values. We append 'topics' explicitly 
    // to ensure the array format is handled if the backend expects multiple entries.
    
    topics.forEach((t) => formData.append("topics", t));
    
    // Controlled fields are also in FormData via their inputs, but appending
    // ensures state is captured if the inputs were conditionally rendered or modified.
    // Duplicate keys are usually handled by the server action reading the last value.
    formData.append("ageRange", ageRange);
    formData.append("subject", subject);
    formData.append("prepTime", prepTime);
    formData.append("lessonType", lessonType);
    
    // 'materials', 'title', 'description', and 'lessonPlan' are native inputs 
    // with 'name' attributes, so they are auto-included.

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
          <TitleField name="title" />
          <DescriptionField name="description" />

          {/* New Subject Field */}
          <SubjectField 
            value={subject} 
            onChange={setSubject} 
            name="subject"
          />

          {/* Topics Field */}
          <TopicsField
            topics={topics}
            topicInput={topicInput}
            setTopicInput={setTopicInput}
            addTopic={addTopic}
            removeTopic={removeTopic}
            name="topics"
          />

          <AgeRangeField 
            value={ageRange} 
            onChange={setAgeRange} 
            name="ageRange"
          />

          {/* Unique Field: Prep Time */}
          <div className="space-y-1">
            <Label className="text-md font-semibold">
              Prep Time<span className="ml-0.5 text-red-600">*</span>
            </Label>
            <p className="text-[11px] text-muted-foreground">
              Select a prep time from the options below.
            </p>

            <RadioGroup 
              name="prepTime" // Added name prop
              value={prepTime} 
              onValueChange={setPrepTime}
            >
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

          {/* Unique Field: Materials */}
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

          <LessonPlanField name="lessonPlan" />
          <FormFooterButtons />
        </CardContent>
      </form>
    </Card>
  );
}