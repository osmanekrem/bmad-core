import { 
  BaseAgent, 
  AgentConfig, 
  AgentOptions, 
  AgentContext, 
  AgentResponse,
  AIProvider,
  ProviderType
} from '../types/index.js'
import { ConfigManager } from '../config/config-manager.js'
import { ProviderFactory } from '../providers/provider-factory.js'

export abstract class BaseAgentImpl implements BaseAgent {
  protected config: AgentConfig
  protected aiProvider: AIProvider
  protected systemPrompt: string = ''
  protected customInstructions: string[] = []

  constructor(options: AgentOptions = {}) {
    this.config = this.loadConfig(options)
    this.aiProvider = this.createAIProvider()
    this.applyOptions(options)
  }

  private loadConfig(options: AgentOptions): AgentConfig {
    if (options.apiKey && options.provider) {
      return ConfigManager.createConfigFromOptions({
        provider: options.provider,
        apiKey: options.apiKey,
        model: options.model,
        temperature: options.temperature,
        maxTokens: 2000
      })
    }
    
    return ConfigManager.loadConfig()
  }

  private createAIProvider(): AIProvider {
    return ProviderFactory.createProvider(this.config.provider, {
      apiKey: this.config.apiKey,
      model: this.config.model,
      temperature: this.config.temperature,
      maxTokens: this.config.maxTokens
    })
  }

  private applyOptions(options: AgentOptions): void {
    if (options.systemPrompt) {
      this.addSystemPrompt(options.systemPrompt)
    }
    
    if (options.customInstructions) {
      this.addCustomInstructions(options.customInstructions)
    }
    
    if (options.model) {
      this.setModel(options.model)
    }
    
    if (options.temperature !== undefined) {
      this.setTemperature(options.temperature)
    }
    
    if (options.provider) {
      this.setProvider(options.provider)
    }
  }

  abstract execute(command: string, context: AgentContext): Promise<AgentResponse>

  addSystemPrompt(prompt: string): void {
    this.systemPrompt = prompt
  }

  addCustomInstructions(instructions: string[]): void {
    this.customInstructions = [...this.customInstructions, ...instructions]
  }

  setModel(model: string): void {
    this.config.model = model
    this.aiProvider = this.createAIProvider()
  }

  setTemperature(temperature: number): void {
    this.config.temperature = temperature
    this.aiProvider = this.createAIProvider()
  }

  setProvider(provider: string): void {
    this.config.provider = provider as ProviderType
    this.aiProvider = this.createAIProvider()
  }

  protected async callAI(prompt: string, options?: any): Promise<string> {
    const fullPrompt = this.buildFullPrompt(prompt)
    return await this.aiProvider.callAI(fullPrompt, options)
  }

  protected buildFullPrompt(userPrompt: string): string {
    let fullPrompt = ''
    
    if (this.systemPrompt) {
      fullPrompt += `SYSTEM: ${this.systemPrompt}\n\n`
    }
    
    if (this.customInstructions.length > 0) {
      fullPrompt += `CUSTOM INSTRUCTIONS:\n${this.customInstructions.map(inst => `- ${inst}`).join('\n')}\n\n`
    }
    
    fullPrompt += `USER REQUEST: ${userPrompt}`
    
    return fullPrompt
  }

  protected createResponse(content: string, metadata?: any): AgentResponse {
    return {
      content,
      metadata: {
        model: this.config.model,
        provider: this.config.provider,
        ...metadata
      }
    }
  }
}
