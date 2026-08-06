import type { Specimen } from '../types'
export const trainingSimulationStart: Specimen = {
  id: 'training-simulation-start',
  ref: 'SPX-2027',
  title: 'Training Simulation Start',
  blurb:
    'READY panel counts down 3-2-1-GO then bursts into active telemetry tiles with pulse, load, and alert readouts.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired training interface (abstract)',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['training', 'countdown', 'telemetry'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, telemetry tiles appear immediately without countdown or burst.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 380,
    background: 'dark',

    label: 'Training simulation start',
  },
  integration: [
    'Mount inside a relative overflow-hidden host.',
    'Import demo.css verbatim; keep countdown and burst timings.',
    'Wire START via trainingSimulationStart.start(root).',
    'Replay resets to standby before rerun.',
    'Honour prefers-reduced-motion and data-force-reduced-motion.',
  ],
  acceptance: [
    'READY countdown displays 3-2-1-GO sequence',
    'READY panel explodes into telemetry grid',
    'Tiles show PULSE, LOAD, and ACTIVE ALERT values',
    'Replay returns to exact standby idle',
    'Clipped to host; sandbox allow-scripts; no external assets',
    'Reduced motion shows live telemetry immediately',
  ],
}
