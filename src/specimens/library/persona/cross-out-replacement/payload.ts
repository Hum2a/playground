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
    'Mount inline on a relative host; keep overflow clipped if the exit path should stay inside the card.',
    'Import demo.css verbatim; strike width is 108% of the value wrapper for portable digit lengths.',
    'Call applyCrossOutReplacement from APPLY CHANGE; use reset/replay (or harness restart) for deterministic £49 restore.',
    'Announce once via the status region after settle — do not expose strike fragments to AT.',
    'Honour prefers-reduced-motion and data-force-reduced-motion with an immediate final value.',
  ],
  acceptance: [
    'Old £49 is clearly readable before APPLY CHANGE',
    'Irregular red strike crosses L→R (~180ms), then thinner black strike R→L',
    'New £29 enters after invalidation begins, overshoots once, settles at ~-1deg',
    'Old value leaves via clip/translate (not opacity-only); strikes leave with it',
    'Final state is £29 / MONTH with a small red change mark; nothing loops',
    'Reset restores £49 cleanly; one status announcement on settle',
    'Reduced motion jumps to final value; no external assets/libraries',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:240px;background:#1b1e26;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
