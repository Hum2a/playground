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
    'Mount inside a relative overflow-hidden host; import demo.css verbatim.',
    'RESTORE FOCUS: brightness 0.38 → 0.72 (560ms) → 1.0 + solid halo (≠ black veil).',
    'Honour both reduced-motion triggers — remove motion, keep end states.',
  ],
  acceptance: [
    'Asleep shows dimmed dock with dashed ghost ring — not a full black veil',
    'Waking raises stage brightness to ~72% over 560ms',
    'Awake shows solid focus halo; ghost ring and FOCUS MEMORY label hide',
    'Distinct from wake-from-rest (black lift) and rest-mode-dim (console dim)',
    'Reduced motion snaps asleep→awake with no brightness travel',
  ],
  scaffold:
    '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:16px;">{{specimen}}</div>',
  files: { html, css, js },
  spec,
  contract,
}

export default payload
