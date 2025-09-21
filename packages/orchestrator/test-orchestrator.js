#!/usr/bin/env node

import { OrchestratorAgent } from './dist/index.js'

// Set test API key
process.env.BMAD_AI_API_KEY = 'test-api-key'
process.env.BMAD_AI_PROVIDER = 'openai'

async function testOrchestrator() {
  console.log('🎭 Testing BMad Orchestrator Agent...\n')

  try {
    // Initialize Orchestrator agent
    const orchestrator = new OrchestratorAgent({
      defaultOutputFormat: 'markdown',
      projectType: 'software-development',
      teamSize: 'medium',
      complexity: 'medium',
      workflowType: 'hybrid',
      coordinationLevel: 'project'
    })

    console.log('✅ Orchestrator agent initialized successfully')
    console.log('🎭 Available commands:', orchestrator.getAvailableCommands())

    // Test workflow coordination command
    console.log('\n🎭 Testing workflow coordination command...')
    const workflowResult = await orchestrator.executeCommand('coordinate-workflow', {
      userInput: 'E-commerce platform development',
      projectType: 'software-development',
      teamSize: 8,
      workflowType: 'hybrid'
    })

    if (workflowResult.success) {
      console.log('✅ Workflow coordination completed successfully')
      console.log('📊 Output length:', workflowResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Workflow coordination failed:', workflowResult.error)
    }

    // Test project coordination command
    console.log('\n🎯 Testing project coordination command...')
    const projectsResult = await orchestrator.executeCommand('coordinate-projects', {
      userInput: 'E-commerce platform development',
      projectType: 'software-development',
      teamSize: 8,
      coordinationLevel: 'program'
    })

    if (projectsResult.success) {
      console.log('✅ Project coordination completed successfully')
      console.log('📊 Output length:', projectsResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Project coordination failed:', projectsResult.error)
    }

    // Test resource coordination command
    console.log('\n📊 Testing resource coordination command...')
    const resourcesResult = await orchestrator.executeCommand('coordinate-resources', {
      userInput: 'E-commerce platform development',
      projectType: 'software-development',
      teamSize: 8
    })

    if (resourcesResult.success) {
      console.log('✅ Resource coordination completed successfully')
      console.log('📊 Output length:', resourcesResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Resource coordination failed:', resourcesResult.error)
    }

    // Test stakeholder coordination command
    console.log('\n🤝 Testing stakeholder coordination command...')
    const stakeholdersResult = await orchestrator.executeCommand('coordinate-stakeholders', {
      userInput: 'E-commerce platform development',
      projectType: 'software-development',
      teamSize: 8
    })

    if (stakeholdersResult.success) {
      console.log('✅ Stakeholder coordination completed successfully')
      console.log('📊 Output length:', stakeholdersResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Stakeholder coordination failed:', stakeholdersResult.error)
    }

    // Test quality coordination command
    console.log('\n✅ Testing quality coordination command...')
    const qualityResult = await orchestrator.executeCommand('coordinate-quality', {
      userInput: 'E-commerce platform development',
      projectType: 'software-development',
      teamSize: 8
    })

    if (qualityResult.success) {
      console.log('✅ Quality coordination completed successfully')
      console.log('📊 Output length:', qualityResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Quality coordination failed:', qualityResult.error)
    }

    // Test risk coordination command
    console.log('\n⚠️ Testing risk coordination command...')
    const risksResult = await orchestrator.executeCommand('coordinate-risks', {
      userInput: 'E-commerce platform development',
      projectType: 'software-development',
      teamSize: 8
    })

    if (risksResult.success) {
      console.log('✅ Risk coordination completed successfully')
      console.log('📊 Output length:', risksResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Risk coordination failed:', risksResult.error)
    }

    // Test communication coordination command
    console.log('\n📢 Testing communication coordination command...')
    const communicationResult = await orchestrator.executeCommand('coordinate-communication', {
      userInput: 'E-commerce platform development',
      projectType: 'software-development',
      teamSize: 8
    })

    if (communicationResult.success) {
      console.log('✅ Communication coordination completed successfully')
      console.log('📊 Output length:', communicationResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Communication coordination failed:', communicationResult.error)
    }

    // Test governance coordination command
    console.log('\n🏛️ Testing governance coordination command...')
    const governanceResult = await orchestrator.executeCommand('coordinate-governance', {
      userInput: 'E-commerce platform development',
      projectType: 'software-development',
      teamSize: 8
    })

    if (governanceResult.success) {
      console.log('✅ Governance coordination completed successfully')
      console.log('📊 Output length:', governanceResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Governance coordination failed:', governanceResult.error)
    }

    // Test change coordination command
    console.log('\n🔄 Testing change coordination command...')
    const changeResult = await orchestrator.executeCommand('coordinate-change', {
      userInput: 'E-commerce platform development',
      projectType: 'software-development',
      teamSize: 8
    })

    if (changeResult.success) {
      console.log('✅ Change coordination completed successfully')
      console.log('📊 Output length:', changeResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Change coordination failed:', changeResult.error)
    }

    // Test performance coordination command
    console.log('\n📈 Testing performance coordination command...')
    const performanceResult = await orchestrator.executeCommand('coordinate-performance', {
      userInput: 'E-commerce platform development',
      projectType: 'software-development',
      teamSize: 8
    })

    if (performanceResult.success) {
      console.log('✅ Performance coordination completed successfully')
      console.log('📊 Output length:', performanceResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Performance coordination failed:', performanceResult.error)
    }

    // Test configuration
    console.log('\n⚙️ Testing configuration...')
    const config = orchestrator.getConfig()
    console.log('🎭 Current config:', JSON.stringify(config, null, 2))

    // Update configuration
    orchestrator.updateConfig({
      projectType: 'mobile-development',
      teamSize: 'large',
      complexity: 'high',
      workflowType: 'parallel',
      coordinationLevel: 'portfolio'
    })

    const updatedConfig = orchestrator.getConfig()
    console.log('🎭 Updated config:', JSON.stringify(updatedConfig, null, 2))

    console.log('\n🎉 All tests completed successfully!')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    console.error(error.stack)
  }
}

testOrchestrator()
