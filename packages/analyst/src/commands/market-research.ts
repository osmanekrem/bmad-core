import { AnalystAgent } from '../analyst-agent.js'
import { AnalystContext, MarketResearch } from '../types/index.js'

export class MarketResearchCommand {
  private agent: AnalystAgent

  constructor(agent: AnalystAgent) {
    this.agent = agent
  }

  async execute(context: AnalystContext): Promise<MarketResearch> {
    const prompt = this.buildPrompt(context)
    const response = await this.agent.execute('market-research', { userInput: context.userInput || '' })
    
    return this.parseResponse(response.content, context)
  }

  private buildPrompt(context: AnalystContext): string {
    const { userInput, options } = context
    
    return `Conduct comprehensive market research for: ${userInput || 'the specified market'}

## Research Scope:
- Market size and growth projections
- Key market trends and drivers
- Target customer segments and personas
- Market opportunities and challenges
- Competitive landscape overview
- Regulatory and environmental factors
- Technology trends and innovations

## Analysis Requirements:
- Depth: ${options?.depth || 'moderate'}
- Focus Areas: ${options?.focusAreas?.join(', ') || 'General market analysis'}
- Timeframe: ${options?.timeframe || 'Current and next 2-3 years'}
- Geographic Scope: ${options?.geographicScope || 'Global'}

## Output Format:
Please provide a structured analysis with:
1. Executive Summary
2. Market Overview
3. Key Trends and Drivers
4. Customer Segments
5. Opportunities and Challenges
6. Competitive Landscape
7. Recommendations
8. Next Steps

Ensure all findings are data-driven and include specific recommendations for market entry or expansion.`
  }

  private parseResponse(response: string, context: AnalystContext): MarketResearch {
    // This is a simplified parser - in a real implementation, you'd use more sophisticated parsing
    const lines = response.split('\n')
    
    const marketSize = this.extractValue(lines, 'Market Size') || 'To be determined'
    const growthRate = this.extractValue(lines, 'Growth Rate') || 'To be determined'
    
    const trends = this.extractList(lines, 'Key Trends')
    const opportunities = this.extractList(lines, 'Opportunities')
    const challenges = this.extractList(lines, 'Challenges')
    const recommendations = this.extractList(lines, 'Recommendations')

    return {
      marketSize,
      growthRate,
      trends: trends.map(trend => ({
        name: trend,
        description: trend,
        impact: 'medium' as const,
        timeframe: '1-2 years',
        evidence: []
      })),
      opportunities: opportunities.map(opp => ({
        title: opp,
        description: opp,
        potential: 'medium' as const,
        effort: 'medium' as const,
        timeframe: '6-12 months',
        requirements: []
      })),
      challenges: challenges.map(challenge => ({
        title: challenge,
        description: challenge,
        severity: 'medium' as const,
        mitigation: [],
        impact: 'Medium'
      })),
      recommendations,
      metadata: {
        researchDate: new Date().toISOString(),
        marketSegment: context.options?.marketSegment || 'General',
        dataSource: 'AI Analysis'
      }
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
}
