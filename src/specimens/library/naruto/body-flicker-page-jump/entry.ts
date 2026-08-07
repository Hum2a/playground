import type { Specimen } from '../../../types'

export const bodyFlickerPageJump: Specimen = {
  id: 'body-flicker-page-jump',
  ref: 'SPX-2409',
  title: 'Body Flicker Page Jump',
  blurb:
    'Five directional streaks (−6°…7°) compress the view in 140ms, then the destination identity snaps in after 90ms — body-flicker jump, no fade-as-travel.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — body flicker & high-speed navigation',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'naruto',
  },
  tags: ['navigation', 'streak', 'handoff'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the destination view appears immediately with no streaks.',
  },
  acceptance: [
    '5 streaks at [-6,-2,0,3,7]° fire for 140ms (scaleX travel)',
    'Destination identity after 90ms settle; no fade-as-travel',
    'Reduced motion shows destination immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 320,
    background: 'dark',
    label: 'Body flicker page jump',
  },
}
