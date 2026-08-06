import type { Specimen } from '../../../types'
export const pixelHpDrain: Specimen = {
  id: 'pixel-hp-drain',
  ref: 'SPX-859',
  title: 'Pixel HP Drain',
  blurb:
    'Twenty Game Boy–tone HP blocks start at 18 filled; DAMAGE knocks eleven off right-to-left at 45ms each while the number counts down to 7/20.',
  origin: {
    project: 'Original',
    surface: 'Pokémon Gen I / handheld RPG segmented HP language',
  },
  facets: {
    kind: 'interaction',
    tech: 'tiny-js',
    scope: 'inline',
    intensity: 'subtle',
  },
  inspiredBy: {
    franchise: 'pokemon',
  },
  tags: ['resource', 'retro', 'damage'],
  deps: 'none',
  motion: {
    loops: false,
    respectsReducedMotion: true,
    reducedMotionNote:
      'Impact and per-block drain are skipped under prefers-reduced-motion or data-force-reduced-motion; HP 7/20 with seven filled blocks appears immediately.',
  },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 320,
    height: 300,
    background: 'dark',

    label: 'Pixel HP drain demo',
  },

}
