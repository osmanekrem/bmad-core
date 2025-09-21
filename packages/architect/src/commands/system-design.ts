import { ArchitectAgent } from '../architect-agent.js'
import { ArchitectContext, ArchitectureDesign } from '../types/index.js'

export class SystemDesignCommand {
  private agent: ArchitectAgent

  constructor(agent: ArchitectAgent) {
    this.agent = agent
  }

  async execute(context: ArchitectContext): Promise<ArchitectureDesign> {
    const prompt = this.buildPrompt(context)
    const response = await this.agent.execute('system-design', { userInput: context.userInput || '' })
    
    return this.parseResponse(response.content, context)
  }

  private buildPrompt(context: ArchitectContext): string {
    const { userInput, options } = context
    
    return `Design a comprehensive system architecture for: ${userInput || 'the specified system'}

## Design Requirements:
- System Type: ${options?.systemType || 'Web Application'}
- Scale: ${options?.scale || 'Medium (1K-10K users)'}
- Complexity: ${options?.complexity || 'moderate'}
- Include Diagrams: ${options?.includeDiagrams || true}

## Architecture Components:
1. **System Overview**: High-level architecture and key components
2. **Component Design**: Detailed component specifications
3. **Technology Stack**: Recommended technologies and tools
4. **Design Patterns**: Applied patterns and their rationale
5. **Infrastructure**: Infrastructure requirements and specifications
6. **Security**: Security architecture and controls
7. **Scalability**: Scalability plan and performance considerations
8. **Implementation**: Implementation roadmap and next steps

## Output Format:
- Use structured markdown with clear headings
- Include Mermaid diagrams for architecture visualization
- Provide detailed component specifications
- Include technology recommendations with rationale
- Document security and scalability considerations
- Provide implementation timeline and milestones

Ensure the design is practical, scalable, secure, and maintainable.`
  }

  private parseResponse(response: string, context: ArchitectContext): ArchitectureDesign {
    // This is a simplified parser - in a real implementation, you'd use more sophisticated parsing
    const lines = response.split('\n')
    
    const title = this.extractValue(lines, 'Title') || 'System Architecture Design'
    const description = this.extractValue(lines, 'Description') || response.substring(0, 200) + '...'
    const type = this.extractValue(lines, 'Architecture Type') || 'microservices'
    
    const components = this.extractComponents(lines)
    const patterns = this.extractPatterns(lines)
    const technologies = this.extractTechnologies(lines)
    const recommendations = this.extractList(lines, 'Recommendations')
    const nextSteps = this.extractList(lines, 'Next Steps')

    return {
      title,
      description,
      type: type as any,
      components,
      patterns,
      technologies,
      infrastructure: [],
      security: [],
      scalability: {
        current: { users: '1K', requests: '1K/min', data: '1GB', storage: '10GB', performance: '100ms' },
        target: { users: '100K', requests: '100K/min', data: '1TB', storage: '100GB', performance: '50ms' },
        strategy: [],
        bottlenecks: [],
        solutions: [],
        timeline: '6 months'
      },
      performance: [],
      recommendations,
      nextSteps,
      metadata: {
        designType: 'System Architecture',
        timestamp: new Date().toISOString(),
        complexity: 'medium',
        estimatedEffort: '3-6 months'
      }
    }
  }

  private extractComponents(lines: string[]): any[] {
    const components: any[] = []
    let currentComponent: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Component')) {
        if (currentComponent) {
          components.push(currentComponent)
        }
        currentComponent = {
          id: line.replace(/^###\s*/, '').replace(/\s*Component.*$/, '').toLowerCase().replace(/\s+/g, '-'),
          name: line.replace(/^###\s*/, '').replace(/\s*Component.*$/, ''),
          type: 'service',
          description: '',
          responsibilities: [],
          dependencies: [],
          interfaces: [],
          technologies: [],
          scalability: { users: '1K', requests: '1K/min', data: '1GB', storage: '10GB', performance: '100ms' },
          security: { level: 'medium', requirements: [], threats: [], controls: [] }
        }
      } else if (currentComponent) {
        if (line.includes('Description:')) {
          currentComponent.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Type:')) {
          currentComponent.type = line.split('Type:')[1]?.trim() || 'service'
        } else if (line.includes('Responsibilities:')) {
          currentComponent.responsibilities = this.extractListFromLine(line)
        } else if (line.includes('Technologies:')) {
          currentComponent.technologies = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentComponent) {
      components.push(currentComponent)
    }
    
    return components
  }

  private extractPatterns(lines: string[]): any[] {
    const patterns: any[] = []
    let currentPattern: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Pattern')) {
        if (currentPattern) {
          patterns.push(currentPattern)
        }
        currentPattern = {
          name: line.replace(/^###\s*/, '').replace(/\s*Pattern.*$/, ''),
          category: 'architectural',
          description: '',
          useCase: '',
          benefits: [],
          tradeoffs: [],
          implementation: '',
          examples: []
        }
      } else if (currentPattern) {
        if (line.includes('Category:')) {
          currentPattern.category = line.split('Category:')[1]?.trim() || 'architectural'
        } else if (line.includes('Description:')) {
          currentPattern.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Benefits:')) {
          currentPattern.benefits = this.extractListFromLine(line)
        } else if (line.includes('Tradeoffs:')) {
          currentPattern.tradeoffs = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentPattern) {
      patterns.push(currentPattern)
    }
    
    return patterns
  }

  private extractTechnologies(lines: string[]): any[] {
    const technologies: any[] = []
    let currentTech: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Technology')) {
        if (currentTech) {
          technologies.push(currentTech)
        }
        currentTech = {
          name: line.replace(/^###\s*/, '').replace(/\s*Technology.*$/, ''),
          category: 'backend',
          description: '',
          pros: [],
          cons: [],
          alternatives: [],
          learningCurve: 'medium',
          community: 'large',
          maturity: 'stable'
        }
      } else if (currentTech) {
        if (line.includes('Category:')) {
          currentTech.category = line.split('Category:')[1]?.trim() || 'backend'
        } else if (line.includes('Description:')) {
          currentTech.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Pros:')) {
          currentTech.pros = this.extractListFromLine(line)
        } else if (line.includes('Cons:')) {
          currentTech.cons = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentTech) {
      technologies.push(currentTech)
    }
    
    return technologies
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
