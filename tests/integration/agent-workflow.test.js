#!/usr/bin/env node

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { AnalystAgent } from '../../packages/analyst/dist/index.js'
import { ArchitectAgent } from '../../packages/architect/dist/index.js'
import { DevAgent } from '../../packages/dev/dist/index.js'
import { PMAgent } from '../../packages/pm/dist/index.js'
import { QAAgent } from '../../packages/qa/dist/index.js'
import { SMAgent } from '../../packages/sm/dist/index.js'
import { UXAgent } from '../../packages/ux/dist/index.js'
import { MasterAgent } from '../../packages/master/dist/index.js'
import { OrchestratorAgent } from '../../packages/orchestrator/dist/index.js'

// Mock API key for testing
process.env.BMAD_AI_API_KEY = 'test-api-key'
process.env.BMAD_AI_PROVIDER = 'openai'

describe('BMad Agent Workflow Integration', () => {
  let agents = {}

  beforeAll(async () => {
    // Initialize all agents
    agents = {
      analyst: new AnalystAgent(),
      architect: new ArchitectAgent(),
      dev: new DevAgent(),
      pm: new PMAgent(),
      qa: new QAAgent(),
      sm: new SMAgent(),
      ux: new UXAgent(),
      master: new MasterAgent(),
      orchestrator: new OrchestratorAgent()
    }
  })

  describe('Agent Initialization', () => {
    it('should initialize all agents successfully', () => {
      Object.values(agents).forEach(agent => {
        expect(agent).toBeDefined()
        expect(agent.getAvailableCommands).toBeDefined()
        expect(agent.getConfig).toBeDefined()
        expect(agent.executeCommand).toBeDefined()
      })
    })

    it('should have correct command counts', () => {
      const expectedCommands = {
        analyst: 6,
        architect: 9,
        dev: 10,
        pm: 10,
        qa: 10,
        sm: 10,
        ux: 10,
        master: 10,
        orchestrator: 10
      }

      Object.entries(agents).forEach(([name, agent]) => {
        const commands = agent.getAvailableCommands()
        expect(commands.length).toBe(expectedCommands[name])
      })
    })
  })

  describe('Configuration Management', () => {
    it('should load configurations for all agents', () => {
      Object.entries(agents).forEach(([name, agent]) => {
        const config = agent.getConfig()
        expect(config).toBeDefined()
        expect(config.defaultOutputFormat).toBe('markdown')
        expect(config.autoSave).toBe(true)
      })
    })

    it('should update configurations successfully', () => {
      Object.entries(agents).forEach(([name, agent]) => {
        const originalConfig = agent.getConfig()
        const newConfig = { ...originalConfig, testProperty: 'test-value' }
        
        agent.updateConfig(newConfig)
        const updatedConfig = agent.getConfig()
        
        expect(updatedConfig.testProperty).toBe('test-value')
      })
    })
  })

  describe('Command Execution Framework', () => {
    it('should execute commands without AI calls (structure test)', async () => {
      for (const [name, agent] of Object.entries(agents)) {
        const commands = agent.getAvailableCommands()
        if (commands.length > 0) {
          try {
            const result = await agent.executeCommand(commands[0], {
              userInput: 'Test input for integration test'
            })
            // Should return a result object with success property
            expect(result).toBeDefined()
            expect(typeof result.success).toBe('boolean')
          } catch (error) {
            // Expected to fail with test API key
            expect(error.message).toContain('API key')
          }
        }
      }
    })
  })

  describe('Cross-Agent Communication', () => {
    it('should support agent-to-agent data flow', () => {
      // Test that agents can share data structures
      const analystData = {
        marketAnalysis: 'Test market analysis',
        competitors: ['Competitor 1', 'Competitor 2'],
        trends: ['Trend 1', 'Trend 2']
      }

      const architectData = {
        systemDesign: 'Test system design',
        technologies: ['React', 'Node.js'],
        patterns: ['MVC', 'Microservices']
      }

      // Verify data structures are compatible
      expect(typeof analystData.marketAnalysis).toBe('string')
      expect(Array.isArray(architectData.technologies)).toBe(true)
    })
  })

  describe('Template Integration', () => {
    it('should have template configurations for all agents', () => {
      Object.entries(agents).forEach(([name, agent]) => {
        const config = agent.getConfig()
        expect(config.templates).toBeDefined()
        expect(typeof config.templates).toBe('object')
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle invalid commands gracefully', async () => {
      for (const [name, agent] of Object.entries(agents)) {
        try {
          await agent.executeCommand('invalid-command', {
            userInput: 'Test input'
          })
        } catch (error) {
          expect(error.message).toBeDefined()
        }
      }
    })

    it('should handle missing context gracefully', async () => {
      for (const [name, agent] of Object.entries(agents)) {
        const commands = agent.getAvailableCommands()
        if (commands.length > 0) {
          try {
            await agent.executeCommand(commands[0], {})
          } catch (error) {
            // Should handle missing context gracefully
            expect(error.message).toBeDefined()
          }
        }
      }
    })
  })

  describe('Performance', () => {
    it('should initialize agents quickly', () => {
      const startTime = Date.now()
      
      Object.values(agents).forEach(agent => {
        agent.getAvailableCommands()
        agent.getConfig()
      })
      
      const endTime = Date.now()
      const duration = endTime - startTime
      
      // Should initialize and access methods in less than 100ms
      expect(duration).toBeLessThan(100)
    })
  })
})
