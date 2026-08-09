import type { Specimen } from '../../../types'
export const graphicFinisherCompletion: Specimen = {
  id: 'graphic-finisher-completion',
  ref: 'SPX-312',
  title: 'Graphic finisher completion',
  blurb:
    'Panel shutter cascade, full-bleed flash, giant word slam, and ring/shard burst over a darkened takeover backdrop — the largest completion punctuation in the set.',
  origin: {
    project: 'Original',
    surface: 'Specimen Archive',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'maximal',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['finisher', 'completion', 'takeover', 'slam'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'The panel shutter, flash, word slam, and ring/shard burst are skipped under prefers-reduced-motion or data-force-reduced-motion; the settled composition (dark backdrop, word, subline) appears immediately, and exit becomes an instant opacity change.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 320,
    background: 'dark',
    label: 'Arc completion',
  },
}
