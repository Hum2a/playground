import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const ROOT = 'src/specimens/library/naruto'
for (const id of fs.readdirSync(ROOT)) {
  const p = path.join(ROOT, id, 'entry.ts')
  if (!fs.existsSync(p)) continue
  const t = fs.readFileSync(p, 'utf8')
  if (t.includes("'], at ") || t.includes("'], log") || /'],\s+[a-z]/.test(t)) {
    console.log('corrupt', id)
  }
}

try {
  execSync('npx tsc --noEmit -p tsconfig.app.json', {
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe'],
  })
  console.log('tsc ok')
} catch (e) {
  const err = /** @type {{ stdout?: string, stderr?: string }} */ (e)
  const out = `${err.stdout || ''}${err.stderr || ''}`
  const lines = out.split('\n').filter((l) => l.includes('library/naruto'))
  console.log(lines.slice(0, 40).join('\n') || 'no naruto tsc lines (other errors?)')
  console.log('---')
  console.log(out.split('\n').filter((l) => /error TS/.test(l)).slice(0, 30).join('\n'))
}
