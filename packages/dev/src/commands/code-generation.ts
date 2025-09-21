import { DevAgent } from '../dev-agent.js'
import { DevContext, CodeGeneration } from '../types/index.js'

export class CodeGenerationCommand {
  private agent: DevAgent

  constructor(agent: DevAgent) {
    this.agent = agent
  }

  async execute(context: DevContext): Promise<CodeGeneration> {
    const prompt = this.buildPrompt(context)
    const response = await this.agent.execute('generate-code', { userInput: context.userInput || '' })
    
    return this.parseResponse(response.content, context)
  }

  private buildPrompt(context: DevContext): string {
    const { userInput, options } = context
    
    return `Generate high-quality code for: ${userInput || 'the specified requirements'}

## Requirements:
- Language: ${context.codeLanguage || options?.language || 'JavaScript'}
- Framework: ${context.framework || options?.framework || 'None specified'}
- Style: ${options?.codeStyle || 'standard'}
- Testing: ${options?.testingFramework || 'jest'}
- Documentation: ${options?.documentationFormat || 'markdown'}

## Code Generation Guidelines:
1. **Clean Code**: Write readable, self-documenting code
2. **Best Practices**: Follow language and framework best practices
3. **Security**: Include security considerations
4. **Performance**: Write efficient and optimized code
5. **Testing**: Include comprehensive test coverage
6. **Documentation**: Provide clear documentation and comments
7. **Error Handling**: Include proper error handling
8. **Validation**: Include input validation and sanitization

## Output Format:
- Provide complete, production-ready code
- Include detailed comments and documentation
- Include test cases and examples
- Include setup and installation instructions
- Include security considerations
- Include performance optimizations

Ensure the code is production-ready and follows all best practices.`
  }

  private parseResponse(response: string, context: DevContext): CodeGeneration {
    const lines = response.split('\n')
    
    const title = this.extractValue(lines, 'Title') || 'Code Generation'
    const description = this.extractValue(lines, 'Description') || response.substring(0, 200) + '...'
    const language = context.codeLanguage || this.extractValue(lines, 'Language') || 'JavaScript'
    const framework = context.framework || this.extractValue(lines, 'Framework') || 'None'
    
    const code = this.extractCodeBlock(response)
    const files = this.extractFiles(lines)
    const dependencies = this.extractDependencies(lines)
    const instructions = this.extractList(lines, 'Instructions')

    return {
      title,
      description,
      language,
      framework,
      code,
      files,
      dependencies,
      instructions,
      testing: {
        framework: context.options?.testingFramework || 'jest',
        testFiles: this.extractList(lines, 'Test Files'),
        coverage: this.extractValue(lines, 'Coverage') || '80%',
        instructions: this.extractList(lines, 'Test Instructions'),
        commands: this.extractList(lines, 'Test Commands')
      },
      documentation: {
        format: context.options?.documentationFormat || 'markdown',
        files: this.extractList(lines, 'Documentation Files'),
        instructions: this.extractList(lines, 'Documentation Instructions'),
        examples: this.extractList(lines, 'Examples')
      },
      metadata: {
        generationType: 'Code Generation',
        timestamp: new Date().toISOString(),
        complexity: 'medium',
        estimatedTime: '2-4 hours'
      }
    }
  }

  private extractCodeBlock(response: string): string {
    const codeBlockRegex = /```[\w]*\n([\s\S]*?)\n```/g
    const matches = response.match(codeBlockRegex)
    return matches ? matches.map(match => match.replace(/```[\w]*\n/, '').replace(/\n```$/, '')).join('\n\n') : response
  }

  private extractFiles(lines: string[]): any[] {
    const files: any[] = []
    let currentFile: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('File')) {
        if (currentFile) {
          files.push(currentFile)
        }
        currentFile = {
          path: line.replace(/^###\s*/, '').replace(/\s*File.*$/, ''),
          content: '',
          type: 'source',
          language: 'javascript',
          description: '',
          dependencies: []
        }
      } else if (currentFile) {
        if (line.includes('Type:')) {
          currentFile.type = line.split('Type:')[1]?.trim() || 'source'
        } else if (line.includes('Language:')) {
          currentFile.language = line.split('Language:')[1]?.trim() || 'javascript'
        } else if (line.includes('Description:')) {
          currentFile.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Dependencies:')) {
          currentFile.dependencies = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentFile) {
      files.push(currentFile)
    }
    
    return files
  }

  private extractDependencies(lines: string[]): any[] {
    const dependencies: any[] = []
    let currentDep: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Dependency')) {
        if (currentDep) {
          dependencies.push(currentDep)
        }
        currentDep = {
          name: line.replace(/^###\s*/, '').replace(/\s*Dependency.*$/, ''),
          version: 'latest',
          type: 'production',
          description: '',
          installation: ''
        }
      } else if (currentDep) {
        if (line.includes('Version:')) {
          currentDep.version = line.split('Version:')[1]?.trim() || 'latest'
        } else if (line.includes('Type:')) {
          currentDep.type = line.split('Type:')[1]?.trim() || 'production'
        } else if (line.includes('Description:')) {
          currentDep.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Installation:')) {
          currentDep.installation = line.split('Installation:')[1]?.trim() || ''
        }
      }
    }
    
    if (currentDep) {
      dependencies.push(currentDep)
    }
    
    return dependencies
  }

  private extractValue(lines: string[], key: string): string | null {
    const line = lines.find(l => l.includes(key))
    if (!line) return null
    
    const match = line.match(new RegExp(`${key}[:\-]\\s*(.+)`, 'i'))
    return match ? match[1].trim() : null
  }

  private extractList(lines: string[], section: string): string[] {
    const startIndex = lines.findIndex(l => l.includes(section))
    if (startIndex === -1) return []
    
    const items: string[] = []
    for (let i = startIndex + 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line.startsWith('-') || line.startsWith('•') || line.startsWith('*')) {
        items.push(line.replace(/^[-•*]\s*/, ''))
      } else if (line === '' || line.startsWith('#')) {
        break
      }
    }
    
    return items
  }

  private extractListFromLine(line: string): string[] {
    const content = line.split(':')[1]?.trim() || ''
    return content.split(',').map(item => item.trim()).filter(item => item.length > 0)
  }
}
