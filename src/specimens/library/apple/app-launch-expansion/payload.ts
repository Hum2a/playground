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
    'Mount inside a relative overflow-hidden host (300×380 preview).',
    'Import demo.css verbatim; freeze 3×3 grid 72×72 gap 22, expand 430ms, radius 18→0.',
    'Wire launchAppExpansion on App 05 tile / closeAppExpansion on CLOSE.',
    'Sibling tiles recede scale(.92) over 180ms; detail reveals after 58%.',
    'Honour both reduced-motion triggers with instant state swap.',
  ],
  acceptance: [
    'Exactly nine tiles in 3×3 grid; App 05 is launch origin',
    'Expansion begins at exact measured tile bounds',
    'Corner radius morphs 18px → 0 over 430ms',
    'Glyph scales to 1.18 then becomes ANALYTICS header identity',
    'Other tiles scale .92 and recede over 180ms',
    'Destination content reveals after 58% transition progress',
    'CLOSE contracts back to exact App 05 slot without drift',
    'Reduced motion: short non-spatial state change',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:380px;background:#101218;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
