import { readFileSync, writeFileSync } from 'node:fs'

const path = 'docs/catalogue/manga_motion_ui_specimen_catalogue.md'
const source = readFileSync(path, 'utf8')
const shortlistStart = source.indexOf('# Top 50 Ranked Shortlist')
const mappingsStart = source.indexOf('# Strong Software Mappings')
if (shortlistStart < 0 || mappingsStart < 0) {
  throw new Error('Expected Manga shortlist and software-mappings headings.')
}

const master = source.slice(0, shortlistStart)
const shortlist = source.slice(shortlistStart, mappingsStart)
const tail = source.slice(mappingsStart)
const rows = []
const normalizedMaster = master.replace(
  /^-\s+\[ \]\s+(★★★★★|★★★★☆|★★★☆☆)\s+\*\*(.+?)\*\*\s+---/gm,
  (_, priority, title) => {
    const number = rows.length + 1
    const id = `MANGA-${String(number).padStart(3, '0')}`
    const ref = `SPX-${4069 + number}`
    const slug = title
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    rows.push({ id, ref, title, slug })
    return `- [ ] **${id}** · \`${ref}\` · ${priority} **${title}** —`
  },
)
if (rows.length !== 270) throw new Error(`Expected 270 master rows; found ${rows.length}.`)

const byTitle = new Map(rows.map((row) => [row.title, row]))
const rankedTitles = [...shortlist.matchAll(/^## \d+\. (.+)$/gm)].map((match) => match[1])
if (rankedTitles.length !== 50) {
  throw new Error(`Expected 50 ranked rows; found ${rankedTitles.length}.`)
}
const top50 = rankedTitles.map((title) => {
  const row = byTitle.get(title)
  if (!row) throw new Error(`Ranked title is missing from master list: ${title}`)
  return row
})

const waves = [...`${shortlist}\n## END`.matchAll(
  /^## (Wave [A-E].*?)\n\n([\s\S]*?)(?=^## (?:Wave [A-E]|END))/gm,
)].map(([, heading, body]) => ({
  heading,
  titles: [...body.matchAll(/^\d+\.\s+(.+)$/gm)].map((match) => match[1]),
}))
if (waves.length !== 5 || waves.some((wave) => wave.titles.length !== 10)) {
  throw new Error('Expected five complete Manga build waves.')
}

const progress = `## Registry and progress

- Stable ids: \`MANGA-001\`…\`MANGA-270\`.
- Reserved refs: \`SPX-4070\`…\`SPX-4339\`.
- Shipped specimens are marked in both the master list and the Top 50 queue.

`
const queue = [
  '# Top 50 Ranked Shortlist',
  '',
  'The original ranked Top 50 and recommended build waves are retained below.',
  '',
  '## Shipped (mapped to live specimens)',
  '',
  '| MANGA | SPX | Specimen id | Title |',
  '| --- | --- | --- | --- |',
  '',
  '- Progress: **0 / 270** complete.',
  '',
  '| Status | Count |',
  '| --- | --- |',
  '| Done | 0 |',
  '| Open | 270 |',
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
  ...waves.map((wave) => [
    `## ${wave.heading}`,
    '',
    ...wave.titles.map((title, index) => {
      const row = byTitle.get(title)
      if (!row) throw new Error(`Wave title is missing from master list: ${title}`)
      return `${index + 1}. **${row.id}** · \`${row.ref}\` · ${row.title}`
    }),
    '',
  ].join('\n')),
  '',
].join('\n')

const result = normalizedMaster.replace(
  '------------------------------------------------------------------------\n\n# 1. Panels & Composition',
  `------------------------------------------------------------------------\n\n${progress}# 1. Panels & Composition`,
)
writeFileSync(path, `${result}${queue}${tail}`)
writeFileSync('scripts/_manga-top50.json', `${JSON.stringify(top50, null, 2)}\n`)
console.log(`Normalized ${rows.length} Manga rows; queued ${top50.length} specimens.`)
