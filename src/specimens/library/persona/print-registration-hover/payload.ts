import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative overflow-hidden frame (~360×280+).',
    'Import demo.css verbatim; keep frozen rest/hover offsets, rotations, 180ms/130ms timings, and easings.',
    'Use real links or buttons; keep plates/backing/marks pointer-events: none and aria-hidden.',
    'Ensure :focus-visible matches :hover separation and keeps a non-colour-only focus ring.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with instant state switches.',
  ],
  acceptance: [
    'Resting labels appear substantially registered',
    'Hover/focus separates red and cyan in opposing directions; master stays readable',
    'No random jitter, scanlines, flicker, or looping while hovered',
    'Exit physically re-registers layers (~130ms sharp ease)',
    'Keyboard focus-visible matches hover; decorative duplicates aria-hidden',
    'No hover flicker (pointer-events none on plates)',
    'Reduced motion switches immediately; CSS-only; no external assets; works 320–768px',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0a0b0e;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css },
  spec,
  contract,
}

export default payload
