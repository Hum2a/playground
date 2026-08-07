import type { Specimen } from '../../../types'

export const homeGameFocusShift: Specimen = {
  id: 'home-game-focus-shift',
  ref: 'SPX-3309',
  title: 'Home Game Focus Shift',
  blurb:
    'Moving between game tiles crossfades a title-keyed multi-plane ambient while the focused tile lifts.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI language' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'card', intensity: 'subtle' },
  inspiredBy: { franchise: 'playstation', works: ['ps5'] },
  tags: ['home', 'focus', 'ambient'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, ambient planes and tile lift snap with no transition.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 400,
    height: 300,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:1rem;">{{specimen}}</div>',
    label: 'Home game focus shift',
  },
  acceptance: [
    'Each tile activates a distinct title-keyed ambient art plane (not hue-only).',
    'Focused tile lifts 6px and scales to 1.04 with a primary border.',
    'Ambient opacity travel is 520ms; tile travel is 280ms.',
    'Reduced motion disables plane and tile transitions so both snap instantly.',
  ],
}
