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
    'Mount inside a relative host (~420×400+).',
    'Import demo.css verbatim; keep frozen SVG path `d` values and stagger timings.',
    'Wire CHARGE via runConcentratedCharge; RESET / harness restart via resetConcentratedCharge.',
    'After arming, RELEASE must not auto-fire a release beam — this specimen ends at ARMED.',
    'Announce that the deploy action is prepared but not executed; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Packets are elongated beam streaks (20×5px) with path-aligned rotation, not circular dots.',
    'Path channels pulse during charge; conic nozzle flare opens at execution node.',
    'Deterministic stagger BUILD 0 / TEST 80 / PACKAGE 160 / SIGN 240',
    'Central node grows 26→72px as packets arrive, then stabilises before ARMED',
    'Final state static with subdued provenance paths; CHARGE becomes RELEASE without auto-release',
    'Reduced motion: immediate 72px ARMED with subdued paths',
    'Status / live region communicate prepared-but-not-executed',
  ],
  scaffold: `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:400px;background:#071018;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim(),
  files: { html, css, js },
  spec,
  contract,
}

export default payload
