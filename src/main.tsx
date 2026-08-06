import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/base.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Fonts after first paint so they do not contend with the critical JS path.
// `font-display: optional` already avoids late swaps / font CLS.
void import('./styles/fonts-latin.css')
