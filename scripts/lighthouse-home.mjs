import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'

const chrome = await chromeLauncher.launch({
  chromeFlags: ['--headless', '--no-sandbox', '--force-prefers-reduced-motion'],
})

try {
  const result = await lighthouse(
    'http://127.0.0.1:4173/',
    {
      port: chrome.port,
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      formFactor: 'mobile',
      screenEmulation: {
        mobile: true,
        width: 360,
        height: 640,
        deviceScaleFactor: 2,
        disabled: false,
      },
      throttlingMethod: 'simulate',
    },
    undefined,
  )

  const cats = result.lhr.categories
  const scores = Object.fromEntries(
    Object.entries(cats).map(([k, v]) => [k, Math.round((v.score ?? 0) * 100)]),
  )
  console.log(JSON.stringify(scores, null, 2))
  if ((scores.performance ?? 0) < 90) {
    console.error('Performance below 90')
    process.exit(1)
  }
} finally {
  await chrome.kill()
}
