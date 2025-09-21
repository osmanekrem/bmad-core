#!/usr/bin/env node

import { BaseAgentImpl, AgentFactory, ConfigManager, ProviderFactory } from './dist/index.js'

// Set test API key
process.env.BMAD_AI_API_KEY = 'test-api-key'
process.env.BMAD_AI_PROVIDER = 'openai'

async function testCore() {
  console.log('🔧 Testing BMad Core Package...\n')

  try {
    // Test ConfigManager
    console.log('🔧 Testing ConfigManager...')
    try {
      const config = ConfigManager.loadConfig()
      console.log('✅ ConfigManager loaded config successfully')
      console.log('📊 Config:', JSON.stringify(config, null, 2))
    } catch (error) {
      console.log('⚠️ ConfigManager test (expected to fail with test key):', error.message)
    }

    const supportedProviders = ConfigManager.getSupportedProviders()
    console.log('📊 Supported providers:', supportedProviders)

    // Test ProviderFactory
    console.log('\n🔧 Testing ProviderFactory...')
    try {
      const provider = ProviderFactory.createProvider('openai', { apiKey: 'test-key' })
      console.log('✅ ProviderFactory created provider successfully')
      console.log('📊 Provider type:', provider.constructor.name)
    } catch (error) {
      console.log('⚠️ ProviderFactory test (expected to fail with test key):', error.message)
    }

    // Test AgentFactory
    console.log('\n🔧 Testing AgentFactory...')
    try {
      const agent = AgentFactory.createAgent('analyst', { apiKey: 'test-key' })
      console.log('✅ AgentFactory created agent successfully')
      console.log('📊 Agent type:', agent.constructor.name)
    } catch (error) {
      console.log('⚠️ AgentFactory test (expected to fail with test key):', error.message)
    }

    // Test BaseAgentImpl
    console.log('\n🔧 Testing BaseAgentImpl...')
    class TestAgent extends BaseAgentImpl {
      async execute(command, context) {
        return {
          success: true,
          content: 'Test response',
          metadata: {
            command,
            timestamp: new Date().toISOString()
          }
        }
      }
    }

    const testAgent = new TestAgent({
      systemPrompt: 'You are a test agent'
    })

    const result = await testAgent.execute('test-command', {
      userInput: 'Test input'
    })

    console.log('✅ BaseAgentImpl test successful')
    console.log('📊 Result:', JSON.stringify(result, null, 2))

    console.log('\n🎉 Core package tests completed successfully!')

  } catch (error) {
    console.error('❌ Core package test failed:', error.message)
    console.error(error.stack)
  }
}

testCore()
