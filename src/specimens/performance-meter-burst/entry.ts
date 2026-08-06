import type { Specimen } from '../types'
export const performanceMeterBurst: Specimen = {
  id: 'performance-meter-burst',
  ref: 'SPX-2030',
  title: 'Performance Meter Burst',
  blurb:
    'Result bars race to final values; the OUTPUT meter overshoots the graph ceiling with an accent burst shadow.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired training results UI (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['meter', 'results', 'burst'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, bars appear at final values immediately with burst shadow on OUTPUT.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 380,
    background: 'dark',

    label: 'Performance meter burst',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; keep staggered bar race timings.',
    'Wire RUN via performanceMeterBurst.run(root).',
    'OUTPUT bar must break graph ceiling visually.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'Three meters race to POWER 62%, SPEED 48%, OUTPUT 94%',
    'OUTPUT bar exceeds ceiling with accent shadow',
    'Staggered start between bars',
    'Replay resets to 0% idle',
    'Clipped to host; sandbox allow-scripts',
    'Reduced motion shows final values immediately',
  ],
}
