import {
  FACET_KEYS,
  FACET_LABELS,
  FACET_VALUES,
  franchiseLabel,
  type FacetKey,
  type InspirationFranchiseId,
} from '../specimens'
import './filter-bar.css'

export type CatalogueFilters = Record<FacetKey, string | null> & {
  franchise: InspirationFranchiseId | null
  work: string | null
}

interface FilterBarProps {
  filters: CatalogueFilters
  /** Franchises that appear on at least one specimen. */
  franchises: InspirationFranchiseId[]
  works: { id: string; label: string }[]
  query: string
  onFacetChange: (key: FacetKey, value: string | null) => void
  onFranchiseChange: (value: InspirationFranchiseId | null) => void
  onWorkChange: (value: string | null) => void
  onQueryChange: (query: string) => void
}

export function FilterBar({
  filters,
  franchises,
  works,
  query,
  onFacetChange,
  onFranchiseChange,
  onWorkChange,
  onQueryChange,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__facets">
        {FACET_KEYS.map((key) => (
          <fieldset key={key} className="filter-bar__group">
            <legend className="filter-bar__legend">{FACET_LABELS[key]}</legend>
            <div
              className="filter-bar__chips"
              role="group"
              aria-label={`Filter by ${FACET_LABELS[key].toLowerCase()}`}
            >
              <button
                type="button"
                className="filter-bar__chip"
                aria-pressed={filters[key] === null}
                onClick={() => onFacetChange(key, null)}
              >
                All
              </button>
              {FACET_VALUES[key].map((value) => (
                <button
                  key={value}
                  type="button"
                  className="filter-bar__chip"
                  aria-pressed={filters[key] === value}
                  onClick={() => onFacetChange(key, value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </fieldset>
        ))}

        {franchises.length > 0 ? (
          <fieldset className="filter-bar__group">
            <legend className="filter-bar__legend">Inspiration</legend>
            <div
              className="filter-bar__chips"
              role="group"
              aria-label="Filter by inspiration franchise"
            >
              <button
                type="button"
                className="filter-bar__chip"
                aria-pressed={filters.franchise === null}
                onClick={() => onFranchiseChange(null)}
              >
                All
              </button>
              {franchises.map((id) => (
                <button
                  key={id}
                  type="button"
                  className="filter-bar__chip"
                  aria-pressed={filters.franchise === id}
                  onClick={() => onFranchiseChange(id)}
                >
                  {franchiseLabel(id)}
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}

        {filters.franchise && works.length > 0 ? (
          <fieldset className="filter-bar__group">
            <legend className="filter-bar__legend">Title</legend>
            <div
              className="filter-bar__chips"
              role="group"
              aria-label="Filter by inspiration title"
            >
              <button
                type="button"
                className="filter-bar__chip"
                aria-pressed={filters.work === null}
                onClick={() => onWorkChange(null)}
              >
                All
              </button>
              {works.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  className="filter-bar__chip"
                  aria-pressed={filters.work === w.id}
                  onClick={() => onWorkChange(w.id)}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}
      </div>
      <label className="filter-bar__search">
        <span className="filter-bar__search-label">Filter</span>
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Title, blurb, inspiration, tags"
        />
      </label>
    </div>
  )
}
