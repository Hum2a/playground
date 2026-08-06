import { NavLink, Outlet } from 'react-router-dom'
import './shell.css'

export function Shell() {
  return (
    <div className="shell">
      <header className="shell__header">
        <NavLink to="/" className="shell__wordmark" end>
          Specimen Archive
        </NavLink>
        <nav className="shell__nav" aria-label="Primary">
          <NavLink to="/" end className="shell__nav-link">
            Catalogue
          </NavLink>
          <NavLink to="/playground" className="shell__nav-link">
            Playground
          </NavLink>
        </nav>
      </header>
      <main className="shell__main">
        <Outlet />
      </main>
    </div>
  )
}
