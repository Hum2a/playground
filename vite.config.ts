/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    modulePreload: {
      // Do not preload catalogue/specimen chunks from the entry — Shell (LCP
      // wordmark) should win the network/CPU race; route chunks fetch on demand.
      resolveDependencies(filename, deps) {
        if (filename.includes('index')) {
          return deps.filter(
            (d) =>
              !/Catalogue|harness|Playground|SpecimenDetail|payload-/i.test(d),
          )
        }
        return deps
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-router')) return 'react-router'
          if (
            id.includes(`${'node_modules'}/react/`) ||
            id.includes(`${'node_modules'}/react-dom/`) ||
            id.includes(`${'node_modules'}/scheduler/`)
          ) {
            return 'react-vendor'
          }
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    passWithNoTests: true,
  },
})
