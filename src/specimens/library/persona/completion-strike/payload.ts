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
    'Mount the task row and MARK COMPLETE control in a relative overflow-hidden frame.',
    'Import demo.css verbatim; keep frozen strike rotation (−3deg) and phase timings.',
    'Call runCompletionStrike on confirm; resetCompletionStrike restores idle instantly.',
    'Announce via polite live region; keep decorative strikes aria-hidden.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with the instant path.',
  ],
  acceptance: [
    'Task remains visible after completion; row becomes more compact',
    'Red strike crosses before layout contracts; black secondary strike follows',
    'Angular completion mark constructs from two bars (not Unicode check)',
    'COMPLETE label appears last; total ≈720ms; nothing loops',
    'Undo restores without theatrical un-complete; reduced motion is immediate',
    'Checkbox semantics + status announcement; sandbox-safe; no dependencies',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#090909;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
