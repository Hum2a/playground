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
    'Mount inline; import demo.css verbatim.',
    'Keep the 400ms appear delay and 3000ms intro window frozen; clear all timers on skip/replay to avoid stray phase changes.',
    'Toggle both the visual class and aria-hidden/tabindex together so the button truly leaves the tab order while not skippable.',
    'Honour both reduced-motion triggers by removing the transition, not the timing.',
  ],
  acceptance: [
    'Idle/start: phase is intro, clock at 00:00, SKIP INTRO hidden and non-interactive',
    'At 400ms, SKIP INTRO fades in and becomes focusable',
    'Activating SKIP INTRO during intro phase immediately moves to episode phase and hides the button',
    'If not skipped, the intro ends automatically at 3000ms with the same episode transition',
    'REPLAY restarts the full sequence from 00:00',
    'Reduced motion keeps the same appear/disappear schedule with transitions disabled',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0c0c0f;display:grid;place-items:center;padding:16px;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
