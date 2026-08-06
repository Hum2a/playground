import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs'
import { execSync } from 'node:child_process'
import { join } from 'node:path'

const [id, spx, nf, title, exportName, beforeExport, beforeFolder] =
  process.argv.slice(2)
// beforeExport/beforeFolder = insert BEFORE this existing registry neighbour
if (!id || !spx || !nf || !title || !exportName || !beforeExport || !beforeFolder) {
  console.error(
    'Usage: node scripts/_ship-netflix-specimen.mjs <id> <SPX> <NF> "<Title>" <exportName> <beforeExport> <beforeFolder>',
  )
  process.exit(1)
}

const SRC = `.wip-aside/${id}`
const DST = `src/specimens/${id}`

function sh(cmd) {
  return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
}

const required = [
  'demo.html',
  'demo.css',
  'demo.js',
  'entry.ts',
  'payload.ts',
  'contract.json',
  'spec.md',
]
for (const f of required) {
  if (!existsSync(join(SRC, f))) throw new Error(`missing WIP ${f}`)
}

mkdirSync(DST, { recursive: true })
for (const f of required) copyFileSync(join(SRC, f), join(DST, f))
copyFileSync(join(DST, 'demo.css'), join(DST, 'demo.style.txt'))

let index = sh('git show HEAD:src/specimens/index.ts')
if (!index.includes(exportName)) {
  const impNeedle = `import { ${beforeExport} } from './${beforeFolder}/entry'\n`
  const impNeedleCR = `import { ${beforeExport} } from './${beforeFolder}/entry'\r\n`
  if (index.includes(impNeedleCR)) {
    index = index.replace(
      impNeedleCR,
      `import { ${exportName} } from './${id}/entry'\r\n${impNeedleCR}`,
    )
  } else if (index.includes(impNeedle)) {
    index = index.replace(
      impNeedle,
      `import { ${exportName} } from './${id}/entry'\n${impNeedle}`,
    )
  } else {
    throw new Error(`import anchor missing: ${beforeExport}`)
  }

  const arrNeedle = `  ${beforeExport},\n`
  const arrNeedleCR = `  ${beforeExport},\r\n`
  if (index.includes(arrNeedleCR)) {
    index = index.replace(arrNeedleCR, `  ${exportName},\r\n${arrNeedleCR}`)
  } else if (index.includes(arrNeedle)) {
    index = index.replace(arrNeedle, `  ${exportName},\n${arrNeedle}`)
  } else {
    throw new Error(`array anchor missing: ${beforeExport}`)
  }
}

if (!index.includes(`from './${id}/entry'`)) throw new Error('import missing')
if (!index.includes(`  ${exportName},`)) throw new Error('array missing')
writeFileSync('src/specimens/index.ts', index)

const catPath = 'docs/catalogue/netflix-specimen-catalogue.md'
let cat = readFileSync(catPath, 'utf8')
cat = cat.replaceAll(
  `- [ ] **${nf}** · \`${spx}\` · **${title}**`,
  `- [x] **${nf}** · \`${spx}\` · **${title}**`,
)
if (!cat.includes(`| ${nf} | \`${spx}\` |`)) {
  cat = cat.replace(
    '| --- | --- | --- | --- |\n',
    `| --- | --- | --- | --- |\n| ${nf} | \`${spx}\` | \`${id}\` | ${title} |\n`,
  )
}
const shipped = (cat.match(/^\| NF-\d+/gm) || []).length
cat = cat.replace(
  /- Progress: \*\*\d+ \/ 197\*\* complete\./,
  `- Progress: **${shipped} / 197** complete.`,
)
cat = cat.replace(/\| Done \| \d+ \|/, `| Done | ${shipped} |`)
cat = cat.replace(/\| Open \| \d+ \|/, `| Open | ${197 - shipped} |`)
writeFileSync(catPath, cat)

console.log('prepared', id, spx, 'shipped', shipped)
const skipVerify = process.env.NF_SKIP_VERIFY === '1'
if (!skipVerify) {
  sh('npx tsc --noEmit')
  sh('npm run test')
  sh('npm run build')
} else {
  // Fast path: typecheck only (full verify at end of wave)
  sh('npx tsc --noEmit')
}
sh(`git add src/specimens/${id} src/specimens/index.ts ${catPath}`)
writeFileSync(
  '.wip-aside/COMMITMSG-nf.txt',
  `Add ${spx} ${title}\n\nNetflix ${nf} portable streaming-UI specimen.\n`,
)
sh('git commit -F .wip-aside/COMMITMSG-nf.txt')
console.log(sh('git log -1 --oneline'))
