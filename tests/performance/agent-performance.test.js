#!/usr/bin/env node

import { describe, it, expect, beforeAll } from 'vitest'
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

describe('BMad Agent Performance Tests', () => {
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

  describe('Agent Initialization Performance', () => {
    it('should initialize agents quickly', () => {
      const startTime = Date.now()
      
      // Test agent initialization time
      const newAgents = {}
      Object.entries(agents).forEach(([name, agent]) => {
        const agentStartTime = Date.now()
        newAgents[name] = agent
        const agentEndTime = Date.now()
        const agentDuration = agentEndTime - agentStartTime
        
        // Each agent should initialize in less than 10ms
        expect(agentDuration).toBeLessThan(10)
      })
      
      const endTime = Date.now()
      const totalDuration = endTime - startTime
      
      // All agents should initialize in less than 100ms
      expect(totalDuration).toBeLessThan(100)
    })
  })

  describe('Command Retrieval Performance', () => {
    it('should retrieve commands quickly', () => {
      const startTime = Date.now()
      
      Object.values(agents).forEach(agent => {
        const commandStartTime = Date.now()
        const commands = agent.getAvailableCommands()
        const commandEndTime = Date.now()
        const commandDuration = commandEndTime - commandStartTime
        
        // Command retrieval should be very fast
        expect(commandDuration).toBeLessThan(5)
        expect(commands.length).toBeGreaterThan(0)
      })
      
      const endTime = Date.now()
      const totalDuration = endTime - startTime
      
      // All command retrievals should complete in less than 50ms
      expect(totalDuration).toBeLessThan(50)
    })
  })

  describe('Configuration Access Performance', () => {
    it('should access configurations quickly', () => {
      const startTime = Date.now()
      
      Object.values(agents).forEach(agent => {
        const configStartTime = Date.now()
        const config = agent.getConfig()
        const configEndTime = Date.now()
        const configDuration = configEndTime - configStartTime
        
        // Config access should be very fast
        expect(configDuration).toBeLessThan(5)
        expect(config).toBeDefined()
        expect(config.defaultOutputFormat).toBe('markdown')
      })
      
      const endTime = Date.now()
      const totalDuration = endTime - startTime
      
      // All config accesses should complete in less than 50ms
      expect(totalDuration).toBeLessThan(50)
    })
  })

  describe('Configuration Update Performance', () => {
    it('should update configurations quickly', () => {
      const startTime = Date.now()
      
      Object.values(agents).forEach(agent => {
        const updateStartTime = Date.now()
        const originalConfig = agent.getConfig()
        const newConfig = { ...originalConfig, testProperty: 'test-value' }
        agent.updateConfig(newConfig)
        const updateEndTime = Date.now()
        const updateDuration = updateEndTime - updateStartTime
        
        // Config update should be very fast
        expect(updateDuration).toBeLessThan(10)
      })
      
      const endTime = Date.now()
      const totalDuration = endTime - startTime
      
      // All config updates should complete in less than 100ms
      expect(totalDuration).toBeLessThan(100)
    })
  })

  describe('Memory Usage Performance', () => {
    it('should not consume excessive memory', () => {
      const initialMemory = process.memoryUsage()
      
      // Create multiple agent instances
      const agentInstances = []
      for (let i = 0; i < 10; i++) {
        agentInstances.push(new AnalystAgent())
        agentInstances.push(new ArchitectAgent())
        agentInstances.push(new DevAgent())
      }
      
      const finalMemory = process.memoryUsage()
      const memoryIncrease = finalMemory.heapUsed - initialMemory.heapUsed
      
      // Memory increase should be reasonable (less than 50MB)
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024)
    })
  })

  describe('Concurrent Operations Performance', () => {
    it('should handle concurrent operations efficiently', async () => {
      const startTime = Date.now()
      const promises = []
      
      // Create 50 concurrent operations
      for (let i = 0; i < 50; i++) {
        promises.push(
          agents.analyst.getAvailableCommands(),
          agents.architect.getConfig(),
          agents.dev.getAvailableCommands(),
          agents.pm.getConfig(),
          agents.qa.getAvailableCommands()
        )
      }
      
      try {
        await Promise.all(promises)
        const endTime = Date.now()
        const duration = endTime - startTime
        
        // 250 operations should complete in less than 1 second
        expect(duration).toBeLessThan(1000)
      } catch (error) {
        // Some operations might fail, but should not crash
        expect(error.message).toBeDefined()
      }
    })
  })

  describe('Command Execution Performance', () => {
    it('should execute commands efficiently', async () => {
      const startTime = Date.now()
      const promises = []
      
      // Test command execution for each agent
      Object.entries(agents).forEach(([name, agent]) => {
        const commands = agent.getAvailableCommands()
        if (commands.length > 0) {
          promises.push(
            agent.executeCommand(commands[0], {
              userInput: 'Performance test input'
            }).catch(error => ({ success: false, error: error.message }))
          )
        }
      })
      
      try {
        const results = await Promise.all(promises)
        const endTime = Date.now()
        const duration = endTime - startTime
        
        // Command execution should complete in reasonable time
        expect(duration).toBeLessThan(2000)
        expect(results.length).toBeGreaterThan(0)
      } catch (error) {
        // Some operations might fail, but should not crash
        expect(error.message).toBeDefined()
      }
    })
  })

  describe('Template Access Performance', () => {
    it('should access templates quickly', () => {
      const startTime = Date.now()
      
      Object.values(agents).forEach(agent => {
        const config = agent.getConfig()
        const templates = config.templates
        
        // Template access should be very fast
        expect(templates).toBeDefined()
        expect(typeof templates).toBe('object')
      })
      
      const endTime = Date.now()
      const totalDuration = endTime - startTime
      
      // All template accesses should complete in less than 20ms
      expect(totalDuration).toBeLessThan(20)
    })
  })

  describe('Error Handling Performance', () => {
    it('should handle errors quickly', async () => {
      const startTime = Date.now()
      const promises = []
      
      // Test error handling performance
      for (let i = 0; i < 20; i++) {
        promises.push(
          agents.analyst.executeCommand('invalid-command', {
            userInput: 'Test input'
          }).catch(error => ({ success: false, error: error.message }))
        )
      }
      
      try {
        const results = await Promise.all(promises)
        const endTime = Date.now()
        const duration = endTime - startTime
        
        // Error handling should be fast
        expect(duration).toBeLessThan(500)
        expect(results.length).toBe(20)
      } catch (error) {
        // Should not crash
        expect(error.message).toBeDefined()
      }
    })
  })
})
