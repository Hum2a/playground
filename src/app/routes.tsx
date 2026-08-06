import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Shell } from './Shell'

/** Route bodies are lazy so Shell (LCP wordmark) paints before specimen meta. */
const Catalogue = lazy(() =>
  import('../catalogue/Catalogue').then((m) => ({ default: m.Catalogue })),
)
const SpecimenDetail = lazy(() =>
  import('../catalogue/SpecimenDetail').then((m) => ({
    default: m.SpecimenDetail,
  })),
)
const Playground = lazy(() =>
  import('../playground/Playground').then((m) => ({ default: m.Playground })),
)

function RouteFallback() {
  return (
    <div
      className="route-fallback"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="route-fallback__label">Loading…</span>
    </div>
  )
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route
          index
          element={
            <Suspense fallback={<RouteFallback />}>
              <Catalogue />
            </Suspense>
          }
        />
        <Route
          path="s/:id"
          element={
            <Suspense fallback={<RouteFallback />}>
              <SpecimenDetail />
            </Suspense>
          }
        />
        <Route
          path="playground"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Playground />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
