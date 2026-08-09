import type { SpecimenPayload } from '../../../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Keep three native radios in one named group; custom targets are visual only.',
    'Import demo.css verbatim; freeze 4 brackets, 6px / 320ms converge, 260ms ring, diamond scale 0→1.',
    'Drive selection with :checked so Arrow keys and Space stay native.',
    'Selected state is diamond + converged brackets, not colour alone.',
    'Honour both reduced-motion triggers: immediate target, no converge or ring.',
  ],
  acceptance: [
    'Exactly three native radios share one name: OPTION A / B / C',
    'Each option shows four faint corner brackets at rest',
    'Selected brackets converge inward 6px over 320ms',
    'Central diamond scales 0→1; ring scales .7→1.5 and fades once in 260ms',
    'Keyboard uses native radio behaviour (arrows + Space)',
    'Reduced motion shows the locked target immediately with no converge or ring',
    'CSS-only; no circular native radio chrome; no external assets',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#111827;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css },
  spec,
  contract,
}

export default payload
