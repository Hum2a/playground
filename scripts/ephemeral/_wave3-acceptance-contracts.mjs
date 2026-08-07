/**
 * Ensure every Naruto contract used via `contract.acceptance` actually has an acceptance array.
 * Pulls from entry.ts when missing. One Improve commit per specimen that changes.
 */
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const ROOT = 'src/specimens/library/naruto'

function parseAcceptance(entry) {
  const m = entry.match(/acceptance:\s*\[([\s\S]*?)\]\s*,/)
  if (!m) return null
  const items = []
  const re = /'((?:\\'|[^'])*)'|"((?:\\"|[^"])*)"/g
  let x
  while ((x = re.exec(m[1]))) {
    items.push((x[1] ?? x[2]).replace(/\\'/g, "'"))
  }
  return items.length ? items : null
}

const changed = []

for (const id of fs.readdirSync(ROOT)) {
  const dir = path.join(ROOT, id)
  const payloadPath = path.join(dir, 'payload.ts')
  const contractPath = path.join(dir, 'contract.json')
  const entryPath = path.join(dir, 'entry.ts')
  if (!fs.existsSync(payloadPath) || !fs.existsSync(contractPath)) continue

  const payload = fs.readFileSync(payloadPath, 'utf8')
  if (!payload.includes('contract.acceptance')) continue

  let raw = fs.readFileSync(contractPath)
  if (raw[0] === 0xef) raw = raw.slice(3)
  const contract = JSON.parse(raw.toString('utf8'))
  if (Array.isArray(contract.acceptance) && contract.acceptance.length) continue

  const entry = fs.readFileSync(entryPath, 'utf8')
  const acceptance = parseAcceptance(entry)
  if (!acceptance) {
    console.warn('skip no entry acceptance', id)
    continue
  }

  contract.acceptance = acceptance
  fs.writeFileSync(contractPath, JSON.stringify(contract, null, 2) + '\n')
  changed.push(id)
}

console.log('patched', changed.length, changed.join(', '))

for (const id of changed) {
  const entry = fs.readFileSync(path.join(ROOT, id, 'entry.ts'), 'utf8')
  const ref = (entry.match(/ref: '([^']+)'/) || [])[1] || id
  const title = (entry.match(/title: '([^']+)'/) || [])[1] || id
  execSync(`git add "${path.join(ROOT, id, 'contract.json')}"`, { stdio: 'inherit' })
  const msg = `Improve ${ref} ${title}.\n\nAdd frozen acceptance array to contract so payload.acceptance typechecks.`
  execSync(`git commit -m ${JSON.stringify(msg)}`, { stdio: 'inherit' })
  console.log('committed', ref)
}
