import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.js'],
    exclude: ['node_modules/**', 'dist/**'],
    timeout: 30000,
    testTimeout: 30000,
    hookTimeout: 30000,
    teardownTimeout: 30000,
    reporter: ['verbose', 'json'],
    outputFile: {
      json: './test-results.json'
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      include: ['packages/**/*.js'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'tests/**',
        '**/*.test.js',
        '**/*.config.js'
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  }
})
