import { BaseAIProvider } from './base-provider.js'
import { OpenAIConfig, AIOptions } from '../types/index.js'

export class OpenAIProvider extends BaseAIProvider {
  private openai: any

  constructor(config: OpenAIConfig) {
    super(config)
    this.validateConfig()
    this.initializeOpenAI()
  }

  private async initializeOpenAI() {
    try {
      const { OpenAI } = await import('openai')
      this.openai = new OpenAI({
        apiKey: this.config.apiKey
      })
    } catch (error) {
      throw new Error('OpenAI package not installed. Please install: npm install openai')
    }
  }

  async callAI(prompt: string, options?: AIOptions): Promise<string> {
    if (!this.openai) {
      await this.initializeOpenAI()
    }

    const mergedOptions = this.mergeOptions(options)

    try {
      const response = await this.openai.chat.completions.create({
        model: mergedOptions.model || 'gpt-4',
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: mergedOptions.temperature,
        max_tokens: mergedOptions.maxTokens
      })

      return response.choices[0].message.content || ''
    } catch (error: any) {
      throw new Error(`OpenAI API error: ${error.message}`)
    }
  }
}
