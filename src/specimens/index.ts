import { azureShardTransition } from './azure-shard-transition/entry'
import { callingCardSlam } from './calling-card-slam/entry'
import { comingSoonTape } from './coming-soon-tape/entry'
import { comicPanelWipe } from './comic-panel-wipe/entry'
import { dramaticObjectionError } from './dramatic-objection-error/entry'
import { precisionMenuSnap } from './precision-menu-snap/entry'
import { truthShotNotification } from './truth-shot-notification/entry'
import type { Specimen } from './types'

export type { Specimen } from './types'
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

/** Explicit specimen registry. Add one import per specimen. */
export const specimens: Specimen[] = [
  comingSoonTape,
  comicPanelWipe,
  callingCardSlam,
  dramaticObjectionError,
  azureShardTransition,
  precisionMenuSnap,
  truthShotNotification,
]

export function getSpecimen(id: string): Specimen | undefined {
  return specimens.find((s) => s.id === id)
}
