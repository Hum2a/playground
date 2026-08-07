import type { Specimen } from '../../../types'

export const mediaCardFocusExpand: Specimen = {
  id: 'media-card-focus-expand',
  ref: 'SPX-3379',
  title: 'Media Card Focus Expand',
  blurb:
    'Focused media card expands to reveal frozen metadata and Play/Info action affordances.',
  origin: { project: 'Original', surface: 'PlayStation-inspired system UI motion (abstract)' },
  facets: { kind: 'interaction', tech: 'tiny-js', scope: 'inline', intensity: 'subtle' },
  inspiredBy: { franchise: 'playstation', works: ['ps5'] },
  tags: ['focus', 'metadata'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Under prefers-reduced-motion or data-force-reduced-motion, card expand and metadata reveal snap instantly.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 480,
    height: 280,
    background: 'dark',
    scaffold:
      '<div style="position:relative;overflow:hidden;width:100%;height:100%;min-height:280px;background:#0B0F14;display:grid;place-items:center;padding:16px;">{{specimen}}</div>',
    label: 'Media Card Focus Expand demo',
  },
  acceptance: [
    'Focused card grows from 88×120 to 120×150 with scale 1.04 and 6px lift.',
    'Focused card reveals its metadata line (genre · hours · Play · Info) within 180ms.',
    'Only one card is focused at a time; blur/toggle clears expand.',
    'Reduced motion snaps expand and metadata with no transition.',
  ],
}
