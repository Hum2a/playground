import type { Specimen } from '../types'
export const singleToDualPaneTransform: Specimen = {
  id: 'single-to-dual-pane-transform',
  ref: 'SPX-1955',
  title: 'Single-to-Dual Pane Transform',
  blurb:
    'Resizable 320–760px preview crosses 600px into 260px list + detail dual-pane over 320ms; selection and detail DOM persist.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired adaptive master/detail layout',
  },
  facets: {
    kind: 'transition',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['adaptive', 'responsive', 'master-detail'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, layout switches immediately at the breakpoint.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 760,
    height: 380,
    background: 'dark',

    label: 'Single-to-dual pane transform',
  },

}
