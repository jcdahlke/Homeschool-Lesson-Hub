// NextResponse is used to send structured JSON responses from API routes.
import { NextResponse } from "next/server";

// Import the official OpenAI Node SDK.
// This lets us call the embeddings API from a secure server environment.
import OpenAI from "openai";

// Create a single OpenAI client instance.
// It uses your API key from environment variables (`.env.local`).
// This runs ONLY on the server and is NOT exposed to the client.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST handler for the /api/embed endpoint.
// Next.js App Router uses the exported function name to determine the HTTP method.
export async function POST(request: Request) {
  try {
    // The client sends `{ input: "text to embed" }` in the request body.
    const { input } = await request.json();

    // If the user didn't include text, return an error immediately.
    if (!input) {
      return NextResponse.json({ error: "Missing input text" }, { status: 400 });
    }

    // Call OpenAI Embeddings API.
    // "text-embedding-3-small" is lightweight, inexpensive, and good for most RAG/search tasks.
    //
    // NOTE: You can switch to "text-embedding-3-large" if you need maximum accuracy.
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input,
    });

    // The API returns an array (even for a single input).
    // We pull out the first embedding vector.
    const embedding = response.data[0].embedding;

    // Send the embedding back to the caller.
    // This will be a long array of floats (e.g., 1536 dimensions).
    return NextResponse.json({ embedding });

  } catch (error) {
    // If something unexpected happens, log it (server-side only)
    console.error("Embedding Error:", error);

    // Send a safe error response to the client.
    return NextResponse.json(
      { error: "Failed to generate embeddings" },
      { status: 500 }
    );
  }
}
