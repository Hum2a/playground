import fs from 'node:fs'
import path from 'node:path'

const ROOT = 'src/specimens/library/naruto'
const ids = fs.readdirSync(ROOT).filter((d) => fs.existsSync(path.join(ROOT, d, 'entry.ts')))

let schema = 0
let instance = 0
const issues = []

for (const id of ids) {
  const dir = path.join(ROOT, id)
  let raw = fs.readFileSync(path.join(dir, 'contract.json'))
  if (raw[0] === 0xef && raw[1] === 0xbb && raw[2] === 0xbf) {
    issues.push(`${id}: bom`)
    raw = raw.slice(3)
  }
  const contract = JSON.parse(raw.toString('utf8'))
  const css = fs.readFileSync(path.join(dir, 'demo.css'), 'utf8')
  const twin = fs.readFileSync(path.join(dir, 'demo.style.txt'), 'utf8')
  const entry = fs.readFileSync(path.join(dir, 'entry.ts'), 'utf8')

  const isSchema = Boolean(contract.$schema) || (contract.type === 'object' && contract.properties)
  if (isSchema) schema++
  else instance++

  const flags = []
  if (twin !== css) flags.push('twin')
  if (/wave2 timing|wave2-polish/.test(css)) flags.push('batch')

  const accMatch = entry.match(/acceptance:\s*\[([\s\S]*?)\]/)
  if (!accMatch) flags.push('no-acceptance')
  else if (!/\d/.test(accMatch[1])) flags.push('accept-no-num')

  const intensity = (entry.match(/intensity:\s*'([^']+)'/) || [])[1]
  if (!intensity) flags.push('no-intensity')

  // Has frozen numbers somewhere?
  const blob = JSON.stringify(contract)
  const hasNums = /\d{2,}/.test(blob)
  if (!hasNums) flags.push('contract-no-nums')

  if (flags.length) issues.push(`${id}: ${flags.join(', ')}`)
}

console.log({ total: ids.length, schema, instance, issueCount: issues.length })
console.log(issues.join('\n') || 'CLEAN')
