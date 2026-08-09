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
    'Mount the EMAIL field inline in a ~420×240 dark host; reserve the 18×18 marker slot so the label never shifts.',
    'Import demo.css verbatim; freeze 18×18 marker, entry from X −18 / scale 1.8 / −12deg in 180ms, settle 100ms with 3px backing offset.',
    'Call window.requiredMarkerImpact.trigger(root); busy-guard; replay resets then slams once.',
    'Set aria-required on the input when marked; keep a visually hidden “required” word; marker stays aria-hidden.',
    'Honour both reduced-motion triggers with an instant marker at final scale — no translation or grow.',
  ],
  acceptance: [
    'MARK REQUIRED slams an 18×18 * marker beside EMAIL; the label itself does not move',
    'Entry is translateX(-18px) scale(1.8) rotate(-12deg) opacity 0 → 0 / 1 / 0 / 1 in 180ms cubic-bezier(.1,.9,.2,1)',
    'Settle lasts 100ms: grow to 1.08, backing shifts 3px, then return; no bounce loop',
    'Input receives aria-required="true" plus visually hidden required text; marker is aria-hidden',
    'Colour is not the only required signal; keyboard MARK REQUIRED works',
    'Reduced motion shows the marker instantly with no scale or translation',
    'Replay resets cleanly; no parent, storage, or external assets',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:240px;background:#111827;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
