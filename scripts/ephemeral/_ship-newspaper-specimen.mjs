import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'

const [slug, foundationFlag] = process.argv.slice(2)
if (!slug) throw new Error('Usage: node scripts/_ship-newspaper-specimen.mjs <slug> [--foundation]')

const entryPath = `src/specimens/${slug}/entry.ts`
if (!existsSync(entryPath)) throw new Error(`Missing ${entryPath}`)

const entry = readFileSync(entryPath, 'utf8')
const variable = entry.match(/export const (\w+): Specimen/)?.[1]
const ref = entry.match(/ref: '(SPX-\d+)'/)?.[1]
const title = entry.match(/title: '(.+)'/)?.[1]
if (!variable || !ref || !title) throw new Error(`Could not read ${entryPath}`)

const data = JSON.parse(readFileSync('scripts/_newspaper-top50.json', 'utf8'))
const item = data.find((candidate) => candidate.slug === slug)
if (!item) throw new Error(`${slug} is not in the Newspaper Top 50 queue.`)

let index = readFileSync('src/specimens/index.ts', 'utf8')
if (!index.includes(`./${slug}/entry`)) {
  index = index.replace(
    '\nexport const specimens: Specimen[] = [',
    `\nimport { ${variable} } from './${slug}/entry'\n\nexport const specimens: Specimen[] = [`,
  )
  index = index.replace(
    '\n]\n\nexport function getSpecimen',
    `\n  ${variable},\n]\n\nexport function getSpecimen`,
  )
  writeFileSync('src/specimens/index.ts', index)
}

const cataloguePath = 'docs/catalogue/newspaper_editorial_motion_ui_specimen_catalogue.md'
let catalogue = readFileSync(cataloguePath, 'utf8')
catalogue = catalogue.replaceAll(`- [ ] **${item.id}** ·`, `- [x] **${item.id}** ·`)
catalogue = catalogue.replace(
  `- [x] **${item.id}** · \`${item.ref}\` · **${item.title}** · scaffold \`${slug}\``,
  `- [x] **${item.id}** · \`${item.ref}\` · **${item.title}** · \`${slug}\``,
)
if (!catalogue.includes(`| ${item.id} | ${item.ref} | \`${slug}\` | ${item.title} |`)) {
  catalogue = catalogue.replace(
    '| --- | --- | --- | --- |\n',
    `| --- | --- | --- | --- |\n| ${item.id} | ${item.ref} | \`${slug}\` | ${item.title} |\n`,
  )
}
const master = catalogue.slice(0, catalogue.indexOf('# Top 50 Shipping Queue'))
const done = (master.match(/^- \[x\] \*\*NEWS-\d+\*\*/gm) ?? []).length
catalogue = catalogue
  .replace(/- Progress: \*\*\d+ \/ 237\*\* complete\./, `- Progress: **${done} / 237** complete.`)
  .replace(/\| Done \| \d+ \|/, `| Done | ${done} |`)
  .replace(/\| Open \| \d+ \|/, `| Open | ${237 - done} |`)
writeFileSync(cataloguePath, catalogue)

const staged = execFileSync('git', ['diff', '--cached', '--name-only'], { encoding: 'utf8' }).trim()
if (staged) throw new Error(`Refusing to mix pre-staged changes:\n${staged}`)

const files = [`src/specimens/${slug}`, 'src/specimens/index.ts', cataloguePath]
if (foundationFlag === '--foundation') {
  files.push(
    'src/specimens/inspiration.ts',
    'docs/inspiration-directory.md',
    'AGENTS.md',
    '.cursor/rules/37_persona-catalogue.mdc',
    'scripts/_build-newspaper-catalogue.mjs',
    'scripts/_gen-newspaper-top50.mjs',
    'scripts/_newspaper-top50.json',
    'scripts/_ship-newspaper-specimen.mjs',
  )
}
execFileSync('git', ['add', '--', ...files], { stdio: 'inherit' })
execFileSync('git', ['commit', '-m', `Add ${ref} ${title}`], { stdio: 'inherit' })
