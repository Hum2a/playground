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
    'Mount inside a relative overflow-hidden host (~360×360).',
    'Import demo.css verbatim; freeze cards 320×74 gap 12, compress 320ms.',
    'Wire compressNotificationStack / expandNotificationStack on COMPRESS / EXPAND.',
    'Counter 3 NOTIFICATIONS appears after settle; hidden card text stays in DOM.',
    'Honour both reduced-motion triggers with instant layout swap.',
  ],
  acceptance: [
    'Starts with three readable notifications: BUILD COMPLETE, REVIEW REQUESTED, DEPLOY READY',
    'COMPRESS ends as one obvious three-layer stack over 320ms',
    'Middle card offset 6px scale .98; bottom offset 12px scale .96',
    'Top notification remains readable; counter shows 3 NOTIFICATIONS',
    'Hidden card body text visually clipped but present for accessibility',
    'EXPAND restores original order and 12px spacing',
    'Reduced motion: instant layout switch',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#101218;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
