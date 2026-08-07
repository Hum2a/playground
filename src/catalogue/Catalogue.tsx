import { useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  INSPIRATION_DIRECTORY,
  INSPIRATION_FRANCHISE_IDS,
  type InspirationFranchiseId,
} from '../specimens/inspiration'
import { specimens } from '../specimens'
import {
  FACET_KEYS,
  FACET_VALUES,
  type FacetKey,
} from '../specimens/taxonomy'
import type { Specimen } from '../specimens/types'
import { useDocumentTitle } from '../app/useDocumentTitle'
import {
  EMPTY_FILTERS,
  FilterBar,
  type CatalogueFilters,
} from './FilterBar'
import { SpecimenPlate } from './SpecimenPlate'
import { useGridWindow } from './useGridWindow'
import {
  catalogueViewOption,
  DEFAULT_CATALOGUE_VIEW,
  isCatalogueView,
  type CatalogueView,
} from './view-options'
import './catalogue.css'

function isFranchiseId(value: string): value is InspirationFranchiseId {
  return (INSPIRATION_FRANCHISE_IDS as readonly string[]).includes(value)
}

function filtersFromParams(params: URLSearchParams): CatalogueFilters {
  const next: CatalogueFilters = { ...EMPTY_FILTERS }
  for (const key of FACET_KEYS) {
    const raw = params.get(key)
    if (raw && (FACET_VALUES[key] as readonly string[]).includes(raw)) {
      next[key] = raw
    }
  }
  const franchise = params.get('franchise')
  if (franchise && isFranchiseId(franchise)) {
    next.franchise = franchise
    const work = params.get('work')
    if (work && work in INSPIRATION_DIRECTORY[franchise].works) {
      next.work = work
    }
  }
  return next
}

function writeParams(
  filters: CatalogueFilters,
  query: string,
  view: CatalogueView,
): URLSearchParams {
  const params = new URLSearchParams()
  for (const key of FACET_KEYS) {
    if (filters[key]) params.set(key, filters[key]!)
  }
  if (filters.franchise) params.set('franchise', filters.franchise)
  if (filters.work) params.set('work', filters.work)
  if (query.trim()) params.set('q', query.trim())
  if (view !== DEFAULT_CATALOGUE_VIEW) params.set('view', view)
  return params
}

function matchesQuery(s: Specimen, q: string): boolean {
  if (!q) return true
  const tokens = q.toLowerCase().split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return true

  const inspirationBits = s.inspiredBy
    ? [
        s.inspiredBy.franchise,
        INSPIRATION_DIRECTORY[s.inspiredBy.franchise].label,
        ...(s.inspiredBy.works ?? []),
        ...(s.inspiredBy.works ?? []).map(
          (w) =>
            (
              INSPIRATION_DIRECTORY[s.inspiredBy!.franchise].works as Record<
                string,
                { label: string }
              >
            )[w]?.label ?? '',
        ),
      ]
    : []
  const hay = [
    s.id,
    s.ref,
    s.title,
    s.blurb,
    s.origin.project,
    s.origin.surface ?? '',
    ...FACET_KEYS.map((k) => s.facets[k]),
    ...inspirationBits,
    ...s.tags,
  ]
    .join(' ')
    .toLowerCase()

  return tokens.every((token) => hay.includes(token))
}

function matchesFilters(
  s: Specimen,
  filters: CatalogueFilters,
  ignoreKey?: FacetKey | 'franchise' | 'work',
): boolean {
  for (const key of FACET_KEYS) {
    if (ignoreKey === key) continue
    const active = filters[key]
    if (active && s.facets[key] !== active) return false
  }
  if (ignoreKey !== 'franchise' && filters.franchise) {
    if (s.inspiredBy?.franchise !== filters.franchise) return false
  }
  if (ignoreKey !== 'work' && filters.franchise && filters.work) {
    if (!(s.inspiredBy?.works ?? []).some((w) => w === filters.work)) {
      return false
    }
  }
  return true
}

export function Catalogue() {
  useDocumentTitle('Catalogue — Specimen Archive')
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo(
    () => filtersFromParams(searchParams),
    [searchParams],
  )
  const query = searchParams.get('q') ?? ''
  const requestedView = searchParams.get('view')
  const view: CatalogueView = isCatalogueView(requestedView)
    ? requestedView
    : DEFAULT_CATALOGUE_VIEW
  const viewOption = catalogueViewOption(view)

  const usedFranchises = useMemo(() => {
    const set = new Set<InspirationFranchiseId>()
    for (const s of specimens) {
      if (s.inspiredBy) set.add(s.inspiredBy.franchise)
    }
    return INSPIRATION_FRANCHISE_IDS.filter((id) => set.has(id))
  }, [])

  const workOptions = useMemo(() => {
    if (!filters.franchise) return [] as { id: string; label: string }[]
    const used = new Set<string>()
    for (const s of specimens) {
      if (s.inspiredBy?.franchise !== filters.franchise) continue
      for (const w of s.inspiredBy.works ?? []) used.add(w)
    }
    const works = INSPIRATION_DIRECTORY[filters.franchise].works as Record<
      string,
      { label: string }
    >
    return [...used]
      .filter((id) => id in works)
      .map((id) => ({ id, label: works[id].label }))
  }, [filters.franchise])

  const filtered = useMemo(() => {
    return specimens.filter(
      (s) => matchesFilters(s, filters) && matchesQuery(s, query),
    )
  }, [filters, query])

  const disabledFacetValues = useMemo(() => {
    const out: Partial<Record<FacetKey, Set<string>>> = {}
    for (const key of FACET_KEYS) {
      const disabled = new Set<string>()
      for (const value of FACET_VALUES[key]) {
        const probe = { ...filters, [key]: value }
        const any = specimens.some(
          (s) => matchesFilters(s, probe) && matchesQuery(s, query),
        )
        if (!any) disabled.add(value)
      }
      out[key] = disabled
    }
    return out
  }, [filters, query])

  const disabledFranchises = useMemo(() => {
    const disabled = new Set<string>()
    for (const id of usedFranchises) {
      const probe = { ...filters, franchise: id, work: null }
      const any = specimens.some(
        (s) => matchesFilters(s, probe) && matchesQuery(s, query),
      )
      if (!any) disabled.add(id)
    }
    return disabled
  }, [filters, query, usedFranchises])

  const disabledWorks = useMemo(() => {
    const disabled = new Set<string>()
    for (const w of workOptions) {
      const probe = { ...filters, work: w.id }
      const any = specimens.some(
        (s) => matchesFilters(s, probe) && matchesQuery(s, query),
      )
      if (!any) disabled.add(w.id)
    }
    return disabled
  }, [filters, query, workOptions])

  function patchParams(
    nextFilters: CatalogueFilters,
    nextQuery: string,
    nextView = view,
  ) {
    setSearchParams(writeParams(nextFilters, nextQuery, nextView), { replace: true })
  }

  function onFacetChange(key: FacetKey, value: string | null) {
    patchParams({ ...filters, [key]: value }, query)
  }

  function onFranchiseChange(value: InspirationFranchiseId | null) {
    patchParams({ ...filters, franchise: value, work: null }, query)
  }

  function onWorkChange(value: string | null) {
    patchParams({ ...filters, work: value }, query)
  }

  function onQueryChange(next: string) {
    patchParams(filters, next)
  }

  function onClear() {
    patchParams(EMPTY_FILTERS, '', view)
  }

  const platesRef = useRef<HTMLDivElement>(null)

  const plateWin = useGridWindow({
    containerRef: platesRef,
    itemCount: filtered.length,
    minTrackPx: viewOption.minTrackPx,
    gapPx: 16,
    estimateRowHeight: viewOption.rowHeight,
    overscanRows: 2,
  })
  const plateSlice = filtered.slice(plateWin.start, plateWin.end)

  return (
    <div className="catalogue" data-view={view}>
      <FilterBar
        filters={filters}
        franchises={usedFranchises}
        works={workOptions}
        disabledFacetValues={disabledFacetValues}
        disabledFranchises={disabledFranchises}
        disabledWorks={disabledWorks}
        query={query}
        resultCount={filtered.length}
        totalCount={specimens.length}
        onFacetChange={onFacetChange}
        onFranchiseChange={onFranchiseChange}
        onWorkChange={onWorkChange}
        onQueryChange={onQueryChange}
        onClear={onClear}
        view={view}
        onViewChange={(nextView) => patchParams(filters, query, nextView)}
      />
      <div
        ref={platesRef}
        className="catalogue__plates"
        id="catalogue-plates"
        style={
          {
            paddingTop: plateWin.padTop,
            paddingBottom: plateWin.padBottom,
          }
        }
      >
        {plateSlice.map((specimen) => (
          <SpecimenPlate
            key={specimen.id}
            specimen={specimen}
            onFacetClick={(key, value) => {
              if ((FACET_KEYS as readonly string[]).includes(key)) {
                onFacetChange(key as FacetKey, value)
              }
            }}
            onFranchiseClick={(franchise) => {
              if (isFranchiseId(franchise)) onFranchiseChange(franchise)
            }}
            onTagClick={(tag) => onQueryChange(tag)}
          />
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="catalogue__empty" role="status">
          <p>No specimens match that filter.</p>
          <button type="button" className="catalogue__empty-clear" onClick={onClear}>
            Clear filters
          </button>
        </div>
      ) : null}
    </div>
  )
}
