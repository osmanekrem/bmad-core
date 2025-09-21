#!/usr/bin/env node

import { SMAgent } from './dist/index.js'

// Set test API key
process.env.BMAD_AI_API_KEY = 'test-api-key'
process.env.BMAD_AI_PROVIDER = 'openai'

async function testSM() {
  console.log('🏃‍♂️ Testing BMad SM Agent...\n')

  try {
    // Initialize SM agent
    const sm = new SMAgent({
      defaultOutputFormat: 'markdown',
      sprintDuration: 2,
      teamSize: 'medium',
      agileFramework: 'scrum'
    })

    console.log('✅ SM agent initialized successfully')
    console.log('📋 Available commands:', sm.getAvailableCommands())

    // Test sprint planning command
    console.log('\n🏃‍♂️ Testing sprint planning command...')
    const sprintPlanResult = await sm.executeCommand('plan-sprint', {
      userInput: 'E-commerce platform development',
      teamSize: 8,
      sprintDuration: 2
    })

    if (sprintPlanResult.success) {
      console.log('✅ Sprint planning completed successfully')
      console.log('📊 Output length:', sprintPlanResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Sprint planning failed:', sprintPlanResult.error)
    }

    // Test daily standup command
    console.log('\n📅 Testing daily standup command...')
    const standupResult = await sm.executeCommand('facilitate-standup', {
      userInput: 'Development team daily standup',
      teamSize: 8
    })

    if (standupResult.success) {
      console.log('✅ Daily standup completed successfully')
      console.log('📊 Output length:', standupResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Daily standup failed:', standupResult.error)
    }

    // Test retrospective command
    console.log('\n🔄 Testing retrospective command...')
    const retrospectiveResult = await sm.executeCommand('facilitate-retrospective', {
      userInput: 'Sprint 5 retrospective',
      teamSize: 8
    })

    if (retrospectiveResult.success) {
      console.log('✅ Retrospective completed successfully')
      console.log('📊 Output length:', retrospectiveResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Retrospective failed:', retrospectiveResult.error)
    }

    // Test team coaching command
    console.log('\n🎯 Testing team coaching command...')
    const coachingResult = await sm.executeCommand('coach-team', {
      userInput: 'Agile practices and continuous improvement',
      teamSize: 8
    })

    if (coachingResult.success) {
      console.log('✅ Team coaching completed successfully')
      console.log('📊 Output length:', coachingResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Team coaching failed:', coachingResult.error)
    }

    // Test impediment removal command
    console.log('\n🚧 Testing impediment removal command...')
    const impedimentResult = await sm.executeCommand('remove-impediments', {
      userInput: 'Development team blockers',
      teamSize: 8
    })

    if (impedimentResult.success) {
      console.log('✅ Impediment removal completed successfully')
      console.log('📊 Output length:', impedimentResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Impediment removal failed:', impedimentResult.error)
    }

    // Test metrics tracking command
    console.log('\n📊 Testing metrics tracking command...')
    const metricsResult = await sm.executeCommand('track-metrics', {
      userInput: 'Team performance metrics',
      teamSize: 8
    })

    if (metricsResult.success) {
      console.log('✅ Metrics tracking completed successfully')
      console.log('📊 Output length:', metricsResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Metrics tracking failed:', metricsResult.error)
    }

    // Test configuration
    console.log('\n⚙️ Testing configuration...')
    const config = sm.getConfig()
    console.log('📋 Current config:', JSON.stringify(config, null, 2))

    // Update configuration
    sm.updateConfig({
      sprintDuration: 3,
      agileFramework: 'kanban'
    })

    const updatedConfig = sm.getConfig()
    console.log('📋 Updated config:', JSON.stringify(updatedConfig, null, 2))

    console.log('\n🎉 All tests completed successfully!')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    console.error(error.stack)
  }
}

testSM()
