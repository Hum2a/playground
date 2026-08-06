import { useMemo, useState } from 'react'
import { FACET_KEYS, specimens, type FacetKey } from '../specimens'
import { ContactSheet } from './ContactSheet'
import { FilterBar, type FacetFilters } from './FilterBar'
import { SpecimenPlate } from './SpecimenPlate'
import './catalogue.css'

const EMPTY_FILTERS: FacetFilters = {
  kind: null,
  tech: null,
  scope: null,
  intensity: null,
}

export function Catalogue() {
  const [filters, setFilters] = useState<FacetFilters>(EMPTY_FILTERS)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return specimens.filter((s) => {
      for (const key of FACET_KEYS) {
        const active = filters[key]
        if (active && s.facets[key] !== active) return false
      }
      if (!q) return true
      const hay = [
        s.title,
        s.blurb,
        s.origin.project,
        s.origin.surface ?? '',
        ...FACET_KEYS.map((k) => s.facets[k]),
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

  return (
    <div className="catalogue">
      <ContactSheet specimens={specimens} />
      <FilterBar
        filters={filters}
        query={query}
        onFacetChange={onFacetChange}
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
