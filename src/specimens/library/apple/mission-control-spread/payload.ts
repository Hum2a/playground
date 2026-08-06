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
    'Mount inside a relative overflow-clipped host (~520×400 stage).',
    'Import demo.css verbatim; freeze five window coords, overview scales 0.62–0.78, overview 520ms / restore 460ms.',
    'Wire resetMissionControlSpread; OVERVIEW spreads; EDITOR click restores.',
    'SPACE // 01 appears after 60% overview progress.',
    'Honour both reduced-motion triggers with instant layout swap.',
  ],
  acceptance: [
    'Exactly five windows: EDITOR TERMINAL DOCS CHAT PREVIEW',
    'Initial desktop overlap is obvious',
    'Overview has no overlaps with minimum 18px separation',
    'Window identities persist; no fade-out during spread',
    'Restore returns all windows to exact original coordinates',
    'Selected EDITOR ends frontmost on desktop',
    'Reduced motion: instant desktop ↔ overview swap',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:400px;background:#0d1118;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
