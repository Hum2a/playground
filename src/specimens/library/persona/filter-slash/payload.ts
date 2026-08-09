import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Wire setFilterActive(active) to your real filter predicate; keep every row node mounted and collapse non-matching rows rather than removing them.',
    'Import demo.css verbatim; keep the frozen sweep, strike, and per-row stagger timing values.',
    'Only pulse the blade sweep class on activation — deactivation should reverse rows via plain transitions with no re-triggered sweep.',
    'Keep the toggle a real button with aria-pressed reflecting filter state.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion by dropping the blade animation and stagger, collapsing to a plain opacity change.',
  ],
  acceptance: [
    'Activating the filter sweeps a single diagonal blade across the list once',
    'Each non-matching row is struck through before it collapses, not the reverse order',
    'Non-matching rows collapse with a visible stagger, not all at the same instant',
    'Matching rows are never struck or hidden and simply reflow as space opens',
    'Deactivating the filter restores previously hidden rows',
    'The blade only plays once per activation, never repeats or loops',
    'Reduced motion still filters correctly via a plain opacity change with no stagger',
    'Works from roughly 300-768px with no external assets or libraries',
  ],
  scaffold: `
<div class="list-panel" style="width:100%;padding:1rem;border:1px solid #2c313c;border-radius:2px;background:#12141a;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
