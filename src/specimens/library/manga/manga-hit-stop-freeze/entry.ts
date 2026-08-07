import type { Specimen } from '../../../types'

export const mangaHitStopFreeze: Specimen = {
  id: 'manga-hit-stop-freeze',
  ref: 'SPX-4101',
  title: 'Hit Stop Freeze',
  blurb:
    'A chunky action card winds up, slams to an impact pose, freezes motionless for exactly 110ms with six strokes, then recoils and settles.',
  origin: {
    project: 'Original',
    surface: 'Manga/anime hit-stop impact emphasis as a reusable UI commit beat',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'card',
    intensity: 'graphic',
  },
  inspiredBy: { franchise: 'manga' },
  tags: ['hit-stop', 'impact', 'freeze', 'commit'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Skips wind-up, scale impact, rotation and recoil; shows six static strokes for ~250ms with a strong inset border.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 420,
    height: 340,
    background: 'page',
    scaffold:
      '<div style="width:420px;max-width:100%;margin:0 auto;overflow:hidden">{{specimen}}</div>',
    label: 'Manga hit stop freeze',
  },
  integration: [
    'Copy the effect wrapper and focal element structure.',
    'Mount around the host action/card.',
    'Trigger the supplied active class/function when an important action commits.',
    'Do not use for ordinary hover feedback.',
    'Preserve the explicit hit-stop timing plateau.',
    'Preserve trigger locking and reduced-motion behaviour.',
  ],
  acceptance: [
    'Normal mode contains a measurable 110ms interval where the focal transform does not change.',
    'Freeze occurs at scale(1.08) rotate(-1.2deg).',
    'Exactly six impact strokes appear.',
    'Impact strokes disappear after the sequence.',
    'Final transform is exactly scale(1) rotate(0).',
    'Repeated triggers cannot stack animations.',
    'Reduced motion contains no wind-up, recoil or aggressive scaling.',
  ],
}
