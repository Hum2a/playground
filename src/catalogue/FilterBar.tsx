import { useEffect, useId, useRef, useState } from 'react'
import {
  FACET_KEYS,
  FACET_LABELS,
  FACET_VALUES,
  type FacetKey,
} from '../specimens/taxonomy'
import {
  franchiseLabel,
  type InspirationFranchiseId,
} from '../specimens/inspiration'
import './filter-bar.css'

export type CatalogueFilters = Record<FacetKey, string | null> & {
  franchise: InspirationFranchiseId | null
  work: string | null
}

export const EMPTY_FILTERS: CatalogueFilters = {
  kind: null,
  tech: null,
  scope: null,
  intensity: null,
  franchise: null,
  work: null,
}

interface FilterBarProps {
  filters: CatalogueFilters
  /** Franchises that appear on at least one specimen. */
  franchises: InspirationFranchiseId[]
  works: { id: string; label: string }[]
  /** Facet values that would yield zero results under other active filters (excluding that key). */
  disabledFacetValues?: Partial<Record<FacetKey, Set<string>>>
  disabledFranchises?: Set<string>
  disabledWorks?: Set<string>
  query: string
  resultCount: number
  totalCount: number
  onFacetChange: (key: FacetKey, value: string | null) => void
  onFranchiseChange: (value: InspirationFranchiseId | null) => void
  onWorkChange: (value: string | null) => void
  onQueryChange: (query: string) => void
  onClear: () => void
}

function hasActiveFilters(filters: CatalogueFilters, query: string) {
  if (query.trim()) return true
  return FACET_KEYS.some((k) => filters[k] !== null) || filters.franchise !== null
}

export function FilterBar({
  filters,
  franchises,
  works,
  disabledFacetValues,
  disabledFranchises,
  disabledWorks,
  query,
  resultCount,
  totalCount,
  onFacetChange,
  onFranchiseChange,
  onWorkChange,
  onQueryChange,
  onClear,
}: FilterBarProps) {
  const active = hasActiveFilters(filters, query)
  const bodyId = useId()
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [scrolledPast, setScrolledPast] = useState(false)
  const [pinnedOpen, setPinnedOpen] = useState(false)
  const collapsed = scrolledPast && !pinnedOpen

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const past = !entry.isIntersecting
        setScrolledPast(past)
        if (!past) setPinnedOpen(false)
      },
      {
        root: null,
        threshold: 0,
        // Fire as the sentinel leaves the top of the viewport (filters about to stick).
        rootMargin: '-1px 0px 0px 0px',
      },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div
        ref={sentinelRef}
        className="filter-bar__sentinel"
        aria-hidden="true"
      />
      <div
        className={
          collapsed ? 'filter-bar filter-bar--collapsed' : 'filter-bar'
        }
        id="catalogue-filters"
      >
        <div className="filter-bar__top">
          <p className="filter-bar__count" role="status" aria-live="polite">
            {resultCount === totalCount
              ? `${totalCount} specimens`
              : `${resultCount} of ${totalCount} specimens`}
            {collapsed && active ? (
              <span className="filter-bar__active-note"> · Filtered</span>
            ) : null}
          </p>
          <div className="filter-bar__top-actions">
            {scrolledPast ? (
              <button
                type="button"
                className="filter-bar__toggle"
                aria-expanded={!collapsed}
                aria-controls={bodyId}
                onClick={() => setPinnedOpen((open) => !open)}
              >
                {collapsed ? 'Show filters' : 'Hide filters'}
              </button>
            ) : null}
            {active ? (
              <button
                type="button"
                className="filter-bar__clear"
                onClick={onClear}
              >
                Clear filters
              </button>
            ) : null}
          </div>
        </div>

        <div
          className="filter-bar__body"
          id={bodyId}
          hidden={collapsed}
        >
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
                {FACET_VALUES[key].map((value) => {
                  const disabled = disabledFacetValues?.[key]?.has(value) ?? false
                  const pressed = filters[key] === value
                  return (
                    <button
                      key={value}
                      type="button"
                      className="filter-bar__chip"
                      aria-pressed={pressed}
                      disabled={disabled && !pressed}
                      onClick={() =>
                        onFacetChange(key, pressed ? null : value)
                      }
                    >
                      {value}
                    </button>
                  )
                })}
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
                {franchises.map((id) => {
                  const disabled = disabledFranchises?.has(id) ?? false
                  const pressed = filters.franchise === id
                  return (
                    <button
                      key={id}
                      type="button"
                      className="filter-bar__chip"
                      aria-pressed={pressed}
                      disabled={disabled && !pressed}
                      onClick={() =>
                        onFranchiseChange(pressed ? null : id)
                      }
                    >
                      {franchiseLabel(id)}
                    </button>
                  )
                })}
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
                {works.map((w) => {
                  const disabled = disabledWorks?.has(w.id) ?? false
                  const pressed = filters.work === w.id
                  return (
                    <button
                      key={w.id}
                      type="button"
                      className="filter-bar__chip"
                      aria-pressed={pressed}
                      disabled={disabled && !pressed}
                      onClick={() => onWorkChange(pressed ? null : w.id)}
                    >
                      {w.label}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          ) : null}
        </div>
        <label className="filter-bar__search">
          <span className="filter-bar__search-label">Search</span>
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                e.preventDefault()
                onQueryChange('')
              }
            }}
            placeholder="Title, ref, slug, tags…"
          />
        </label>
      </div>
      </div>
    </>
  )
}
