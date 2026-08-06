import type { Specimen } from '../../../types'

export const railPageSnap: Specimen = {
  id: 'rail-page-snap',
  ref: 'SPX-3136',
  title: 'Rail Page Snap',
  blurb:
    'A six-card scroll-snap rail always lands on a card boundary — by button or by manual drag scroll, it never stops mid-card.',
  origin: {
    project: 'Original',
    surface: 'Netflix-inspired streaming content rail (abstract)',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'netflix',
  },
  tags: ['rail', 'snap'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote: 'All scrollTo calls use instant behavior instead of smooth scrolling.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 480,
    height: 220,
    background: 'dark',
    label: 'Rail page snap demo',
  },
}
