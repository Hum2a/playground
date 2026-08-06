import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:350px;background:#111924;">
  {{specimen}}
</div>
`.trim()

export const kiChargeMeter: Specimen = {
  id: 'ki-charge-meter',
  ref: 'SPX-966',
  title: 'Ki Charge Meter',
  blurb:
    'Twenty-four fixed energy units converge in four accelerating groups, growing a flat circular-diamond operation node into a static READY state.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball ki-charge–inspired progress aggregation (abstract)',
  },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'graphic' },
  inspiredBy: { franchise: 'dragonball' },
  tags: ['progress', 'aggregation', 'processing'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Reduced motion immediately consumes all 24 units, sets the full 82px node, and announces 100% READY.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: { width: 360, height: 370, background: 'dark', scaffold, label: 'Ki charge meter' },
  integration: [
    'Mount inside a relative host (~360×350+).',
    'Import demo.css verbatim; retain all 24 coordinates and four fixed group timings.',
    'Call window.kiChargeMeter.charge() / .reset() or use CHARGE / RESET.',
    'Keep percentage commits discrete at 0/25/50/75/100.',
  ],
  acceptance: [
    'Exactly 24 deterministic diamonds/lines consume in four groups of six.',
    'Groups accelerate at 420/340/270/200ms with 30ms internal stagger.',
    'Node grows discretely 34/46/58/70/82px only after each group completes.',
    'Completion shows four cardinal lines and a 160ms 1→.92→1.05→1 compression.',
    'Final state is static 100% READY; reduced motion is immediate.',
  ],
}
