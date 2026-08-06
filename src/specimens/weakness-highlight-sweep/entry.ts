import type { Specimen } from '../types'
export const weaknessHighlightSweep: Specimen = {
  id: 'weakness-highlight-sweep',
  ref: 'SPX-2018',
  title: 'Weakness Highlight Sweep',
  blurb:
    'An analysis sweep bar crosses a profile diagram and locks a critical GUARD weakness sector with accent highlight and bar emphasis.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired analysis notebook UI (abstract)',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['analysis', 'highlight', 'sweep'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, weakness highlight appears immediately without sweep choreography.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 360,
    background: 'dark',

    label: 'Weakness highlight sweep',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; keep sweep and highlight timings.',
    'Wire RUN via weaknessHighlightSweep.run(root).',
    'Replay resets to idle before rerun.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Sweep bar traverses profile diagram left to right',
    'GUARD sector receives accent border highlight',
    'Weak bar fills shift to accent colour',
    'Status announces weakness sector at end',
    'Replay deterministic; clipped to host; sandbox allow-scripts',
    'Reduced motion shows static weakness highlight',
  ],
}
