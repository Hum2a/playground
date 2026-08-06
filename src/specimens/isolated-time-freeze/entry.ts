import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:340px;background:#0b0d12;">
  {{specimen}}
</div>
`.trim()

export const isolatedTimeFreeze: Specimen = {
  id: 'isolated-time-freeze',
  ref: 'SPX-1158',
  title: 'Isolated Time Freeze',
  blurb:
    'FREEZE suspends A // INDEX, B // SYNC and D // CLEANUP in place while C // EXPORT alone advances 42%→100% inside a thin boundary field with an opening at C — then time resumes from the frozen offsets.',
  origin: {
    project: 'Original',
    surface: 'Dragon Ball–inspired time-freeze isolation language',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'dragonball',
  },
  tags: ['focus', 'pause', 'isolation', 'priority'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, C is COMPLETE and A/B/D are READY immediately with no looping indicators.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 420,
    height: 380,
    background: 'dark',
    scaffold,
    label: 'Isolated time freeze',
  },
  integration: [
    'Mount inside a relative overflow-clipped host sized for a 2×2 process grid (~400×280).',
    'Import demo.css verbatim; keep freeze/export/hold/resume timings and progress values 42–100.',
    'Call runIsolatedTimeFreeze() from the trigger; resetIsolatedTimeFreeze() or harness restart returns to idle.',
    'Pause A/B/D via Web Animations API — never restart frozen indicators from zero on resume.',
    'Keep the grid aria-hidden; announce pause/complete via the polite status region.',
    'Honour both reduced-motion triggers with the immediate final state.',
  ],
  acceptance: [
    'Exactly four processes; C selected; A/B/D freeze in place within 50ms',
    'C progresses 42→58→73→89→100 then EXPORT COMPLETE before resume',
    'Freeze boundary has an intentional opening at C; no giant glow',
    'A/B/D resume from frozen offsets then settle READY; C COMPLETE; no loops',
    'Reduced motion immediately shows completed isolated operation',
    'No characters or franchise symbols; sandbox="allow-scripts" safe',
  ],
}
