#!/usr/bin/env node

import { DevAgent } from './dist/index.js'

// Set test API key
process.env.BMAD_AI_API_KEY = 'test-api-key'
process.env.BMAD_AI_PROVIDER = 'openai'

async function testDev() {
  console.log('💻 Testing BMad Dev Agent...\n')

  try {
    // Initialize dev agent
    const dev = new DevAgent({
      defaultOutputFormat: 'markdown',
      codeStyle: 'standard',
      testingFramework: 'jest',
      documentationFormat: 'markdown'
    })

    console.log('✅ Dev agent initialized successfully')
    console.log('📋 Available commands:', dev.getAvailableCommands())

    // Test code generation command
    console.log('\n💻 Testing code generation command...')
    const codeResult = await dev.executeCommand('generate-code', {
      userInput: 'Create a simple HTTP server with Express.js',
      codeLanguage: 'JavaScript',
      framework: 'Express.js'
    })

    if (codeResult.success) {
      console.log('✅ Code generation completed successfully')
      console.log('📊 Output length:', codeResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Code generation failed:', codeResult.error)
    }

    // Test code review command
    console.log('\n🔍 Testing code review command...')
    const reviewResult = await dev.executeCommand('review-code', {
      userInput: 'const user = { name: "John", age: 30 }',
      codeLanguage: 'JavaScript'
    })

    if (reviewResult.success) {
      console.log('✅ Code review completed successfully')
      console.log('📊 Output length:', reviewResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Code review failed:', reviewResult.error)
    }

    // Test debugging command
    console.log('\n🐛 Testing debugging command...')
    const debugResult = await dev.executeCommand('debug-code', {
      userInput: 'Getting "Cannot read property of undefined" error in my React component',
      codeLanguage: 'JavaScript',
      framework: 'React'
    })

    if (debugResult.success) {
      console.log('✅ Debugging completed successfully')
      console.log('📊 Output length:', debugResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Debugging failed:', debugResult.error)
    }

    // Test refactoring command
    console.log('\n🔄 Testing refactoring command...')
    const refactorResult = await dev.executeCommand('refactor-code', {
      userInput: 'Refactor this legacy code to use modern patterns',
      codeLanguage: 'JavaScript'
    })

    if (refactorResult.success) {
      console.log('✅ Refactoring completed successfully')
      console.log('📊 Output length:', refactorResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Refactoring failed:', refactorResult.error)
    }

    // Test testing command
    console.log('\n🧪 Testing testing command...')
    const testResult = await dev.executeCommand('create-tests', {
      userInput: 'Create tests for user authentication functions',
      codeLanguage: 'JavaScript',
      framework: 'Jest'
    })

    if (testResult.success) {
      console.log('✅ Testing completed successfully')
      console.log('📊 Output length:', testResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Testing failed:', testResult.error)
    }

    // Test configuration
    console.log('\n⚙️ Testing configuration...')
    const config = dev.getConfig()
    console.log('📋 Current config:', JSON.stringify(config, null, 2))

    // Update configuration
    dev.updateConfig({
      codeStyle: 'prettier',
      testingFramework: 'vitest'
    })

    const updatedConfig = dev.getConfig()
    console.log('📋 Updated config:', JSON.stringify(updatedConfig, null, 2))

    console.log('\n🎉 All tests completed successfully!')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    console.error(error.stack)
  }
}

testDev()
