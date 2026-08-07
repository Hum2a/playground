import type { Specimen } from '../../../types'

export const restModeDim: Specimen = {
  id: 'rest-mode-dim',
  ref: 'SPX-3435',
  title: 'Rest Mode Dim',
  blurb:
    'Console-rest silhouette dims 100% → 55% → 18%: activity bars freeze, status LED softens, REST fades in.',
  origin: {
    project: 'Original',
    surface: 'PlayStation-inspired system UI motion (abstract)',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'playstation',
    works: ['ps5'],
  },
  tags: ['rest', 'power', 'dim'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, brightness and REST states snap; activity pulse is removed.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 300,
    background: 'dark',
    label: 'Rest Mode Dim demo',
    scaffold: '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:16px;">{{specimen}}</div>',
  },
}
