// Core Types for BMad System

export interface AgentConfig {
  provider: 'openai' | 'claude' | 'gemini'
  apiKey: string
  model?: string
  temperature?: number
  maxTokens?: number
}

export interface AgentOptions {
  systemPrompt?: string
  customInstructions?: string[]
  model?: string
  temperature?: number
  provider?: 'openai' | 'claude' | 'gemini'
  apiKey?: string
}

export interface AgentContext {
  [key: string]: any
}

export interface AgentResponse {
  content: string
  metadata?: {
    model?: string
    provider?: string
    tokens?: number
    duration?: number
  }
}

export interface AIOptions {
  model?: string
  temperature?: number
  maxTokens?: number
  [key: string]: any
}

export interface AIProvider {
  callAI(prompt: string, options?: AIOptions): Promise<string>
}

export interface BaseAgent {
  execute(command: string, context: AgentContext): Promise<AgentResponse>
  addSystemPrompt(prompt: string): void
  addCustomInstructions(instructions: string[]): void
  setModel(model: string): void
  setTemperature(temperature: number): void
  setProvider(provider: string): void
}

export interface ProviderConfig {
  apiKey: string
  model?: string
  temperature?: number
  maxTokens?: number
}

export interface OpenAIConfig extends ProviderConfig {
  model?: string
  temperature?: number
  maxTokens?: number
}

export interface ClaudeConfig extends ProviderConfig {
  model?: string
  maxTokens?: number
}

export interface GeminiConfig extends ProviderConfig {
  model?: string
  temperature?: number
  maxTokens?: number
}

export type ProviderType = 'openai' | 'claude' | 'gemini'

export interface ConfigValidationResult {
  isValid: boolean
  error?: string
  provider?: ProviderType
}
