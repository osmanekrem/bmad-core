import { ConfigManager } from '@osmanekrem/bmad/core'
import { ValidationResult } from '../types/index.js'

export class ConfigValidator {
  static async validateProvider(provider: string, apiKey: string): Promise<ValidationResult> {
    if (!apiKey || apiKey.trim() === '') {
      return {
        isValid: false,
        error: 'API key is required',
        provider: provider as any
      }
    }

    if (!['openai', 'claude', 'gemini'].includes(provider)) {
      return {
        isValid: false,
        error: `Unsupported provider: ${provider}. Supported providers: openai, claude, gemini`,
        provider: provider as any
      }
    }

    try {
      const result = await ConfigManager.validateKey(provider as any, apiKey)
      return result
    } catch (error: any) {
      return {
        isValid: false,
        error: error.message,
        provider: provider as any
      }
    }
  }

  static validateApiKey(apiKey: string): ValidationResult {
    if (!apiKey || apiKey.trim() === '') {
      return {
        isValid: false,
        error: 'API key cannot be empty'
      }
    }

    // Basic format validation
    if (apiKey.length < 10) {
      return {
        isValid: false,
        error: 'API key appears to be too short'
      }
    }

    return {
      isValid: true
    }
  }

  static validateProviderName(provider: string): ValidationResult {
    const supportedProviders = ['openai', 'claude', 'gemini']
    
    if (!supportedProviders.includes(provider)) {
      return {
        isValid: false,
        error: `Unsupported provider: ${provider}. Supported providers: ${supportedProviders.join(', ')}`
      }
    }

    return {
      isValid: true,
      provider: provider as any
    }
  }

  static getSupportedProviders(): string[] {
    return ['openai', 'claude', 'gemini']
  }

  static getProviderDisplayName(provider: string): string {
    const displayNames: Record<string, string> = {
      'openai': 'OpenAI (GPT-4, GPT-3.5)',
      'claude': 'Claude (Anthropic)',
      'gemini': 'Gemini (Google)'
    }

    return displayNames[provider] || provider
  }
}
