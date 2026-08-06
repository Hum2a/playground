import type { Specimen } from '../../../types'
export const screenshotExpandToEditor: Specimen = {
  id: 'screenshot-expand-to-editor',
  ref: 'SPX-1941',
  title: 'Screenshot Expand to Editor',
  blurb:
    '116×206 thumbnail at bottom-left morphs into centred 358×620 editor over 380ms; radius 18→26px; crop controls after 180ms.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired screenshot editor container transform',
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
  tags: ['screenshot', 'container-transform', 'editor'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, immediate geometry switch.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 390,
    height: 700,
    background: 'dark',

    label: 'Screenshot expand to editor',
  },

}
