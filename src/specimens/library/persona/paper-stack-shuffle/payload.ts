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
    'Mount the stack demo inside a relative overflow-hidden frame tall enough for lift/extract travel (~320px+).',
    'Import demo.css verbatim; keep frozen depth poses, clip-paths, and palette hex values.',
    'Call shufflePaperStack("next" | "prev") from your controls; honour the busy lock so animations never overlap.',
    'Announce selection via a single polite status string; keep the visual stack aria-hidden.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with the immediate reorder path.',
  ],
  acceptance: [
    'Exactly four visible sheets with frozen per-depth rotation/offset',
    'NEXT extracts the front sheet; remaining sheets visibly advance; extracted sheet returns at the back',
    'No visible z-index teleport while sheets overlap',
    'PREVIOUS uses a complementary emerge-from-behind path, not a naive reverse that tunnels through layers',
    'Sequence ≈720ms; controls lock during shuffle; 20+ cycles show no pose drift',
    'Reduced motion switches selection immediately without flight',
    'Irregular clip-paths (not rounded rects); no external assets/libraries/network; sandbox-safe',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#0a0a0a;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
