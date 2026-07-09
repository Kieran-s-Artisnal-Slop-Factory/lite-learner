/**
 * Progress stamping. Completion is always the nullable `completed` timestamp
 * — "is complete" derives from `completed != null`.
 *
 * Rules:
 *  - opening a lesson stamps started on the lesson, its chapter, and its
 *    course (first time only) and points course.current_chapter at the chapter
 *  - completing a lesson (a passing solution check for exercises, "Mark as
 *    read" for reading lessons) stamps lesson.completed, then cascades:
 *    chapter.completed when every lesson in it is complete, course.completed
 *    when every chapter is complete
 */
import { get, nowIso, put } from './db/repo';
import type { Chapters, Courses, Lessons } from './db/types';

/** Lesson-load bookkeeping: stamp started + course position. */
export async function markLessonOpened(
  courseSlug: string,
  chapterSlug: string,
  lesson: Lessons
): Promise<Lessons> {
  const now = nowIso();
  let updated = lesson;
  if (!lesson.started) {
    updated = await put<Lessons>('lessons', { ...lesson, started: now });
  }
  const chapter = await get<Chapters>('chapters', chapterSlug);
  if (chapter && !chapter.started) {
    await put<Chapters>('chapters', { ...chapter, started: now });
  }
  const course = await get<Courses>('courses', courseSlug);
  if (course && (!course.started || course.current_chapter !== chapterSlug)) {
    await put<Courses>('courses', {
      ...course,
      started: course.started ?? now,
      current_chapter: chapterSlug,
    });
  }
  return updated;
}

/**
 * Stamp a completed lesson and cascade chapter/course completion. Exercises
 * arrive here from a passing check, reading lessons from "Mark as read" —
 * the cascade treats every lesson uniformly.
 */
export async function markLessonCompleted(
  courseSlug: string,
  chapterSlug: string,
  lesson: Lessons
): Promise<Lessons> {
  const now = nowIso();
  const updated = lesson.completed
    ? lesson
    : await put<Lessons>('lessons', { ...lesson, completed: now });

  const chapter = await get<Chapters>('chapters', chapterSlug);
  if (chapter && !chapter.completed) {
    const siblings = await Promise.all(chapter.lessons.map((slug) => get<Lessons>('lessons', slug)));
    if (siblings.every((l) => l?.completed)) {
      await put<Chapters>('chapters', { ...chapter, completed: now });
      const course = await get<Courses>('courses', courseSlug);
      if (course && !course.completed) {
        const chapters = await Promise.all(course.chapters.map((slug) => get<Chapters>('chapters', slug)));
        if (chapters.every((c) => c?.completed)) {
          await put<Courses>('courses', { ...course, completed: now });
        }
      }
    }
  }
  return updated;
}
