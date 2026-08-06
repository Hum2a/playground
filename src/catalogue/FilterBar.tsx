import './filter-bar.css'

interface FilterBarProps {
  tags: string[]
  activeTag: string | null
  query: string
  onTagChange: (tag: string | null) => void
  onQueryChange: (query: string) => void
}

export function FilterBar({
  tags,
  activeTag,
  query,
  onTagChange,
  onQueryChange,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__chips" role="group" aria-label="Filter by tag">
        <button
          type="button"
          className="filter-bar__chip"
          aria-pressed={activeTag === null}
          onClick={() => onTagChange(null)}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className="filter-bar__chip"
            aria-pressed={activeTag === tag}
            onClick={() => onTagChange(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <label className="filter-bar__search">
        <span className="filter-bar__search-label">Filter</span>
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Title, blurb, origin, tags"
        />
      </label>
    </div>
  )
}
