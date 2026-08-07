export const CATALOGUE_VIEW_OPTIONS = [
  { id: 'compact', label: 'Compact', minTrackPx: 220, rowHeight: 350 },
  { id: 'standard', label: 'Standard', minTrackPx: 280, rowHeight: 420 },
  { id: 'large', label: 'Large', minTrackPx: 380, rowHeight: 510 },
  { id: 'extra-large', label: 'Extra large', minTrackPx: 520, rowHeight: 650 },
] as const

export type CatalogueView = (typeof CATALOGUE_VIEW_OPTIONS)[number]['id']

export const DEFAULT_CATALOGUE_VIEW: CatalogueView = 'standard'

export function isCatalogueView(value: string | null): value is CatalogueView {
  return CATALOGUE_VIEW_OPTIONS.some((option) => option.id === value)
}

export function catalogueViewOption(view: CatalogueView) {
  return CATALOGUE_VIEW_OPTIONS.find((option) => option.id === view)!
}
