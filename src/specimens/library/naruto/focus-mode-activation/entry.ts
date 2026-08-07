import type { Specimen } from '../../../types'

export const focusModeActivation: Specimen = {
  id: 'focus-mode-activation',
  ref: 'SPX-2488',
  title: 'Focus Mode Activation',
  blurb:
    'Four corner brackets converge to a 12px inset over 320ms while periphery dims into focus mode.',
  origin: {
    project: 'Original',
    surface: 'Naruto / heightened vision — focus mode',
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
  tags: ["focus","brackets","analysis"],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, the resolved Focus Mode Activation state appears immediately.',
  },
  acceptance: [
    'Four brackets converge to insetPx 12 over narrowMs 320 on host content',
    'Periphery dims; focus latches after settleMs 140 with no continuous loop',
    'Replay returns brackets to outer corners before rerunning',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#070B0E;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,300px);min-height:160px;border:1px solid #1a6b58;background:#0a1210;padding:1.25rem;color:#d7f5ec;font:600 12px ui-sans-serif,system-ui,sans-serif;">Analysis host{{specimen}}</div></div>`,
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Focus Mode Activation',
  },
}
