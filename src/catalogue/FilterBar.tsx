import {
  FACET_KEYS,
  FACET_LABELS,
  FACET_VALUES,
  type FacetKey,
} from '../specimens'
import './filter-bar.css'

export type FacetFilters = Record<FacetKey, string | null>

interface FilterBarProps {
  filters: FacetFilters
  query: string
  onFacetChange: (key: FacetKey, value: string | null) => void
  onQueryChange: (query: string) => void
}

export function FilterBar({
  filters,
  query,
  onFacetChange,
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
      </div>
      <label className="filter-bar__search">
        <span className="filter-bar__search-label">Filter</span>
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Title, blurb, origin, facets, tags"
        />
      </label>
    </div>
  )
}
