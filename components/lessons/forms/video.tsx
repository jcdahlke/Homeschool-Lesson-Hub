"use client";

import * as React from "react";
import { createLesson } from "@/app/lessons/actions"; // Import the Server Action
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

export function VideoLessonForm({ lessonType, onChangeType }: Props) {
  // 1. Hooks & State
  const { topics, topicInput, setTopicInput, addTopic, removeTopic } = useTopics();
  const [ageRange, setAgeRange] = React.useState("");
  const [subject, setSubject] = React.useState("");

  // 2. Submit Handler
  async function handleSubmit(formData: FormData) {
    // Manually append controlled state/arrays.
    // Even though we added 'name' props below (which puts them in formData automatically),
    // explicit appending here ensures specific formatting (like array handling) 
    // is preserved if the backend requires it in a specific way.
    
    topics.forEach((t) => formData.append("topics", t));
    
    formData.append("ageRange", ageRange);
    formData.append("subject", subject);
    formData.append("lessonType", lessonType);
    
    // 'videoTitle', 'title', 'description', and 'lessonPlan' are native inputs 
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

          {/* Unique Field: Video Source */}
          <div className="space-y-1">
            <Label htmlFor="videoTitle" className="text-md font-semibold">
              Video Source<span className="ml-0.5 text-red-600">*</span>
            </Label>
            <p className="text-[11px] text-muted-foreground">
              Describe how to access the video for your lesson. Please do not
              include a link to the video.
            </p>
            <Input
              id="videoTitle"
              name="videoTitle" // Matches backend DB column 'video_title'
              required
              className="h-9 rounded-sm text-sm"
              placeholder="Type video source instructions"
            />
          </div>

          <LessonPlanField name="lessonPlan" />
          <FormFooterButtons />
        </CardContent>
      </form>
    </Card>
  );
}