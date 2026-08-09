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
    'Mount as an in-place augmentation of a persistent bond/rank card — this is not a modal or toast, the card stays in the layout.',
    'Import demo.css verbatim; keep the frozen flash/ring/number/banner timing values.',
    'Wire playRankUp / resetRankUp / replayRankUp (or equivalent class toggles) without appending duplicate ring nodes.',
    'Keep the rank number as real, readable text at all times; rings, flash, and banner are aria-hidden decoration.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with the static settled composition (new number, corner-tag banner).',
  ],
  acceptance: [
    'A whole-card flash plays first, before any other motion',
    'Three concentric rings burst outward from the rank badge with visible stagger',
    'The old rank number visibly shrinks away while the new rank number punches in with overshoot',
    'A RANK UP banner slams across the card centre with overshoot and recoil, then shrinks into a small permanent corner tag',
    'The banner does not fade out — it ends as a persistent visible tag, not gone',
    'Effect can be reset and replayed without accumulating DOM',
    'Reduced motion immediately shows the new rank number and the settled corner-tag banner',
    'Works from roughly 260-768px with no external assets or libraries',
  ],
  scaffold: `
<div class="bond-panel" style="position:relative;width:100%;height:320px;border:1px solid #2c313c;border-radius:2px;background:#12141a;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
