import type { Specimen } from '../../../types'

export const focusModeActivation: Specimen = {
  id: 'focus-mode-activation',
  ref: 'SPX-2488',
  title: 'Focus Mode Activation',
  blurb:
    'Four corner brackets converge on a central reticle while peripheral content dims, narrowing the view into a high-contrast analysis mode — abstract graphic vision mode, no copyrighted iconography.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, focus mode activates directly with no bracket convergence or dimming transition.',
  },
  acceptance: [
    'Brackets converge to frozen inset on host content',
    'Focus mode on without continuous loop',
    'Reduced motion shows focus on immediately',
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
