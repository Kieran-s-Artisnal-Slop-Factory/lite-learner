import { describe, expect, it } from 'vitest';
import { idFromEntry, resolveTrees } from './resolve';

describe('idFromEntry', () => {
  it('derives a course id from its index.md', () => {
    expect(idFromEntry('sqlite-basics/index.md')).toBe('sqlite-basics');
  });
  it('derives a chapter id from its index.md', () => {
    expect(idFromEntry('sqlite-basics/what-is-a-database/index.md')).toBe(
      'sqlite-basics/what-is-a-database'
    );
  });
  it('derives a lesson id from its file name', () => {
    expect(idFromEntry('sqlite-basics/what-is-a-database/count-rows.md')).toBe(
      'sqlite-basics/what-is-a-database/count-rows'
    );
  });
  it('normalizes Windows path separators', () => {
    expect(idFromEntry('sqlite-basics\\what-is-a-database\\index.md')).toBe(
      'sqlite-basics/what-is-a-database'
    );
  });
  it('only collapses a trailing /index, not a lesson named index-something', () => {
    expect(idFromEntry('c/ch/index-tuning.md')).toBe('c/ch/index-tuning');
  });

  it('strips numeric N. ordering prefixes from every segment', () => {
    expect(idFromEntry('1.intro-to-databases/index.md')).toBe('intro-to-databases');
    expect(idFromEntry('2.sqlite-basics/what-is-a-database/count-rows.md')).toBe(
      'sqlite-basics/what-is-a-database/count-rows'
    );
    expect(idFromEntry('c/1.first-chapter/index.md')).toBe('c/first-chapter');
  });

  it('leaves digits alone unless they form an N. prefix', () => {
    expect(idFromEntry('c/ch/2024-review.md')).toBe('c/ch/2024-review');
    expect(idFromEntry('c/ch/top-10.md')).toBe('c/ch/top-10');
  });
});

describe('resolveTrees', () => {
  const course = (id: string, chapters: string[]) => ({ id, data: { chapters } });
  const chapter = (id: string, lessons: string[]) => ({ id, data: { lessons } });
  const lesson = (id: string) => ({ id });

  it('resolves relative leaves into full ids, preserving order', () => {
    const trees = resolveTrees(
      [course('c1', ['ch-b', 'ch-a'])],
      [chapter('c1/ch-a', ['l1']), chapter('c1/ch-b', ['l2', 'l1'])],
      [lesson('c1/ch-a/l1'), lesson('c1/ch-b/l1'), lesson('c1/ch-b/l2')]
    );
    expect(trees[0]!.chapters.map((c) => c.chapter.id)).toEqual(['c1/ch-b', 'c1/ch-a']);
    expect(trees[0]!.chapters[0]!.lessons.map((l) => l.id)).toEqual(['c1/ch-b/l2', 'c1/ch-b/l1']);
  });

  it('same leaf name in different chapters resolves to different lessons', () => {
    const trees = resolveTrees(
      [course('c1', ['ch-a', 'ch-b'])],
      [chapter('c1/ch-a', ['schema']), chapter('c1/ch-b', ['schema'])],
      [lesson('c1/ch-a/schema'), lesson('c1/ch-b/schema')]
    );
    expect(trees[0]!.chapters[0]!.lessons[0]!.id).toBe('c1/ch-a/schema');
    expect(trees[0]!.chapters[1]!.lessons[0]!.id).toBe('c1/ch-b/schema');
  });

  it('throws when a course lists a missing chapter', () => {
    expect(() => resolveTrees([course('c1', ['nope'])], [], [])).toThrow(
      /lists chapter "nope"/
    );
  });

  it('throws when a chapter lists a missing lesson', () => {
    expect(() =>
      resolveTrees([course('c1', ['ch'])], [chapter('c1/ch', ['nope'])], [])
    ).toThrow(/lists lesson "nope"/);
  });

  it('throws on an orphaned lesson (exists but unlisted)', () => {
    expect(() =>
      resolveTrees(
        [course('c1', ['ch'])],
        [chapter('c1/ch', [])],
        [lesson('c1/ch/forgotten')]
      )
    ).toThrow(/Orphaned content[\s\S]*forgotten/);
  });

  it('throws on an orphaned chapter (exists but unlisted)', () => {
    expect(() =>
      resolveTrees([course('c1', [])], [chapter('c1/stray', [])], [])
    ).toThrow(/Orphaned content[\s\S]*stray/);
  });
});
