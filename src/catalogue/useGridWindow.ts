import { useCallback, useEffect, useMemo, useState, type RefObject } from 'react'

export interface GridWindow {
  /** Inclusive start index into the flat item list. */
  start: number
  /** Exclusive end index. */
  end: number
  padTop: number
  padBottom: number
  columns: number
}

/**
 * Dependency-free window over a CSS auto-fill grid driven by window scroll.
 * Only mounts React nodes for rows near the viewport; spacers preserve scroll height.
 */
export function useGridWindow({
  containerRef,
  itemCount,
  minTrackPx,
  gapPx,
  estimateRowHeight,
  overscanRows = 2,
}: {
  containerRef: RefObject<HTMLElement | null>
  itemCount: number
  minTrackPx: number
  gapPx: number
  estimateRowHeight: number
  overscanRows?: number
}): GridWindow {
  const [viewport, setViewport] = useState({
    scrollY: 0,
    viewH: typeof window !== 'undefined' ? window.innerHeight : 800,
    width: 0,
    top: 0,
  })

  const measure = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setViewport({
      scrollY: window.scrollY,
      viewH: window.innerHeight,
      width: el.clientWidth,
      top: rect.top + window.scrollY,
    })
  }, [containerRef])

  useEffect(() => {
    measure()
    const onScroll = () => {
      setViewport((v) => ({
        ...v,
        scrollY: window.scrollY,
        viewH: window.innerHeight,
      }))
    }
    const onResize = () => measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    const el = containerRef.current
    const ro =
      el && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => measure())
        : null
    if (el && ro) ro.observe(el)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      ro?.disconnect()
    }
  }, [containerRef, measure])

  return useMemo(() => {
    const columns = Math.max(
      1,
      Math.floor((viewport.width + gapPx) / (minTrackPx + gapPx)) || 1,
    )
    const rowHeight = estimateRowHeight
    const totalRows = Math.max(1, Math.ceil(itemCount / columns))
    const viewTop = viewport.scrollY
    const viewBottom = viewTop + viewport.viewH
    const gridTop = viewport.top
    const startRow = Math.max(
      0,
      Math.floor((viewTop - gridTop) / rowHeight) - overscanRows,
    )
    const endRow = Math.min(
      totalRows,
      Math.ceil((viewBottom - gridTop) / rowHeight) + overscanRows,
    )
    const start = Math.min(itemCount, startRow * columns)
    const end = Math.min(itemCount, endRow * columns)
    return {
      start,
      end,
      padTop: startRow * rowHeight,
      padBottom: Math.max(0, (totalRows - endRow) * rowHeight),
      columns,
    }
  }, [
    viewport,
    itemCount,
    minTrackPx,
    gapPx,
    estimateRowHeight,
    overscanRows,
  ])
}
