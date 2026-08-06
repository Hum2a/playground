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

/** Heavy fields loaded on demand (preview, detail, copy, playground fork). */
export interface SpecimenPayload {
  files: { html: string; css: string; js?: string }
  spec: string
  contract: unknown
  /** Optional host wrapper; kept out of the catalogue meta chunk. */
  scaffold?: string
  integration?: string[]
  acceptance?: string[]
}

/**
 * Catalogue registry entry — metadata only.
 * Call `loadPayload()` (or `resolvePayload`) for HTML/CSS/JS/spec/contract.
 */
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
  /** Explicit dynamic import of `./payload` — never directory scanning. */
  loadPayload: () => Promise<SpecimenPayload>
  preview: {
    width: number
    height: number
    background: 'card' | 'page' | 'grid' | 'dark'
    /** Prefer `payload.scaffold` — kept optional for older call sites. */
    scaffold?: string
    label: string
  }
  /** Prefer payload.integration when present. */
  integration?: string[]
  /** Prefer payload.acceptance when present. */
  acceptance?: string[]
}

/** Metadata + resolved payload — for prompts, detail tabs, export. */
export type SpecimenResolved = Omit<Specimen, 'loadPayload'> & SpecimenPayload
