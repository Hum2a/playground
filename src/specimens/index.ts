/**
 * Specimen registry barrel — metadata catalogue + lookups.
 * Bodies live in per-specimen payload.ts via loadPayload.
 * Registration: library/<franchise>/<id> + registry/shards/<franchise>.ts + registry/order.ts
 */
export type { Specimen } from './types'
export type { SpecimenPayload, SpecimenResolved } from './types'
export { resolvePayload, resolveSpecimen } from './resolvePayload'
export type {
  FacetKey,
  SpecimenFacets,
  SpecimenIntensity,
  SpecimenKind,
  SpecimenScope,
  SpecimenTech,
} from './taxonomy'
export type {
  InspirationFranchiseId,
  InspirationWorkId,
  SpecimenInspiration,
  SuggestedFreeTag,
} from './inspiration'
export {
  ALL_FACET_VALUES,
  FACET_KEYS,
  FACET_LABELS,
  FACET_VALUES,
  SPECIMEN_INTENSITIES,
  SPECIMEN_KINDS,
  SPECIMEN_SCOPES,
  SPECIMEN_TECHS,
  formatFacets,
} from './taxonomy'
export {
  ALL_INSPIRATION_IDS,
  INSPIRATION_DIRECTORY,
  INSPIRATION_FRANCHISE_IDS,
  SUGGESTED_FREE_TAGS,
  formatInspiredBy,
  franchiseLabel,
  isWorkInFranchise,
  workLabel,
} from './inspiration'

export {
  specimens,
  specimensById,
  specimensByRef,
  getSpecimen,
  getSpecimenNeighbors,
} from './registry/assemble'
export { specimenOrder } from './registry/order'
