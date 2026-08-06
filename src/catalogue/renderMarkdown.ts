/** Minimal markdown → HTML for specimen specs (headings, lists, code, tables, paragraphs). */
export function renderMarkdown(md: string): string {
  const escaped = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  const fences: string[] = []
  let html = escaped.replace(/```(\w*)\n([\s\S]*?)```/g, (_m, lang: string, code: string) => {
    const i = fences.length
    fences.push(
      `<pre class="md-pre"><code class="language-${lang || 'text'}">${code.trimEnd()}</code></pre>`,
    )
    return `\u0000FENCE${i}\u0000`
  })

  html = html.replace(
    /^\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n?)*)/gm,
    (_m, header: string, body: string) => {
      const th = header
        .split('|')
        .map((c) => c.trim())
        .filter(Boolean)
        .map((c) => `<th>${inline(c)}</th>`)
        .join('')
      const rows = body
        .trim()
        .split('\n')
        .map((row) => {
          const cells = row
            .split('|')
            .map((c) => c.trim())
            .filter(Boolean)
            .map((c) => `<td>${inline(c)}</td>`)
            .join('')
          return `<tr>${cells}</tr>`
        })
        .join('')
      return `<table class="md-table"><thead><tr>${th}</tr></thead><tbody>${rows}</tbody></table>`
    },
  )

  html = html
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (block) => `<ul>${block}</ul>`)
    .replace(/^(?!<[huplo]|<table|\u0000)(.+)$/gm, '<p>$1</p>')

  html = html.replace(/\u0000FENCE(\d+)\u0000/g, (_m, i) => fences[Number(i)] ?? '')

  return html
    .split('\n')
    .map((line) => inline(line))
    .join('\n')
}

function inline(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (_m, label: string, href: string) => {
        const external = /^https?:\/\//i.test(href)
        const attrs = external
          ? ' target="_blank" rel="noopener noreferrer"'
          : ''
        return `<a href="${href}"${attrs}>${label}</a>`
      },
    )
}
