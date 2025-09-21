#!/usr/bin/env node

import { QAAgent } from './dist/index.js'

// Set test API key
process.env.BMAD_AI_API_KEY = 'test-api-key'
process.env.BMAD_AI_PROVIDER = 'openai'

async function testQA() {
  console.log('🧪 Testing BMad QA Agent...\n')

  try {
    // Initialize QA agent
    const qa = new QAAgent({
      defaultOutputFormat: 'markdown',
      testFramework: 'jest',
      testLevel: 'all',
      automationLevel: 'partial'
    })

    console.log('✅ QA agent initialized successfully')
    console.log('📋 Available commands:', qa.getAvailableCommands())

    // Test test planning command
    console.log('\n📋 Testing test planning command...')
    const planResult = await qa.executeCommand('create-test-plan', {
      userInput: 'E-commerce platform testing',
      testType: 'Functional Testing',
      framework: 'jest'
    })

    if (planResult.success) {
      console.log('✅ Test planning completed successfully')
      console.log('📊 Output length:', planResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Test planning failed:', planResult.error)
    }

    // Test test case design command
    console.log('\n🧪 Testing test case design command...')
    const testCasesResult = await qa.executeCommand('design-test-cases', {
      userInput: 'User authentication functionality',
      testType: 'Functional Testing',
      framework: 'jest'
    })

    if (testCasesResult.success) {
      console.log('✅ Test case design completed successfully')
      console.log('📊 Output length:', testCasesResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Test case design failed:', testCasesResult.error)
    }

    // Test bug tracking command
    console.log('\n🐛 Testing bug tracking command...')
    const bugResult = await qa.executeCommand('track-bugs', {
      userInput: 'E-commerce platform defects',
      testType: 'Bug Tracking'
    })

    if (bugResult.success) {
      console.log('✅ Bug tracking completed successfully')
      console.log('📊 Output length:', bugResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Bug tracking failed:', bugResult.error)
    }

    // Test quality gates command
    console.log('\n🚪 Testing quality gates command...')
    const gateResult = await qa.executeCommand('implement-quality-gates', {
      userInput: 'Release readiness assessment',
      testType: 'Quality Gates'
    })

    if (gateResult.success) {
      console.log('✅ Quality gates completed successfully')
      console.log('📊 Output length:', gateResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Quality gates failed:', gateResult.error)
    }

    // Test performance testing command
    console.log('\n⚡ Testing performance testing command...')
    const performanceResult = await qa.executeCommand('performance-testing', {
      userInput: 'E-commerce platform performance testing',
      testType: 'Performance Testing'
    })

    if (performanceResult.success) {
      console.log('✅ Performance testing completed successfully')
      console.log('📊 Output length:', performanceResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Performance testing failed:', performanceResult.error)
    }

    // Test security testing command
    console.log('\n🔒 Testing security testing command...')
    const securityResult = await qa.executeCommand('security-testing', {
      userInput: 'E-commerce platform security testing',
      testType: 'Security Testing'
    })

    if (securityResult.success) {
      console.log('✅ Security testing completed successfully')
      console.log('📊 Output length:', securityResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Security testing failed:', securityResult.error)
    }

    // Test configuration
    console.log('\n⚙️ Testing configuration...')
    const config = qa.getConfig()
    console.log('📋 Current config:', JSON.stringify(config, null, 2))

    // Update configuration
    qa.updateConfig({
      testFramework: 'selenium',
      automationLevel: 'full'
    })

    const updatedConfig = qa.getConfig()
    console.log('📋 Updated config:', JSON.stringify(updatedConfig, null, 2))

    console.log('\n🎉 All tests completed successfully!')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    console.error(error.stack)
  }
}

testQA()
