/**
 * Inspiration directory — franchises and specific works used to label specimens.
 * Add new games here first, then reference them via `inspiredBy` on entry.ts.
 * Human mirror: docs/inspiration-directory.md (keep in sync).
 */

export const INSPIRATION_DIRECTORY = {
  persona: {
    label: 'Persona',
    works: {
      'persona-3': { label: 'Persona 3' },
      'persona-3-reload': { label: 'Persona 3 Reload' },
      'persona-4': { label: 'Persona 4' },
      'persona-5': { label: 'Persona 5' },
    },
  },
  'final-fantasy': {
    label: 'Final Fantasy',
    works: {
      'ff-vii': { label: 'Final Fantasy VII' },
      'ff-x': { label: 'Final Fantasy X' },
    },
  },
  zelda: {
    label: 'The Legend of Zelda',
    works: {
      'zelda-botw': { label: 'Breath of the Wild' },
      'zelda-totk': { label: 'Tears of the Kingdom' },
    },
  },
  'metal-gear': {
    label: 'Metal Gear',
    works: {
      'mgs': { label: 'Metal Gear Solid' },
    },
  },
  'ace-attorney': {
    label: 'Ace Attorney',
    works: {},
  },
  celeste: {
    label: 'Celeste',
    works: {},
  },
  danganronpa: {
    label: 'Danganronpa',
    works: {
      'danganronpa-1': { label: 'Danganronpa: Trigger Happy Havoc' },
      'danganronpa-2': { label: 'Danganronpa 2: Goodbye Despair' },
      'danganronpa-v3': { label: 'Danganronpa V3: Killing Harmony' },
    },
  },
  nier: {
    label: 'NieR',
    works: {
      'nier-automata': { label: 'NieR:Automata' },
    },
  },
  cyberpunk: {
    label: 'Cyberpunk',
    works: {},
  },
  splatoon: {
    label: 'Splatoon',
    works: {},
  },
  pokemon: {
    label: 'Pokémon',
    works: {},
  },
  original: {
    label: 'Original',
    works: {},
  },
} as const

export type InspirationFranchiseId = keyof typeof INSPIRATION_DIRECTORY

type WorksOf<F extends InspirationFranchiseId> =
  keyof (typeof INSPIRATION_DIRECTORY)[F]['works']

export type InspirationWorkId = {
  [F in InspirationFranchiseId]: WorksOf<F> extends never ? never : WorksOf<F>
}[InspirationFranchiseId]

export interface SpecimenInspiration {
  /** Franchise / series category (e.g. persona). */
  franchise: InspirationFranchiseId
  /**
   * Specific titles within that franchise (e.g. persona-5).
   * Omit or leave empty when the language is franchise-wide.
   */
  works?: InspirationWorkId[]
}

/** Suggested free-tag vocabulary for effect flavor (not inspiration). */
export const SUGGESTED_FREE_TAGS = [
  'marquee',
  'bilingual',
  'comic',
  'wipe',
  'clip-path',
  'stagger',
  'parallax',
  'glitch',
  'scanline',
  'crt',
  'hud',
  'menu',
  'battle',
  'dialogue',
  'typewriter',
  'ribbon',
  'stripe',
  'caution',
  'notification',
  'projectile',
  'announcement',
  'slam',
  'boot',
  'loading',
  'terminal',
  'monospace',
  'lock',
  'ink',
  'splat',
  'liquid',
  'water',
  'split',
  'achievement',
  'alert',
  'detection',
  'ping',
  'reveal',
  'arrival',
  'ephemeral',
  'impact',
  'paper',
  'peel',
  'unlock',
  'locked',
  'chain',
  'selection',
  'content-switch',
  'stack',
  'progress',
  'navigation',
  'focus',
  'keyboard',
  'vertical',
  'lunar',
  'visualisation',
  'confirmation',
  'completion',
  'task',
  'hold',
  'rank-up',
  'tear',
  'hover',
  'burst',
  'interruption',
  'manga',
  'cut-in',
  'threshold',
  'time',
  'deadline',
  'enclosure',
  'warning',
  'metric',
  'disconnect',
  'unlink',
  'relationship',
  'state-change',
  'transformation',
  'temporal',
  'state',
  'freeze',
  'glass',
  'crystallise',
  'disclosure',
  'radial',
] as const

export type SuggestedFreeTag = (typeof SUGGESTED_FREE_TAGS)[number]

export const INSPIRATION_FRANCHISE_IDS = Object.keys(
  INSPIRATION_DIRECTORY,
) as InspirationFranchiseId[]

/** Every franchise + work id — free tags must not reuse these. */
export const ALL_INSPIRATION_IDS: ReadonlySet<string> = new Set(
  INSPIRATION_FRANCHISE_IDS.flatMap((franchise) => {
    const works = Object.keys(INSPIRATION_DIRECTORY[franchise].works)
    return [franchise, ...works]
  }),
)

export function franchiseLabel(id: InspirationFranchiseId): string {
  return INSPIRATION_DIRECTORY[id].label
}

export function workLabel(
  franchise: InspirationFranchiseId,
  work: string,
): string | undefined {
  const works = INSPIRATION_DIRECTORY[franchise].works as Record<
    string,
    { label: string }
  >
  return works[work]?.label
}

export function isWorkInFranchise(
  franchise: InspirationFranchiseId,
  work: string,
): boolean {
  return Object.prototype.hasOwnProperty.call(
    INSPIRATION_DIRECTORY[franchise].works,
    work,
  )
}

export function formatInspiredBy(inspiredBy: SpecimenInspiration): string {
  const franchise = franchiseLabel(inspiredBy.franchise)
  const works = (inspiredBy.works ?? [])
    .map((w) => workLabel(inspiredBy.franchise, w))
    .filter((x): x is string => Boolean(x))
  if (works.length === 0) return franchise
  return `${franchise} · ${works.join(' · ')}`
}