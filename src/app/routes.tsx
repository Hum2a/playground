import { Navigate, Route, Routes } from 'react-router-dom'
import { SpecimenDetail } from '../catalogue/SpecimenDetail'
import { Shell } from './Shell'

function CataloguePlaceholder() {
  return <p className="shell__placeholder">Catalogue — coming in a later phase.</p>
}

function PlaygroundPlaceholder() {
  return <p className="shell__placeholder">Playground — coming in a later phase.</p>
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<CataloguePlaceholder />} />
        <Route path="s/:id" element={<SpecimenDetail />} />
        <Route path="playground" element={<PlaygroundPlaceholder />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
