import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:420px;background:#101218;display:grid;place-items:center;padding:16px;">
  {{specimen}}
</div>
`.trim()

export const postBurstRecovery: Specimen = {
  id: 'post-burst-recovery',
  ref: 'SPX-1212',
  title: 'Post-Burst Recovery',
  blurb:
    'After a successful boost, a compressed worker recovers capacity along a frozen ladder while TASK COMPLETE stays visible — READY only when recovery hits 100%.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired post-burst / Kaioken-style cooldown recovery (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['cooldown', 'recovery', 'resource'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Recovery ladder is skipped; READY baseline with load 42% and capacity 100% appears immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 400,
    height: 440,
    background: 'dark',
    scaffold,
    label: 'Post-burst recovery demo',
  },
  integration: [
    'Mount inline; keep TASK COMPLETE visible for the whole sequence.',
    'Import demo.css verbatim; preserve the six-stage recovery/load/capacity ladder.',
    'Call runPostBurstRecovery / runPostBurstReset; do not mark READY before recovery 100%.',
    'Expose task completion separately from recovery status for accessibility.',
    'Honour both reduced-motion triggers with an immediate READY state.',
  ],
  acceptance: [
    'Starts after successful completion with TASK COMPLETE visible and RECOVERING status',
    'Recovery walks 0→20→45→70→88→100 with matching load/capacity ladders',
    'Structures rebuild from core+2 to six; 88% stays RECOVERING; READY only at 100%',
    'At 100%: scale .96→1, exactly two ticks, load 42%, capacity 100%, static',
    'Reduced motion immediately shows READY baseline',
  ],
}
