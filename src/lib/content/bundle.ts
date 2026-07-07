/**
 * BUILD-TIME ONLY (imports node:crypto + astro:content types) — turns content
 * collection entries into the JSON payloads pages embed for the client, each
 * stamped with a stable content_hash so the client cache can detect
 * re-authored content across deploys.
 */
import { createHash } from 'node:crypto';
import type { CollectionEntry } from 'astro:content';
import type { ChapterContent, CourseContent, ExerciseContent } from './types';

/** JSON.stringify with recursively sorted object keys, so hashing is stable. */
function canonicalize(value: unknown): string {
  if (Array.isArray(value)) {
    return '[' + value.map(canonicalize).join(',') + ']';
  }
  if (value !== null && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
      .map(([k, v]) => JSON.stringify(k) + ':' + canonicalize(v));
    return '{' + entries.join(',') + '}';
  }
  return JSON.stringify(value) ?? 'null';
}

/** Stable hash of one entry's content (frontmatter + body). */
export function contentHash(data: unknown, body: string): string {
  return createHash('sha256')
    .update(canonicalize({ body, data }))
    .digest('hex');
}

export function courseContent(entry: CollectionEntry<'courses'>): CourseContent {
  const body = entry.body ?? '';
  return {
    slug: entry.id,
    content_hash: contentHash(entry.data, body),
    title: entry.data.title,
    description: body,
    chapters: entry.data.chapters.map((ref) => ref.id),
  };
}

export function chapterContent(entry: CollectionEntry<'chapters'>): ChapterContent {
  const body = entry.body ?? '';
  return {
    slug: entry.id,
    content_hash: contentHash(entry.data, body),
    title: entry.data.title,
    description: body,
    exercises: entry.data.exercises.map((ref) => ref.id),
  };
}

export function exerciseContent(entry: CollectionEntry<'exercises'>): ExerciseContent {
  const body = entry.body ?? '';
  return {
    slug: entry.id,
    content_hash: contentHash(entry.data, body),
    title: entry.data.title,
    description: body,
    initial_sql: entry.data.initial_sql,
    desired_state: entry.data.desired_state,
  };
}
