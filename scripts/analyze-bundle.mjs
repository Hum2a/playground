/**
 * Report hashed asset sizes after `npm run build`.
 * Usage: npm run analyze
 */
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const assets = join(process.cwd(), 'dist', 'assets')
const rows = readdirSync(assets)
  .map((name) => {
    const size = statSync(join(assets, name)).size
    return { name, size, kb: size / 1024 }
  })
  .sort((a, b) => b.size - a.size)

const total = rows.reduce((sum, r) => sum + r.size, 0)
console.log('dist/assets (largest first):\n')
for (const row of rows.slice(0, 40)) {
  const kind = row.name.includes('payload')
    ? 'payload'
    : row.name.endsWith('.css')
      ? 'css'
      : row.name.endsWith('.js')
        ? 'js'
        : 'other'
  console.log(
    `${row.kb.toFixed(1).padStart(8)} KB  [${kind}]  ${row.name}`,
  )
}
if (rows.length > 40) console.log(`… +${rows.length - 40} more`)
console.log(`\nTotal assets: ${(total / 1024).toFixed(1)} KB (${rows.length} files)`)
