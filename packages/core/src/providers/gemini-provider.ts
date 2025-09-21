import { BaseAIProvider } from './base-provider.js'
import { GeminiConfig, AIOptions } from '../types/index.js'

export class GeminiProvider extends BaseAIProvider {
  private genAI: any

  constructor(config: GeminiConfig) {
    super(config)
    this.validateConfig()
    this.initializeGemini()
  }

  private async initializeGemini() {
    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai')
      this.genAI = new GoogleGenerativeAI(this.config.apiKey)
    } catch (error) {
      throw new Error('Google Generative AI package not installed. Please install: npm install @google/generative-ai')
    }
  }

  async callAI(prompt: string, options?: AIOptions): Promise<string> {
    if (!this.genAI) {
      await this.initializeGemini()
    }

    const mergedOptions = this.mergeOptions(options)

    try {
      const model = this.genAI.getGenerativeModel({
        model: mergedOptions.model || 'gemini-pro'
      })

      const result = await model.generateContent(prompt)
      return result.response.text() || ''
    } catch (error: any) {
      throw new Error(`Gemini API error: ${error.message}`)
    }
  }
}
