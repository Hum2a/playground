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
    'Mount the overlay and host sibling inside a relative, overflow-hidden frame sized to the boot surface.',
    'Import demo.css verbatim; keep the frozen hex colours and monospace stack.',
    'Call runDiagnosticBoot() for a deterministic demo finish, or runDiagnosticBoot({ waitUntil: () => appReady }) to hold on VERIFYING COMPONENTS... OK until the host is ready — no network inside the specimen.',
    'Expose a single polite status string (Loading → System ready); keep the log aria-hidden.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with the immediate-lines path.',
  ],
  acceptance: [
    'At least six diagnostic lines appear; SYSTEM READY is last',
    'Progress advances in discrete steps tied to lines, not a continuous tween',
    'Standalone demo completes (~1500ms) with no infinite loading and no network access',
    'waitUntil (when provided) holds after VERIFYING COMPONENTS... OK before SYSTEM READY',
    'Reduced motion shows all lines immediately with no blink or inversion flash',
    'Screen readers get one loading status then system ready — not every log line',
    'Fully self-contained HTML/CSS/JS under sandbox="allow-scripts"',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#d8d3bd;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
