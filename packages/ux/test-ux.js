#!/usr/bin/env node

import { UXAgent } from './dist/index.js'

// Set test API key
process.env.BMAD_AI_API_KEY = 'test-api-key'
process.env.BMAD_AI_PROVIDER = 'openai'

async function testUX() {
  console.log('🎨 Testing BMad UX Expert Agent...\n')

  try {
    // Initialize UX agent
    const ux = new UXAgent({
      defaultOutputFormat: 'markdown',
      targetAudience: 'general',
      platform: 'web',
      deviceType: 'desktop'
    })

    console.log('✅ UX agent initialized successfully')
    console.log('🎨 Available commands:', ux.getAvailableCommands())

    // Test user research command
    console.log('\n🔍 Testing user research command...')
    const researchResult = await ux.executeCommand('conduct-user-research', {
      userInput: 'E-commerce mobile app',
      targetAudience: 'mobile users',
      platform: 'mobile'
    })

    if (researchResult.success) {
      console.log('✅ User research completed successfully')
      console.log('📊 Output length:', researchResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ User research failed:', researchResult.error)
    }

    // Test user personas command
    console.log('\n👤 Testing user personas command...')
    const personasResult = await ux.executeCommand('create-user-personas', {
      userInput: 'E-commerce mobile app',
      targetAudience: 'mobile users',
      platform: 'mobile'
    })

    if (personasResult.success) {
      console.log('✅ User personas completed successfully')
      console.log('📊 Output length:', personasResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ User personas failed:', personasResult.error)
    }

    // Test user journey command
    console.log('\n🗺️ Testing user journey command...')
    const journeyResult = await ux.executeCommand('map-user-journey', {
      userInput: 'E-commerce mobile app',
      targetAudience: 'mobile users',
      platform: 'mobile'
    })

    if (journeyResult.success) {
      console.log('✅ User journey completed successfully')
      console.log('📊 Output length:', journeyResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ User journey failed:', journeyResult.error)
    }

    // Test wireframes command
    console.log('\n📐 Testing wireframes command...')
    const wireframesResult = await ux.executeCommand('create-wireframes', {
      userInput: 'E-commerce mobile app',
      targetAudience: 'mobile users',
      platform: 'mobile'
    })

    if (wireframesResult.success) {
      console.log('✅ Wireframes completed successfully')
      console.log('📊 Output length:', wireframesResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Wireframes failed:', wireframesResult.error)
    }

    // Test prototypes command
    console.log('\n🎨 Testing prototypes command...')
    const prototypesResult = await ux.executeCommand('create-prototypes', {
      userInput: 'E-commerce mobile app',
      targetAudience: 'mobile users',
      platform: 'mobile'
    })

    if (prototypesResult.success) {
      console.log('✅ Prototypes completed successfully')
      console.log('📊 Output length:', prototypesResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Prototypes failed:', prototypesResult.error)
    }

    // Test usability testing command
    console.log('\n🧪 Testing usability testing command...')
    const testingResult = await ux.executeCommand('conduct-usability-testing', {
      userInput: 'E-commerce mobile app',
      targetAudience: 'mobile users',
      platform: 'mobile'
    })

    if (testingResult.success) {
      console.log('✅ Usability testing completed successfully')
      console.log('📊 Output length:', testingResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Usability testing failed:', testingResult.error)
    }

    // Test accessibility audit command
    console.log('\n♿ Testing accessibility audit command...')
    const auditResult = await ux.executeCommand('audit-accessibility', {
      userInput: 'E-commerce mobile app',
      targetAudience: 'mobile users',
      platform: 'mobile'
    })

    if (auditResult.success) {
      console.log('✅ Accessibility audit completed successfully')
      console.log('📊 Output length:', auditResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Accessibility audit failed:', auditResult.error)
    }

    // Test design system command
    console.log('\n🎯 Testing design system command...')
    const designSystemResult = await ux.executeCommand('create-design-system', {
      userInput: 'E-commerce mobile app',
      targetAudience: 'mobile users',
      platform: 'mobile'
    })

    if (designSystemResult.success) {
      console.log('✅ Design system completed successfully')
      console.log('📊 Output length:', designSystemResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Design system failed:', designSystemResult.error)
    }

    // Test information architecture command
    console.log('\n🗂️ Testing information architecture command...')
    const iaResult = await ux.executeCommand('design-information-architecture', {
      userInput: 'E-commerce mobile app',
      targetAudience: 'mobile users',
      platform: 'mobile'
    })

    if (iaResult.success) {
      console.log('✅ Information architecture completed successfully')
      console.log('📊 Output length:', iaResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Information architecture failed:', iaResult.error)
    }

    // Test interaction design command
    console.log('\n🎭 Testing interaction design command...')
    const interactionsResult = await ux.executeCommand('design-interactions', {
      userInput: 'E-commerce mobile app',
      targetAudience: 'mobile users',
      platform: 'mobile'
    })

    if (interactionsResult.success) {
      console.log('✅ Interaction design completed successfully')
      console.log('📊 Output length:', interactionsResult.output?.length || 0, 'characters')
    } else {
      console.log('❌ Interaction design failed:', interactionsResult.error)
    }

    // Test configuration
    console.log('\n⚙️ Testing configuration...')
    const config = ux.getConfig()
    console.log('🎨 Current config:', JSON.stringify(config, null, 2))

    // Update configuration
    ux.updateConfig({
      platform: 'mobile',
      deviceType: 'phone',
      targetAudience: 'mobile users'
    })

    const updatedConfig = ux.getConfig()
    console.log('🎨 Updated config:', JSON.stringify(updatedConfig, null, 2))

    console.log('\n🎉 All tests completed successfully!')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    console.error(error.stack)
  }
}

testUX()
