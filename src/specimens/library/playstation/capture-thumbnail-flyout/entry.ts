import type { Specimen } from '../../../types'

export const captureThumbnailFlyout: Specimen = {
  id: 'capture-thumbnail-flyout',
  ref: 'SPX-3417',
  title: 'Capture Thumbnail Flyout',
  blurb: 'A small captured-frame placeholder travels from centre into a saved-preview corner dock — thumbnail flyout after capture.',
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
  tags: ["capture","thumbnail","flyout"],
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
    label: 'Capture Thumbnail Flyout demo',
    scaffold: '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:16px;">{{specimen}}</div>',
  },
  acceptance: [
    'Thumbnail travels centre → arc mid (−42px, −36px) → bottom-left dock over 640ms.',
    'Dock highlight activates during travel; no shutter blades — travel is the primary motion.',
    'Reduced motion snaps the thumb to the docked state with travel animation removed.',
  ],
}
