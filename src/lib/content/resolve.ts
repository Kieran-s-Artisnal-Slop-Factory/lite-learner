/**
 * Pure content-tree helpers, kept free of astro:content imports so they can
 * be unit-tested: path→id derivation for the glob loaders, and the
 * relative-leaf → full-id resolver used by the bundler.
 */

/**
 * Entry path → id: strip `.md`, collapse `<dir>/index` to `<dir>`, and drop
 * numeric `N.` ordering prefixes from every segment (`1.sqlite-basics` →
 * `sqlite-basics`). The prefixes order folders on disk and in the course
 * listing but stay out of URLs and progress keys — so renumbering a course
 * never breaks links or wipes progress. (Two siblings whose names differ only
 * by prefix would collide to one id — don't do that.)
 */
export function idFromEntry(entry: string): string {
  return entry
    .replace(/\\/g, '/')
    .replace(/\.md$/, '')
    .replace(/\/index$/, '')
    .split('/')
    .map((segment) => segment.replace(/^\d+\./, ''))
    .join('/');
}

interface CourseLike {
  id: string;
  data: { chapters: string[] };
}
interface ChapterLike {
  id: string;
  data: { lessons: string[] };
}
interface LessonLike {
  id: string;
}

export interface ResolvedTree<C extends CourseLike, Ch extends ChapterLike, L extends LessonLike> {
  course: C;
  chapters: { chapter: Ch; lessons: L[] }[];
}

/**
 * Resolve every course's relative-leaf child arrays into full path ids
 * (`${parentId}/${leaf}`). Throws on a listed child that doesn't exist AND on
 * files no parent lists (orphans) — both would otherwise ship broken or
 * invisible content.
 */
export function resolveTrees<C extends CourseLike, Ch extends ChapterLike, L extends LessonLike>(
  courses: C[],
  chapters: Ch[],
  lessons: L[]
): ResolvedTree<C, Ch, L>[] {
  const chaptersById = new Map(chapters.map((c) => [c.id, c]));
  const lessonsById = new Map(lessons.map((l) => [l.id, l]));
  const listedChapters = new Set<string>();
  const listedLessons = new Set<string>();

  const trees = courses.map((course) => ({
    course,
    chapters: course.data.chapters.map((chapterLeaf) => {
      const chapterId = `${course.id}/${chapterLeaf}`;
      const chapter = chaptersById.get(chapterId);
      if (!chapter) {
        throw new Error(
          `Course "${course.id}" lists chapter "${chapterLeaf}" but ` +
            `src/content/courses/${chapterId}/index.md does not exist`
        );
      }
      listedChapters.add(chapterId);
      return {
        chapter,
        lessons: chapter.data.lessons.map((lessonLeaf) => {
          const lessonId = `${chapterId}/${lessonLeaf}`;
          const lesson = lessonsById.get(lessonId);
          if (!lesson) {
            throw new Error(
              `Chapter "${chapterId}" lists lesson "${lessonLeaf}" but ` +
                `src/content/courses/${lessonId}.md does not exist`
            );
          }
          listedLessons.add(lessonId);
          return lesson;
        }),
      };
    }),
  }));

  const orphanChapters = chapters.filter((c) => !listedChapters.has(c.id));
  const orphanLessons = lessons.filter((l) => !listedLessons.has(l.id));
  if (orphanChapters.length > 0 || orphanLessons.length > 0) {
    const lines = [
      ...orphanChapters.map((c) => `  chapter "${c.id}" is not in its course's chapters: list`),
      ...orphanLessons.map((l) => `  lesson "${l.id}" is not in its chapter's lessons: list`),
    ];
    throw new Error(
      `Orphaned content — files exist but no parent lists them, so they would never appear:\n` +
        lines.join('\n')
    );
  }

  return trees;
}
