import type { Specimen } from '../../../types'

export const resumeFromRestWake: Specimen = {
  id: 'resume-from-rest-wake',
  ref: 'SPX-3327',
  title: 'Resume-from-Rest Wake',
  blurb:
    'Dimmed dock brightens (0.38→1.0) and restores a solid focus halo on the remembered tile — focus restore, not black lift.',
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
  tags: ['boot', 'wake', 'focus'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, brightness and halo transitions are removed; awake end state remains.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 440,
    height: 320,
    background: 'dark',
    label: 'Resume-from-Rest Wake demo',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:300px;background:#0B0F14;display:grid;place-items:center;padding:16px;">{{specimen}}</div>',
  },
}
