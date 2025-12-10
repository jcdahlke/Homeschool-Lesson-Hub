"use client";

import { CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { LessonType } from "../lesson-types";

type Props = {
  value: LessonType;
  onChange: (type: LessonType) => void;
};

export function LessonFormHeader({ value, onChange }: Props) {
  return (
    <div className="space-y-1">
      <div>
        <CardTitle className="text-md font-semibold">
          Lesson Type<span className="ml-0.5 text-red-600">*</span>
        </CardTitle>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Select a lesson type from the dropdown.
        </p>
      </div>

      <div className="mt-3">
        <Select
          value={value}
          onValueChange={v => onChange(v as LessonType)}
        >
          <SelectTrigger className="h-9 rounded-sm text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="analogy">Analogy</SelectItem>
            <SelectItem value="interactive">Interactive</SelectItem>
            <SelectItem value="video">Video</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
