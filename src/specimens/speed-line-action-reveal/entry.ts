import type { Specimen } from '../types'
export const speedLineActionReveal: Specimen = {
  id: 'speed-line-action-reveal',
  ref: 'SPX-1976',
  title: 'Speed-Line Action Reveal',
  blurb:
    'Converging ink speed lines burst outward to reveal a TARGET acquisition readout inside a comic panel.',
  origin: {
    project: 'Original',
    surface: 'My Hero Academia–inspired speed-line reveal / action beat language',
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
  tags: ['speed-lines', 'reveal', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, TARGET is shown immediately with no line burst.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 320,
    background: 'dark',

    label: 'Speed-line action reveal',
  },
  integration: [
    'Mount in relative overflow-hidden host.',
    'Freeze burst 580ms and settle 320ms.',
    'Wire runSpeedLineReveal / resetSpeedLineReveal / replaySpeedLineReveal.',
    'Lines must clip to stage; honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Activate triggers one burst reveal to TARGET end state',
    'Initial concealed and final revealed states are distinct',
    'No external resources; replay resets cleanly',
    'Reduced motion shows TARGET immediately',
    'Palette uses shared MHA study colours',
  ],
}
