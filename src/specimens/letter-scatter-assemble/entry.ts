import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:240px;border:1px solid #2c313c;border-radius:2px;background:#12141a;">
  {{specimen}}
</div>
`.trim()

export const letterScatterAssemble: Specimen = {
  id: 'letter-scatter-assemble',
  ref: 'SPX-042',
  title: 'Letter Scatter Assemble',
  blurb:
    'Individual letters start scattered around a host and rapidly assemble into NEW MATERIAL / AVAILABLE with overshoot, collision shards, and a finale recoil.',
  origin: {
    project: 'Original',
    surface: 'Persona 5 kinetic typography / unstable layout language',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['stagger', 'reveal', 'announcement'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Scatter, overshoot, shards, and recoil are skipped under prefers-reduced-motion or data-force-reduced-motion; the final headline appears immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 280,
    background: 'card',
    scaffold,
    label: 'Typographic assemble surface',
  },
  integration: [
    'Mount inside a relative, overflow-hidden surface (~240px tall).',
    'Import demo.css verbatim; keep frozen letter transforms, delays, and palette.',
    'Call assembleLetterScatter() from ASSEMBLE (or your control); ignore re-entry while busy.',
    'Keep the letter stage aria-hidden; announce once via status: “New material available”.',
    'Use resetLetterScatter / replayLetterScatter (or harness restart) for deterministic replay.',
    'Honour both prefers-reduced-motion and data-force-reduced-motion with the instant headline.',
  ],
  acceptance: [
    'Every visible headline letter moves independently from a frozen scatter pose',
    'Initial arrangement is clearly scattered from above, below, left, and right (some clipped)',
    'No runtime randomness; reset restores identical origins',
    'Letters visibly overshoot before settling into a clean flex baseline',
    'AVAILABLE begins after NEW MATERIAL (~180ms offset)',
    'Finale E lands last with a ~2px whole-word recoil',
    'Final state remains readable; reduced motion shows it immediately',
    'No external assets/fonts/libraries; works in sandboxed iframe ~320–768px',
  ],
}
