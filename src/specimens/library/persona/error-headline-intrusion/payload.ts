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
    'Mount the contact card in a relative overflow-hidden host (~620×420) so the giant ERROR clips at the edges.',
    'Import demo.css verbatim; freeze headline max 180px, opacity .16, 420ms entry, scale .92→1, −3px recoil.',
    'Call window.errorHeadlineIntrusion.trigger(root); ignore re-entry while busy; replay resets then plays once.',
    'Keep ERROR aria-hidden; expose failures via inline text, aria-invalid, and aria-describedby.',
    'Honour both reduced-motion triggers with the final headline and errors immediately — no slide, no form movement.',
  ],
  acceptance: [
    'SHOW ERROR / autoplay produces one ERROR intrusion behind the form card',
    'Headline is clamp(72px, 18vw, 180px), weight 900, #C94F58 at opacity .16, pointer-events none',
    'Entry is translateX(100%→0) + scale .92→1 over 420ms cubic-bezier(.15,.85,.25,1)',
    'Form recoils −3px once; red border + semantic inline errors settle; colour is not the only error signal',
    'Layering is ERROR headline → form background → controls; headline stays aria-hidden',
    'Reduced motion shows the final headline immediately with no slide or form movement',
    'Busy-guard blocks overlap; replay resets cleanly; no parent, storage, or external assets',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:420px;background:#111827;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
