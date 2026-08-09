import type { Specimen } from '../../../types'

export const crackedDisabledState: Specimen = {
  id: 'cracked-disabled-state',
  ref: 'SPX-433',
  title: 'Cracked Disabled State',
  blurb:
    'A disabled ACCESS MODULE remains semantically unavailable while its wrapper answers an attempted press with one blue fracture and a compact rejection notice.',
  origin: {
    project: 'Original',
    surface: 'Persona 3–inspired restricted module state',
  },
  facets: {
    kind: 'interaction',
    tech: 'css-only',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-3'],
  },
  tags: ['disabled', 'rejection', 'fracture'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'The fracture and rejection treatment appear immediately without the short crack draw under prefers-reduced-motion or data-force-reduced-motion.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 380,
    height: 250,
    background: 'dark',
    label: 'Disabled access module rejection',
  },
}
