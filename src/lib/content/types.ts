/**
 * Content payload shapes shared by the build-time emitter (bundle.ts) and
 * the client-side cache sync (sync.ts). Pages bake these into their HTML as
 * JSON so the client can cache content into IndexedDB next to progress.
 */
import type { DesiredState } from '../sql/comparator';

export interface CourseContent {
  slug: string;
  content_hash: string;
  title: string;
  description: string; // markdown body
  chapters: string[]; // ordered chapter slugs
}

export interface ChapterContent {
  slug: string;
  content_hash: string;
  title: string;
  description: string;
  exercises: string[]; // ordered exercise slugs
}

export interface ExerciseContent {
  slug: string;
  content_hash: string;
  title: string;
  description: string;
  initial_sql: string;
  desired_state: DesiredState;
}
