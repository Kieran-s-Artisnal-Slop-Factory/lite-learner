<script lang="ts">
  // Read-only view of the cached exercise rows (content + progress). Content
  // is authored in src/content/ — the real exercise page arrives in Phase 2.
  import { onMount } from 'svelte';
  import { all } from '../../lib/db/repo';
  import type { Exercises } from '../../lib/db/types';

  let loading = $state(true);
  let rows: Exercises[] = $state([]);

  onMount(async () => {
    rows = await all<Exercises>('exercises');
    loading = false;
  });
</script>

<div class="page-header">
  <h1>Exercises</h1>
</div>

{#if loading}
  <p class="muted">Loading…</p>
{:else if rows.length === 0}
  <p class="muted">No cached exercises yet — exercises are cached when you enroll in a course.</p>
{:else}
  <div class="table-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th>Slug</th>
          <th>Title</th>
          <th>Started</th>
          <th>Completed</th>
          <th>Saved buffer</th>
          <th>Content hash</th>
        </tr>
      </thead>
      <tbody>
        {#each rows as row (row.id)}
          <tr>
            <td class="mono">{row.id}</td>
            <td>{row.title}</td>
            <td>{row.started ? new Date(row.started).toLocaleString() : ''}</td>
            <td>{row.completed ? new Date(row.completed).toLocaleString() : ''}</td>
            <td>{row.user_solution ? '✓' : ''}</td>
            <td class="mono">{row.content_hash.slice(0, 8)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}

<style>
  .mono {
    font-family: ui-monospace, monospace;
    font-size: var(--font-size-sm);
  }
</style>
