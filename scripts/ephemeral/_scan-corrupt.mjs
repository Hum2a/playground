import fs from 'node:fs'
import path from 'node:path'

const ROOT = 'src/specimens/library/naruto'
const bad = []

for (const id of fs.readdirSync(ROOT)) {
  const dir = path.join(ROOT, id)
  if (!fs.statSync(dir).isDirectory()) continue
  for (const f of fs.readdirSync(dir)) {
    if (!/\.(ts|js|css|html|json|md|txt)$/.test(f)) continue
    const p = path.join(dir, f)
    const t = fs.readFileSync(p, 'utf8')
    // Parallel-merge corruption: closing array then orphan fragment
    if (/\]\s*,\s*[a-zA-Z/'`]/.test(t) || /\]\s*,\s*,/.test(t)) {
      // allow normal `],` followed by property - check for orphan strings after ],
      if (/\]\s*,\s*'[^']*',\s*$/m.test(t) || /\]\s*,\s*[a-z][^'\n]*',\s*$/m.test(t) || /\]\s*,\s*,/.test(t) || /\]\s*,\s*\/\s/.test(t) || /\]\s*,\s*and /.test(t) || /\]\s*,\s*in /.test(t) || /\]\s*,\s*at /.test(t) || /\]\s*,\s*log /.test(t) || /\]\s*,\s*'/.test(t) && t.includes("'],")) {
        // more precise: look for `],` not followed by newline+spaces+identifier+colon
        const lines = t.split('\n')
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i]
          if (/^\s*\],/.test(line) && !/^\s*\],\s*$/.test(line) && !/^\s*\],\s*\/\//.test(line)) {
            // `], something` on same line is corrupt
            if (!/^\s*\],\s*$/.test(line)) {
              bad.push(`${id}/${f}:${i + 1}: ${line.trim().slice(0, 80)}`)
            }
          }
        }
      }
    }
  }
}

console.log(bad.join('\n') || 'no obvious same-line ], corruption')
