#!/usr/bin/env node

/**
 * BMad Basic Usage Example
 * 
 * This example demonstrates how to use BMad agents for a complete
 * software development workflow.
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

// Set your API key
process.env.BMAD_AI_API_KEY = 'your-api-key-here'
process.env.BMAD_AI_PROVIDER = 'openai'

async function basicUsageExample() {
  console.log('🚀 BMad Basic Usage Example\n')

  try {
    // Initialize agents
    console.log('📋 Initializing agents...')
    const agents = {
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
    console.log('✅ All agents initialized successfully\n')

    // Project context
    const projectContext = {
      projectName: 'E-commerce Platform',
      description: 'A modern e-commerce platform with AI-powered recommendations',
      technology: 'web',
      platform: 'web',
      teamSize: 'medium',
      timeline: '6 months',
      budget: '500k'
    }

    // Step 1: Strategic Planning
    console.log('🎯 Step 1: Strategic Planning (Master Agent)')
    try {
      const strategy = await agents.master.executeCommand('develop-strategy', {
        userInput: `Create a strategic plan for ${projectContext.projectName}`,
        projectType: projectContext.technology,
        teamSize: projectContext.teamSize,
        timeline: projectContext.timeline
      })
      console.log('✅ Strategic plan created')
      console.log('📊 Strategy:', strategy.content?.substring(0, 100) + '...\n')
    } catch (error) {
      console.log('⚠️ Strategy planning failed:', error.message, '\n')
    }

    // Step 2: Market Research
    console.log('🔍 Step 2: Market Research (Analyst Agent)')
    try {
      const marketResearch = await agents.analyst.executeCommand('market-research', {
        userInput: `Conduct market research for ${projectContext.projectName}`,
        projectType: projectContext.technology,
        targetAudience: 'online shoppers'
      })
      console.log('✅ Market research completed')
      console.log('📊 Research:', marketResearch.content?.substring(0, 100) + '...\n')
    } catch (error) {
      console.log('⚠️ Market research failed:', error.message, '\n')
    }

    // Step 3: System Architecture
    console.log('🏗️ Step 3: System Architecture (Architect Agent)')
    try {
      const architecture = await agents.architect.executeCommand('system-design', {
        userInput: `Design system architecture for ${projectContext.projectName}`,
        projectType: projectContext.technology,
        complexity: 'high'
      })
      console.log('✅ System architecture designed')
      console.log('📊 Architecture:', architecture.content?.substring(0, 100) + '...\n')
    } catch (error) {
      console.log('⚠️ Architecture design failed:', error.message, '\n')
    }

    // Step 4: Project Planning
    console.log('📋 Step 4: Project Planning (PM Agent)')
    try {
      const projectPlan = await agents.pm.executeCommand('create-project-plan', {
        userInput: `Create project plan for ${projectContext.projectName}`,
        projectType: projectContext.technology,
        teamSize: projectContext.teamSize,
        timeline: projectContext.timeline
      })
      console.log('✅ Project plan created')
      console.log('📊 Plan:', projectPlan.content?.substring(0, 100) + '...\n')
    } catch (error) {
      console.log('⚠️ Project planning failed:', error.message, '\n')
    }

    // Step 5: User Experience Design
    console.log('🎨 Step 5: User Experience Design (UX Agent)')
    try {
      const uxResearch = await agents.ux.executeCommand('conduct-user-research', {
        userInput: `Conduct user research for ${projectContext.projectName}`,
        projectType: projectContext.technology,
        platform: projectContext.platform
      })
      console.log('✅ User research completed')
      console.log('📊 UX Research:', uxResearch.content?.substring(0, 100) + '...\n')
    } catch (error) {
      console.log('⚠️ UX research failed:', error.message, '\n')
    }

    // Step 6: Code Generation
    console.log('💻 Step 6: Code Generation (Dev Agent)')
    try {
      const codeGeneration = await agents.dev.executeCommand('generate-code', {
        userInput: `Generate initial code structure for ${projectContext.projectName}`,
        projectType: projectContext.technology,
        codeStyle: 'modern'
      })
      console.log('✅ Code generation completed')
      console.log('📊 Code:', codeGeneration.content?.substring(0, 100) + '...\n')
    } catch (error) {
      console.log('⚠️ Code generation failed:', error.message, '\n')
    }

    // Step 7: Quality Assurance
    console.log('🧪 Step 7: Quality Assurance (QA Agent)')
    try {
      const testPlan = await agents.qa.executeCommand('create-test-plan', {
        userInput: `Create test plan for ${projectContext.projectName}`,
        projectType: projectContext.technology,
        testFramework: 'jest'
      })
      console.log('✅ Test plan created')
      console.log('📊 Test Plan:', testPlan.content?.substring(0, 100) + '...\n')
    } catch (error) {
      console.log('⚠️ Test planning failed:', error.message, '\n')
    }

    // Step 8: Sprint Management
    console.log('🏃‍♂️ Step 8: Sprint Management (SM Agent)')
    try {
      const sprintPlan = await agents.sm.executeCommand('plan-sprint', {
        userInput: `Plan first sprint for ${projectContext.projectName}`,
        projectType: projectContext.technology,
        teamSize: projectContext.teamSize
      })
      console.log('✅ Sprint plan created')
      console.log('📊 Sprint Plan:', sprintPlan.content?.substring(0, 100) + '...\n')
    } catch (error) {
      console.log('⚠️ Sprint planning failed:', error.message, '\n')
    }

    // Step 9: Workflow Coordination
    console.log('🎭 Step 9: Workflow Coordination (Orchestrator Agent)')
    try {
      const coordination = await agents.orchestrator.executeCommand('coordinate-workflow', {
        userInput: `Coordinate workflow for ${projectContext.projectName}`,
        projectType: projectContext.technology,
        workflowType: 'agile'
      })
      console.log('✅ Workflow coordinated')
      console.log('📊 Coordination:', coordination.content?.substring(0, 100) + '...\n')
    } catch (error) {
      console.log('⚠️ Workflow coordination failed:', error.message, '\n')
    }

    // Display agent capabilities
    console.log('📊 Agent Capabilities Summary:')
    Object.entries(agents).forEach(([name, agent]) => {
      const commands = agent.getAvailableCommands()
      console.log(`  ${name}: ${commands.length} commands available`)
    })

    console.log('\n🎉 Basic usage example completed successfully!')
    console.log('\n💡 Next steps:')
    console.log('  1. Set your actual API key in the environment variables')
    console.log('  2. Customize the project context for your specific needs')
    console.log('  3. Explore individual agent commands and capabilities')
    console.log('  4. Integrate agents into your development workflow')

  } catch (error) {
    console.error('❌ Example failed:', error.message)
    console.error(error.stack)
  }
}

// Run the example
basicUsageExample()
