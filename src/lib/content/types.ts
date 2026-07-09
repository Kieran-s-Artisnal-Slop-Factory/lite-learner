/**
 * Content payload shapes shared by the build-time emitter (bundle.ts) and
 * the client-side cache sync (sync.ts). Pages bake these into their HTML as
 * JSON so the client can cache content into IndexedDB next to progress.
 *
 * Slugs are path-scoped ids (`course/chapter/lesson`), which double as the
 * URL path under /courses/.
 */
import type { DesiredState } from '../sql/comparator';

export interface CourseContent {
  slug: string;
  content_hash: string;
  title: string;
  description: string; // markdown body
  chapters: string[]; // ordered chapter slugs (full ids)
}

export interface ChapterContent {
  slug: string;
  content_hash: string;
  title: string;
  description: string;
  lessons: string[]; // ordered lesson slugs (full ids)
}

/**
 * A lesson is an EXERCISE when it declares a `desired_state` solution;
 * otherwise it is a READING page (optionally with a seeded DB to explore).
 * `kind` is derived at build time, never authored.
 */
export type LessonKind = 'exercise' | 'reading';

export interface LessonContent {
  slug: string;
  content_hash: string;
  title: string;
  description: string;
  kind: LessonKind;
  initial_sql?: string;
  desired_state?: DesiredState;
}
