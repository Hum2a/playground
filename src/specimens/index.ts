import { comingSoonTape } from './coming-soon-tape/entry'
import { comicPanelWipe } from './comic-panel-wipe/entry'
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

/** Explicit specimen registry. Add one import per specimen. */
export const specimens: Specimen[] = [comingSoonTape, comicPanelWipe]

export function getSpecimen(id: string): Specimen | undefined {
  return specimens.find((s) => s.id === id)
}
