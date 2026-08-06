import type { Specimen } from '../types'
export const redactedContentLock: Specimen = {
  id: 'redacted-content-lock',
  ref: 'SPX-133',
  title: 'Redacted Content Lock',
  blurb:
    'Locked lesson card with five irregular black redaction bars and a diagonal RESTRICTED stamp; unlock retracts censorship without fading host copy.',
  origin: {
    project: 'Original',
    surface: 'Persona 5 graphic print / physical censorship lock language',
  },
  facets: {
    kind: 'overlay',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: {
    franchise: 'persona',
    works: ['persona-5'],
  },
  tags: ['lock', 'clip-path', 'stagger', 'paper'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Bar travel and stamp attack are skipped under prefers-reduced-motion or data-force-reduced-motion; locked and unlocked states switch instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 300,
    background: 'card',

    label: 'Redacted lesson card',
  },

}
