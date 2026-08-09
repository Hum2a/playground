import { cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'

const source = resolve('.cursor')
const destination = resolve('.claude')

if (!existsSync(source)) {
  throw new Error('Cannot sync rules: .cursor does not exist.')
}

mkdirSync(destination, { recursive: true })

for (const entry of readdirSync(source)) {
  cpSync(join(source, entry), join(destination, entry), {
    recursive: true,
    force: true,
  })
}

console.log('Synced .cursor contents to .claude.')
