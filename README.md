# Homeschool-Lesson-Hub

A public forum where people can post homeschool lesson ideas to help faciliate learning in different methods.

## 1. Problem Statement

Homeschool educators and parents often spend a significant amount of time sifting through fragmented sources (blogs, forums, and social media) to find high-quality, interactive, and intuitive lesson ideas. There is no centralized, well-organized, and easily searchable platform dedicated specifically to these hands-on activities, forcing educators to reinvent the wheel or settle for static worksheets. Even college students have issues understanding ideas intuitively.

## 2. Proposed Solution

We propose to build a web-based application, the "Homeschool Lesson Hub," to solve this problem. The Hub will be a community-driven repository where users can submit their own creative lesson ideas and discover ideas from others.

The application's core feature will be a robust search and filtering system, allowing users to find the exact lesson they need by:

* Subject (e.g., Science, Math, History)
* Specific Topic (e.g., Biology, Fractions, Ancient Rome)
* Age Range (e.g., 5-7, 8-10)
* Lesson Type (Interactive, Analogy, Video, etc.)
* Materials Needed (e.g., "common household items")
* Prep Time

### 2.5. Core Features

* Post and share homeschool lessons with clear metadata.
* Browse, search, and filter lessons by subject, age, type, and materials.
* Upvote or comment on useful lessons (community engagement feature).
* Save favorite lessons for later.

## 3. Core Database Implementation (Project Scope)

This project is fundamentally a database-driven application. We will be using PostgreSQL to demonstrate a variety of key database concepts.

* Database System: PostgreSQL (hosted on Supabase)

* Schema Design: The core of the project will be designing a normalized, relational schema. This will include tables such as:

  * lessons (lesson_id, title, description, instructions, age_range, etc.)
  * lesson_type (lesson_type_id, lesson_type_name)
  * users (user_id, username)
  * genres (genre_id, genre_name)
  * topics (topic_id, topic_name, genre_id)

* Relational Logic (JOINS): The schema will effectively use relationships to link data.

  * One-to-Many: A user can post many lessons. A genre can have many topics.
  * Many-to-Many: A single lesson may cover multiple topics. This will be implemented using a lesson_topics_junction table, a classic database design pattern.

* CRUD Operations: The application's functionality will map directly to all CRUD operations:

  * Create: INSERT new records when a user submits a lesson.
  * Read: Use complex SELECT queries with multiple JOINs to power the search and filter page.
  * Update: Allow users to UPDATE their submitted lessons.
  * Delete: Allow users to DELETE their submissions.

## 4. Advanced Feature (Stretch Goal)

To add an advanced search feature, we plan to implement semantic (vector) search using the pgvector extension for PostgreSQL.

* Problem: A user might search for "baking math," but a standard keyword search would miss a great lesson titled "Using a Pizza to Learn Ratios."
* Solution: By using pgvector, we will store vector embeddings of each lesson's description. This will allow the search engine to find lessons based on conceptual meaning and semantic similarity, not just keyword matching. This demonstrates a modern, powerful use of PostgreSQL beyond simple relational data.

## 5. Proposed Technology Stack

* Database: PostgreSQL (via Supabase)
* Web Framework: Next.js (React)
* Database Client: supabase-js
* Vector Search: pgvector
