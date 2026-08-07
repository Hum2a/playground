import type { Specimen } from '../../../types'

export const focusModeActivation: Specimen = {
  id: 'focus-mode-activation',
  ref: 'SPX-2488',
  title: 'Focus Mode Activation',
  blurb:
    'Four analysis brackets converge to a frozen 18px inset on host content over 240ms.',
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
      'Under prefers-reduced-motion or data-force-reduced-motion, focus mode appears FOCUSED immediately.',
  },
    acceptance: [
    'Four corner brackets converge to frozen inset 18px over narrowMs 240',
    'Focus mode latches FOCUSED without continuous loop',
    'Preview uses relative+overflow scaffold host',
    'Replay restores NORMAL before rerunning',
    'Reduced motion shows FOCUSED immediately',
  ],
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    scaffold: `<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:320px;background:#070b0e;display:grid;place-items:center;padding:1rem;"><div style="position:relative;width:min(100%,300px);min-height:160px;border:1px solid #1a6b58;background:#0c1210;padding:1.25rem;color:#d7f5ec;font:600 12px ui-sans-serif,system-ui,sans-serif;">Analysis host{{specimen}}</div></div>`,
    width: 420,
    height: 340,
    background: 'dark',
    label: 'Focus Mode Activation',
  },
}
