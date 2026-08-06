import { Navigate, Route, Routes } from 'react-router-dom'
import { Catalogue } from '../catalogue/Catalogue'
import { SpecimenDetail } from '../catalogue/SpecimenDetail'
import { Playground } from '../playground/Playground'
import { Shell } from './Shell'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<Catalogue />} />
        <Route path="s/:id" element={<SpecimenDetail />} />
        <Route path="playground" element={<Playground />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
