import { AIProvider, ProviderType, OpenAIConfig, ClaudeConfig, GeminiConfig } from '../types/index.js'
import { OpenAIProvider } from './openai-provider.js'
import { ClaudeProvider } from './claude-provider.js'
import { GeminiProvider } from './gemini-provider.js'

export class ProviderFactory {
  static createProvider(
    provider: ProviderType,
    config: OpenAIConfig | ClaudeConfig | GeminiConfig
  ): AIProvider {
    switch (provider) {
      case 'openai':
        return new OpenAIProvider(config as OpenAIConfig)
      case 'claude':
        return new ClaudeProvider(config as ClaudeConfig)
      case 'gemini':
        return new GeminiProvider(config as GeminiConfig)
      default:
        throw new Error(`Unsupported provider: ${provider}`)
    }
  }

  static getDefaultModel(provider: ProviderType): string {
    switch (provider) {
      case 'openai':
        return 'gpt-4'
      case 'claude':
        return 'claude-3-sonnet-20240229'
      case 'gemini':
        return 'gemini-pro'
      default:
        throw new Error(`Unsupported provider: ${provider}`)
    }
  }

  static getSupportedProviders(): ProviderType[] {
    return ['openai', 'claude', 'gemini']
  }
}
