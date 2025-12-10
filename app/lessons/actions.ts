import { createClient } from "@/utils/supabase/server";

export async function getLessons(filter: string = "New") {
  const supabase = await createClient();

  // 1. Build the SELECT string
  // We always want the base lesson details, author, and topics.
  let selectQuery = `
    lesson_id,
    title,
    description,
    created_at,
    author:app_user(username, profile_image),
    lesson_topic(topic(topic_name))
  `;

  // 2. Handle Filtering via JOINS
  // Ideally, we want to know if a lesson is Interactive, Video, or Analogy.
  // Strategy:
  // - If the user selects a filter (e.g., "Video"), we use '!inner' join on 'video_lesson'.
  //   This forces the database to ONLY return lessons that exist in the video_lesson table.
  // - If the filter is "New" (All), we 'left join' all tables so we can check which one exists.

  if (filter === "Interactive") {
    selectQuery += `, interactive_lesson!inner(*)`; 
  } else if (filter === "Video") {
    selectQuery += `, video_lesson!inner(*)`;
  } else if (filter === "Analogy") {
    selectQuery += `, analogy_lesson!inner(*)`;
  } else {
    // Fetch ALL types (Standard Left Join)
    selectQuery += `, interactive_lesson(*), video_lesson(*), analogy_lesson(*)`;
  }

  const { data, error } = await supabase
    .from("lesson")
    .select(selectQuery)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching lessons:", error);
    return [];
  }

  // 3. Transform the Data
  // Your frontend expects a 'lesson_type' property to display the badge.
  // Since we removed the column, we calculate it here based on which sub-table has data.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formattedData = data.map((lesson: any) => {
    let calculatedType = "General";

    // Check which child table is not null/empty
    const isInteractive = Array.isArray(lesson.interactive_lesson) 
      ? lesson.interactive_lesson.length > 0 
      : !!lesson.interactive_lesson;

    const isVideo = Array.isArray(lesson.video_lesson) 
      ? lesson.video_lesson.length > 0 
      : !!lesson.video_lesson;

    const isAnalogy = Array.isArray(lesson.analogy_lesson) 
      ? lesson.analogy_lesson.length > 0 
      : !!lesson.analogy_lesson;

    if (isInteractive) calculatedType = "interactive_lesson";
    else if (isVideo) calculatedType = "video_lesson";
    else if (isAnalogy) calculatedType = "analogy_lesson";

    return {
      ...lesson,
      lesson_type: calculatedType, // We manually add this back so the UI works
    };
  });

  return formattedData;
}