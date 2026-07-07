/**
 * Entity types + object-store map.
 *
 * Two kinds of data share each row:
 *  - cached CONTENT (title, description, …) copied from the static content
 *    collections on enrollment and refreshed via `content_hash`
 *  - per-visitor PROGRESS (started, completed, user_solution, …) that lives
 *    only in IndexedDB
 *
 * Content-backed rows are keyed by the content slug (`id` = slug), which is
 * stable across builds — that is what lets the content-hash check find the
 * right row to refresh.
 */
import type { DesiredState } from '../sql/comparator';

/**
 * Bookkeeping fields on every entity. This app is offline-only, but the
 * fields keep soft deletes working and leave the door open to adding a sync
 * backend later without a data migration.
 */
export interface SyncFields {
  id: string; // content slug for content-backed rows
  updated_at: string; // UTC ISO 8601; LWW conflict-resolution field
  deleted_at: string | null; // soft-delete tombstone (null = alive)
  server_seq: number | null; // server sync cursor (null = never synced)
}

/** Content fields cached from the static bundle, refreshed by hash. */
export interface CachedContent {
  content_hash: string;
  title: string;
  description: string; // markdown body
}

export interface Courses extends SyncFields, CachedContent {
  chapters: string[]; // ordered chapter slugs — array order is chapter order
  // progress
  current_chapter: string | null; // chapter slug
  started: string | null; // UTC ISO 8601
  completed: string | null; // UTC ISO 8601 — completion derives from != null
}

export interface Chapters extends SyncFields, CachedContent {
  exercises: string[]; // ordered exercise slugs — array order is exercise order
  // progress
  started: string | null; // UTC ISO 8601
  completed: string | null; // UTC ISO 8601
}

export interface Exercises extends SyncFields, CachedContent {
  initial_sql: string;
  desired_state: DesiredState;
  // progress
  user_solution: string | null; // last editor buffer; restored but never auto-run
  started: string | null; // UTC ISO 8601
  completed: string | null; // UTC ISO 8601
}

export interface StoreIndex {
  name: string;
  multiEntry?: boolean;
}

export const STORES: Record<string, { indexes: StoreIndex[] }> = {
  exercises: { indexes: [] },
  courses: { indexes: [] },
  chapters: { indexes: [] },
};

export type StoreName = keyof typeof STORES;
