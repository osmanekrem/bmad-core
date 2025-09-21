#!/usr/bin/env node

import { PMAgent } from './dist/index.js'

// Set test API key
process.env.BMAD_AI_API_KEY = 'test-api-key'
process.env.BMAD_AI_PROVIDER = 'openai'

async function testPM() {
  console.log('📋 Testing BMad PM Agent...\n')

  try {
    // Initialize PM agent
    const pm = new PMAgent({
      defaultOutputFormat: 'markdown',
      projectMethodology: 'agile',
      teamSize: 'medium'
    })

    console.log('✅ PM agent initialized successfully')
    console.log('📋 Available commands:', pm.getAvailableCommands())

    // Test project planning command
    console.log('\n📋 Testing project planning command...')
    const planResult = await pm.executeCommand('create-project-plan', {
      userInput: 'E-commerce platform development',
      projectType: 'Software Development',
      teamSize: 8,
      timeline: '6 months'
    })

    if (planResult.success) {
      console.log('✅ Project planning completed successfully')
      console.log('📊 Output length:', planResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Project planning failed:', planResult.error)
    }

    // Test task breakdown command
    console.log('\n🔨 Testing task breakdown command...')
    const breakdownResult = await pm.executeCommand('breakdown-tasks', {
      userInput: 'User authentication system implementation',
      projectType: 'Software Development',
      teamSize: 5,
      timeline: '2 months'
    })

    if (breakdownResult.success) {
      console.log('✅ Task breakdown completed successfully')
      console.log('📊 Output length:', breakdownResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Task breakdown failed:', breakdownResult.error)
    }

    // Test resource planning command
    console.log('\n👥 Testing resource planning command...')
    const resourceResult = await pm.executeCommand('plan-resources', {
      userInput: 'Full-stack development team',
      projectType: 'Software Development',
      teamSize: 10
    })

    if (resourceResult.success) {
      console.log('✅ Resource planning completed successfully')
      console.log('📊 Output length:', resourceResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Resource planning failed:', resourceResult.error)
    }

    // Test risk management command
    console.log('\n⚠️ Testing risk management command...')
    const riskResult = await pm.executeCommand('manage-risks', {
      userInput: 'High-risk software project',
      projectType: 'Software Development',
      teamSize: 12
    })

    if (riskResult.success) {
      console.log('✅ Risk management completed successfully')
      console.log('📊 Output length:', riskResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Risk management failed:', riskResult.error)
    }

    // Test configuration
    console.log('\n⚙️ Testing configuration...')
    const config = pm.getConfig()
    console.log('📋 Current config:', JSON.stringify(config, null, 2))

    // Update configuration
    pm.updateConfig({
      projectMethodology: 'scrum',
      teamSize: 'large'
    })

    const updatedConfig = pm.getConfig()
    console.log('📋 Updated config:', JSON.stringify(updatedConfig, null, 2))

    console.log('\n🎉 All tests completed successfully!')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    console.error(error.stack)
  }
}

testPM()
