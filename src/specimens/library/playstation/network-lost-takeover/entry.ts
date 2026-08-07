import type { Specimen } from '../../../types'

export const networkLostTakeover: Specimen = {
  id: 'network-lost-takeover',
  ref: 'SPX-3441',
  title: 'Network Lost Takeover',
  blurb: 'Active content recedes into a clear offline state — play surface scales back as a network-lost panel takes over.',
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
  tags: ["network","offline","takeover"],
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
    height: 320,
    background: 'dark',
    label: 'Network Lost Takeover demo',
    scaffold: '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:16px;">{{specimen}}</div>',
  },
  acceptance: [
    'Offline phase scales the play surface to 0.78 with 5px blur and opacity 0.18 under a 0.55 ink veil.',
    'Offline panel reaches full opacity over the dimmed surface within 360ms.',
    'RETRY restores the online phase; reduced motion keeps end states without dim/panel transitions.',
  ],
}
