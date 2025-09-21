#!/usr/bin/env node

import { MasterAgent } from './dist/index.js'

// Set test API key
process.env.BMAD_AI_API_KEY = 'test-api-key'
process.env.BMAD_AI_PROVIDER = 'openai'

async function testMaster() {
  console.log('🎯 Testing BMad Master Agent...\n')

  try {
    // Initialize Master agent
    const master = new MasterAgent({
      defaultOutputFormat: 'markdown',
      projectType: 'software-development',
      teamSize: 'medium',
      complexity: 'medium'
    })

    console.log('✅ Master agent initialized successfully')
    console.log('🎯 Available commands:', master.getAvailableCommands())

    // Test strategic planning command
    console.log('\n🎯 Testing strategic planning command...')
    const strategyResult = await master.executeCommand('develop-strategy', {
      userInput: 'E-commerce platform development',
      projectType: 'software-development',
      teamSize: 8,
      complexity: 'high'
    })

    if (strategyResult.success) {
      console.log('✅ Strategic planning completed successfully')
      console.log('📊 Output length:', strategyResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Strategic planning failed:', strategyResult.error)
    }

    // Test project orchestration command
    console.log('\n🎭 Testing project orchestration command...')
    const orchestrationResult = await master.executeCommand('orchestrate-project', {
      userInput: 'E-commerce platform development',
      projectType: 'software-development',
      teamSize: 8
    })

    if (orchestrationResult.success) {
      console.log('✅ Project orchestration completed successfully')
      console.log('📊 Output length:', orchestrationResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Project orchestration failed:', orchestrationResult.error)
    }

    // Test resource management command
    console.log('\n📊 Testing resource management command...')
    const resourcesResult = await master.executeCommand('manage-resources', {
      userInput: 'E-commerce platform development',
      projectType: 'software-development',
      teamSize: 8
    })

    if (resourcesResult.success) {
      console.log('✅ Resource management completed successfully')
      console.log('📊 Output length:', resourcesResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Resource management failed:', resourcesResult.error)
    }

    // Test risk management command
    console.log('\n⚠️ Testing risk management command...')
    const risksResult = await master.executeCommand('manage-risks', {
      userInput: 'E-commerce platform development',
      projectType: 'software-development',
      teamSize: 8
    })

    if (risksResult.success) {
      console.log('✅ Risk management completed successfully')
      console.log('📊 Output length:', risksResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Risk management failed:', risksResult.error)
    }

    // Test stakeholder management command
    console.log('\n🤝 Testing stakeholder management command...')
    const stakeholdersResult = await master.executeCommand('manage-stakeholders', {
      userInput: 'E-commerce platform development',
      projectType: 'software-development',
      teamSize: 8
    })

    if (stakeholdersResult.success) {
      console.log('✅ Stakeholder management completed successfully')
      console.log('📊 Output length:', stakeholdersResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Stakeholder management failed:', stakeholdersResult.error)
    }

    // Test quality assurance command
    console.log('\n✅ Testing quality assurance command...')
    const qualityResult = await master.executeCommand('ensure-quality', {
      userInput: 'E-commerce platform development',
      projectType: 'software-development',
      teamSize: 8
    })

    if (qualityResult.success) {
      console.log('✅ Quality assurance completed successfully')
      console.log('📊 Output length:', qualityResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Quality assurance failed:', qualityResult.error)
    }

    // Test performance monitoring command
    console.log('\n📈 Testing performance monitoring command...')
    const performanceResult = await master.executeCommand('monitor-performance', {
      userInput: 'E-commerce platform development',
      projectType: 'software-development',
      teamSize: 8
    })

    if (performanceResult.success) {
      console.log('✅ Performance monitoring completed successfully')
      console.log('📊 Output length:', performanceResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Performance monitoring failed:', performanceResult.error)
    }

    // Test governance command
    console.log('\n🏛️ Testing governance command...')
    const governanceResult = await master.executeCommand('establish-governance', {
      userInput: 'E-commerce platform development',
      projectType: 'software-development',
      teamSize: 8
    })

    if (governanceResult.success) {
      console.log('✅ Governance completed successfully')
      console.log('📊 Output length:', governanceResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Governance failed:', governanceResult.error)
    }

    // Test decision making command
    console.log('\n🎯 Testing decision making command...')
    const decisionsResult = await master.executeCommand('facilitate-decisions', {
      userInput: 'E-commerce platform development',
      projectType: 'software-development',
      teamSize: 8
    })

    if (decisionsResult.success) {
      console.log('✅ Decision making completed successfully')
      console.log('📊 Output length:', decisionsResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Decision making failed:', decisionsResult.error)
    }

    // Test continuous improvement command
    console.log('\n🔄 Testing continuous improvement command...')
    const improvementResult = await master.executeCommand('drive-improvement', {
      userInput: 'E-commerce platform development',
      projectType: 'software-development',
      teamSize: 8
    })

    if (improvementResult.success) {
      console.log('✅ Continuous improvement completed successfully')
      console.log('📊 Output length:', improvementResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Continuous improvement failed:', improvementResult.error)
    }

    // Test configuration
    console.log('\n⚙️ Testing configuration...')
    const config = master.getConfig()
    console.log('🎯 Current config:', JSON.stringify(config, null, 2))

    // Update configuration
    master.updateConfig({
      projectType: 'mobile-development',
      teamSize: 'large',
      complexity: 'high'
    })

    const updatedConfig = master.getConfig()
    console.log('🎯 Updated config:', JSON.stringify(updatedConfig, null, 2))

    console.log('\n🎉 All tests completed successfully!')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    console.error(error.stack)
  }
}

testMaster()
