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
  join(dir, 'entry.ts'),
  `import type { Specimen } from '../types'
import html from './demo.html?raw'
import css from './demo.style.txt?raw'
import spec from './spec.md?raw'
import contract from './contract.json'

export const specimen: Specimen = {
  id: '${slug}',
  ref: 'SPX-TODO',
  title: '${slug}',
  blurb: 'TODO',
  origin: { project: 'TODO' },
  tags: [],
  deps: 'none',
  motion: { loops: true, respectsReducedMotion: true },
  files: { html, css },
  spec,
  contract,
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
