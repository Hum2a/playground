import type { Specimen } from '../types'
export const volumeBrightnessHud: Specimen = {
  id: 'volume-brightness-hud',
  ref: 'SPX-1474',
  title: 'Volume/Brightness HUD',
  blurb:
    '220×86 transient OUTPUT LEVEL HUD with 10 segments; 42→68 over 180ms; entrance 140ms; dwell 900ms; repeated INCREASE resets dwell without replaying entrance.',
  origin: {
    project: 'Original',
    surface: 'iOS-inspired transient level HUD',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'apple',
    works: ['ios', 'macos'],
  },
  tags: ['hud', 'volume', 'transient'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, HUD appears without scale movement.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 280,
    height: 220,
    background: 'dark',

    label: 'Volume brightness HUD',
  },

}
