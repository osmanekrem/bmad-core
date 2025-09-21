// CLI Types

export interface CLICommand {
  name: string
  description: string
  action: (...args: any[]) => Promise<void> | void
  options?: CLIOption[]
}

export interface CLIOption {
  flags: string
  description: string
  defaultValue?: any
  required?: boolean
}

export interface InitOptions {
  provider?: string
  key?: string
  agents?: string
  interactive?: boolean
}

export interface InstallOptions {
  agents: string[]
  provider?: string
  key?: string
  interactive?: boolean
}

export interface ConfigOptions {
  provider?: string
  key?: string
  show?: boolean
  interactive?: boolean
}

export interface StatusOptions {
  verbose?: boolean
}

export interface EnvConfig {
  BMAD_AI_PROVIDER?: string
  BMAD_AI_API_KEY?: string
  BMAD_AI_MODEL?: string
  BMAD_AI_TEMPERATURE?: string
  BMAD_AI_MAX_TOKENS?: string
}

export interface PackageInfo {
  name: string
  version: string
  description: string
  installed: boolean
}

export interface AgentInfo {
  name: string
  package: string
  description: string
  available: boolean
  installed: boolean
}

export interface ValidationResult {
  isValid: boolean
  error?: string
  provider?: string
}

export interface InstallationResult {
  success: boolean
  installed: string[]
  failed: string[]
  errors: string[]
}
