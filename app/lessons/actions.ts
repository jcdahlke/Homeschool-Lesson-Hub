import { createClient } from "@/utils/supabase/server";
import OpenAI from "openai";

// Helper function to format the raw database result for the UI
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformLessonData(lesson: any) {
  let calculatedType = "General";

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
    lesson_type: calculatedType,
  };
}

export async function getLessons(filter: string = "New", searchQuery?: string) {
  const supabase = await createClient();

  // ---------------------------------------------------------
  // PATH A: VECTOR SEARCH (If user typed something)
  // ---------------------------------------------------------
  if (searchQuery && searchQuery.trim().length > 0) {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // 1. Generate Embedding for the search query
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: searchQuery,
    });
    const embedding = embeddingResponse.data[0].embedding;

    // 2. Call the Database RPC function
    const { data: rpcData, error: rpcError } = await supabase.rpc(
      "get_closest_lessons",
      {
        query_vector: embedding,
        match_count: 10, // Top 10 results
      }
    );

    if (rpcError) {
      console.error("Vector search error:", rpcError);
      return [];
    }

    if (!rpcData || rpcData.length === 0) return [];

    // 3. Hydrate the Data (Fetch Author & Topics)
    // The RPC returns lesson details, but we need the relations (author, topics)
    // We fetch the full objects for the specific IDs returned by the search.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lessonIds = rpcData.map((l: any) => l.lesson_id);

    const { data: fullLessons, error: fetchError } = await supabase
      .from("lesson")
      .select(
        `
        lesson_id,
        title,
        description,
        lesson_plan,
        created_at,
        author:app_user(username, profile_image),
        lesson_topic(topic(topic_name)),
        interactive_lesson(*), video_lesson(*), analogy_lesson(*)
      `
      )
      .in("lesson_id", lessonIds);

    if (fetchError || !fullLessons) return [];

    // 4. Sort by Relevance
    // The .in() query does not preserve order. We must manually sort the full lessons
    // to match the order of IDs returned by the vector search (most relevant first).
    const sortedLessons = lessonIds
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((id: number) => fullLessons.find((l: any) => l.lesson_id === id))
      .filter(Boolean); // Remove any undefined entries

    return sortedLessons.map(transformLessonData);
  }

  // ---------------------------------------------------------
  // PATH B: STANDARD FILTERING (Default Feed)
  // ---------------------------------------------------------
  let selectQuery = `
    lesson_id,
    title,
    description,
    lesson_plan,
    created_at,
    author:app_user(username, profile_image),
    lesson_topic(topic(topic_name))
  `;

  if (filter === "Interactive") {
    selectQuery += `, interactive_lesson!inner(*)`;
  } else if (filter === "Video") {
    selectQuery += `, video_lesson!inner(*)`;
  } else if (filter === "Analogy") {
    selectQuery += `, analogy_lesson!inner(*)`;
  } else {
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

  return data.map(transformLessonData);
}

// Fetch a single lesson by ID, including its type-specific tables
export async function getLessonById(lessonId: string) {
  const supabase = await createClient();

  // 1. Fetch the lesson and ALL its relations
  const { data, error } = await supabase
    .from("lesson")
    .select(`
      *,
      author:app_user(username, profile_image),
      lesson_topic(topic(topic_name)),
      subject(subject_name),
      interactive_lesson(*),
      video_lesson(*),
      analogy_lesson(*)
    `)
    .eq("lesson_id", lessonId)
    .single(); // We expect only one result

  if (error) {
    console.error("Error fetching lesson details:", error);
    return null;
  }

  // 2. Transform the data for the UI
  return transformSingleLesson(data);
}

// Helper to format a single lesson object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformSingleLesson(lesson: any) {
  let calculatedType = "General";

  // Normalize relations to arrays
  const interactive = Array.isArray(lesson.interactive_lesson) 
    ? lesson.interactive_lesson 
    : (lesson.interactive_lesson ? [lesson.interactive_lesson] : []);

  const video = Array.isArray(lesson.video_lesson) 
    ? lesson.video_lesson 
    : (lesson.video_lesson ? [lesson.video_lesson] : []);

  const analogy = Array.isArray(lesson.analogy_lesson) 
    ? lesson.analogy_lesson 
    : (lesson.analogy_lesson ? [lesson.analogy_lesson] : []);

  // Determine type based on which array has data
  if (interactive.length > 0) calculatedType = "interactive_lesson";
  else if (video.length > 0) calculatedType = "video_lesson";
  else if (analogy.length > 0) calculatedType = "analogy_lesson";

  // PATCH: Fix Data Mismatches for UI
  
  // 1. Interactive: Map 'lesson_plan' to instructions so the UI finds it.
  //    Also ensures prep_time and materials are passed through (they are already in the object).
  if (interactive.length > 0) {
    interactive[0].instructions = lesson.lesson_plan;
  }

  // 2. Video: Generate a search link if url is missing, but preserve video_title
  if (video.length > 0 && !video[0].video_url) {
    video[0].video_url = `https://www.youtube.com/results?search_query=${encodeURIComponent(video[0].video_title || lesson.title)}`;
  }

  // Create a clean "subjects" array for the UI tags
  const subjects = lesson.subject?.subject_name ? [lesson.subject.subject_name] : [];

  return {
    ...lesson,
    interactive_lesson: interactive,
    video_lesson: video,
    analogy_lesson: analogy,
    lesson_type: calculatedType,
    subjects: subjects, 
  };
}


export async function getMyLessons(filter: string = "New") {
  const supabase = await createClient();

  // 1. Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  // 2. Get their public ID
  const { data: appUser } = await supabase
    .from("app_user")
    .select("user_id")
    .eq("supabase_id", user.id)
    .single();

  if (!appUser) return [];

  // 3. Build Query (Similar to getLessons but filtered by author)
  let selectQuery = `
    lesson_id,
    title,
    description,
    lesson_plan,
    created_at,
    author:app_user(username, profile_image),
    lesson_topic(topic(topic_name))
  `;

  // Apply Join Filters
  if (filter === "Interactive") selectQuery += `, interactive_lesson!inner(*)`;
  else if (filter === "Video") selectQuery += `, video_lesson!inner(*)`;
  else if (filter === "Analogy") selectQuery += `, analogy_lesson!inner(*)`;
  else
    selectQuery += `, interactive_lesson(*), video_lesson(*), analogy_lesson(*)`;

  // Fetch data
  const { data, error } = await supabase
    .from("lesson")
    .select(selectQuery)
    .eq("author_id", appUser.user_id) // <--- THE KEY DIFFERENCE
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching my lessons:", error);
    return [];
  }

  // Reuse the transform function (copy it from above if not exported, or duplicate logic)
  return data.map((lesson: any) => {
    let calculatedType = "General";
    if (lesson.interactive_lesson?.length > 0 || lesson.interactive_lesson)
      calculatedType = "interactive_lesson";
    else if (lesson.video_lesson?.length > 0 || lesson.video_lesson)
      calculatedType = "video_lesson";
    else if (lesson.analogy_lesson?.length > 0 || lesson.analogy_lesson)
      calculatedType = "analogy_lesson";

    return { ...lesson, lesson_type: calculatedType };
  });
}
