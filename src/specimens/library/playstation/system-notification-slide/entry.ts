import type { Specimen } from '../../../types'

export const systemNotificationSlide: Specimen = {
  id: 'system-notification-slide',
  ref: 'SPX-3408',
  title: 'System Notification Slide',
  blurb: 'A compact notification slides into the top edge, dwells, and times out cleanly — system toast with finite entry and exit.',
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
  },
  tags: ["notification","toast","slide"],
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
    label: 'System Notification Slide demo',
    scaffold: '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:16px;">{{specimen}}</div>',
  },
}
