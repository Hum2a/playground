/** Frozen specimen taxonomy — single source of truth for facets. */

export const SPECIMEN_KINDS = [
  'overlay',
  'transition',
  'loop',
  'interaction',
] as const

export const SPECIMEN_TECHS = ['css-only', 'tiny-js'] as const

export const SPECIMEN_SCOPES = ['card', 'fullscreen', 'inline'] as const

export const SPECIMEN_INTENSITIES = ['subtle', 'graphic', 'maximal'] as const

export type SpecimenKind = (typeof SPECIMEN_KINDS)[number]
export type SpecimenTech = (typeof SPECIMEN_TECHS)[number]
export type SpecimenScope = (typeof SPECIMEN_SCOPES)[number]
export type SpecimenIntensity = (typeof SPECIMEN_INTENSITIES)[number]

export interface SpecimenFacets {
  kind: SpecimenKind
  tech: SpecimenTech
  scope: SpecimenScope
  intensity: SpecimenIntensity
}

export const FACET_KEYS = ['kind', 'tech', 'scope', 'intensity'] as const

export type FacetKey = (typeof FACET_KEYS)[number]

export const FACET_VALUES: Record<FacetKey, readonly string[]> = {
  kind: SPECIMEN_KINDS,
  tech: SPECIMEN_TECHS,
  scope: SPECIMEN_SCOPES,
  intensity: SPECIMEN_INTENSITIES,
}

/** Every reserved facet literal — free tags must not reuse these. */
export const ALL_FACET_VALUES: ReadonlySet<string> = new Set([
  ...SPECIMEN_KINDS,
  ...SPECIMEN_TECHS,
  ...SPECIMEN_SCOPES,
  ...SPECIMEN_INTENSITIES,
])

export const FACET_LABELS: Record<FacetKey, string> = {
  kind: 'Kind',
  tech: 'Tech',
  scope: 'Scope',
  intensity: 'Intensity',
}

export function formatFacets(facets: SpecimenFacets): string {
  return FACET_KEYS.map((k) => facets[k]).join(' · ')
}
