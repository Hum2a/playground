import type { Specimen } from '../../../types'

export const glassFocusFrame: Specimen = {
  id: 'glass-focus-frame',
  ref: 'SPX-428',
  title: 'Glass Focus Frame',
  blurb:
    'Three compact controls share a four-corner glass frame that clarifies pointer and keyboard focus without making colour the only state cue.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired glass interaction language',
  },
  facets: {
    kind: 'interaction',
    tech: 'css-only',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3-reload'],
  },
  tags: ['glass', 'focus', 'keyboard'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'The focus frame remains visible while its fade and corner shift stop immediately under either reduced-motion trigger.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 220,
    background: 'dark',
    label: 'Glass focus frame',
  },
}
