import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'

const [slug, foundationFlag] = process.argv.slice(2)
if (!slug) throw new Error('Usage: node scripts/_ship-music-specimen.mjs <slug> [--foundation]')

const items = JSON.parse(readFileSync('scripts/_music-top50.json', 'utf8'))
const item = items.find((candidate) => candidate.slug === slug)
if (!item) throw new Error(`${slug} is not a Music Top 50 specimen.`)

const entryPath = `src/specimens/library/music-equipment/${slug}/entry.ts`
if (!existsSync(entryPath)) throw new Error(`Missing ${entryPath}`)
const entry = readFileSync(entryPath, 'utf8')
const exportName = entry.match(/export const (\w+): Specimen/)?.[1]
if (!exportName) throw new Error(`Could not read export from ${entryPath}`)

const shardPath = 'src/specimens/registry/shards/music-equipment.ts'
let shard = existsSync(shardPath)
  ? readFileSync(shardPath, 'utf8')
  : "import type { Specimen } from '../../types'\n\nexport const shard: Specimen[] = []\n"
if (!shard.includes(`/${slug}/entry`)) {
  shard = shard.replace(
    "from '../../types'\n",
    `from '../../types'\nimport { ${exportName} } from '../../library/music-equipment/${slug}/entry'\n`,
  )
  shard = shard.replace(
    'export const shard: Specimen[] = [',
    `export const shard: Specimen[] = [\n  ${exportName},`,
  )
}
writeFileSync(shardPath, shard)

const orderPath = 'src/specimens/registry/order.ts'
let order = readFileSync(orderPath, 'utf8')
if (!order.includes(`'${slug}'`)) {
  order = order.replace(/\]\s*$/, `  '${slug}',\n]\n`)
  writeFileSync(orderPath, order)
}

const cataloguePath = 'docs/catalogue/music_equipment_motion_ui_specimen_catalogue.md'
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
const master = catalogue.slice(0, catalogue.indexOf('# Top 50 Ranked Shortlist'))
const done = (master.match(/^- \[x\] \*\*MUSIC-\d+\*\*/gm) ?? []).length
catalogue = catalogue
  .replace(/- Progress: \*\*\d+ \/ 310\*\* complete\./, `- Progress: **${done} / 310** complete.`)
  .replace(/\| Done \| \d+ \|/, `| Done | ${done} |`)
  .replace(/\| Open \| \d+ \|/, `| Open | ${310 - done} |`)
writeFileSync(cataloguePath, catalogue)

if (execFileSync('git', ['diff', '--cached', '--name-only'], { encoding: 'utf8' }).trim()) {
  throw new Error('Refusing to mix pre-staged changes.')
}
const files = [
  `src/specimens/library/music-equipment/${slug}`,
  shardPath,
  orderPath,
  cataloguePath,
]
if (foundationFlag === '--foundation') {
  files.push(
    'src/specimens/inspiration.ts',
    'docs/inspiration-directory.md',
    'AGENTS.md',
    '.cursor/rules/37_persona-catalogue.mdc',
    '.cursor/README.md',
    'scripts/_build-music-catalogue.mjs',
    'scripts/_gen-music-top50.mjs',
    'scripts/_ship-music-specimen.mjs',
    'scripts/_music-top50.json',
    'scripts/_music-waves.json',
  )
}
execFileSync('git', ['add', '--', ...files], { stdio: 'inherit' })
execFileSync('git', ['commit', '-m', `Add ${item.ref} ${item.title}`], { stdio: 'inherit' })
