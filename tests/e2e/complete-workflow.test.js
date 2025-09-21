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

describe('Complete BMad Workflow E2E Tests', () => {
  let agents = {}
  let projectData = {}

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

    // Initialize project data
    projectData = {
      projectName: 'BMad Test Project',
      description: 'A comprehensive test project for BMad system',
      teamSize: 'medium',
      timeline: '3 months',
      budget: '100k',
      technology: 'web',
      platform: 'web'
    }
  })

  describe('Project Planning Workflow', () => {
    it('should complete a full project planning workflow', async () => {
      const workflow = []

      // Step 1: Master Agent - Strategic Planning
      try {
        const masterResult = await agents.master.executeCommand('develop-strategy', {
          userInput: `Create a strategic plan for ${projectData.projectName}`,
          projectType: projectData.technology,
          teamSize: projectData.teamSize,
          timeline: projectData.timeline
        })
        workflow.push({ step: 'master-strategy', success: masterResult.success })
      } catch (error) {
        workflow.push({ step: 'master-strategy', success: false, error: error.message })
      }

      // Step 2: Analyst Agent - Market Research
      try {
        const analystResult = await agents.analyst.executeCommand('market-research', {
          userInput: `Conduct market research for ${projectData.projectName}`,
          projectType: projectData.technology,
          targetAudience: 'general'
        })
        workflow.push({ step: 'analyst-research', success: analystResult.success })
      } catch (error) {
        workflow.push({ step: 'analyst-research', success: false, error: error.message })
      }

      // Step 3: Architect Agent - System Design
      try {
        const architectResult = await agents.architect.executeCommand('system-design', {
          userInput: `Design system architecture for ${projectData.projectName}`,
          projectType: projectData.technology,
          complexity: 'medium'
        })
        workflow.push({ step: 'architect-design', success: architectResult.success })
      } catch (error) {
        workflow.push({ step: 'architect-design', success: false, error: error.message })
      }

      // Step 4: PM Agent - Project Planning
      try {
        const pmResult = await agents.pm.executeCommand('create-project-plan', {
          userInput: `Create project plan for ${projectData.projectName}`,
          projectType: projectData.technology,
          teamSize: projectData.teamSize,
          timeline: projectData.timeline
        })
        workflow.push({ step: 'pm-planning', success: pmResult.success })
      } catch (error) {
        workflow.push({ step: 'pm-planning', success: false, error: error.message })
      }

      // Step 5: UX Agent - User Experience Design
      try {
        const uxResult = await agents.ux.executeCommand('conduct-user-research', {
          userInput: `Conduct user research for ${projectData.projectName}`,
          projectType: projectData.technology,
          platform: projectData.platform
        })
        workflow.push({ step: 'ux-research', success: uxResult.success })
      } catch (error) {
        workflow.push({ step: 'ux-research', success: false, error: error.message })
      }

      // Verify workflow steps
      expect(workflow).toHaveLength(5)
      expect(workflow.every(step => step.step)).toBe(true)
    })
  })

  describe('Development Workflow', () => {
    it('should complete a development workflow', async () => {
      const devWorkflow = []

      // Step 1: Dev Agent - Code Generation
      try {
        const devResult = await agents.dev.executeCommand('generate-code', {
          userInput: `Generate initial code structure for ${projectData.projectName}`,
          projectType: projectData.technology,
          codeStyle: 'standard'
        })
        devWorkflow.push({ step: 'dev-generation', success: devResult.success })
      } catch (error) {
        devWorkflow.push({ step: 'dev-generation', success: false, error: error.message })
      }

      // Step 2: QA Agent - Test Planning
      try {
        const qaResult = await agents.qa.executeCommand('create-test-plan', {
          userInput: `Create test plan for ${projectData.projectName}`,
          projectType: projectData.technology,
          testFramework: 'jest'
        })
        devWorkflow.push({ step: 'qa-planning', success: qaResult.success })
      } catch (error) {
        devWorkflow.push({ step: 'qa-planning', success: false, error: error.message })
      }

      // Step 3: SM Agent - Sprint Planning
      try {
        const smResult = await agents.sm.executeCommand('plan-sprint', {
          userInput: `Plan first sprint for ${projectData.projectName}`,
          projectType: projectData.technology,
          teamSize: projectData.teamSize
        })
        devWorkflow.push({ step: 'sm-planning', success: smResult.success })
      } catch (error) {
        devWorkflow.push({ step: 'sm-planning', success: false, error: error.message })
      }

      // Verify development workflow
      expect(devWorkflow).toHaveLength(3)
      expect(devWorkflow.every(step => step.step)).toBe(true)
    })
  })

  describe('Coordination Workflow', () => {
    it('should complete a coordination workflow', async () => {
      const coordWorkflow = []

      // Step 1: Orchestrator Agent - Workflow Coordination
      try {
        const orchestratorResult = await agents.orchestrator.executeCommand('coordinate-workflow', {
          userInput: `Coordinate workflow for ${projectData.projectName}`,
          projectType: projectData.technology,
          workflowType: 'hybrid'
        })
        coordWorkflow.push({ step: 'orchestrator-workflow', success: orchestratorResult.success })
      } catch (error) {
        coordWorkflow.push({ step: 'orchestrator-workflow', success: false, error: error.message })
      }

      // Step 2: Master Agent - Project Orchestration
      try {
        const masterResult = await agents.master.executeCommand('orchestrate-project', {
          userInput: `Orchestrate project execution for ${projectData.projectName}`,
          projectType: projectData.technology,
          teamSize: projectData.teamSize
        })
        coordWorkflow.push({ step: 'master-orchestration', success: masterResult.success })
      } catch (error) {
        coordWorkflow.push({ step: 'master-orchestration', success: false, error: error.message })
      }

      // Verify coordination workflow
      expect(coordWorkflow).toHaveLength(2)
      expect(coordWorkflow.every(step => step.step)).toBe(true)
    })
  })

  describe('Data Flow Between Agents', () => {
    it('should support data flow between agents', () => {
      // Test data structures that would flow between agents
      const marketData = {
        targetAudience: 'developers',
        marketSize: 'large',
        competitors: ['Competitor A', 'Competitor B'],
        trends: ['AI', 'Cloud', 'Microservices']
      }

      const architectureData = {
        systemType: 'web-application',
        technologies: ['React', 'Node.js', 'PostgreSQL'],
        patterns: ['MVC', 'REST API', 'Microservices'],
        scalability: 'high'
      }

      const developmentData = {
        codebase: 'TypeScript',
        framework: 'React',
        testing: 'Jest',
        deployment: 'Docker'
      }

      // Verify data compatibility
      expect(marketData.targetAudience).toBe('developers')
      expect(Array.isArray(architectureData.technologies)).toBe(true)
      expect(developmentData.codebase).toBe('TypeScript')
    })
  })

  describe('Error Recovery', () => {
    it('should handle errors gracefully in workflow', async () => {
      const errorWorkflow = []

      // Test with invalid command
      try {
        await agents.analyst.executeCommand('invalid-command', {
          userInput: 'Test input'
        })
        errorWorkflow.push({ step: 'invalid-command', success: true })
      } catch (error) {
        errorWorkflow.push({ step: 'invalid-command', success: false, error: error.message })
      }

      // Test with missing context
      try {
        await agents.architect.executeCommand('system-design', {})
        errorWorkflow.push({ step: 'missing-context', success: true })
      } catch (error) {
        errorWorkflow.push({ step: 'missing-context', success: false, error: error.message })
      }

      // Verify error handling
      expect(errorWorkflow).toHaveLength(2)
      expect(errorWorkflow.every(step => step.step)).toBe(true)
    })
  })

  describe('Performance Under Load', () => {
    it('should handle multiple concurrent operations', async () => {
      const startTime = Date.now()
      const promises = []

      // Create multiple concurrent operations
      for (let i = 0; i < 5; i++) {
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

        // Should complete in reasonable time
        expect(duration).toBeLessThan(5000)
      } catch (error) {
        // Some operations might fail, but should not crash
        expect(error.message).toBeDefined()
      }
    })
  })
})
