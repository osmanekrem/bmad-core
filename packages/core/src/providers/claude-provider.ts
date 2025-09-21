import { BaseAIProvider } from './base-provider.js'
import { ClaudeConfig, AIOptions } from '../types/index.js'

export class ClaudeProvider extends BaseAIProvider {
  private anthropic: any

  constructor(config: ClaudeConfig) {
    super(config)
    this.validateConfig()
    this.initializeClaude()
  }

  private async initializeClaude() {
    try {
      const { Anthropic } = await import('@anthropic-ai/sdk')
      this.anthropic = new Anthropic({
        apiKey: this.config.apiKey
      })
    } catch (error) {
      throw new Error('Anthropic package not installed. Please install: npm install @anthropic-ai/sdk')
    }
  }

  async callAI(prompt: string, options?: AIOptions): Promise<string> {
    if (!this.anthropic) {
      await this.initializeClaude()
    }

    const mergedOptions = this.mergeOptions(options)

    try {
      const response = await this.anthropic.messages.create({
        model: mergedOptions.model || 'claude-3-sonnet-20240229',
        max_tokens: mergedOptions.maxTokens,
        messages: [
          { role: 'user', content: prompt }
        ]
      })

      return response.content[0].text || ''
    } catch (error: any) {
      throw new Error(`Claude API error: ${error.message}`)
    }
  }
}
