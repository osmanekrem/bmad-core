import { AnalystAgent } from '../analyst-agent.js'
import { AnalystContext, CompetitorAnalysis, Competitor } from '../types/index.js'

export class CompetitorAnalysisCommand {
  private agent: AnalystAgent

  constructor(agent: AnalystAgent) {
    this.agent = agent
  }

  async execute(context: AnalystContext): Promise<CompetitorAnalysis> {
    const prompt = this.buildPrompt(context)
    const response = await this.agent.execute('competitor-analysis', { userInput: context.userInput || '' })
    
    return this.parseResponse(response.content, context)
  }

  private buildPrompt(context: AnalystContext): string {
    const { userInput, options } = context
    
    return `Conduct detailed competitor analysis for: ${userInput || 'the specified market/industry'}

## Analysis Scope:
- Direct and indirect competitors
- Competitor strengths and weaknesses
- Market positioning and differentiation
- Pricing strategies and business models
- Product/service offerings comparison
- Market share and competitive advantages
- Strategic recommendations

## Competitor Focus:
- Primary Competitors: ${options?.primaryCompetitors?.join(', ') || 'To be identified'}
- Secondary Competitors: ${options?.secondaryCompetitors?.join(', ') || 'To be identified'}
- Market Segment: ${options?.marketSegment || 'General'}
- Geographic Focus: ${options?.geographicFocus || 'Global'}

## Analysis Framework:
1. **Competitor Identification**: List all relevant competitors
2. **Strengths Analysis**: What each competitor does well
3. **Weaknesses Analysis**: Areas where competitors struggle
4. **Market Position**: How competitors are positioned
5. **SWOT Analysis**: Overall competitive landscape
6. **Strategic Recommendations**: How to compete effectively

## Output Format:
Please provide a structured analysis with:
1. Executive Summary
2. Competitor Overview
3. Detailed Competitor Analysis
4. SWOT Analysis
5. Competitive Positioning
6. Strategic Recommendations
7. Next Steps

Ensure the analysis is actionable and provides specific insights for competitive strategy.`
  }

  private parseResponse(response: string, context: AnalystContext): CompetitorAnalysis {
    const lines = response.split('\n')
    
    const competitors = this.extractCompetitors(lines)
    const strengths = this.extractList(lines, 'Strengths')
    const weaknesses = this.extractList(lines, 'Weaknesses')
    const opportunities = this.extractList(lines, 'Opportunities')
    const threats = this.extractList(lines, 'Threats')
    const recommendations = this.extractList(lines, 'Recommendations')

    return {
      competitors,
      marketPosition: this.extractValue(lines, 'Market Position') || 'To be determined',
      strengths,
      weaknesses,
      opportunities,
      threats,
      recommendations,
      metadata: {
        analysisDate: new Date().toISOString(),
        competitorCount: competitors.length,
        marketSegment: context.options?.marketSegment || 'General'
      }
    }
  }

  private extractCompetitors(lines: string[]): Competitor[] {
    const competitors: Competitor[] = []
    let currentCompetitor: Partial<Competitor> | null = null
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      // Check for competitor name (usually a heading)
      if (line.startsWith('###') && line.includes('Competitor')) {
        if (currentCompetitor) {
          competitors.push(currentCompetitor as Competitor)
        }
        currentCompetitor = {
          name: line.replace(/^###\s*/, '').replace(/\s*Competitor.*$/, ''),
          description: '',
          strengths: [],
          weaknesses: [],
          keyFeatures: []
        }
      } else if (currentCompetitor) {
        if (line.includes('Description:')) {
          currentCompetitor.description = line.split('Description:')[1]?.trim() || ''
        } else if (line.includes('Strengths:')) {
          currentCompetitor.strengths = this.extractListFromLine(line)
        } else if (line.includes('Weaknesses:')) {
          currentCompetitor.weaknesses = this.extractListFromLine(line)
        } else if (line.includes('Key Features:')) {
          currentCompetitor.keyFeatures = this.extractListFromLine(line)
        }
      }
    }
    
    if (currentCompetitor) {
      competitors.push(currentCompetitor as Competitor)
    }
    
    return competitors
  }

  private extractListFromLine(line: string): string[] {
    const content = line.split(':')[1]?.trim() || ''
    return content.split(',').map(item => item.trim()).filter(item => item.length > 0)
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
