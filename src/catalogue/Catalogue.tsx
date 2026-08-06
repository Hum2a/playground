import { useMemo, useState } from 'react'
import { specimens } from '../specimens'
import { ContactSheet } from './ContactSheet'
import { FilterBar } from './FilterBar'
import { SpecimenPlate } from './SpecimenPlate'
import './catalogue.css'

export function Catalogue() {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const tags = useMemo(() => {
    const set = new Set<string>()
    for (const s of specimens) for (const t of s.tags) set.add(t)
    return [...set].sort()
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return specimens.filter((s) => {
      if (activeTag && !s.tags.includes(activeTag)) return false
      if (!q) return true
      const hay = [
        s.title,
        s.blurb,
        s.origin.project,
        s.origin.surface ?? '',
        ...s.tags,
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [activeTag, query])

  return (
    <div className="catalogue">
      <ContactSheet specimens={specimens} />
      <FilterBar
        tags={tags}
        activeTag={activeTag}
        query={query}
        onTagChange={setActiveTag}
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
