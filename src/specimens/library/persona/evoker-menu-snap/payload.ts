import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  integration: [
    'Mount inside a relative, overflow-clipped host sized for the vertical rail (~260×280 minimum).',
    'Import demo.css verbatim; keep the frozen navy/blue/pale palette and ~210ms phase timings.',
    'Call selectEvokerMenu(index) or rely on auto-init on [data-evoker-menu]; keep radiogroup semantics.',
    'Guard rapid re-selection so mid-flight timers clear and choreography restarts on the new target.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with an immediate selected path.',
  ],
  acceptance: [
    'Four selectable items with exactly one active selection',
    'New selection runs release → execution line → angular snap → authority in ~190–230ms',
    'Execution line travels L→R and overshoots the row; no bounce/spring',
    'Immediate neighbours nudge only a few pixels while busy, then settle',
    'Keyboard arrows / Home / End / Enter / Space work among real radio controls; focus-visible remains',
    'Reduced motion switches immediately via prefers-reduced-motion and data-force-reduced-motion',
    'No weapon imagery; no external assets or libraries; sandbox="allow-scripts" safe',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#040d18;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
