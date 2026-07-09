/**
 * Build-time manifest of every page the service worker should precache,
 * as base-relative paths (the SW resolves them against its scope). Course,
 * chapter, and exercise routes are generated from the content collections, so
 * new content is automatically offline-capable — no hardcoded route list to
 * keep in sync.
 */
import type { APIRoute } from 'astro';
import { loadCourseTrees } from '../lib/content/bundle';

export const GET: APIRoute = async () => {
  const paths = [
    '',
    'courses/',
    'playground/',
    'settings/',
    'onboarding/',
    'spike/',
    'favicon.svg',
    'manifest.webmanifest',
    'icons/icon-192.png',
    'icons/icon-512.png',
    'icons/maskable-192.png',
    'icons/maskable-512.png',
  ];
  for (const tree of await loadCourseTrees()) {
    paths.push(`courses/${tree.course.id}/`);
    for (const { chapter, lessons } of tree.chapters) {
      // Ids are path-scoped, so they double as the route path.
      paths.push(`courses/${chapter.id}/`);
      for (const lesson of lessons) {
        paths.push(`courses/${lesson.id}/`);
      }
    }
  }
  return new Response(JSON.stringify(paths), {
    headers: { 'Content-Type': 'application/json' },
  });
};
