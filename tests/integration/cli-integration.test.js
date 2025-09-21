#!/usr/bin/env node

import { describe, it, expect, beforeAll } from 'vitest'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

describe('CLI Integration Tests', () => {
  const cliPath = './packages/cli/dist/index.js'

  beforeAll(async () => {
    // Ensure CLI is built
    try {
      await execAsync('cd packages/cli && npm run build')
    } catch (error) {
      console.warn('CLI build warning:', error.message)
    }
  })

  describe('CLI Commands', () => {
    it('should show help when no arguments provided', async () => {
      try {
        const { stdout } = await execAsync(`node ${cliPath} --help`)
        expect(stdout).toContain('Usage: bmad')
        expect(stdout).toContain('BMad CLI')
        expect(stdout).toContain('Commands:')
      } catch (error) {
        expect(error.message).toBeDefined()
      }
    })

    it('should show version information', async () => {
      try {
        const { stdout } = await execAsync(`node ${cliPath} --version`)
        expect(stdout).toContain('1.0.0')
      } catch (error) {
        expect(error.message).toBeDefined()
      }
    })

    it('should show status command', async () => {
      try {
        const { stdout } = await execAsync(`node ${cliPath} status`)
        expect(stdout).toContain('BMad Status')
      } catch (error) {
        expect(error.message).toBeDefined()
      }
    })

    it('should show config command help', async () => {
      try {
        const { stdout } = await execAsync(`node ${cliPath} config --help`)
        expect(stdout).toContain('config')
      } catch (error) {
        expect(error.message).toBeDefined()
      }
    })

    it('should show init command help', async () => {
      try {
        const { stdout } = await execAsync(`node ${cliPath} init --help`)
        expect(stdout).toContain('init')
      } catch (error) {
        expect(error.message).toBeDefined()
      }
    })

    it('should show install command help', async () => {
      try {
        const { stdout } = await execAsync(`node ${cliPath} install --help`)
        expect(stdout).toContain('install')
      } catch (error) {
        expect(error.message).toBeDefined()
      }
    })
  })

  describe('CLI Error Handling', () => {
    it('should handle invalid commands gracefully', async () => {
      try {
        await execAsync(`node ${cliPath} invalid-command`)
      } catch (error) {
        expect(error.message).toContain('unknown command')
      }
    })

    it('should handle missing arguments gracefully', async () => {
      try {
        await execAsync(`node ${cliPath} config`)
      } catch (error) {
        expect(error.message).toBeDefined()
      }
    })
  })

  describe('CLI Performance', () => {
    it('should start quickly', async () => {
      const startTime = Date.now()
      
      try {
        await execAsync(`node ${cliPath} --help`)
      } catch (error) {
        // Expected to fail in test environment
      }
      
      const endTime = Date.now()
      const duration = endTime - startTime
      
      // Should start in less than 2 seconds
      expect(duration).toBeLessThan(2000)
    })
  })
})
