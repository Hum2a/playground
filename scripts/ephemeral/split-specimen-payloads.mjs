/**
 * One-shot: split each specimen entry.ts into light meta + payload.ts.
 * Explicit per-folder dynamic import — no import.meta.glob.
 *
 * Usage: node scripts/split-specimen-payloads.mjs
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const specimensDir = join(process.cwd(), 'src', 'specimens')
const folders = readdirSync(specimensDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)

let converted = 0
let skipped = 0
let failed = 0

for (const folder of folders) {
  const dir = join(specimensDir, folder)
  const entryPath = join(dir, 'entry.ts')
  const payloadPath = join(dir, 'payload.ts')

  if (!existsSync(entryPath)) {
    skipped++
    continue
  }

  let src = readFileSync(entryPath, 'utf8')

  if (src.includes('loadPayload') && existsSync(payloadPath)) {
    skipped++
    continue
  }

  if (!/from\s+['"]\.\/demo\.html\?raw['"]/.test(src)) {
    console.warn(`⚠ ${folder}: no demo.html?raw import — skipped`)
    skipped++
    continue
  }

  const hasJs = /from\s+['"]\.\/demo\.js\?raw['"]/.test(src)
  const hasSpec = /from\s+['"]\.\/spec\.md\?raw['"]/.test(src)
  const hasContract = /from\s+['"]\.\/contract\.json['"]/.test(src)

  if (!hasSpec || !hasContract) {
    console.warn(`⚠ ${folder}: missing spec/contract import — skipped`)
    skipped++
    continue
  }

  const payloadLines = [
    `import type { SpecimenPayload } from '../types'`,
    `import html from './demo.html?raw'`,
    `// Vitest's CSS pipeline returns "" for \`*.css?raw\`; keep demo.css as the portable`,
    `// artifact and import the twin \`.txt\` for the in-app string.`,
    `import css from './demo.style.txt?raw'`,
  ]
  if (hasJs) payloadLines.push(`import js from './demo.js?raw'`)
  payloadLines.push(`import spec from './spec.md?raw'`)
  payloadLines.push(`import contract from './contract.json'`)
  payloadLines.push('')
  payloadLines.push(`const payload: SpecimenPayload = {`)
  payloadLines.push(
    hasJs ? `  files: { html, css, js },` : `  files: { html, css },`,
  )
  payloadLines.push(`  spec,`)
  payloadLines.push(`  contract,`)
  payloadLines.push(`}`)
  payloadLines.push('')
  payloadLines.push(`export default payload`)
  payloadLines.push('')

  writeFileSync(payloadPath, payloadLines.join('\n'))

  // Strip raw / contract imports from entry (keep type import).
  src = src.replace(
    /^import\s+html\s+from\s+['"]\.\/demo\.html\?raw['"]\s*;?\s*\n/gm,
    '',
  )
  src = src.replace(
    /^\/\/ Vitest's CSS pipeline[\s\S]*?\n/gm,
    '',
  )
  src = src.replace(
    /^import\s+css\s+from\s+['"]\.\/demo\.style\.txt\?raw['"]\s*;?\s*\n/gm,
    '',
  )
  src = src.replace(
    /^import\s+js\s+from\s+['"]\.\/demo\.js\?raw['"]\s*;?\s*\n/gm,
    '',
  )
  src = src.replace(
    /^import\s+spec\s+from\s+['"]\.\/spec\.md\?raw['"]\s*;?\s*\n/gm,
    '',
  )
  src = src.replace(
    /^import\s+contract\s+from\s+['"]\.\/contract\.json['"]\s*;?\s*\n/gm,
    '',
  )

  // Ensure type import exists.
  if (!/from\s+['"]\.\.\/types['"]/.test(src)) {
    src = `import type { Specimen } from '../types'\n` + src
  }

  // Replace files/spec/contract fields with loadPayload.
  // Common multi-line form:
  //   files: { html, css, js },
  //   spec,
  //   contract,
  const blockRe =
    /\n\s*files:\s*\{[^}]*\}\s*,?\s*\n\s*spec\s*,?\s*\n\s*contract\s*,?/
  if (blockRe.test(src)) {
    src = src.replace(
      blockRe,
      `\n  loadPayload: () => import('./payload').then((m) => m.default),`,
    )
  } else {
    // Minified / single-line: files:{html,css,js},spec,contract,
    const miniRe = /files:\s*\{[^}]*\}\s*,\s*spec\s*,\s*contract\s*,/
    if (miniRe.test(src)) {
      src = src.replace(
        miniRe,
        `loadPayload:()=>import('./payload').then((m)=>m.default),`,
      )
    } else {
      console.error(`✗ ${folder}: could not locate files/spec/contract block`)
      failed++
      continue
    }
  }

  writeFileSync(entryPath, src)
  converted++
}

console.log(
  `split-specimen-payloads: converted=${converted} skipped=${skipped} failed=${failed}`,
)
if (failed > 0) process.exit(1)
