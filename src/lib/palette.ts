/**
 * App colour palette (independent of the light/dark preference). The choice is
 * persisted in localStorage and applied as `data-palette` on <html>; theme.css
 * swaps its raw --pal-* slots per palette. 'gruvbox' is the default and clears
 * the attribute.
 *
 * Layout.astro applies the stored palette before first paint to avoid a flash.
 */
export const PALETTE_KEY = 'lite-learner-palette';

export type Palette = 'gruvbox' | 'boring' | 'forrest';

export const PALETTES: { value: Palette; label: string }[] = [
  { value: 'gruvbox', label: 'Gruvbox' },
  { value: 'boring', label: 'Boring' },
  { value: 'forrest', label: 'Forrest' },
];

export function getPalette(): Palette {
  if (typeof localStorage === 'undefined') return 'gruvbox';
  const v = localStorage.getItem(PALETTE_KEY);
  return v === 'boring' || v === 'forrest' ? v : 'gruvbox';
}

export function setPalette(palette: Palette): void {
  if (palette === 'gruvbox') {
    localStorage.removeItem(PALETTE_KEY);
    delete document.documentElement.dataset.palette;
  } else {
    localStorage.setItem(PALETTE_KEY, palette);
    document.documentElement.dataset.palette = palette;
  }
}
