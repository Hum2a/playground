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
    'Mount in a wide relative host (~720×400). The specimen owns the plate — avoid padded scaffolds.',
    'Import demo.css verbatim; keep initial 42%/16%/42% page/gap split, 680ms ease, and headline scale/opacity.',
    'Call open via the Open spread control (or wire an equivalent); Reset returns to the cropped state.',
    'Do not allow pages to overlap the spine — flex bases must sum without collision.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate open spread.',
  ],
  acceptance: [
    'Initial composition is visibly narrower than the final spread (42% + 16% gap + 42%)',
    'Final pages meet at centre (50% / 1px spine / 50%) with no centre overlap',
    'Cross-page accent mark halves align when open',
    'Headline scales 0.72→1 and opacity 0.15→1 over 680ms with the page expand',
    'Reduced motion displays the complete double-page spread immediately',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:400px;background:#0c0c0c;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
