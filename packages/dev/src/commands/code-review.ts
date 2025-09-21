import { DevAgent } from '../dev-agent.js'
import { DevContext, CodeReview } from '../types/index.js'

export class CodeReviewCommand {
  private agent: DevAgent

  constructor(agent: DevAgent) {
    this.agent = agent
  }

  async execute(context: DevContext): Promise<CodeReview> {
    const prompt = this.buildPrompt(context)
    const response = await this.agent.execute('review-code', { userInput: context.userInput || '' })
    
    return this.parseResponse(response.content, context)
  }

  private buildPrompt(context: DevContext): string {
    const { userInput, options } = context
    
    return `Review the provided code for quality, security, and best practices:

## Code to Review:
${userInput || 'No code provided'}

## Review Criteria:
- **Code Quality**: Readability, maintainability, and structure
- **Security**: Vulnerabilities, security best practices
- **Performance**: Efficiency and optimization opportunities
- **Best Practices**: Language and framework conventions
- **Testing**: Test coverage and quality
- **Documentation**: Code documentation and comments

## Review Framework:
1. **Static Analysis**: Code structure and patterns
2. **Security Review**: Security vulnerabilities and issues
3. **Performance Analysis**: Performance bottlenecks and optimizations
4. **Best Practices**: Adherence to coding standards
5. **Maintainability**: Code organization and readability
6. **Testing**: Test coverage and quality

## Output Format:
- Provide detailed review findings
- Include specific code examples
- Suggest improvements and fixes
- Rate overall code quality
- Provide actionable recommendations

Ensure the review is comprehensive and actionable.`
  }

  private parseResponse(response: string, context: DevContext): CodeReview {
    const lines = response.split('\n')
    
    const title = this.extractValue(lines, 'Title') || 'Code Review'
    const summary = this.extractValue(lines, 'Summary') || response.substring(0, 200) + '...'
    const overallScore = parseFloat(this.extractValue(lines, 'Overall Score') || '8.5')
    
    const issues = this.extractIssues(lines)
    const suggestions = this.extractSuggestions(lines)
    const improvements = this.extractImprovements(lines)
    const security = this.extractSecurityIssues(lines)
    const performance = this.extractPerformanceIssues(lines)
    const bestPractices = this.extractBestPractices(lines)

    return {
      title,
      summary,
      issues,
      suggestions,
      improvements,
      security,
      performance,
      bestPractices,
      overallScore,
      metadata: {
        reviewType: 'Code Review',
        timestamp: new Date().toISOString(),
        language: context.codeLanguage || 'JavaScript',
        linesOfCode: this.countLinesOfCode(context.userInput || '')
      }
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
          type: 'warning',
          severity: 'medium',
          title: line.replace(/^###\s*/, '').replace(/\s*Issue.*$/, ''),
          description: '',
          file: '',
          line: 0,
          code: '',
          suggestion: '',
          impact: ''
        }
      } else if (currentIssue) {
        if (line.includes('Type:')) {
          currentIssue.type = line.split('Type:')[1]?.trim() || 'warning'
        } else if (line.includes('Severity:')) {
          currentIssue.severity = line.split('Severity:')[1]?.trim() || 'medium'
        } else if (line.includes('Description:')) {
          currentIssue.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('File:')) {
          currentIssue.file = line.split('File:')[1]?.trim() || ''
        } else if (line.includes('Line:')) {
          currentIssue.line = parseInt(line.split('Line:')[1]?.trim() || '0')
        } else if (line.includes('Code:')) {
          currentIssue.code = line.split('Code:')[1]?.trim() || ''
        } else if (line.includes('Suggestion:')) {
          currentIssue.suggestion = line.split('Suggestion:')[1]?.trim() || ''
        } else if (line.includes('Impact:')) {
          currentIssue.impact = line.split('Impact:')[1]?.trim() || ''
        }
      }
    }
    
    if (currentIssue) {
      issues.push(currentIssue)
    }
    
    return issues
  }

  private extractSuggestions(lines: string[]): any[] {
    const suggestions: any[] = []
    let currentSuggestion: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Suggestion')) {
        if (currentSuggestion) {
          suggestions.push(currentSuggestion)
        }
        currentSuggestion = {
          title: line.replace(/^###\s*/, '').replace(/\s*Suggestion.*$/, ''),
          description: '',
          category: 'refactoring',
          priority: 'medium',
          effort: 'medium',
          impact: 'medium',
          code: '',
          improvedCode: '',
          explanation: ''
        }
      } else if (currentSuggestion) {
        if (line.includes('Category:')) {
          currentSuggestion.category = line.split('Category:')[1]?.trim() || 'refactoring'
        } else if (line.includes('Priority:')) {
          currentSuggestion.priority = line.split('Priority:')[1]?.trim() || 'medium'
        } else if (line.includes('Effort:')) {
          currentSuggestion.effort = line.split('Effort:')[1]?.trim() || 'medium'
        } else if (line.includes('Impact:')) {
          currentSuggestion.impact = line.split('Impact:')[1]?.trim() || 'medium'
        } else if (line.includes('Code:')) {
          currentSuggestion.code = line.split('Code:')[1]?.trim() || ''
        } else if (line.includes('Improved Code:')) {
          currentSuggestion.improvedCode = line.split('Improved Code:')[1]?.trim() || ''
        } else if (line.includes('Explanation:')) {
          currentSuggestion.explanation = line.split('Explanation:')[1]?.trim() || ''
        }
      }
    }
    
    if (currentSuggestion) {
      suggestions.push(currentSuggestion)
    }
    
    return suggestions
  }

  private extractImprovements(lines: string[]): any[] {
    const improvements: any[] = []
    let currentImprovement: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Improvement')) {
        if (currentImprovement) {
          improvements.push(currentImprovement)
        }
        currentImprovement = {
          title: line.replace(/^###\s*/, '').replace(/\s*Improvement.*$/, ''),
          description: '',
          category: 'performance',
          priority: 'medium',
          effort: 'medium',
          impact: 'medium',
          currentCode: '',
          improvedCode: '',
          explanation: '',
          benefits: []
        }
      } else if (currentImprovement) {
        if (line.includes('Category:')) {
          currentImprovement.category = line.split('Category:')[1]?.trim() || 'performance'
        } else if (line.includes('Priority:')) {
          currentImprovement.priority = line.split('Priority:')[1]?.trim() || 'medium'
        } else if (line.includes('Effort:')) {
          currentImprovement.effort = line.split('Effort:')[1]?.trim() || 'medium'
        } else if (line.includes('Impact:')) {
          currentImprovement.impact = line.split('Impact:')[1]?.trim() || 'medium'
        } else if (line.includes('Current Code:')) {
          currentImprovement.currentCode = line.split('Current Code:')[1]?.trim() || ''
        } else if (line.includes('Improved Code:')) {
          currentImprovement.improvedCode = line.split('Improved Code:')[1]?.trim() || ''
        } else if (line.includes('Explanation:')) {
          currentImprovement.explanation = line.split('Explanation:')[1]?.trim() || ''
        } else if (line.includes('Benefits:')) {
          currentImprovement.benefits = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentImprovement) {
      improvements.push(currentImprovement)
    }
    
    return improvements
  }

  private extractSecurityIssues(lines: string[]): any[] {
    const security: any[] = []
    let currentSecurity: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Security')) {
        if (currentSecurity) {
          security.push(currentSecurity)
        }
        currentSecurity = {
          type: 'vulnerability',
          severity: 'medium',
          title: line.replace(/^###\s*/, '').replace(/\s*Security.*$/, ''),
          description: '',
          file: '',
          line: 0,
          cwe: '',
          owasp: '',
          impact: '',
          remediation: '',
          references: []
        }
      } else if (currentSecurity) {
        if (line.includes('Type:')) {
          currentSecurity.type = line.split('Type:')[1]?.trim() || 'vulnerability'
        } else if (line.includes('Severity:')) {
          currentSecurity.severity = line.split('Severity:')[1]?.trim() || 'medium'
        } else if (line.includes('Description:')) {
          currentSecurity.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('File:')) {
          currentSecurity.file = line.split('File:')[1]?.trim() || ''
        } else if (line.includes('Line:')) {
          currentSecurity.line = parseInt(line.split('Line:')[1]?.trim() || '0')
        } else if (line.includes('CWE:')) {
          currentSecurity.cwe = line.split('CWE:')[1]?.trim() || ''
        } else if (line.includes('OWASP:')) {
          currentSecurity.owasp = line.split('OWASP:')[1]?.trim() || ''
        } else if (line.includes('Impact:')) {
          currentSecurity.impact = line.split('Impact:')[1]?.trim() || ''
        } else if (line.includes('Remediation:')) {
          currentSecurity.remediation = line.split('Remediation:')[1]?.trim() || ''
        } else if (line.includes('References:')) {
          currentSecurity.references = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentSecurity) {
      security.push(currentSecurity)
    }
    
    return security
  }

  private extractPerformanceIssues(lines: string[]): any[] {
    const performance: any[] = []
    let currentPerf: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Performance')) {
        if (currentPerf) {
          performance.push(currentPerf)
        }
        currentPerf = {
          type: 'bottleneck',
          severity: 'medium',
          title: line.replace(/^###\s*/, '').replace(/\s*Performance.*$/, ''),
          description: '',
          file: '',
          line: 0,
          impact: '',
          remediation: '',
          metrics: {}
        }
      } else if (currentPerf) {
        if (line.includes('Type:')) {
          currentPerf.type = line.split('Type:')[1]?.trim() || 'bottleneck'
        } else if (line.includes('Severity:')) {
          currentPerf.severity = line.split('Severity:')[1]?.trim() || 'medium'
        } else if (line.includes('Description:')) {
          currentPerf.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('File:')) {
          currentPerf.file = line.split('File:')[1]?.trim() || ''
        } else if (line.includes('Line:')) {
          currentPerf.line = parseInt(line.split('Line:')[1]?.trim() || '0')
        } else if (line.includes('Impact:')) {
          currentPerf.impact = line.split('Impact:')[1]?.trim() || ''
        } else if (line.includes('Remediation:')) {
          currentPerf.remediation = line.split('Remediation:')[1]?.trim() || ''
        }
      }
    }
    
    if (currentPerf) {
      performance.push(currentPerf)
    }
    
    return performance
  }

  private extractBestPractices(lines: string[]): any[] {
    const bestPractices: any[] = []
    let currentBP: any = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (line.startsWith('###') && line.includes('Best Practice')) {
        if (currentBP) {
          bestPractices.push(currentBP)
        }
        currentBP = {
          category: 'coding',
          title: line.replace(/^###\s*/, '').replace(/\s*Best Practice.*$/, ''),
          description: '',
          example: '',
          antiPattern: '',
          benefits: [],
          references: []
        }
      } else if (currentBP) {
        if (line.includes('Category:')) {
          currentBP.category = line.split('Category:')[1]?.trim() || 'coding'
        } else if (line.includes('Description:')) {
          currentBP.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Example:')) {
          currentBP.example = line.split('Example:')[1]?.trim() || ''
        } else if (line.includes('Anti-pattern:')) {
          currentBP.antiPattern = line.split('Anti-pattern:')[1]?.trim() || ''
        } else if (line.includes('Benefits:')) {
          currentBP.benefits = this.extractListFromLine(line)
        } else if (line.includes('References:')) {
          currentBP.references = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentBP) {
      bestPractices.push(currentBP)
    }
    
    return bestPractices
  }

  private countLinesOfCode(code: string): number {
    return code.split('\n').filter(line => line.trim().length > 0).length
  }

  private extractValue(lines: string[], key: string): string | null {
    const line = lines.find(l => l.includes(key))
    if (!line) return null
    
    const match = line.match(new RegExp(`${key}[:\-]\\s*(.+)`, 'i'))
    return match ? match[1].trim() : null
  }

  private extractListFromLine(line: string): string[] {
    const content = line.split(':')[1]?.trim() || ''
    return content.split(',').map(item => item.trim()).filter(item => item.length > 0)
  }
}
