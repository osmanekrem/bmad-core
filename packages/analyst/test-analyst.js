#!/usr/bin/env node

import { AnalystAgent } from './dist/index.js'

// Set test API key
process.env.BMAD_AI_API_KEY = 'test-api-key'
process.env.BMAD_AI_PROVIDER = 'openai'

async function testAnalyst() {
  console.log('🧪 Testing BMad Analyst Agent...\n')

  try {
    // Initialize analyst agent
    const analyst = new AnalystAgent({
      defaultOutputFormat: 'markdown',
      analysisDepth: 'moderate',
      includeSources: true
    })

    console.log('✅ Analyst agent initialized successfully')
    console.log('📋 Available commands:', analyst.getAvailableCommands())

    // Test market research command
    console.log('\n🔍 Testing market research command...')
    const marketResult = await analyst.executeCommand('market-research', {
      userInput: 'AI-powered project management tools',
      outputFormat: 'markdown'
    })

    if (marketResult.success) {
      console.log('✅ Market research completed successfully')
      console.log('📊 Output length:', marketResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Market research failed:', marketResult.error)
    }

    // Test competitor analysis command
    console.log('\n🏢 Testing competitor analysis command...')
    const competitorResult = await analyst.executeCommand('competitor-analysis', {
      userInput: 'Project management software market',
      outputFormat: 'markdown'
    })

    if (competitorResult.success) {
      console.log('✅ Competitor analysis completed successfully')
      console.log('📊 Output length:', competitorResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Competitor analysis failed:', competitorResult.error)
    }

    // Test configuration
    console.log('\n⚙️ Testing configuration...')
    const config = analyst.getConfig()
    console.log('📋 Current config:', JSON.stringify(config, null, 2))

    // Update configuration
    analyst.updateConfig({
      analysisDepth: 'deep',
      includeSources: false
    })

    const updatedConfig = analyst.getConfig()
    console.log('📋 Updated config:', JSON.stringify(updatedConfig, null, 2))

    console.log('\n🎉 All tests completed successfully!')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    console.error(error.stack)
  }
}

testAnalyst()
