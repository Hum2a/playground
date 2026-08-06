import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:200px;background:#12151c;display:grid;place-items:center;padding:0.75rem;">
  {{specimen}}
</div>
`.trim()

export const dockLaunchBounce: Specimen = {
  id: 'dock-launch-bounce',
  ref: 'SPX-1339',
  title: 'Dock Launch Bounce',
  blurb:
    'APP // 03 performs exactly three decreasing launch bounces (34 / 24 / 14px peaks, ~820ms), holds 80ms, then resolves into a 5×5 running indicator and RUNNING status.',
  origin: {
    project: 'Original',
    surface: 'macOS-inspired dock launch bounce and running indicator',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['macos'],
  },
  tags: ['dock', 'launch', 'bounce'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, no bounce; running indicator and RUNNING appear immediately.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 340,
    height: 220,
    background: 'dark',
    scaffold,
    label: 'Dock launch bounce',
  },
  integration: [
    'Mount inside a relative overflow-clipped host with room for 34px bounce above tiles.',
    'Import demo.css verbatim; freeze tile 44px, bounce peaks 34/24/14px, durations 320/240/260ms, hold 80ms.',
    'Wire runDockLaunchBounce / resetDockLaunchBounce / replayDockLaunchBounce.',
    'Disable LAUNCH and REPLAY while sequence runs; only APP // 03 moves.',
    'Honour both reduced-motion triggers with immediate running state.',
  ],
  acceptance: [
    'Exactly five launcher items; only APP // 03 bounces',
    'Exactly three bounces with peaks 34 / 24 / 14px over ~820ms',
    'Running 5×5 indicator appears only after final landing plus 80ms hold',
    'Status CLOSED → RUNNING; trigger disabled during sequence; no stacking',
    'REPLAY resets and reruns; final state static RUNNING',
    'No Apple logos or proprietary icons',
  ],
}
