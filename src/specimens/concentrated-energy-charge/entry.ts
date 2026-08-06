import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:400px;background:#071018;display:grid;place-items:center;padding:1rem;">
  {{specimen}}
</div>
`.trim()

export const concentratedEnergyCharge: Specimen = {
  id: 'concentrated-energy-charge',
  ref: 'SPX-968',
  title: 'Concentrated Energy Charge',
  blurb:
    'BUILD TEST PACKAGE SIGN send twelve packets along four frozen paths into a central node that grows 26→72px, stabilises, then sits ARMED without releasing.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired Kamehameha charge / convergence (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['convergence', 'preparation', 'armed-action'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, CHARGE immediately shows the 72px armed node, subdued provenance paths, and ARMED / RELEASE with no packet travel.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 400,
    background: 'dark',
    scaffold,
    label: 'Concentrated energy charge to ARMED',
  },
  integration: [
    'Mount inside a relative host (~420×400+).',
    'Import demo.css verbatim; keep frozen SVG path `d` values and stagger timings.',
    'Wire CHARGE via runConcentratedCharge; RESET / harness restart via resetConcentratedCharge.',
    'After arming, RELEASE must not auto-fire a release beam — this specimen ends at ARMED.',
    'Announce that the deploy action is prepared but not executed; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Exactly four named sources and four paths; three packets each (12 total)',
    'Deterministic stagger BUILD 0 / TEST 80 / PACKAGE 160 / SIGN 240',
    'Central node grows 26→72px as packets arrive, then stabilises before ARMED',
    'Final state static with subdued provenance paths; CHARGE becomes RELEASE without auto-release',
    'Reduced motion: immediate 72px ARMED with subdued paths',
    'Status / live region communicate prepared-but-not-executed',
  ],
}
