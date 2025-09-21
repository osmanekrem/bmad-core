import { BaseAgent, AgentOptions, AgentContext, AgentResponse } from '../types/index.js'
import { BaseAgentImpl } from './base-agent.js'

export class AgentFactory {
  private static agentRegistry = new Map<string, new (options?: AgentOptions) => BaseAgent>()

  static registerAgent(agentType: string, agentClass: new (options?: AgentOptions) => BaseAgent): void {
    this.agentRegistry.set(agentType, agentClass)
  }

  static createAgent(agentType: string, options?: AgentOptions): BaseAgent {
    const AgentClass = this.agentRegistry.get(agentType)
    
    if (!AgentClass) {
      throw new Error(`Agent type '${agentType}' not found. Available agents: ${Array.from(this.agentRegistry.keys()).join(', ')}`)
    }

    return new AgentClass(options)
  }

  static getAvailableAgents(): string[] {
    return Array.from(this.agentRegistry.keys())
  }

  static isAgentAvailable(agentType: string): boolean {
    return this.agentRegistry.has(agentType)
  }
}

// Placeholder for future agent implementations
export class PlaceholderAgent extends BaseAgentImpl {
  async execute(command: string, context: AgentContext): Promise<AgentResponse> {
    const response = await this.callAI(`Execute command: ${command}`, context)
    return this.createResponse(response)
  }
}

// Register placeholder agent for testing
AgentFactory.registerAgent('placeholder', PlaceholderAgent)
