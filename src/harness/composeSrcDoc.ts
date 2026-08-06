import type { ComposeSrcDocInput, PreviewBackground } from './types'

const CONTROL_SCRIPT = `
window.addEventListener('message', (event) => {
  const data = event.data;
  if (!data || typeof data !== 'object') return;
  if (data.type === 'playback') {
    const rate = Number(data.rate);
    for (const anim of document.getAnimations()) {
      if (Number.isFinite(rate)) anim.playbackRate = rate;
      if (rate === 0) anim.pause();
      else anim.play();
    }
    return;
  }
  if (data.type === 'restart') {
    for (const anim of document.getAnimations()) {
      anim.cancel();
      anim.play();
    }
  }
});

if (document.documentElement.hasAttribute('data-emulate-prefers-reduced-motion')) {
  const stop = () => {
    document.querySelectorAll('*').forEach((el) => {
      const style = getComputedStyle(el);
      if (style.animationName !== 'none') {
        el.style.animation = 'none';
      }
    });
    for (const anim of document.getAnimations()) anim.cancel();
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', stop, { once: true });
  } else {
    stop();
  }
}
`.trim()

function backgroundCss(background: PreviewBackground): string {
  switch (background) {
    case 'card':
      return `
        html, body { height: 100%; }
        body {
          margin: 0;
          display: grid;
          place-items: center;
          background: #1b1e26;
        }
        .harness-stage {
          width: min(100%, 320px);
          min-height: 160px;
        }
      `
    case 'page':
      return `
        html, body { height: 100%; }
        body {
          margin: 0;
          background: #e6e8ec;
        }
      `
    case 'grid':
      return `
        html, body { height: 100%; }
        body {
          margin: 0;
          background-color: #1b1e26;
          background-image:
            linear-gradient(to right, rgb(230 232 236 / 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(230 232 236 / 0.06) 1px, transparent 1px);
          background-size: 16px 16px;
        }
      `
    case 'dark':
      return `
        html, body { height: 100%; }
        body {
          margin: 0;
          background: #0a0b0e;
        }
      `
  }
}

function wrapBody(html: string, scaffold?: string): string {
  if (!scaffold) return html
  if (scaffold.includes('{{specimen}}')) {
    return scaffold.replace('{{specimen}}', html)
  }
  return `${scaffold}${html}`
}

export function composeSrcDoc(input: ComposeSrcDocInput): string {
  const {
    html,
    css,
    js,
    background,
    forceReducedMotion = false,
    emulatePrefersReducedMotion = false,
    scaffold,
  } = input

  const htmlAttrs = [
    forceReducedMotion ? 'data-force-reduced-motion="true"' : '',
    emulatePrefersReducedMotion ? 'data-emulate-prefers-reduced-motion="true"' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const body = wrapBody(html, scaffold)
  const moduleScript = js?.trim()
    ? `<script type="module">\n${js}\n</script>`
    : ''

  return `<!doctype html>
<html lang="en"${htmlAttrs ? ` ${htmlAttrs}` : ''}>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
*, *::before, *::after { box-sizing: border-box; }
${backgroundCss(background)}
</style>
<style>
${css}
</style>
</head>
<body>
${body}
${moduleScript}
<script>
${CONTROL_SCRIPT}
</script>
</body>
</html>`
}
