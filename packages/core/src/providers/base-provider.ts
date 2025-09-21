import { AIProvider, AIOptions, ProviderConfig } from '../types/index.js'

export abstract class BaseAIProvider implements AIProvider {
  protected config: ProviderConfig

  constructor(config: ProviderConfig) {
    this.config = config
  }

  abstract callAI(prompt: string, options?: AIOptions): Promise<string>

  protected mergeOptions(options?: AIOptions): any {
    return {
      model: options?.model || this.config.model,
      temperature: options?.temperature ?? this.config.temperature ?? 0.7,
      maxTokens: options?.maxTokens ?? this.config.maxTokens ?? 2000,
      ...options
    }
  }

  protected validateConfig(): void {
    if (!this.config.apiKey) {
      throw new Error('API key is required')
    }
  }
}
