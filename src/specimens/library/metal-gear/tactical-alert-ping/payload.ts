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
    'Mount inside a relative, overflow-hidden host with data-tactical-alert-host.',
    'Wire a TRIGGER ALERT (or detection event) to fireTacticalAlert / replayTacticalAlert.',
    'Import demo.css verbatim; keep frozen hex colours and 650ms timing.',
    'Keep the bang and rings aria-hidden; announce via the DETECTED alert label.',
    'Honour both reduced-motion triggers with the static mark (no nudge).',
  ],
  acceptance: [
    'Alert reaches full visibility in under 160ms',
    'Indicator visibly overshoots once (scale to 1.35 then settles to 1)',
    'Two attention rings accompany impact within the first 180ms',
    'No infinite animation',
    'Reduced-motion state remains obvious (static ! DETECTED)',
    'Artifact is extremely small and portable with no dependencies or assets',
  ],
  scaffold: `
<div class="tactical-alert-host" data-tactical-alert-host style="position:relative;overflow:hidden;width:100%;height:220px;border:1px solid #2c313c;border-radius:2px;background:#111111;box-sizing:border-box;">
  <div style="padding:1rem 1rem 3rem;opacity:0.75;">
    <div style="font:700 0.65rem/1.2 system-ui,sans-serif;letter-spacing:0.18em;text-transform:uppercase;color:#767e8c;">Infiltration</div>
    <div style="margin-top:0.4rem;font:600 0.9rem/1.25 system-ui,sans-serif;color:#f7f7f2;">Status: undetected</div>
    <div style="margin-top:0.35rem;font:400 0.75rem/1.35 system-ui,sans-serif;color:#767e8c;">Radar sweep idle</div>
  </div>
  <button type="button" data-tactical-alert-trigger style="position:absolute;left:1rem;bottom:0.75rem;z-index:4;margin:0;padding:0.4rem 0.65rem;border:2px solid #f7f7f2;border-radius:0;background:#e21b23;color:#f7f7f2;font:800 0.65rem/1 system-ui,sans-serif;letter-spacing:0.14em;text-transform:uppercase;cursor:pointer;">TRIGGER ALERT</button>
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
