import type { Specimen } from '../../../types'

export const screenshotCaptureFlash: Specimen = {
  id: 'screenshot-capture-flash',
  ref: 'SPX-3416',
  title: 'Screenshot Capture Flash',
  blurb: 'A single controlled shutter-like flash confirms capture — brief white overlay without obscuring the scene afterward.',
  origin: {
    project: 'Original',
    surface: 'PlayStation-inspired system UI motion (abstract)',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'fullscreen',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'playstation',
    works: ['ps5'],
  },
  tags: ["capture","screenshot","flash"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, transitions and animations are removed; semantic end states remain.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 300,
    background: 'dark',
    label: 'Screenshot Capture Flash demo',
    scaffold: '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:16px;">{{specimen}}</div>',
  },
}
