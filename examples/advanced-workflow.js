#!/usr/bin/env node

/**
 * BMad Advanced Workflow Example
 * 
 * This example demonstrates advanced usage patterns including:
 * - Agent chaining and data flow
 * - Error handling and recovery
 * - Configuration management
 * - Template usage
 * - Performance optimization
 */

import { AnalystAgent } from '@osmanekrem/bmad/agents/analyst'
import { ArchitectAgent } from '@osmanekrem/bmad/agents/architect'
import { DevAgent } from '@osmanekrem/bmad/agents/dev'
import { PMAgent } from '@osmanekrem/bmad/agents/pm'
import { QAAgent } from '@osmanekrem/bmad/agents/qa'
import { SMAgent } from '@osmanekrem/bmad/agents/sm'
import { UXAgent } from '@osmanekrem/bmad/agents/ux'
import { MasterAgent } from '@osmanekrem/bmad/agents/master'
import { OrchestratorAgent } from '@osmanekrem/bmad/agents/orchestrator'
import { TemplateManager } from '@osmanekrem/bmad/templates'

// Set your API key
process.env.BMAD_AI_API_KEY = 'your-api-key-here'
process.env.BMAD_AI_PROVIDER = 'openai'

class AdvancedWorkflowManager {
  constructor() {
    this.agents = {}
    this.templateManager = new TemplateManager()
    this.workflowData = {}
    this.errors = []
  }

  async initialize() {
    console.log('🚀 Initializing Advanced Workflow Manager...\n')

    // Initialize all agents with custom configurations
    this.agents = {
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

    // Configure agents for optimal performance
    await this.configureAgents()
    
    console.log('✅ Advanced Workflow Manager initialized\n')
  }

  async configureAgents() {
    console.log('⚙️ Configuring agents for optimal performance...')

    // Configure each agent with project-specific settings
    const configurations = {
      analyst: {
        analysisDepth: 'deep',
        includeSources: true,
        autoSave: true
      },
      architect: {
        designComplexity: 'high',
        includeDiagrams: true,
        autoSave: true
      },
      dev: {
        codeStyle: 'prettier',
        testingFramework: 'vitest',
        documentationFormat: 'markdown',
        autoSave: true
      },
      pm: {
        projectMethodology: 'agile',
        teamSize: 'large',
        autoSave: true
      },
      qa: {
        testFramework: 'jest',
        testLevel: 'all',
        automationLevel: 'full',
        autoSave: true
      },
      sm: {
        sprintDuration: 2,
        teamSize: 'large',
        agileFramework: 'scrum',
        autoSave: true
      },
      ux: {
        targetAudience: 'tech-savvy',
        platform: 'web',
        deviceType: 'desktop',
        autoSave: true
      },
      master: {
        projectType: 'software-development',
        teamSize: 'large',
        complexity: 'high',
        autoSave: true
      },
      orchestrator: {
        projectType: 'software-development',
        teamSize: 'large',
        workflowType: 'parallel',
        autoSave: true
      }
    }

    // Apply configurations
    for (const [name, agent] of Object.entries(this.agents)) {
      if (configurations[name]) {
        agent.updateConfig(configurations[name])
        console.log(`  ✅ ${name} configured`)
      }
    }

    console.log('✅ Agent configuration completed\n')
  }

  async executeWorkflow(projectContext) {
    console.log('🎭 Executing Advanced Workflow...\n')

    try {
      // Phase 1: Discovery and Planning
      await this.discoveryPhase(projectContext)
      
      // Phase 2: Design and Architecture
      await this.designPhase(projectContext)
      
      // Phase 3: Development and Testing
      await this.developmentPhase(projectContext)
      
      // Phase 4: Deployment and Monitoring
      await this.deploymentPhase(projectContext)

      console.log('🎉 Advanced workflow completed successfully!')
      this.generateReport()

    } catch (error) {
      console.error('❌ Workflow failed:', error.message)
      await this.handleWorkflowError(error)
    }
  }

  async discoveryPhase(projectContext) {
    console.log('🔍 Phase 1: Discovery and Planning')
    console.log('=' .repeat(50))

    // Market Research
    const marketData = await this.executeWithRetry('analyst', 'market-research', {
      userInput: `Conduct comprehensive market research for ${projectContext.projectName}`,
      projectType: projectContext.technology,
      targetAudience: projectContext.targetAudience || 'general'
    })

    // Competitor Analysis
    const competitorData = await this.executeWithRetry('analyst', 'competitor-analysis', {
      userInput: `Analyze competitors for ${projectContext.projectName}`,
      projectType: projectContext.technology,
      marketData: marketData.insights
    })

    // Strategic Planning
    const strategyData = await this.executeWithRetry('master', 'develop-strategy', {
      userInput: `Develop strategic plan for ${projectContext.projectName}`,
      projectType: projectContext.technology,
      marketInsights: marketData.insights,
      competitorAnalysis: competitorData.insights
    })

    // Store data for next phases
    this.workflowData.discovery = {
      market: marketData,
      competitors: competitorData,
      strategy: strategyData
    }

    console.log('✅ Discovery phase completed\n')
  }

  async designPhase(projectContext) {
    console.log('🎨 Phase 2: Design and Architecture')
    console.log('=' .repeat(50))

    // User Research
    const userResearch = await this.executeWithRetry('ux', 'conduct-user-research', {
      userInput: `Conduct user research for ${projectContext.projectName}`,
      projectType: projectContext.technology,
      platform: projectContext.platform,
      targetAudience: projectContext.targetAudience
    })

    // User Personas
    const personas = await this.executeWithRetry('ux', 'create-user-personas', {
      userInput: `Create user personas for ${projectContext.projectName}`,
      userResearch: userResearch.insights
    })

    // System Architecture
    const architecture = await this.executeWithRetry('architect', 'system-design', {
      userInput: `Design system architecture for ${projectContext.projectName}`,
      projectType: projectContext.technology,
      complexity: projectContext.complexity || 'high',
      userRequirements: userResearch.requirements
    })

    // Technology Selection
    const technology = await this.executeWithRetry('architect', 'technology-selection', {
      userInput: `Select technologies for ${projectContext.projectName}`,
      architecture: architecture.design,
      requirements: projectContext.requirements
    })

    // Store data for next phases
    this.workflowData.design = {
      userResearch,
      personas,
      architecture,
      technology
    }

    console.log('✅ Design phase completed\n')
  }

  async developmentPhase(projectContext) {
    console.log('💻 Phase 3: Development and Testing')
    console.log('=' .repeat(50))

    // Project Planning
    const projectPlan = await this.executeWithRetry('pm', 'create-project-plan', {
      userInput: `Create detailed project plan for ${projectContext.projectName}`,
      projectType: projectContext.technology,
      teamSize: projectContext.teamSize,
      timeline: projectContext.timeline,
      architecture: this.workflowData.design.architecture
    })

    // Sprint Planning
    const sprintPlan = await this.executeWithRetry('sm', 'plan-sprint', {
      userInput: `Plan development sprints for ${projectContext.projectName}`,
      projectPlan: projectPlan.plan,
      teamSize: projectContext.teamSize
    })

    // Code Generation
    const codeGeneration = await this.executeWithRetry('dev', 'generate-code', {
      userInput: `Generate initial code structure for ${projectContext.projectName}`,
      projectType: projectContext.technology,
      architecture: this.workflowData.design.architecture,
      technology: this.workflowData.design.technology
    })

    // Test Planning
    const testPlan = await this.executeWithRetry('qa', 'create-test-plan', {
      userInput: `Create comprehensive test plan for ${projectContext.projectName}`,
      projectType: projectContext.technology,
      codebase: codeGeneration.code,
      architecture: this.workflowData.design.architecture
    })

    // Store data for next phases
    this.workflowData.development = {
      projectPlan,
      sprintPlan,
      codeGeneration,
      testPlan
    }

    console.log('✅ Development phase completed\n')
  }

  async deploymentPhase(projectContext) {
    console.log('🚀 Phase 4: Deployment and Monitoring')
    console.log('=' .repeat(50))

    // Quality Gates
    const qualityGates = await this.executeWithRetry('qa', 'implement-quality-gates', {
      userInput: `Implement quality gates for ${projectContext.projectName}`,
      testPlan: this.workflowData.development.testPlan,
      codebase: this.workflowData.development.codeGeneration
    })

    // Performance Testing
    const performanceTest = await this.executeWithRetry('qa', 'performance-testing', {
      userInput: `Plan performance testing for ${projectContext.projectName}`,
      architecture: this.workflowData.design.architecture,
      codebase: this.workflowData.development.codeGeneration
    })

    // Workflow Coordination
    const coordination = await this.executeWithRetry('orchestrator', 'coordinate-workflow', {
      userInput: `Coordinate deployment workflow for ${projectContext.projectName}`,
      projectType: projectContext.technology,
      workflowType: 'deployment',
      allPhases: this.workflowData
    })

    // Store data
    this.workflowData.deployment = {
      qualityGates,
      performanceTest,
      coordination
    }

    console.log('✅ Deployment phase completed\n')
  }

  async executeWithRetry(agentName, command, context, maxRetries = 3) {
    let lastError = null

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`  🔄 ${agentName}.${command} (attempt ${attempt}/${maxRetries})`)
        
        const result = await this.agents[agentName].executeCommand(command, context)
        
        if (result.success) {
          console.log(`  ✅ ${agentName}.${command} completed`)
          return result
        } else {
          throw new Error(result.error || 'Command failed')
        }
      } catch (error) {
        lastError = error
        console.log(`  ⚠️ ${agentName}.${command} failed: ${error.message}`)
        
        if (attempt < maxRetries) {
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
        }
      }
    }

    // All retries failed
    this.errors.push({
      agent: agentName,
      command,
      error: lastError.message,
      context: JSON.stringify(context, null, 2)
    })

    throw lastError
  }

  async handleWorkflowError(error) {
    console.log('\n🛠️ Handling workflow error...')
    
    // Log error details
    console.log('Error details:', error.message)
    
    // Attempt recovery
    if (this.errors.length > 0) {
      console.log('Attempting to recover from errors...')
      
      // Try to continue with remaining phases
      const remainingPhases = this.getRemainingPhases()
      for (const phase of remainingPhases) {
        try {
          await phase()
        } catch (phaseError) {
          console.log(`Phase ${phase.name} failed:`, phaseError.message)
        }
      }
    }
  }

  getRemainingPhases() {
    const phases = []
    
    if (!this.workflowData.discovery) {
      phases.push(() => this.discoveryPhase({}))
    }
    if (!this.workflowData.design) {
      phases.push(() => this.designPhase({}))
    }
    if (!this.workflowData.development) {
      phases.push(() => this.developmentPhase({}))
    }
    if (!this.workflowData.deployment) {
      phases.push(() => this.deploymentPhase({}))
    }
    
    return phases
  }

  generateReport() {
    console.log('\n📊 Workflow Report')
    console.log('=' .repeat(50))
    
    console.log('✅ Completed Phases:')
    Object.keys(this.workflowData).forEach(phase => {
      console.log(`  - ${phase}`)
    })
    
    if (this.errors.length > 0) {
      console.log('\n❌ Errors Encountered:')
      this.errors.forEach((error, index) => {
        console.log(`  ${index + 1}. ${error.agent}.${error.command}: ${error.error}`)
      })
    }
    
    console.log('\n📈 Performance Metrics:')
    console.log(`  - Total Phases: ${Object.keys(this.workflowData).length}`)
    console.log(`  - Errors: ${this.errors.length}`)
    console.log(`  - Success Rate: ${((Object.keys(this.workflowData).length / 4) * 100).toFixed(1)}%`)
  }
}

// Example usage
async function runAdvancedWorkflow() {
  const workflowManager = new AdvancedWorkflowManager()
  
  await workflowManager.initialize()
  
  const projectContext = {
    projectName: 'AI-Powered E-commerce Platform',
    description: 'A next-generation e-commerce platform with AI recommendations',
    technology: 'web',
    platform: 'web',
    teamSize: 'large',
    timeline: '12 months',
    budget: '2M',
    complexity: 'high',
    targetAudience: 'tech-savvy consumers',
    requirements: [
      'AI-powered recommendations',
      'Real-time inventory management',
      'Multi-channel support',
      'Advanced analytics'
    ]
  }
  
  await workflowManager.executeWorkflow(projectContext)
}

// Run the advanced workflow
runAdvancedWorkflow().catch(console.error)
