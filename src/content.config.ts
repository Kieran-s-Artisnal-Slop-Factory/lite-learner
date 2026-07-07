/**
 * Content collections — the authored, static half of the data model.
 * Markdown bodies are the descriptions; cross-collection wiring uses
 * reference() so a broken slug fails the build.
 * Array order IS the chapter/exercise order — no separate order field.
 */
import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const courses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/courses' }),
  schema: z.object({
    title: z.string(),
    chapters: z.array(reference('chapters')),
  }),
});

const chapters = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/chapters' }),
  schema: z.object({
    title: z.string(),
    exercises: z.array(reference('exercises')),
  }),
});

const exercises = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/exercises' }),
  schema: z.object({
    title: z.string(),
    initial_sql: z.string(),
    // The embedded solution: `query` runs against the user's DB and the
    // result is compared positionally to `rows` (authors must ORDER BY).
    desired_state: z.object({
      query: z.string(),
      rows: z.array(z.record(z.string(), z.unknown())),
    }),
  }),
});

export const collections = { courses, chapters, exercises };
