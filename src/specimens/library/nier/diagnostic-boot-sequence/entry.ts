import type { Specimen } from '../types'
export const diagnosticBootSequence: Specimen = {
  id: 'diagnostic-boot-sequence',
  ref: 'SPX-008',
  title: 'Diagnostic boot sequence',
  blurb:
    'Monochrome clinical boot log with stepped progress, optional host wait hold, inversion flash, then host reveal.',
  origin: {
    project: 'Original',
    surface: 'NieR:Automata–inspired diegetic system interface language',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'nier',
    works: ['nier-automata'],
  },
  tags: ['boot', 'loading', 'terminal', 'monospace'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'All diagnostic lines and full progress appear immediately; cursor blink and inversion flash are skipped.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'page',

    label: 'Boot sequence demo',
  },

}
