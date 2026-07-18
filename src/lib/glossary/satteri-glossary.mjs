/**
 * Sätteri mdast plugin: wikimedia-style glossary links in any content markdown.
 *
 *   [[primary-key]]                 → linked as the term's display name
 *   [[primary-key|the primary key]] → linked as "the primary key"
 *
 * Each reference becomes an anchor to the term's landing page
 * (/glossary/<slug>/) carrying the term's name and short description as data
 * attributes — Layout.astro's popover script turns those into the hover/tap
 * definition popup, entirely offline, no runtime lookup.
 *
 * This is a Sätteri mdast plugin (Astro 7's default Markdown processor), not a
 * remark plugin: it visits `text` nodes and splits any [[refs]] out into inline
 * `link` nodes, tagged via `data.hProperties` so the mdast→hast conversion adds
 * the class and data attributes the popover script reads. Because inline code
 * and code blocks are their own node types (never `text` children), examples
 * can show the [[...]] syntax without it being linkified — no manual skip.
 *
 * The glossary is read from src/content/glossary/*.md ONCE when the plugin is
 * constructed (i.e. at astro.config load), so restart the dev server after
 * adding or renaming a term. An unknown slug throws, failing the build the
 * same way broken chapter/lesson wiring does.
 *
 * Plain .mjs (not .ts): astro.config.mjs imports it directly at config-load
 * time, before any TypeScript pipeline exists.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { defineMdastPlugin } from 'satteri';

const GLOSSARY_DIR = 'src/content/glossary';
// Text between [[ and ]], with an optional |display part.
const REF_PATTERN = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

/** Minimal frontmatter reader for the two simple string fields we need. */
function readFrontmatter(path) {
  const raw = readFileSync(path, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^(term|short):\s*(.+)$/);
    if (kv) fields[kv[1]] = kv[2].trim().replace(/^(['"])(.*)\1$/, '$2');
  }
  return fields;
}

function loadGlossary() {
  const terms = new Map();
  let files = [];
  try {
    files = readdirSync(GLOSSARY_DIR).filter((f) => f.endsWith('.md'));
  } catch {
    return terms; // no glossary directory yet — [[refs]] will throw below
  }
  for (const file of files) {
    const slug = basename(file, '.md');
    const { term, short } = readFrontmatter(join(GLOSSARY_DIR, file));
    terms.set(slug, { term: term ?? slug, short: short ?? '' });
  }
  return terms;
}

/**
 * @param {{ base?: string }} options — the app's base path, so glossary hrefs
 *   work under sub-path hosting (mirrors lib/paths.ts, which markdown can't use).
 * @returns a Sätteri mdast plugin definition for `markdown.processor` plugins.
 */
export function glossaryMdastPlugin(options = {}) {
  const base = (options.base ?? '/').replace(/\/$/, '');
  const terms = loadGlossary();

  return defineMdastPlugin({
    name: 'glossary',
    text(node, ctx) {
      const value = node.value;
      if (!value.includes('[[')) return;
      REF_PATTERN.lastIndex = 0;
      if (!REF_PATTERN.test(value)) return;

      const parts = [];
      let last = 0;
      // `.test()` above advanced lastIndex; reset so matchAll starts at the
      // first ref (a shared global regex otherwise skips it).
      REF_PATTERN.lastIndex = 0;
      for (const m of value.matchAll(REF_PATTERN)) {
        const [whole, slug, display] = m;
        const entry = terms.get(slug.trim());
        if (!entry) {
          throw new Error(
            `Unknown glossary term "[[${slug}]]" — no ${GLOSSARY_DIR}/${slug.trim()}.md ` +
              `(restart the dev server if you just added it)`
          );
        }
        if (m.index > last) parts.push({ type: 'text', value: value.slice(last, m.index) });
        parts.push({
          type: 'link',
          url: `${base}/glossary/${slug.trim()}/`,
          children: [{ type: 'text', value: (display ?? entry.term).trim() }],
          // hProperties ride through the mdast→hast conversion as real
          // attributes; the serializer escapes their values for us.
          data: {
            hProperties: {
              className: 'glossary-link',
              'data-term': entry.term,
              'data-short': entry.short,
            },
          },
        });
        last = m.index + whole.length;
      }
      if (last < value.length) parts.push({ type: 'text', value: value.slice(last) });

      // Replace the single text node with the [text, <a>, text, …] sequence.
      ctx.insertBefore(node, parts);
      ctx.removeNode(node);
    },
  });
}
