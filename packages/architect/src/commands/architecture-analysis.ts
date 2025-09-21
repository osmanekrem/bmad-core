import { ArchitectAgent } from '../architect-agent.js'
import { ArchitectContext, SystemAnalysis } from '../types/index.js'

export class ArchitectureAnalysisCommand {
  private agent: ArchitectAgent

  constructor(agent: ArchitectAgent) {
    this.agent = agent
  }

  async execute(context: ArchitectContext): Promise<SystemAnalysis> {
    const prompt = this.buildPrompt(context)
    const response = await this.agent.execute('architecture-analysis', { userInput: context.userInput || '' })
    
    return this.parseResponse(response.content, context)
  }

  private buildPrompt(context: ArchitectContext): string {
    const { userInput, options } = context
    
    return `Analyze the existing system architecture for: ${userInput || 'the specified system'}

## Analysis Scope:
- Current Architecture: ${options?.currentArchitecture || 'To be analyzed'}
- Analysis Depth: ${options?.analysisDepth || 'moderate'}
- Focus Areas: ${options?.focusAreas?.join(', ') || 'General architecture analysis'}

## Analysis Framework:
1. **Current State Assessment**: Evaluate existing architecture
2. **Issue Identification**: Identify problems and bottlenecks
3. **Opportunity Analysis**: Find improvement opportunities
4. **Recommendations**: Provide specific recommendations
5. **Migration Planning**: Plan for architecture improvements
6. **Risk Assessment**: Identify risks and mitigation strategies

## Output Format:
- Use structured markdown with clear headings
- Include current state analysis
- Identify specific issues with severity levels
- Provide actionable recommendations
- Include migration plan with timeline
- Document risks and mitigation strategies

Provide detailed, actionable analysis that helps improve the system architecture.`
  }

  private parseResponse(response: string, context: ArchitectContext): SystemAnalysis {
    const lines = response.split('\n')
    
    const title = this.extractValue(lines, 'Title') || 'System Architecture Analysis'
    const summary = this.extractValue(lines, 'Summary') || response.substring(0, 200) + '...'
    
    const currentState = this.extractCurrentState(lines)
    const issues = this.extractIssues(lines)
    const opportunities = this.extractOpportunities(lines)
    const recommendations = this.extractRecommendations(lines)
    const migration = this.extractMigrationPlan(lines)

    return {
      title,
      summary,
      currentState,
      issues,
      opportunities,
      recommendations,
      migration,
      metadata: {
        analysisType: 'Architecture Analysis',
        timestamp: new Date().toISOString(),
        complexity: 'medium'
      }
    }
  }

  private extractCurrentState(lines: string[]): any {
    return {
      architecture: this.extractValue(lines, 'Architecture') || 'Monolithic',
      technologies: this.extractList(lines, 'Technologies'),
      performance: this.extractPerformanceMetrics(lines),
      scalability: this.extractScalabilityMetrics(lines),
      security: this.extractSecurityMetrics(lines),
      maintainability: this.extractMaintainabilityMetrics(lines)
    }
  }

  private extractIssues(lines: string[]): any[] {
    const issues: any[] = []
    let currentIssue: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Issue')) {
        if (currentIssue) {
          issues.push(currentIssue)
        }
        currentIssue = {
          category: 'performance',
          title: line.replace(/^###\s*/, '').replace(/\s*Issue.*$/, ''),
          description: '',
          severity: 'medium',
          impact: '',
          rootCause: '',
          solution: '',
          effort: 'medium',
          priority: 'medium'
        }
      } else if (currentIssue) {
        if (line.includes('Category:')) {
          currentIssue.category = line.split('Category:')[1]?.trim() || 'performance'
        } else if (line.includes('Severity:')) {
          currentIssue.severity = line.split('Severity:')[1]?.trim() || 'medium'
        } else if (line.includes('Impact:')) {
          currentIssue.impact = line.split('Impact:')[1]?.trim() || ''
        } else if (line.includes('Solution:')) {
          currentIssue.solution = line.split('Solution:')[1]?.trim() || ''
        } else if (line.includes('Effort:')) {
          currentIssue.effort = line.split('Effort:')[1]?.trim() || 'medium'
        } else if (line.includes('Priority:')) {
          currentIssue.priority = line.split('Priority:')[1]?.trim() || 'medium'
        }
      }
    }
    
    if (currentIssue) {
      issues.push(currentIssue)
    }
    
    return issues
  }

  private extractOpportunities(lines: string[]): any[] {
    const opportunities: any[] = []
    let currentOpp: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Opportunity')) {
        if (currentOpp) {
          opportunities.push(currentOpp)
        }
        currentOpp = {
          title: line.replace(/^###\s*/, '').replace(/\s*Opportunity.*$/, ''),
          description: '',
          benefit: '',
          effort: 'medium',
          impact: 'medium',
          timeline: '',
          requirements: []
        }
      } else if (currentOpp) {
        if (line.includes('Benefit:')) {
          currentOpp.benefit = line.split('Benefit:')[1]?.trim() || ''
        } else if (line.includes('Effort:')) {
          currentOpp.effort = line.split('Effort:')[1]?.trim() || 'medium'
        } else if (line.includes('Impact:')) {
          currentOpp.impact = line.split('Impact:')[1]?.trim() || 'medium'
        } else if (line.includes('Timeline:')) {
          currentOpp.timeline = line.split('Timeline:')[1]?.trim() || ''
        } else if (line.includes('Requirements:')) {
          currentOpp.requirements = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentOpp) {
      opportunities.push(currentOpp)
    }
    
    return opportunities
  }

  private extractRecommendations(lines: string[]): any[] {
    const recommendations: any[] = []
    let currentRec: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Recommendation')) {
        if (currentRec) {
          recommendations.push(currentRec)
        }
        currentRec = {
          title: line.replace(/^###\s*/, '').replace(/\s*Recommendation.*$/, ''),
          description: '',
          category: 'architecture',
          priority: 'medium',
          effort: 'medium',
          impact: 'medium',
          timeline: '',
          dependencies: [],
          risks: [],
          benefits: []
        }
      } else if (currentRec) {
        if (line.includes('Category:')) {
          currentRec.category = line.split('Category:')[1]?.trim() || 'architecture'
        } else if (line.includes('Priority:')) {
          currentRec.priority = line.split('Priority:')[1]?.trim() || 'medium'
        } else if (line.includes('Effort:')) {
          currentRec.effort = line.split('Effort:')[1]?.trim() || 'medium'
        } else if (line.includes('Impact:')) {
          currentRec.impact = line.split('Impact:')[1]?.trim() || 'medium'
        } else if (line.includes('Timeline:')) {
          currentRec.timeline = line.split('Timeline:')[1]?.trim() || ''
        } else if (line.includes('Dependencies:')) {
          currentRec.dependencies = this.extractListFromLine(line)
        } else if (line.includes('Risks:')) {
          currentRec.risks = this.extractListFromLine(line)
        } else if (line.includes('Benefits:')) {
          currentRec.benefits = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentRec) {
      recommendations.push(currentRec)
    }
    
    return recommendations
  }

  private extractMigrationPlan(lines: string[]): any {
    return {
      strategy: this.extractValue(lines, 'Strategy') || 'gradual',
      phases: this.extractMigrationPhases(lines),
      timeline: this.extractValue(lines, 'Timeline') || '6-12 months',
      risks: this.extractList(lines, 'Risks'),
      rollback: this.extractList(lines, 'Rollback'),
      success: this.extractList(lines, 'Success')
    }
  }

  private extractMigrationPhases(lines: string[]): any[] {
    const phases: any[] = []
    let currentPhase: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Phase')) {
        if (currentPhase) {
          phases.push(currentPhase)
        }
        currentPhase = {
          name: line.replace(/^###\s*/, '').replace(/\s*Phase.*$/, ''),
          description: '',
          duration: '',
          deliverables: [],
          dependencies: [],
          risks: [],
          testing: []
        }
      } else if (currentPhase) {
        if (line.includes('Duration:')) {
          currentPhase.duration = line.split('Duration:')[1]?.trim() || ''
        } else if (line.includes('Deliverables:')) {
          currentPhase.deliverables = this.extractListFromLine(line)
        } else if (line.includes('Dependencies:')) {
          currentPhase.dependencies = this.extractListFromLine(line)
        } else if (line.includes('Risks:')) {
          currentPhase.risks = this.extractListFromLine(line)
        } else if (line.includes('Testing:')) {
          currentPhase.testing = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentPhase) {
      phases.push(currentPhase)
    }
    
    return phases
  }

  private extractPerformanceMetrics(lines: string[]): Record<string, any> {
    return {
      responseTime: this.extractValue(lines, 'Response Time') || 'N/A',
      throughput: this.extractValue(lines, 'Throughput') || 'N/A',
      latency: this.extractValue(lines, 'Latency') || 'N/A'
    }
  }

  private extractScalabilityMetrics(lines: string[]): Record<string, any> {
    return {
      currentUsers: this.extractValue(lines, 'Current Users') || 'N/A',
      maxUsers: this.extractValue(lines, 'Max Users') || 'N/A',
      scalingStrategy: this.extractValue(lines, 'Scaling Strategy') || 'N/A'
    }
  }

  private extractSecurityMetrics(lines: string[]): Record<string, any> {
    return {
      authentication: this.extractValue(lines, 'Authentication') || 'N/A',
      authorization: this.extractValue(lines, 'Authorization') || 'N/A',
      encryption: this.extractValue(lines, 'Encryption') || 'N/A'
    }
  }

  private extractMaintainabilityMetrics(lines: string[]): Record<string, any> {
    return {
      codeQuality: this.extractValue(lines, 'Code Quality') || 'N/A',
      documentation: this.extractValue(lines, 'Documentation') || 'N/A',
      testCoverage: this.extractValue(lines, 'Test Coverage') || 'N/A'
    }
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
