import type { Specimen } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for `*.css?raw`; keep demo.css as the portable
// artifact and import the twin `.txt` for the in-app string.
import css from './demo.style.txt?raw'
import js from './demo.js?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const scaffold = `
<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:360px;background:#12161a;">
  {{specimen}}
</div>
`.trim()

export const captureShake: Specimen = {
  id: 'capture-shake',
  ref: 'SPX-321',
  title: 'Capture Shake',
  blurb:
    'An abstract entity drops into an original circular capture device; three discrete resolution shakes with pauses resolve to CAPTURED and three star polygons.',
  origin: {
    project: 'Original',
    surface: 'Pokémon capture–inspired uncertain confirmation (generic geometry)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['confirmation', 'uncertainty', 'capture'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Enter, shakes, and flash are skipped; closed device, three static stars, and CAPTURED appear immediately under prefers-reduced-motion or data-force-reduced-motion.',
  },
  files: { html, css, js },
  spec,
  contract,
  preview: {
    width: 360,
    height: 380,
    background: 'dark',
    scaffold,
    label: 'Capture shake demo',
  },
  integration: [
    'Mount in a relative overflow-hidden host tall enough for the 90px drop and stars.',
    'Import demo.css verbatim; freeze device Ø120px, shake rotations, pauses, and star stagger.',
    'Wire runCaptureShake / resetCaptureShake; success only after the third check.',
    'Keep device/target/stars aria-hidden; announce via the polite CAPTURED status text.',
    'Honour both reduced-motion triggers with an immediate captured state and no shakes.',
  ],
  acceptance: [
    'Target visibly enters the container then disappears only once enclosed',
    'Container closes after entry; settles ~10px; waits 180ms',
    'Exactly three discrete shakes with alternating directions and visible pauses',
    'Success only after third check: diamond flash, three stars, status clips to CAPTURED',
    'Final state stays closed; nothing loops',
    'Reduced motion: closed device, three static stars, CAPTURED — no shaking',
  ],
}
