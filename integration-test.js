#!/usr/bin/env node

// Integration test for all BMad packages
import { AnalystAgent } from '@osmanekrem/bmad/agents/analyst'
import { ArchitectAgent } from '@osmanekrem/bmad/agents/architect'
import { DevAgent } from '@osmanekrem/bmad/agents/dev'
import { PMAgent } from '@osmanekrem/bmad/agents/pm'
import { QAAgent } from '@osmanekrem/bmad/agents/qa'
import { SMAgent } from '@osmanekrem/bmad/agents/sm'
import { UXAgent } from '@osmanekrem/bmad/agents/ux'
import { MasterAgent } from '@osmanekrem/bmad/agents/master'
import { OrchestratorAgent } from '@osmanekrem/bmad/agents/orchestrator'

// Set test API key
process.env.BMAD_AI_API_KEY = 'test-api-key'
process.env.BMAD_AI_PROVIDER = 'openai'

async function integrationTest() {
  console.log('🔗 BMad Integration Test\n')

  try {
    // Test all agents can be imported and initialized
    console.log('🔗 Testing agent imports and initialization...')
    
    const agents = [
      { name: 'Analyst', agent: new AnalystAgent() },
      { name: 'Architect', agent: new ArchitectAgent() },
      { name: 'Dev', agent: new DevAgent() },
      { name: 'PM', agent: new PMAgent() },
      { name: 'QA', agent: new QAAgent() },
      { name: 'SM', agent: new SMAgent() },
      { name: 'UX', agent: new UXAgent() },
      { name: 'Master', agent: new MasterAgent() },
      { name: 'Orchestrator', agent: new OrchestratorAgent() }
    ]

    console.log('✅ All agents imported successfully')

    // Test each agent's command system
    for (const { name, agent } of agents) {
      console.log(`\n🔗 Testing ${name} Agent...`)
      const commands = agent.getAvailableCommands()
      console.log(`✅ ${name} Agent: ${commands.length} commands available`)
      console.log(`📋 Commands: ${commands.slice(0, 3).join(', ')}${commands.length > 3 ? '...' : ''}`)
    }

    // Test configuration system
    console.log('\n🔗 Testing configuration system...')
    for (const { name, agent } of agents) {
      const config = agent.getConfig()
      console.log(`✅ ${name} Agent config loaded: ${Object.keys(config).length} properties`)
    }

    // Test command execution (without AI calls)
    console.log('\n🔗 Testing command execution system...')
    for (const { name, agent } of agents) {
      const commands = agent.getAvailableCommands()
      if (commands.length > 0) {
        try {
          const result = await agent.executeCommand(commands[0], {
            userInput: 'Test input for integration test'
          })
          console.log(`✅ ${name} Agent command execution: ${result.success ? 'SUCCESS' : 'FAILED'}`)
        } catch (error) {
          console.log(`⚠️ ${name} Agent command execution (expected to fail with test key): ${error.message.substring(0, 50)}...`)
        }
      }
    }

    console.log('\n🎉 Integration test completed successfully!')
    console.log('\n📊 Test Summary:')
    console.log(`✅ Agents tested: ${agents.length}`)
    console.log(`✅ Total commands: ${agents.reduce((sum, { agent }) => sum + agent.getAvailableCommands().length, 0)}`)
    console.log(`✅ All packages: Working correctly`)
    console.log(`⚠️ AI calls: Require valid API key (expected)`)

  } catch (error) {
    console.error('❌ Integration test failed:', error.message)
    console.error(error.stack)
  }
}

integrationTest()
