import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#020912;">
  {{specimen}}
</div>
`.trim()

export const energyChargeConfirmation: Specimen = {
  id: 'energy-charge-confirmation',
  ref: 'SPX-522',
  title: 'Energy Charge Confirmation',
  blurb:
    'Hold PURGE CACHE for 900ms while blue energy fills a four-segment frame bottom→left→top→right; early release drains without confirming.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired blue energy hold-confirm',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['confirmation', 'hold', 'progress'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      '900ms hold remains; frame progress updates in 0/25/50/75/100 steps without travel animation or snap/flash under prefers-reduced-motion or data-force-reduced-motion.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 280,
    background: 'dark',
    scaffold,
    label: 'Energy charge confirm',
  },
  integration: [
    'Mount in a relative host with room for the outer frame; import demo.css verbatim.',
    'Drive confirmation from elapsed hold time (900ms) via --ecc-p — do not trust CSS animationend alone.',
    'Wire pointer + Space hold; cancel on release/blur; ignore keydown repeat.',
    'Call resetEnergyCharge after confirm (or harness restart) to return to idle.',
    'Honour both reduced-motion triggers with stepped progress and no flash/snap animation.',
  ],
  acceptance: [
    'Actual hold interaction; confirmation only after 900ms full charge',
    'Four frame segments fill bottom → left → top → right tracking elapsed hold',
    'Button compresses 1 → 0.97 during hold; completion flashes pale (<80ms) then snaps 0.97 → 1.025 → 1',
    'Label becomes CONFIRMED only at full charge',
    'Early release drains backwards ≤250ms and does not fire the action',
    'Pointer and keyboard accessible; reduced motion keeps hold semantics with stepped progress',
  ],
}
