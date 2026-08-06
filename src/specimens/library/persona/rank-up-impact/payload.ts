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
    'Mount inside a relative overflow-hidden host (~280px tall) so celebration geometry clips safely.',
    'Import demo.css verbatim; keep frozen black/red/paper palette and phase timings (~1550ms).',
    'Call runRankUp() from GAIN RANK (or your control); ignore re-entry while busy.',
    'Keep FX aria-hidden; announce once on settle: “Rank increased to 5. Advanced Filters unlocked.”',
    'Use resetRankUp / replayRankUp (or harness restart) to restore rank 04 deterministically.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with the instant result card.',
  ],
  acceptance: [
    'Old rank visibly leaves (struck/split) before new rank settles',
    'Three concentric irregular rings participate; new rank is the largest element and overshoots',
    'RANK UP follows rank impact; ability unlock follows RANK UP',
    'Final compact RANK 05 + Advanced Filters unlocked remains',
    'No confetti library or copyrighted assets; ~1550ms total; deterministic replay',
    'Reduced motion immediately presents the result; works ~320–768px in sandboxed iframe',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:280px;border:1px solid #2c313c;border-radius:2px;background:#12141a;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
