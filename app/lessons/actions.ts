'use server'

import { createClient } from "@/utils/supabase/server";
import OpenAI from "openai";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

// ---------------------------------------------------------
// NEW: Create Lesson (Server Action)
// ---------------------------------------------------------
export async function createLesson(prevState: any, incomingFormData?: FormData) {
  console.log("--- createLesson Action Started ---");

  const supabase = await createClient();

  // Handle case where function is called directly (1 arg) or via useFormState (2 args)
  const formData = incomingFormData ?? (prevState as FormData);
  
  // 1. Authenticate User (Get UUID)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error("Authentication Failed: No user found.");
    return { message: "User not authenticated", error: true };
  }
  console.log("Auth UUID:", user.id);

  // 1.5 Fetch Public User Profile (Get BigInt ID)
  const { data: appUser, error: userError } = await supabase
    .from("app_user")
    .select("user_id, num_lessons_added")
    .eq("supabase_id", user.id)
    .single();

  if (userError || !appUser) {
    console.error("Error fetching app_user profile:", userError);
    return { message: "User profile not found", error: true };
  }

  const authorId = appUser.user_id;
  console.log("Internal Author ID resolved:", authorId);

  // 2. Extract Common Fields (Matching React Form Names)
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const lessonPlan = formData.get("lessonPlan") as string; // Form: name="lessonPlan"
  const ageRange = formData.get("ageRange") as string;     // Form: name="ageRange"
  const lessonType = formData.get("lessonType") as string; // Form: name="lessonType"
  
  // Handle Subject: The form sends 'subject' (e.g., "Math")
  const rawSubject = formData.get("subject") as string;
  let subjectId = rawSubject?.trim(); 
  
  console.log("Raw Subject Input:", subjectId);

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  if (!subjectId) {
     return { message: "Subject is required", error: true };
  }

  if (!uuidRegex.test(subjectId)) {
    console.log(`Looking up subject by name: "${subjectId}"`);
    
    // Convert to lowercase to match DB enum/strings if necessary
    const { data: subjectData, error: lookupError } = await supabase
      .from("subject")
      .select("subject_id")
      .eq("subject_name", subjectId.toLowerCase()) 
      .maybeSingle();

    if (lookupError) {
        console.error("DB Error looking up subject:", lookupError);
    }

    if (subjectData) {
      subjectId = subjectData.subject_id;
      console.log("Subject ID resolved to:", subjectId);
    } else {
      // Fallback: If not found, perhaps handle specific "Other" logic or return error
      console.error(`Invalid subject name: "${subjectId}" - Not found in DB.`);
      return { message: `Invalid subject: ${subjectId}.`, error: true };
    }
  }

  // Handle topics parsing
  // The form appends 'topics' multiple times, so we use getAll
  let topics: string[] = formData.getAll("topics") as string[];
  
  // Fallback: Check if it came as a JSON string (hidden input fallback)
  if (topics.length === 0) {
      const topicsJson = formData.get("topics");
      if (typeof topicsJson === 'string') {
        try {
            topics = JSON.parse(topicsJson);
        } catch {
            topics = [];
        }
      }
  }

  // 3. Insert into Main 'lesson' Table
  console.log("Attempting to insert into 'lesson' table...");
  
  const { data: lesson, error: lessonError } = await supabase
    .from("lesson")
    .insert({
      title: title,
      description: description,
      subject_id: subjectId, 
      age_range: ageRange,
      // type: lessonType, // DB doesn't have this column based on snippet, derived from relation
      author_id: authorId,
      lesson_plan: lessonPlan,
    })
    .select() 
    .single();

  if (lessonError || !lesson) {
    console.error("Database Error creating lesson:", lessonError);
    return { message: "Failed to create base lesson", error: true };
  }

  console.log("Lesson created successfully. ID:", lesson.lesson_id);
  const lessonId = lesson.lesson_id;

  // 3.5 Handle Topics Linking
  if (topics.length > 0) {
    const finalTopicIds: string[] = [];
    
    for (const item of topics) {
      if (uuidRegex.test(item)) {
        finalTopicIds.push(item);
        continue;
      }

      // Find or Create Topic
      const { data: existingTopic } = await supabase
        .from("topic")
        .select("topic_id")
        .ilike("topic_name", item) 
        .maybeSingle();

      if (existingTopic) {
        finalTopicIds.push(existingTopic.topic_id);
      } else {
        const { data: newTopic, error: createTopicError } = await supabase
          .from("topic")
          .insert({ topic_name: item })
          .select("topic_id")
          .single();

        if (newTopic) {
          finalTopicIds.push(newTopic.topic_id);
        } else {
          console.error(`Failed to create topic "${item}":`, createTopicError);
        }
      }
    }

    if (finalTopicIds.length > 0) {
      // Use Set to prevent duplicate links
      const uniqueTopicIds = Array.from(new Set(finalTopicIds));
      const topicInserts = uniqueTopicIds.map((tId) => ({
        lesson_id: lessonId,
        topic_id: tId,
      }));

      const { error: topicError } = await supabase
        .from("lesson_topic")
        .insert(topicInserts);

      if (topicError) {
        console.error("Error linking topics:", topicError);
      }
    }
  }

  // 4. Insert into Sub-Tables based on Type
  let subTableError = null;

  try {
    console.log(`Inserting sub-table details for type: ${lessonType}`);
    
    // Check against the simple string values from the form ("analogy", "video", "interactive")
    if (lessonType === "analogy") {
      const comparisonObject = formData.get("comparisonObject") as string;

      const { error } = await supabase
        .from("analogy_lesson")
        .insert({
          lesson_id: lessonId,
          comparison_object: comparisonObject,
        });
      subTableError = error;

    } else if (lessonType === "video") {
      // The form sends "videoTitle" (source instructions). 
      // Mapping this to "video_url" assuming that is the intended column for the source.
      const videoTitle = formData.get("videoTitle") as string;
      
      const { error } = await supabase
        .from("video_lesson")
        .insert({
          lesson_id: lessonId,
          video_url: videoTitle, // Storing the source/title in the URL column
          // duration: null, // Form does not provide duration
        });
      subTableError = error;

    } else if (lessonType === "interactive") {
      // The form sends "prepTime" and "materials"
      const prepTime = formData.get("prepTime") as string;
      const materials = formData.get("materials") as string;
      
      // Combine into a content string or JSON
      const content = `Prep Time: ${prepTime}\nMaterials: ${materials}`;

      const { error } = await supabase
        .from("interactive_lesson")
        .insert({
          lesson_id: lessonId,
          content: content,
        });
      subTableError = error;
    }

  } catch (err) {
    console.error("Unexpected error in sub-table insertion:", err);
    subTableError = { message: "Error processing specific lesson details" };
  }

  // 5. Error Handling for Sub-tables
  if (subTableError) {
    console.error(`Error creating ${lessonType} details:`, subTableError);
    // Cleanup parent if sub-table fails to maintain integrity
    await supabase.from("lesson").delete().eq("lesson_id", lessonId);
    return { message: `Failed to save ${lessonType} details`, error: true };
  }

  // 6. Update User Stats
  console.log("Updating user stats...");
  if (appUser) {
    await supabase
      .from("app_user")
      .update({ num_lessons_added: (appUser.num_lessons_added || 0) + 1 })
      .eq("user_id", authorId);
  }

  // 7. Success
  console.log("Redirecting to /lessons...");
  revalidatePath("/lessons");
  redirect("/lessons/my-lessons");
}