import type { Specimen } from '../../../types'

export const focusModeActivation: Specimen = {
  id: 'focus-mode-activation',
  ref: 'SPX-2488',
  title: 'Focus Mode Activation',
  blurb:
    'Four focus brackets converge to an 18px inset on the host while periphery dims into FOCUSED.',
  origin: {
    project: 'Original',
    surface: 'Naruto / ninja-fiction action-language study — heightened-vision focus modes',
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
  tags: ['focus', 'brackets', 'analysis'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, brackets appear already inset at 18px as FOCUSED.',
  },
    acceptance: [
    'Four brackets converge to 18px inset on the host over 240ms',
    'Periphery dims while reticle settles FOCUSED',
    'Replay returns brackets outward / NORMAL before rerunning',
    'Reduced motion shows FOCUSED brackets at inset immediately',
    'preview.scaffold provides the relative overflow host',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#101418;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,300px);min-height:160px;border:1px solid #2a3038;background:#0c1014;padding:1.25rem;color:#dce2e8;font:600 12px ui-sans-serif,system-ui,sans-serif;">Analysis host{{specimen}}</div></div>`,
    width: 380,
    height: 360,
    background: 'dark',
    label: 'Focus mode activation',
  },
}
