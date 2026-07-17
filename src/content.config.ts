/**
 * Content collections — the authored, static half of the data model.
 *
 * Layout: one folder per course, one sub-folder per chapter, and lesson files
 * inside chapter folders (named anything). `index.md` is the course/chapter
 * main page. All three collections share one base and are separated by glob
 * depth:
 *
 *   src/content/courses/
 *     N.sqlite-basics/                   ← course folder (N. orders the listing)
 *       index.md                         ← the COURSE
 *       what-is-a-database/              ← chapter folder
 *         index.md                       ← the CHAPTER
 *         count-rows.md                  ← a LESSON
 *
 * Ids are path-scoped (`sqlite-basics/what-is-a-database/count-rows`), so leaf
 * names only need to be unique within their folder. Numeric `N.` folder
 * prefixes order the course listing but are stripped from ids (and therefore
 * URLs and progress keys), so renumbering courses is always safe.
 *
 * Ordering lives in the parent's frontmatter: a course lists its chapter
 * folder names in `chapters:`, a chapter lists its lesson file names (minus
 * `.md`) in `lessons:` — array order IS the order. These are plain relative
 * leaf names; the bundler (src/lib/content/bundle.ts) resolves them to full
 * ids and fails the build on anything missing or orphaned.
 *
 * A lesson with `desired_state` is a checkable EXERCISE; without one it is a
 * READING page (optionally with a seeded database to explore via
 * `initial_sql`).
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { idFromEntry } from './lib/content/resolve';

const base = './src/content/courses';

const generateId = ({ entry }: { entry: string }) => idFromEntry(entry);

const courses = defineCollection({
  loader: glob({ base, pattern: '*/index.md', generateId }),
  schema: z.object({
    title: z.string(),
    // Chapter FOLDER names (relative to this course's folder), in order.
    chapters: z.array(z.string()),
  }),
});

const chapters = defineCollection({
  loader: glob({ base, pattern: '*/*/index.md', generateId }),
  schema: z.object({
    title: z.string(),
    // Lesson FILE names minus `.md` (relative to this chapter's folder), in order.
    lessons: z.array(z.string()),
  }),
});

const lessons = defineCollection({
  // Every .md exactly one level inside a chapter folder that is not an index.
  loader: glob({ base, pattern: ['*/*/*.md', '!**/index.md'], generateId }),
  schema: z
    .object({
      title: z.string(),
      // Seeds a fresh in-memory DB on load/reset. Optional: a pure-prose
      // reading lesson needs no database at all.
      initial_sql: z.string().optional(),
      // The embedded solution: `query` runs against the user's DB and the
      // result is compared positionally to `rows` (authors must ORDER BY).
      // Present ⇒ the lesson is a checkable exercise.
      desired_state: z
        .object({
          query: z.string(),
          rows: z.array(z.record(z.string(), z.unknown())),
        })
        .optional(),
    })
    .refine((data) => !data.desired_state || data.initial_sql !== undefined, {
      message: 'A lesson with desired_state must also provide initial_sql (the starting DB).',
    }),
});

export const collections = { courses, chapters, lessons };
