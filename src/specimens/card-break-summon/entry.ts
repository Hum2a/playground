import type { Specimen } from '../types'
export const cardBreakSummon: Specimen = {
  id: 'card-break-summon',
  ref: 'SPX-495',
  title: 'Card Break Summon',
  blurb:
    'A sealed archive token shivers, cracks along four break lines, and splits into five shards that fly outward — revealing ENTITY // 08 that was already waiting underneath.',
  origin: {
    project: 'Original',
    surface: 'Persona 3 summoning / card-break language (generic geometry)',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['reveal', 'summon', 'clip-path', 'fracture'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Shake, cracks, piece travel, and entity scale are skipped under prefers-reduced-motion or data-force-reduced-motion; ENTITY // 08 AVAILABLE appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 360,
    background: 'dark',

    label: 'Card break summon demo',
  },

}
