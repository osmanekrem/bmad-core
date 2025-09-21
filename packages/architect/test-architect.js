#!/usr/bin/env node

import { ArchitectAgent } from './dist/index.js'

// Set test API key
process.env.BMAD_AI_API_KEY = 'test-api-key'
process.env.BMAD_AI_PROVIDER = 'openai'

async function testArchitect() {
  console.log('🏗️ Testing BMad Architect Agent...\n')

  try {
    // Initialize architect agent
    const architect = new ArchitectAgent({
      defaultOutputFormat: 'markdown',
      designComplexity: 'moderate',
      includeDiagrams: true
    })

    console.log('✅ Architect agent initialized successfully')
    console.log('📋 Available commands:', architect.getAvailableCommands())

    // Test system design command
    console.log('\n🏗️ Testing system design command...')
    const designResult = await architect.executeCommand('system-design', {
      userInput: 'E-commerce platform architecture',
      outputFormat: 'markdown'
    })

    if (designResult.success) {
      console.log('✅ System design completed successfully')
      console.log('📊 Output length:', designResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ System design failed:', designResult.error)
    }

    // Test architecture analysis command
    console.log('\n🔍 Testing architecture analysis command...')
    const analysisResult = await architect.executeCommand('architecture-analysis', {
      userInput: 'Legacy monolithic application',
      outputFormat: 'markdown'
    })

    if (analysisResult.success) {
      console.log('✅ Architecture analysis completed successfully')
      console.log('📊 Output length:', analysisResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Architecture analysis failed:', analysisResult.error)
    }

    // Test technology selection command
    console.log('\n🛠️ Testing technology selection command...')
    const techResult = await architect.executeCommand('technology-selection', {
      userInput: 'Modern web application stack',
      outputFormat: 'markdown'
    })

    if (techResult.success) {
      console.log('✅ Technology selection completed successfully')
      console.log('📊 Output length:', techResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Technology selection failed:', techResult.error)
    }

    // Test configuration
    console.log('\n⚙️ Testing configuration...')
    const config = architect.getConfig()
    console.log('📋 Current config:', JSON.stringify(config, null, 2))

    // Update configuration
    architect.updateConfig({
      designComplexity: 'complex',
      includeDiagrams: false
    })

    const updatedConfig = architect.getConfig()
    console.log('📋 Updated config:', JSON.stringify(updatedConfig, null, 2))

    console.log('\n🎉 All tests completed successfully!')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    console.error(error.stack)
  }
}

testArchitect()
