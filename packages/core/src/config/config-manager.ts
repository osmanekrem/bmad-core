import { AgentConfig, ProviderType, ConfigValidationResult } from '../types/index.js'
import { ProviderFactory } from '../providers/provider-factory.js'

export class ConfigManager {
  static loadConfig(): AgentConfig {
    const provider = (process.env.BMAD_AI_PROVIDER as ProviderType) || 'openai'
    const apiKey = process.env.BMAD_AI_API_KEY

    if (!apiKey) {
      throw new Error('BMAD_AI_API_KEY not found in environment variables')
    }

    return {
      provider,
      apiKey,
      model: process.env.BMAD_AI_MODEL || ProviderFactory.getDefaultModel(provider),
      temperature: process.env.BMAD_AI_TEMPERATURE ? 
        parseFloat(process.env.BMAD_AI_TEMPERATURE) : 0.7,
      maxTokens: process.env.BMAD_AI_MAX_TOKENS ? 
        parseInt(process.env.BMAD_AI_MAX_TOKENS) : 2000
    }
  }

  static async validateKey(provider: ProviderType, apiKey: string): Promise<ConfigValidationResult> {
    try {
      const config = { apiKey }
      const aiProvider = ProviderFactory.createProvider(provider, config)
      
      // Test with a simple prompt
      await aiProvider.callAI('test', { maxTokens: 1 })
      
      return {
        isValid: true,
        provider
      }
    } catch (error: any) {
      return {
        isValid: false,
        error: error.message,
        provider
      }
    }
  }

  static getSupportedProviders(): ProviderType[] {
    return ProviderFactory.getSupportedProviders()
  }

  static createConfigFromOptions(options: {
    provider: ProviderType
    apiKey: string
    model?: string
    temperature?: number
    maxTokens?: number
  }): AgentConfig {
    return {
      provider: options.provider,
      apiKey: options.apiKey,
      model: options.model || ProviderFactory.getDefaultModel(options.provider),
      temperature: options.temperature ?? 0.7,
      maxTokens: options.maxTokens ?? 2000
    }
  }
}
