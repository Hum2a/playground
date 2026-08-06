import type { Specimen } from '../types'
export const explosiveNotificationBurst: Specimen = {
  id: 'explosive-notification-burst',
  ref: 'SPX-2143',
  title: 'Explosive Notification Burst',
  blurb:
    'A compact centre point expands into a jagged ALERT notification card over 420ms.',
  origin: {
    project: 'Original',
    surface: 'anime/comic action language study',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'my-hero-academia',
  },
  tags: ['notification', 'burst', 'alert', 'comic'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under reduced motion, notification card appears immediately without burst.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'dark',

    label: 'Alert burst',
  },
  integration: [
    'Mount in relative overflow-hidden host.',
    'Burst 420ms; total 1070ms with settle.',
    'Wire Trigger / Replay to runExplosiveNotificationBurst.',
    'Honour both reduced-motion triggers.',
  ],
  acceptance: [
    'Centre core expands then fades',
    'Jagged notification card scales in',
    'ALERT badge readable at settle',
    'Replay clears card to idle',
    'Reduced motion: instant card',
  ],
}
