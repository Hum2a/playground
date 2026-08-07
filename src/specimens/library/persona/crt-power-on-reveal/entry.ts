import type { Specimen } from '../../../types'
export const crtPowerOnReveal: Specimen = {
  id: 'crt-power-on-reveal',
  ref: 'SPX-2920',
  title: 'CRT Power-On Reveal',
  blurb:
    'A dead CRT screen collapses to a bright line, blooms, and resolves into a SIGNAL READY interface.',
  origin: {
    project: 'Original',
    surface: 'Persona 4–inspired midnight channel / CRT broadcast language',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-4'],
  },
  tags: ['crt', 'power-on', 'reveal'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, UI appears immediately without line, bloom, or scale.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 280,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:260px;background:#101010;display:grid;place-items:center;padding:0.75rem;">{{specimen}}</div>',
    label: 'CRT power-on',
  },
}
