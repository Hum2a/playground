import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const slug = process.argv[2]
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error('Usage: npm run spec:new -- <slug>')
  process.exit(1)
}

const dir = join(process.cwd(), 'src', 'specimens', slug)
if (existsSync(dir)) {
  console.error(`Folder already exists: ${dir}`)
  process.exit(1)
}

mkdirSync(dir, { recursive: true })

const css = `/* ${slug} — portable specimen styles */

.specimen {
  /* TODO */
}

@media (prefers-reduced-motion: reduce) {
  .specimen {
    animation: none;
  }
}

[data-force-reduced-motion="true"] .specimen {
  animation: none;
}
`

writeFileSync(join(dir, 'demo.html'), `<div class="specimen" aria-hidden="true"></div>\n`)
writeFileSync(join(dir, 'demo.css'), css)
writeFileSync(join(dir, 'demo.style.txt'), css)
writeFileSync(
  join(dir, 'spec.md'),
  `# ${slug}

## Visual intent

TODO

## DOM structure

TODO

## Copy

TODO

## Layout and colour contract

TODO

## Reduced motion

TODO

## Accessibility

TODO

## Porting to another stack

TODO
`,
)
writeFileSync(
  join(dir, 'contract.json'),
  JSON.stringify({ name: slug, todos: ['TODO: fill contract'] }, null, 2) + '\n',
)
writeFileSync(
  join(dir, 'payload.ts'),
  `import type { SpecimenPayload } from '../types'
import html from './demo.html?raw'
// Vitest's CSS pipeline returns "" for \`*.css?raw\`; keep demo.css as the portable
// artifact and import the twin \`.txt\` for the in-app string.
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

const payload: SpecimenPayload = {
  files: { html, css },
  spec,
  contract,
}

export default payload
`,
)
writeFileSync(
  join(dir, 'entry.ts'),
  `import type { Specimen } from '../types'

export const specimen: Specimen = {
  id: '${slug}',
  ref: 'SPX-TODO',
  title: '${slug}',
  blurb: 'TODO',
  origin: { project: 'TODO' },
  // TODO: set facets / inspiredBy (see taxonomy.ts + inspiration.ts / docs/inspiration-directory.md)
  facets: {
    kind: 'overlay',
    tech: 'css-only',
    scope: 'card',
    intensity: 'subtle',
  },
  // inspiredBy: { franchise: 'persona', works: ['persona-5'] },
  tags: [],
  deps: 'none',
  motion: { loops: true, respectsReducedMotion: true },
  loadPayload: () => import('./payload').then((m) => m.default),
  preview: {
    width: 360,
    height: 240,
    background: 'card',
    label: '${slug}',
  },
}
`,
)

console.log(`Scaffolded ${dir}`)
console.log('Add one import line to src/specimens/index.ts')
