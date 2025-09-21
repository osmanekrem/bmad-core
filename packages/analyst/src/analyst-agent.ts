import { BaseAgentImpl, AgentConfig, AgentContext, AgentResponse } from '@osmanekrem/bmad/core'
import { 
  AnalystCommand, 
  AnalystContext, 
  AnalystResponse, 
  AnalysisResult,
  ResearchResult,
  CompetitorAnalysis,
  MarketResearch,
  AnalystConfig as AnalystConfigType
} from './types/index.js'

export class AnalystAgent extends BaseAgentImpl {
  private analystConfig: AnalystConfigType
  private commands: Map<string, AnalystCommand> = new Map()

  constructor(config?: Partial<AnalystConfigType>) {
    super({
      systemPrompt: `You are the BMad Analyst, an AI-driven analysis and research specialist. Your role is to:

1. **Market Research**: Conduct comprehensive market analysis, identify trends, opportunities, and challenges
2. **Competitor Analysis**: Analyze competitors, their strengths, weaknesses, and market positioning
3. **Technical Analysis**: Evaluate technical solutions, architectures, and implementation approaches
4. **Data Analysis**: Process and interpret data to extract meaningful insights
5. **Report Generation**: Create detailed, actionable reports with clear recommendations

## Core Principles:
- **Data-Driven**: Base all analysis on concrete data and evidence
- **Objective**: Maintain neutrality and present balanced perspectives
- **Actionable**: Provide specific, implementable recommendations
- **Comprehensive**: Cover all relevant aspects of the analysis topic
- **Clear**: Present findings in a clear, structured manner

## Analysis Framework:
1. **Scope Definition**: Clearly define what you're analyzing
2. **Data Collection**: Gather relevant information and data
3. **Analysis**: Process and interpret the data
4. **Findings**: Identify key insights and patterns
5. **Recommendations**: Provide actionable next steps
6. **Validation**: Ensure findings are supported by evidence

## Output Format:
- Use structured markdown with clear headings
- Include executive summary for complex analyses
- Provide specific recommendations with priorities
- Include relevant data and sources
- Use tables and lists for better readability

Always ask clarifying questions if the analysis scope is unclear, and provide detailed, professional analysis that helps drive informed decision-making.`
    })

    this.analystConfig = {
      defaultOutputFormat: 'markdown',
      analysisDepth: 'moderate',
      includeSources: true,
      autoSave: true,
      templates: {
        analysis: ['market-research-tmpl', 'competitor-analysis-tmpl'],
        research: ['market-research-tmpl'],
        competitor: ['competitor-analysis-tmpl'],
        market: ['market-research-tmpl']
      },
      ...config
    }

    this.initializeCommands()
  }

  // Implement abstract method from BaseAgentImpl
  async execute(command: string, context: AgentContext): Promise<AgentResponse> {
    // This method is required by BaseAgentImpl but not used in AnalystAgent
    // We use executeCommand instead
    throw new Error('Use executeCommand method instead of execute')
  }


  private initializeCommands(): void {
    // Market Research Command
    this.commands.set('market-research', {
      name: 'market-research',
      description: 'Conduct comprehensive market research and analysis',
      execute: async (context) => this.executeMarketResearch(context)
    })

    // Competitor Analysis Command
    this.commands.set('competitor-analysis', {
      name: 'competitor-analysis',
      description: 'Analyze competitors and market positioning',
      execute: async (context) => this.executeCompetitorAnalysis(context)
    })

    // Technical Analysis Command
    this.commands.set('technical-analysis', {
      name: 'technical-analysis',
      description: 'Analyze technical solutions and architectures',
      execute: async (context) => this.executeTechnicalAnalysis(context)
    })

    // Trend Analysis Command
    this.commands.set('trend-analysis', {
      name: 'trend-analysis',
      description: 'Identify and analyze market and technology trends',
      execute: async (context) => this.executeTrendAnalysis(context)
    })

    // Data Analysis Command
    this.commands.set('data-analysis', {
      name: 'data-analysis',
      description: 'Analyze data and extract insights',
      execute: async (context) => this.executeDataAnalysis(context)
    })

    // Report Generation Command
    this.commands.set('generate-report', {
      name: 'generate-report',
      description: 'Generate comprehensive analysis report',
      execute: async (context) => this.executeReportGeneration(context)
    })
  }

  async executeCommand(commandName: string, context: AnalystContext): Promise<AnalystResponse> {
    const command = this.commands.get(commandName)
    if (!command) {
      return {
        success: false,
        error: `Command '${commandName}' not found`,
        metadata: {
          command: commandName,
          timestamp: new Date().toISOString()
        }
      }
    }

    try {
      const startTime = Date.now()
      const result = await command.execute(context)
      const duration = Date.now() - startTime

      return {
        ...result,
        metadata: {
          ...result.metadata,
          command: commandName,
          timestamp: new Date().toISOString(),
          duration
        }
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        metadata: {
          command: commandName,
          timestamp: new Date().toISOString()
        }
      }
    }
  }

  private async executeMarketResearch(context: AnalystContext): Promise<AnalystResponse> {
    const prompt = this.buildMarketResearchPrompt(context)
    const response = await this.callAI(prompt)
    
    const researchResult: MarketResearch = this.parseMarketResearchResponse(response)
    
    return {
      success: true,
      data: researchResult,
      output: this.formatMarketResearchOutput(researchResult),
      metadata: {
        command: 'market-research',
        timestamp: new Date().toISOString(),
        template: 'market-research-tmpl'
      }
    }
  }

  private async executeCompetitorAnalysis(context: AnalystContext): Promise<AnalystResponse> {
    const prompt = this.buildCompetitorAnalysisPrompt(context)
    const response = await this.callAI(prompt)
    
    const analysisResult: CompetitorAnalysis = this.parseCompetitorAnalysisResponse(response)
    
    return {
      success: true,
      data: analysisResult,
      output: this.formatCompetitorAnalysisOutput(analysisResult),
      metadata: {
        command: 'competitor-analysis',
        timestamp: new Date().toISOString(),
        template: 'competitor-analysis-tmpl'
      }
    }
  }

  private async executeTechnicalAnalysis(context: AnalystContext): Promise<AnalystResponse> {
    const prompt = this.buildTechnicalAnalysisPrompt(context)
    const response = await this.callAI(prompt)
    
    const analysisResult: AnalysisResult = this.parseAnalysisResponse(response)
    
    return {
      success: true,
      data: analysisResult,
      output: this.formatAnalysisOutput(analysisResult),
      metadata: {
        command: 'technical-analysis',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeTrendAnalysis(context: AnalystContext): Promise<AnalystResponse> {
    const prompt = this.buildTrendAnalysisPrompt(context)
    const response = await this.callAI(prompt)
    
    const analysisResult: AnalysisResult = this.parseAnalysisResponse(response)
    
    return {
      success: true,
      data: analysisResult,
      output: this.formatAnalysisOutput(analysisResult),
      metadata: {
        command: 'trend-analysis',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeDataAnalysis(context: AnalystContext): Promise<AnalystResponse> {
    const prompt = this.buildDataAnalysisPrompt(context)
    const response = await this.callAI(prompt)
    
    const analysisResult: AnalysisResult = this.parseAnalysisResponse(response)
    
    return {
      success: true,
      data: analysisResult,
      output: this.formatAnalysisOutput(analysisResult),
      metadata: {
        command: 'data-analysis',
        timestamp: new Date().toISOString()
      }
    }
  }

  private async executeReportGeneration(context: AnalystContext): Promise<AnalystResponse> {
    const prompt = this.buildReportGenerationPrompt(context)
    const response = await this.callAI(prompt)
    
    return {
      success: true,
      output: response,
      metadata: {
        command: 'generate-report',
        timestamp: new Date().toISOString()
      }
    }
  }

  // Prompt building methods
  private buildMarketResearchPrompt(context: AnalystContext): string {
    return `Conduct comprehensive market research for: ${context.userInput || 'the specified topic'}

Please provide:
1. Market size and growth projections
2. Key market trends and drivers
3. Target customer segments
4. Market opportunities and challenges
5. Competitive landscape overview
6. Regulatory and environmental factors
7. Recommendations for market entry/expansion

Analysis depth: ${this.analystConfig.analysisDepth}
Include sources: ${this.analystConfig.includeSources}
Output format: ${context.outputFormat || this.analystConfig.defaultOutputFormat}`
  }

  private buildCompetitorAnalysisPrompt(context: AnalystContext): string {
    return `Conduct detailed competitor analysis for: ${context.userInput || 'the specified market/industry'}

Please analyze:
1. Direct and indirect competitors
2. Competitor strengths and weaknesses
3. Market positioning and differentiation
4. Pricing strategies and business models
5. Product/service offerings comparison
6. Market share and competitive advantages
7. Strategic recommendations

Analysis depth: ${this.analystConfig.analysisDepth}
Include sources: ${this.analystConfig.includeSources}
Output format: ${context.outputFormat || this.analystConfig.defaultOutputFormat}`
  }

  private buildTechnicalAnalysisPrompt(context: AnalystContext): string {
    return `Conduct technical analysis for: ${context.userInput || 'the specified technology/solution'}

Please analyze:
1. Technical architecture and design
2. Technology stack and tools
3. Performance and scalability considerations
4. Security and compliance aspects
5. Integration requirements and challenges
6. Maintenance and support considerations
7. Technical recommendations and alternatives

Analysis depth: ${this.analystConfig.analysisDepth}
Include sources: ${this.analystConfig.includeSources}
Output format: ${context.outputFormat || this.analystConfig.defaultOutputFormat}`
  }

  private buildTrendAnalysisPrompt(context: AnalystContext): string {
    return `Conduct trend analysis for: ${context.userInput || 'the specified domain/industry'}

Please identify and analyze:
1. Current trends and their drivers
2. Emerging trends and future outlook
3. Technology trends and innovations
4. Market trends and consumer behavior
5. Regulatory and policy trends
6. Trend impact and implications
7. Strategic recommendations based on trends

Analysis depth: ${this.analystConfig.analysisDepth}
Include sources: ${this.analystConfig.includeSources}
Output format: ${context.outputFormat || this.analystConfig.defaultOutputFormat}`
  }

  private buildDataAnalysisPrompt(context: AnalystContext): string {
    return `Conduct data analysis for: ${context.userInput || 'the provided dataset'}

Please analyze:
1. Data quality and completeness
2. Key patterns and insights
3. Statistical significance and correlations
4. Data visualization recommendations
5. Anomalies and outliers
6. Predictive insights and forecasting
7. Actionable recommendations based on data

Analysis depth: ${this.analystConfig.analysisDepth}
Include sources: ${this.analystConfig.includeSources}
Output format: ${context.outputFormat || this.analystConfig.defaultOutputFormat}`
  }

  private buildReportGenerationPrompt(context: AnalystContext): string {
    return `Generate a comprehensive analysis report for: ${context.userInput || 'the specified topic'}

The report should include:
1. Executive summary
2. Methodology and scope
3. Key findings and insights
4. Detailed analysis sections
5. Recommendations and next steps
6. Appendices and supporting data
7. Conclusion and strategic implications

Output format: ${context.outputFormat || this.analystConfig.defaultOutputFormat}
Include sources: ${this.analystConfig.includeSources}
Analysis depth: ${this.analystConfig.analysisDepth}`
  }

  // Response parsing methods
  private parseMarketResearchResponse(response: string): MarketResearch {
    // Parse AI response into structured MarketResearch object
    // This would typically involve more sophisticated parsing
    return {
      marketSize: 'To be determined',
      growthRate: 'To be determined',
      trends: [],
      opportunities: [],
      challenges: [],
      recommendations: [],
      metadata: {
        researchDate: new Date().toISOString(),
        marketSegment: 'General',
        dataSource: 'AI Analysis'
      }
    }
  }

  private parseCompetitorAnalysisResponse(response: string): CompetitorAnalysis {
    // Parse AI response into structured CompetitorAnalysis object
    return {
      competitors: [],
      marketPosition: 'To be determined',
      strengths: [],
      weaknesses: [],
      opportunities: [],
      threats: [],
      recommendations: [],
      metadata: {
        analysisDate: new Date().toISOString(),
        competitorCount: 0,
        marketSegment: 'General'
      }
    }
  }

  private parseAnalysisResponse(response: string): AnalysisResult {
    // Parse AI response into structured AnalysisResult object
    return {
      title: 'Analysis Result',
      summary: response.substring(0, 200) + '...',
      findings: [],
      recommendations: [],
      nextSteps: [],
      metadata: {
        analysisType: 'General',
        timestamp: new Date().toISOString(),
        confidence: 0.8
      }
    }
  }

  // Output formatting methods
  private formatMarketResearchOutput(research: MarketResearch): string {
    return `# Market Research Report

## Executive Summary
${research.metadata.researchDate}

## Market Overview
- **Market Size**: ${research.marketSize}
- **Growth Rate**: ${research.growthRate}

## Key Trends
${research.trends.map(trend => `- **${trend.name}**: ${trend.description}`).join('\n')}

## Opportunities
${research.opportunities.map(opp => `- **${opp.title}**: ${opp.description}`).join('\n')}

## Challenges
${research.challenges.map(challenge => `- **${challenge.title}**: ${challenge.description}`).join('\n')}

## Recommendations
${research.recommendations.map(rec => `- ${rec}`).join('\n')}
`
  }

  private formatCompetitorAnalysisOutput(analysis: CompetitorAnalysis): string {
    return `# Competitor Analysis Report

## Executive Summary
${analysis.metadata.analysisDate}

## Market Position
${analysis.marketPosition}

## Competitors
${analysis.competitors.map(comp => `### ${comp.name}
- **Description**: ${comp.description}
- **Strengths**: ${comp.strengths.join(', ')}
- **Weaknesses**: ${comp.weaknesses.join(', ')}
- **Key Features**: ${comp.keyFeatures.join(', ')}
`).join('\n')}

## SWOT Analysis
### Strengths
${analysis.strengths.map(s => `- ${s}`).join('\n')}

### Weaknesses
${analysis.weaknesses.map(w => `- ${w}`).join('\n')}

### Opportunities
${analysis.opportunities.map(o => `- ${o}`).join('\n')}

### Threats
${analysis.threats.map(t => `- ${t}`).join('\n')}

## Recommendations
${analysis.recommendations.map(rec => `- ${rec}`).join('\n')}
`
  }

  private formatAnalysisOutput(analysis: AnalysisResult): string {
    return `# Analysis Report

## ${analysis.title}

### Summary
${analysis.summary}

### Key Findings
${analysis.findings.map(finding => `- **${finding.title}**: ${finding.description}`).join('\n')}

### Recommendations
${analysis.recommendations.map(rec => `- ${rec}`).join('\n')}

### Next Steps
${analysis.nextSteps.map(step => `- ${step}`).join('\n')}
`
  }

  // Public API methods
  getAvailableCommands(): string[] {
    return Array.from(this.commands.keys())
  }

  getCommandDescription(commandName: string): string | undefined {
    return this.commands.get(commandName)?.description
  }

  updateConfig(newConfig: Partial<AnalystConfigType>): void {
    this.analystConfig = { ...this.analystConfig, ...newConfig }
  }

  getConfig(): AnalystConfigType {
    return { ...this.analystConfig }
  }
}
