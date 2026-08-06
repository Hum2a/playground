import { useMemo, useState } from 'react'
import {
  FACET_KEYS,
  INSPIRATION_DIRECTORY,
  INSPIRATION_FRANCHISE_IDS,
  specimens,
  type FacetKey,
  type InspirationFranchiseId,
} from '../specimens'
import { ContactSheet } from './ContactSheet'
import { FilterBar, type CatalogueFilters } from './FilterBar'
import { SpecimenPlate } from './SpecimenPlate'
import './catalogue.css'

const EMPTY_FILTERS: CatalogueFilters = {
  kind: null,
  tech: null,
  scope: null,
  intensity: null,
  franchise: null,
  work: null,
}

export function Catalogue() {
  const [filters, setFilters] = useState<CatalogueFilters>(EMPTY_FILTERS)
  const [query, setQuery] = useState('')

  const usedFranchises = useMemo(() => {
    const set = new Set<InspirationFranchiseId>()
    for (const s of specimens) {
      if (s.inspiredBy) set.add(s.inspiredBy.franchise)
    }
    return INSPIRATION_FRANCHISE_IDS.filter((id) => set.has(id))
  }, [])

  const workOptions = useMemo(() => {
    if (!filters.franchise) return [] as { id: string; label: string }[]
    const works = INSPIRATION_DIRECTORY[filters.franchise].works
    return Object.entries(works).map(([id, meta]) => ({
      id,
      label: meta.label,
    }))
  }, [filters.franchise])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return specimens.filter((s) => {
      for (const key of FACET_KEYS) {
        const active = filters[key]
        if (active && s.facets[key] !== active) return false
      }
      if (filters.franchise) {
        if (s.inspiredBy?.franchise !== filters.franchise) return false
        if (
          filters.work &&
          !(s.inspiredBy.works ?? []).some((w) => w === filters.work)
        ) {
          return false
        }
      }
      if (!q) return true
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
      return hay.includes(q)
    })
  }, [filters, query])

  function onFacetChange(key: FacetKey, value: string | null) {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  function onFranchiseChange(value: InspirationFranchiseId | null) {
    setFilters((prev) => ({
      ...prev,
      franchise: value,
      work: null,
    }))
  }

  function onWorkChange(value: string | null) {
    setFilters((prev) => ({ ...prev, work: value }))
  }

  return (
    <div className="catalogue">
      <ContactSheet specimens={specimens} />
      <FilterBar
        filters={filters}
        franchises={usedFranchises}
        works={workOptions}
        query={query}
        onFacetChange={onFacetChange}
        onFranchiseChange={onFranchiseChange}
        onWorkChange={onWorkChange}
        onQueryChange={setQuery}
      />
      <div className="catalogue__plates">
        {filtered.map((specimen) => (
          <SpecimenPlate key={specimen.id} specimen={specimen} />
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="catalogue__empty">No specimens match that filter.</p>
      ) : null}
    </div>
  )
}
