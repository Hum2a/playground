import type { Specimen } from '../../../types'
export const materialSwitchToggle: Specimen = {
  id: 'material-switch-toggle',
  ref: 'SPX-1719',
  title: 'Material Switch Toggle',
  blurb:
    'Three 52×32 switches: off, on, and disabled. Checkbox-driven thumb travels 20px with 180ms track fill, 1.08 pulse, and 40px touch ripple.',
  origin: {
    project: 'Original',
    surface: 'Android-inspired switch control',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'android',
  },
  tags: ['switch', 'control', 'state'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, thumb jumps to target with no scale or ripple.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 260,
    background: 'card',

    label: 'Material switch toggle',
  },

}
