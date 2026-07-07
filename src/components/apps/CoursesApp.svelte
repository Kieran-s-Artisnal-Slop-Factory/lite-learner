<script lang="ts">
  // Available courses (baked into the page at build time) + the cached rows
  // in IndexedDB. "Cache course" runs the content-hash sync — the same flow
  // enrollment (Phase 3) will use: create missing rows, refresh stale
  // content, and always preserve progress. Real course pages arrive in
  // Phase 2.
  import { onMount } from 'svelte';
  import { all } from '../../lib/db/repo';
  import type { Courses } from '../../lib/db/types';
  import type { ChapterContent, CourseContent, ExerciseContent } from '../../lib/content/types';
  import { syncCourseBundle } from '../../lib/content/sync';
  import Card from '../Card.svelte';

  interface Bundle {
    course: CourseContent;
    chapters: ChapterContent[];
    exercises: ExerciseContent[];
  }

  let { bundles = [] }: { bundles?: Bundle[] } = $props();

  let loading = $state(true);
  let cached: Courses[] = $state([]);

  const cachedRow = (slug: string) => cached.find((c) => c.id === slug);

  async function refresh() {
    cached = await all<Courses>('courses');
  }

  async function cacheCourse(bundle: Bundle) {
    await syncCourseBundle($state.snapshot(bundle) as Bundle);
    await refresh();
  }

  onMount(async () => {
    await refresh();
    loading = false;
  });
</script>

<div class="page-header">
  <h1>Courses</h1>
</div>

{#if loading}
  <p class="muted">Loading…</p>
{:else}
  <div class="stack">
    {#each bundles as bundle (bundle.course.slug)}
      {@const row = cachedRow(bundle.course.slug)}
      <Card title={bundle.course.title}>
        <p class="muted">
          {bundle.chapters.length} chapters · {bundle.exercises.length} exercises
        </p>
        <p class="description">{bundle.course.description.split('\n')[0]}</p>
        <div class="row meta">
          {#if row}
            {#if row.content_hash === bundle.course.content_hash}
              <span class="badge">cached · up to date</span>
            {:else}
              <span class="badge stale">cached · content changed</span>
            {/if}
            {#if row.started}<span class="badge">started</span>{/if}
            {#if row.completed}<span class="badge done">completed</span>{/if}
          {:else}
            <span class="badge">not cached</span>
          {/if}
        </div>
        <button class="btn btn-primary" onclick={() => cacheCourse(bundle)}>
          {row ? 'Refresh cache' : 'Cache course'}
        </button>
      </Card>
    {:else}
      <p class="muted">No courses have been authored yet.</p>
    {/each}
  </div>
{/if}

<style>
  .stack {
    display: grid;
    gap: var(--space-4);
  }

  .description {
    margin-block: var(--space-2);
  }

  .meta {
    gap: var(--space-2);
    margin-bottom: var(--space-3);
    flex-wrap: wrap;
  }

  .badge {
    font-size: var(--font-size-sm);
    padding: 0 var(--space-2);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-full);
    color: var(--text-muted-color);
  }

  .badge.stale {
    color: var(--color-danger);
    border-color: var(--color-danger);
  }

  .badge.done {
    color: var(--color-primary-strong);
    border-color: var(--color-primary);
  }
</style>
