import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs'
import { join, resolve } from 'node:path'

const source = resolve('.cursor')
const destination = resolve('.claude')
const cursorIgnore = resolve('.cursorignore')
const cursorIndexingIgnore = resolve('.cursorindexingignore')
const claudeIgnore = resolve('.claudeignore')

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

const ignoreSources = [cursorIgnore, cursorIndexingIgnore].filter(existsSync)
if (ignoreSources.length) {
  const ignorePatterns = ignoreSources
    .map((file) => readFileSync(file, 'utf8').trim())
    .filter(Boolean)
    .join('\n\n')

  writeFileSync(
    claudeIgnore,
    `# Synced from .cursorignore and .cursorindexingignore.\n${ignorePatterns}\n`,
  )
}

console.log(
  'Synced .cursor contents to .claude and Cursor ignore patterns to .claudeignore.',
)
