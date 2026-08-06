import type { SpecimenInspiration } from './inspiration'
import type { SpecimenFacets } from './taxonomy'

export type {
  InspirationFranchiseId,
  InspirationWorkId,
  SpecimenInspiration,
  SuggestedFreeTag,
} from './inspiration'
export type {
  FacetKey,
  SpecimenFacets,
  SpecimenIntensity,
  SpecimenKind,
  SpecimenScope,
  SpecimenTech,
} from './taxonomy'

export interface Specimen {
  id: string
  ref: string
  title: string
  blurb: string
  origin: { project: string; surface?: string }
  /** Required orthogonal axes — see `taxonomy.ts`. */
  facets: SpecimenFacets
  /**
   * Optional game/franchise lineage from the inspiration directory.
   * Prefer this over stuffing franchise names into `tags`.
   */
  inspiredBy?: SpecimenInspiration
  /** Freeform effect flavor only; do not repeat facet or inspiration ids. */
  tags: string[]
  deps: 'none' | string[]
  motion: {
    loops: boolean
    respectsReducedMotion: boolean
    reducedMotionNote?: string
  }
  files: { html: string; css: string; js?: string }
  spec: string
  contract: unknown
  preview: {
    width: number
    height: number
    background: 'card' | 'page' | 'grid' | 'dark'
    scaffold?: string
    label: string
  }
  integration?: string[]
  acceptance?: string[]
}
