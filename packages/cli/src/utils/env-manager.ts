import fs from 'fs'
import path from 'path'
import { EnvConfig } from '../types/index.js'

export class EnvManager {
  private envPath: string
  private projectRoot: string

  constructor(projectRoot: string = process.cwd()) {
    this.projectRoot = projectRoot
    this.envPath = path.join(projectRoot, '.env')
  }

  async setupEnv(provider: string, apiKey: string): Promise<void> {
    const envContent = this.generateEnvContent(provider, apiKey)
    
    if (fs.existsSync(this.envPath)) {
      await this.updateExistingEnv(provider, apiKey)
    } else {
      await this.createNewEnv(envContent)
    }
  }

  async updateProvider(provider: string): Promise<void> {
    const envContent = this.readEnvFile()
    const updatedContent = this.updateEnvValue(envContent, 'BMAD_AI_PROVIDER', provider)
    this.writeEnvFile(updatedContent)
  }

  async updateApiKey(apiKey: string): Promise<void> {
    const envContent = this.readEnvFile()
    const updatedContent = this.updateEnvValue(envContent, 'BMAD_AI_API_KEY', apiKey)
    this.writeEnvFile(updatedContent)
  }

  readEnvConfig(): EnvConfig {
    if (!fs.existsSync(this.envPath)) {
      return {}
    }

    const envContent = fs.readFileSync(this.envPath, 'utf8')
    const config: EnvConfig = {}

    envContent.split('\n').forEach(line => {
      const trimmedLine = line.trim()
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=')
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=')
          config[key as keyof EnvConfig] = value
        }
      }
    })

    return config
  }

  envExists(): boolean {
    return fs.existsSync(this.envPath)
  }

  private generateEnvContent(provider: string, apiKey: string): string {
    return `# BMad AI Configuration
BMAD_AI_PROVIDER=${provider}
BMAD_AI_API_KEY=${apiKey}

# Optional: Additional provider keys
# OPENAI_API_KEY=${provider === 'openai' ? apiKey : ''}
# ANTHROPIC_API_KEY=${provider === 'claude' ? apiKey : ''}
# GOOGLE_API_KEY=${provider === 'gemini' ? apiKey : ''}

# BMad Project Configuration
BMAD_PROJECT_ROOT=${this.projectRoot}
BMAD_AGENTS_DIR=./agents
BMAD_TEMPLATES_DIR=./templates
`
  }

  private async updateExistingEnv(provider: string, apiKey: string): Promise<void> {
    let envContent = this.readEnvFile()
    
    envContent = this.updateEnvValue(envContent, 'BMAD_AI_PROVIDER', provider)
    envContent = this.updateEnvValue(envContent, 'BMAD_AI_API_KEY', apiKey)
    
    this.writeEnvFile(envContent)
  }

  private async createNewEnv(content: string): Promise<void> {
    fs.writeFileSync(this.envPath, content)
  }

  private readEnvFile(): string {
    if (!fs.existsSync(this.envPath)) {
      return ''
    }
    return fs.readFileSync(this.envPath, 'utf8')
  }

  private writeEnvFile(content: string): void {
    fs.writeFileSync(this.envPath, content)
  }

  private updateEnvValue(content: string, key: string, value: string): string {
    const lines = content.split('\n')
    let found = false

    const updatedLines = lines.map(line => {
      if (line.startsWith(`${key}=`)) {
        found = true
        return `${key}=${value}`
      }
      return line
    })

    if (!found) {
      updatedLines.push(`${key}=${value}`)
    }

    return updatedLines.join('\n')
  }
}
