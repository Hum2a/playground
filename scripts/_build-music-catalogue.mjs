import { readFileSync, writeFileSync } from 'node:fs'

const path = 'docs/catalogue/music_equipment_motion_ui_specimen_catalogue.md'
const source = readFileSync(path, 'utf8')
const shortlistStart = source.indexOf('# Top 50 Ranked Shortlist')
const mappingsStart = source.indexOf('# Strong Software Mappings')
if (shortlistStart < 0 || mappingsStart < 0) {
  throw new Error('Expected Top 50 and Software Mappings headings.')
}

const master = source.slice(0, shortlistStart)
const shortlist = source.slice(shortlistStart, mappingsStart)
const tail = source.slice(mappingsStart)
const rows = []
const normalizedMaster = master.replace(
  /^-\s+\[ \]\s+(★★★★★|★★★★☆|★★★☆☆)\s+\*\*(.+?)\*\*\s+---/gm,
  (_, priority, title) => {
    const number = rows.length + 1
    const id = `MUSIC-${String(number).padStart(3, '0')}`
    const ref = `SPX-${3759 + number}`
    const slug = title
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    rows.push({ id, ref, title, slug })
    return `- [ ] **${id}** · \`${ref}\` · ${priority} **${title}** —`
  },
)
if (rows.length !== 310) throw new Error(`Expected 310 master rows; found ${rows.length}.`)

const byTitle = new Map(rows.map((row) => [row.title, row]))
const ranked = [...shortlist.matchAll(/^## \d+\. (.+)$/gm)].map((match) => match[1])
if (ranked.length !== 50) throw new Error(`Expected 50 ranked rows; found ${ranked.length}.`)
const top50 = ranked.map((title) => {
  const row = byTitle.get(title)
  if (!row) throw new Error(`Ranked title not found in master list: ${title}`)
  return row
})

const waves = [...`${shortlist}\n## END`.matchAll(
  /^## (Wave [A-E] --- .+?)\n\n([\s\S]*?)(?=^## (?:Wave [A-E] ---|END))/gm,
)].map(([, heading, body]) => ({
  heading,
  titles: [...body.matchAll(/^\d+\.\s+(.+)$/gm)].map((match) => match[1]),
}))
if (waves.length !== 5 || waves.some((wave) => wave.titles.length !== 10)) {
  throw new Error('Expected five complete build waves.')
}

const progress = `## Registry and progress

- Stable ids: \`MUSIC-001\`…\`MUSIC-310\`.
- Reserved refs: \`SPX-3760\`…\`SPX-4069\`.
- Shipped specimens are marked in both the master list and the Top 50 queue.

`
const queue = [
  '# Top 50 Ranked Shortlist',
  '',
  'The original ranked Top 50 and its recommended build waves are retained below.',
  '',
  '## Shipped (mapped to live specimens)',
  '',
  '| MUSIC | SPX | Specimen id | Title |',
  '| --- | --- | --- | --- |',
  '',
  '- Progress: **0 / 310** complete.',
  '',
  '| Status | Count |',
  '| --- | --- |',
  '| Done | 0 |',
  '| Open | 310 |',
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
      return `${index + 1}. **${row.id}** · \`${row.ref}\` · ${row.title}`
    }),
    '',
  ].join('\n')),
  '',
].join('\n')

const result = normalizedMaster.replace(
  '------------------------------------------------------------------------\n\n# 1. Mixing Consoles / Channel Strips',
  `------------------------------------------------------------------------\n\n${progress}# 1. Mixing Consoles / Channel Strips`,
)
writeFileSync(path, `${result}${queue}${tail}`)
writeFileSync('scripts/_music-top50.json', `${JSON.stringify(top50, null, 2)}\n`)
console.log(`Normalized ${rows.length} Music rows; queued ${top50.length} specimens.`)
