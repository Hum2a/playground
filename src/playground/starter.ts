export const STARTER_HTML = `<!-- Decorative specimen root. Keep interactive lock state outside this markup. -->
<div class="specimen" aria-hidden="true">
  <p class="specimen__label">NEW SPECIMEN</p>
</div>
`

export const STARTER_CSS = `/* Portable specimen styles — do not depend on host tokens. */

.specimen {
  display: grid;
  place-items: center;
  min-height: 160px;
  padding: 1rem;
}

.specimen__label {
  margin: 0;
  font: 700 0.75rem/1 ui-sans-serif, system-ui, sans-serif;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #e6e8ec;
  animation: specimen-pulse 2.4s ease-in-out infinite;
}

@keyframes specimen-pulse {
  from,
  to {
    opacity: 0.55;
  }
  50% {
    opacity: 1;
  }
}

/* Reduced-motion contract: always include both triggers on new specimens. */
@media (prefers-reduced-motion: reduce) {
  .specimen__label {
    animation: none;
    opacity: 1;
  }
}

[data-force-reduced-motion="true"] .specimen__label {
  animation: none;
  opacity: 1;
}
`

export const STARTER_JS = `// Optional behaviour. Leave empty for CSS-only specimens.
`

export function createStarterFiles() {
  return {
    html: STARTER_HTML,
    css: STARTER_CSS,
    js: STARTER_JS,
  }
}
