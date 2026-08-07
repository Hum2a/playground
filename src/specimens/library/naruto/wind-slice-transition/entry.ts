import type { Specimen } from '../../../types'

export const windSliceTransition: Specimen = {
  id: 'wind-slice-transition',
  ref: 'SPX-2458',
  title: 'Wind Slice Transition',
  blurb:
    'Four clipped steel blades at −22/−16/−10/−4° sweep with a 70ms stagger (380ms each); content swaps at 420ms — wind cut, not water wave.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — wind-style slice transitions',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['wipe', 'stagger'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the state swaps immediately with no blade sweep.',
  },
  acceptance: [
    '4 blades at [-22,-16,-10,-4]° with 70ms stagger',
    'Content swaps at 420ms; clip-path blades not fade',
    'Reduced motion instant swap',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 360,
    background: 'dark',
    label: 'Wind slice transition',
  },
}
