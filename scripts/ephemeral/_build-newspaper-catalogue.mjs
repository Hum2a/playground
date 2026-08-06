import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const path = resolve('docs/catalogue/newspaper_editorial_motion_ui_specimen_catalogue.md')
const source = readFileSync(path, 'utf8')
const shortlistStart = source.indexOf('# Top 50 Ranked Shortlist')
const mappingsStart = source.indexOf('# Strong Software Mappings')

if (shortlistStart === -1 || mappingsStart === -1) {
  throw new Error('Expected Newspaper shortlist and software-mappings headings.')
}

const master = source.slice(0, shortlistStart)
const tail = source.slice(mappingsStart)
const rows = []
const rewrittenMaster = master.replace(
  /^-\s+\[ \]\s+(★★★★★|★★★★☆|★★★☆☆)\s+\*\*(.+?)\*\*\s+---/gm,
  (_, priority, title) => {
    const number = rows.length + 1
    const id = `NEWS-${String(number).padStart(3, '0')}`
    const ref = `SPX-${3522 + number}`
    const slug = title
      .toLowerCase()
      .replace(/→/g, 'to')
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    rows.push({ id, ref, priority, title, slug })
    return `- [ ] **${id}** · \`${ref}\` · ${priority} **${title}** —`
  },
)

if (rows.length !== 237) {
  throw new Error(`Expected 237 master rows; found ${rows.length}.`)
}

const top50 = rows.filter((row) => row.priority === '★★★★★').slice(0, 50)
if (top50.length !== 50) {
  throw new Error(`Expected 50 five-star selections; found ${top50.length}.`)
}

const queue = [
  '# Top 50 Shipping Queue',
  '',
  'The implementation queue is the first 50 `★★★★★` ideas in master-list source order.',
  'Each row is also tracked in the master list above; the five waves are operational batch groups.',
  '',
  '## Shipped (mapped to live specimens)',
  '',
  '| NEWS | SPX | Specimen id | Title |',
  '| --- | --- | --- | --- |',
  '',
  '- Progress: **0 / 237** complete.',
  '',
  '| Status | Count |',
  '| --- | --- |',
  '| Done | 0 |',
  '| Open | 237 |',
  '',
  '## Core first-wave / build queue',
  '',
  ...top50.map(
    (row) =>
      `- [ ] **${row.id}** · \`${row.ref}\` · **${row.title}** · scaffold \`${row.slug}\``,
  ),
  '',
  '# Recommended Build Waves',
  '',
  ...Array.from({ length: 5 }, (_, wave) => {
    const names = ['A — Editorial fundamentals', 'B — Reading and print', 'C — Copy desk and investigation', 'D — Live news and data', 'E — Photography, longform and archives']
    return [
      `## Wave ${names[wave]}`,
      '',
      ...top50
        .slice(wave * 10, wave * 10 + 10)
        .map((row, index) => `${wave * 10 + index + 1}. **${row.id}** · \`${row.ref}\` · ${row.title}`),
      '',
    ].join('\n')
  }),
  '',
].join('\n')

const progress = [
  '## Registry and progress',
  '',
  '- Stable ids: `NEWS-001`…`NEWS-237`.',
  '- Reserved refs: `SPX-3523`…`SPX-3759`.',
  '- Shipped rows must be marked both in the master list and the Core first-wave / build queue.',
  '',
].join('\n')

const withProgress = rewrittenMaster.replace(
  '------------------------------------------------------------------------\n\n# 1. Front Page / Breaking News',
  `------------------------------------------------------------------------\n\n${progress}# 1. Front Page / Breaking News`,
)

writeFileSync(path, `${withProgress}${queue}${tail}`)
console.log(`Normalized ${rows.length} master rows; queued ${top50.length} Newspaper specimens.`)
